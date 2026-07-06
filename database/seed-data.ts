import type { AlertType } from './models/alert.model';

export const DEMO_USER_ID = 'local-demo-user';
export const DEMO_USER_EMAIL = 'demo@markgauge.local';

export const SEED_WATCHLIST: Array<{ symbol: string; company: string }> = [
  { symbol: 'AAPL', company: 'Apple Inc.' },
  { symbol: 'MSFT', company: 'Microsoft Corporation' },
  { symbol: 'GOOGL', company: 'Alphabet Inc.' },
  { symbol: 'NVDA', company: 'NVIDIA Corporation' },
];

export const SEED_ALERTS: Array<{
  symbol: string;
  company: string;
  alertName: string;
  alertType: AlertType;
  threshold: number;
  isActive?: boolean;
}> = [
  {
    symbol: 'AAPL',
    company: 'Apple Inc.',
    alertName: 'AAPL above target',
    alertType: 'upper',
    threshold: 220,
  },
  {
    symbol: 'AAPL',
    company: 'Apple Inc.',
    alertName: 'AAPL dip watch',
    alertType: 'lower',
    threshold: 180,
  },
  {
    symbol: 'NVDA',
    company: 'NVIDIA Corporation',
    alertName: 'NVDA breakout',
    alertType: 'upper',
    threshold: 140,
  },
];
