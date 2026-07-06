import { inngest } from './client';

export const sendSignUpEmail = inngest.createFunction(
  { id: 'sign-up-email' },
  { event: 'app/user.created' },
  async ({ event }) => {
    return {
      success: true,
      message: `Welcome email queued for ${event.data.email}`,
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
