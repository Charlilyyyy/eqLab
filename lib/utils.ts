import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatTimeAgo(timestamp: number) {
  const now = Date.now();
  const diffInMs = now - timestamp * 1000;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInHours > 24) {
    const days = Math.floor(diffInHours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
}

export function getDateRange(days: number) {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - days);
  return {
    to: toDate.toISOString().split('T')[0],
    from: fromDate.toISOString().split('T')[0],
  };
}

export function validateArticle(article: RawNewsArticle) {
  return Boolean(
    article.headline && article.summary && article.url && article.datetime
  );
}

export function formatArticle(
  article: RawNewsArticle,
  isCompanyNews: boolean,
  symbol?: string,
  index = 0
): MarketNewsArticle {
  return {
    id: isCompanyNews ? Date.now() + Math.random() : article.id + index,
    headline: article.headline!.trim(),
    summary:
      article.summary!.trim().substring(0, isCompanyNews ? 200 : 150) + '...',
    source: article.source || (isCompanyNews ? 'Company News' : 'Market News'),
    url: article.url!,
    datetime: article.datetime!,
    category: isCompanyNews ? 'company' : article.category || 'general',
    related: isCompanyNews ? symbol! : article.related || '',
  };
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatChangePercent(changePercent?: number) {
  if (changePercent === undefined || changePercent === null) return '';
  const sign = changePercent > 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(2)}%`;
}

export function getChangeColorClass(changePercent?: number) {
  if (changePercent === undefined || changePercent === null) return 'text-gray-400';
  return changePercent > 0 ? 'text-green-500' : 'text-red-500';
}

export function formatMarketCapValue(marketCap: number): string {
  if (!marketCap) return 'N/A';
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}T`;
  if (marketCap >= 1e3) return `$${(marketCap / 1e3).toFixed(2)}B`;
  return `$${marketCap.toFixed(2)}M`;
}

export const formatDateToday = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function getAlertText(alert: {
  alertType: 'upper' | 'lower';
  threshold: number;
}) {
  const condition = alert.alertType === 'upper' ? '>' : '<';
  return `Price ${condition} ${formatPrice(alert.threshold)}`;
}
