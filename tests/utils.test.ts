import { describe, expect, it } from 'vitest';

import {
  formatArticle,
  formatChangePercent,
  formatMarketCapValue,
  formatPrice,
  getAlertText,
  getChangeColorClass,
  getDateRange,
  validateArticle,
} from '@/lib/utils';

describe('formatPrice', () => {
  it('formats a number as USD currency', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50');
  });
});

describe('formatChangePercent', () => {
  it('prefixes positive changes with a plus sign', () => {
    expect(formatChangePercent(2.345)).toBe('+2.35%');
  });

  it('keeps the minus sign for negative changes', () => {
    expect(formatChangePercent(-1.2)).toBe('-1.20%');
  });

  it('returns an empty string when the change is undefined', () => {
    expect(formatChangePercent(undefined)).toBe('');
  });
});

describe('getChangeColorClass', () => {
  it('returns green for gains and red for losses', () => {
    expect(getChangeColorClass(1)).toBe('text-green-500');
    expect(getChangeColorClass(-1)).toBe('text-red-500');
  });

  it('falls back to gray when the change is missing', () => {
    expect(getChangeColorClass(undefined)).toBe('text-gray-400');
  });
});

describe('formatMarketCapValue', () => {
  it('renders trillions, billions, and millions', () => {
    expect(formatMarketCapValue(2_500_000)).toBe('$2.50T');
    expect(formatMarketCapValue(3_200)).toBe('$3.20B');
    expect(formatMarketCapValue(450)).toBe('$450.00M');
  });

  it('returns N/A for a zero or missing market cap', () => {
    expect(formatMarketCapValue(0)).toBe('N/A');
  });
});

describe('getAlertText', () => {
  it('describes upper and lower thresholds', () => {
    expect(getAlertText({ alertType: 'upper', threshold: 100 })).toBe(
      'Price > $100.00'
    );
    expect(getAlertText({ alertType: 'lower', threshold: 50 })).toBe(
      'Price < $50.00'
    );
  });
});

describe('getDateRange', () => {
  it('returns ISO date strings spanning the requested days', () => {
    const { from, to } = getDateRange(5);
    expect(from).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(to).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Date(from).getTime()).toBeLessThanOrEqual(
      new Date(to).getTime()
    );
  });
});

describe('validateArticle', () => {
  const base = {
    id: 1,
    headline: 'Headline',
    summary: 'Summary',
    url: 'https://example.com',
    datetime: 1700000000,
  };

  it('accepts articles with all required fields', () => {
    expect(validateArticle(base)).toBe(true);
  });

  it('rejects articles missing a required field', () => {
    expect(validateArticle({ ...base, url: undefined })).toBe(false);
  });
});

describe('formatArticle', () => {
  it('tags company news with the provided symbol', () => {
    const article = formatArticle(
      {
        id: 7,
        headline: '  Apple news  ',
        summary: 'A summary of the story.',
        url: 'https://example.com/a',
        datetime: 1700000000,
      },
      true,
      'AAPL'
    );

    expect(article.headline).toBe('Apple news');
    expect(article.related).toBe('AAPL');
    expect(article.category).toBe('company');
    expect(article.summary.endsWith('...')).toBe(true);
  });
});
