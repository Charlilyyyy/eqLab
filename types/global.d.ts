declare global {
  type User = {
    id: string;
    name: string;
    email: string;
  };

  type SignInFormData = {
    email: string;
    password: string;
  };

  type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  };

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    error?: { message?: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validation?: Record<string, any>;
    disabled?: boolean;
    value?: string;
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
