import { connectToDatabase } from '@/database/mongoose';
import { sendPriceAlertEmail, sendWelcomeEmail } from '@/lib/nodemailer';

import { inngest } from './client';
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from './prompts';

const FINNHUB_BASE_URL =
  process.env.FINNHUB_BASE_URL ?? 'https://finnhub.io/api/v1';
const FINNHUB_API_KEY =
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? process.env.FINNHUB_API_KEY ?? '';

/** Do not re-notify the same alert more often than this many hours. */
const ALERT_COOLDOWN_HOURS = 6;

const FALLBACK_WELCOME_INTRO = `<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining MarkGauge. You now have the tools to track markets, build a watchlist, and get price alerts — all in one place.</p>`;

type AlertRecord = {
  _id: unknown;
  userEmail: string;
  symbol: string;
  company: string;
  alertName: string;
  alertType: 'upper' | 'lower';
  threshold: number;
  lastSent?: Date | null;
};

export const sendSignUpEmail = inngest.createFunction(
  { id: 'sign-up-email' },
  { event: 'app/user.created' },
  async ({ event, step }) => {
    const userProfile = `
    - Country: ${event.data.country}
    - Investment goals: ${event.data.investmentGoals}
    - Risk tolerance: ${event.data.riskTolerance}
    - Preferred industry: ${event.data.preferredIndustry}`;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      '{{userProfile}}',
      userProfile
    );

    let introText = FALLBACK_WELCOME_INTRO;

    try {
      const response = await step.ai.infer('generate-welcome-intro', {
        model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
        body: {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const generated =
        part && 'text' in part && typeof part.text === 'string'
          ? part.text.trim()
          : null;

      if (generated) {
        introText = generated;
      }
    } catch (error) {
      console.error(
        'Welcome intro AI generation failed, using fallback:',
        error
      );
    }

    await step.run('send-welcome-email', async () => {
      return sendWelcomeEmail({
        email: event.data.email,
        name: event.data.name,
        intro: introText,
      });
    });

    return {
      success: true,
      message: `Welcome email sent to ${event.data.email}`,
    };
  }
);

// Sends a price alert email and records the notification time.
export const sendPriceAlert = inngest.createFunction(
  { id: 'send-price-alert' },
  { event: 'alert/price.triggered' },
  async ({ event, step }) => {
    const {
      symbol,
      userEmail,
      company,
      alertType,
      alertName,
      thresholdValue,
      currentValue,
    } = event.data as {
      symbol: string;
      userEmail: string;
      company: string;
      alertType: 'upper' | 'lower';
      alertName: string;
      thresholdValue: number;
      currentValue: number;
    };

    const priceData = await step.run('format-price-data', async () => {
      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      return {
        formattedPrice: currency.format(currentValue),
        formattedThreshold: currency.format(thresholdValue),
      };
    });

    await step.run('send-alert-email', async () => {
      if (!['upper', 'lower'].includes(alertType)) {
        throw new Error(`Unsupported alert type: ${alertType}`);
      }

      return sendPriceAlertEmail({
        email: userEmail,
        symbol,
        company,
        alertType,
        alertName,
        currentPrice: priceData.formattedPrice,
        thresholdPrice: priceData.formattedThreshold,
      });
    });

    await step.run('update-alert-last-sent', async () => {
      const mongoose = await connectToDatabase();
      const db = mongoose.connection.db;
      if (!db) throw new Error('Database connection failed');

      await db
        .collection('alerts')
        .updateOne(
          { userEmail, symbol, alertName, alertType },
          { $set: { lastSent: new Date() } }
        );
    });

    return { success: true, message: `Price alert email sent for ${symbol}` };
  }
);

// Scans active alerts on a schedule and emits trigger events when thresholds are met.
export const checkPriceAlerts = inngest.createFunction(
  { id: 'check-price-alerts' },
  { cron: '*/5 * * * *' },
  async ({ step }) => {
    const alerts = await step.run('load-active-alerts', async () => {
      const mongoose = await connectToDatabase();
      const db = mongoose.connection.db;
      if (!db) throw new Error('Database connection failed');

      const rows = await db
        .collection('alerts')
        .find({ isActive: true })
        .toArray();

      return rows as unknown as AlertRecord[];
    });

    if (!alerts.length) {
      return { success: true, message: 'No active alerts to check' };
    }

    const uniqueSymbols = Array.from(new Set(alerts.map((a) => a.symbol)));

    const quotes = await step.run('fetch-quotes', async () => {
      const entries = await Promise.all(
        uniqueSymbols.map(async (symbol) => {
          try {
            const res = await fetch(
              `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
              { cache: 'no-store' }
            );
            if (!res.ok) return [symbol, null] as const;
            const data = (await res.json()) as QuoteData;
            return [symbol, data.c ?? null] as const;
          } catch (error) {
            console.error(`Failed to fetch quote for ${symbol}:`, error);
            return [symbol, null] as const;
          }
        })
      );

      return Object.fromEntries(entries) as Record<string, number | null>;
    });

    const now = Date.now();
    const cooldownMs = ALERT_COOLDOWN_HOURS * 60 * 60 * 1000;

    const triggered = alerts.filter((alert) => {
      const price = quotes[alert.symbol];
      if (price == null) return false;

      if (alert.lastSent) {
        const sentAt = new Date(alert.lastSent).getTime();
        if (now - sentAt < cooldownMs) return false;
      }

      return alert.alertType === 'upper'
        ? price >= alert.threshold
        : price <= alert.threshold;
    });

    if (!triggered.length) {
      return { success: true, message: 'No alerts triggered' };
    }

    await step.run('emit-triggered-events', async () => {
      await Promise.all(
        triggered.map((alert) =>
          inngest.send({
            name: 'alert/price.triggered',
            data: {
              symbol: alert.symbol,
              userEmail: alert.userEmail,
              company: alert.company,
              alertType: alert.alertType,
              alertName: alert.alertName,
              thresholdValue: alert.threshold,
              currentValue: quotes[alert.symbol] as number,
            },
          })
        )
      );
    });

    return {
      success: true,
      message: `Triggered ${triggered.length} alert(s)`,
    };
  }
);
