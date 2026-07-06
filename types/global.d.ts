declare global {
  type User = {
    id: string;
    name: string;
    email: string;
  };

  type WelcomeEmailData = {
    email: string;
    name: string;
    intro: string;
  };

  type PriceAlertEmailData = {
    email: string;
    symbol: string;
    company: string;
    alertType: 'upper' | 'lower';
    alertName: string;
    currentPrice: string;
    thresholdPrice: string;
  };
}

export {};
