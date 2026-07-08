import { sendWelcomeEmail } from '@/lib/nodemailer';

import { inngest } from './client';
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from './prompts';

const FALLBACK_WELCOME_INTRO = `<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining MarkGauge. You now have the tools to track markets, build a watchlist, and get price alerts — all in one place.</p>`;

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
      console.error('Welcome intro AI generation failed, using fallback:', error);
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

export const sendPriceAlert = inngest.createFunction(
  { id: 'send-price-alert' },
  { event: 'alert/price.triggered' },
  async ({ event }) => {
    return {
      success: true,
      message: `Price alert queued for ${event.data.symbol}`,
    };
  }
);

export const checkPriceAlerts = inngest.createFunction(
  { id: 'check-price-alerts' },
  { cron: '*/5 * * * *' },
  async () => {
    return { success: true, message: 'Price alert check placeholder' };
  }
);
