export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard' },
  { href: '/watchlist', label: 'Watchlist' },
  { href: '#search', label: 'Search' },
] as const;

export const INVESTMENT_GOALS = [
  { value: 'Growth', label: 'Growth' },
  { value: 'Income', label: 'Income' },
  { value: 'Balanced', label: 'Balanced' },
  { value: 'Conservative', label: 'Conservative' },
] as const;

export const RISK_TOLERANCE_OPTIONS = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
] as const;

export const PREFERRED_INDUSTRIES = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Consumer Goods', label: 'Consumer Goods' },
] as const;

export const ALERT_TYPE_OPTIONS = [
  { value: 'upper', label: 'Upper' },
  { value: 'lower', label: 'Lower' },
] as const;

/** Default quote cache TTL in seconds (see docs/requirements/non-functional-requirements.md) */
export const QUOTE_CACHE_TTL_SECONDS = 60;

/** Debounce delay for symbol search input in milliseconds */
export const SEARCH_DEBOUNCE_MS = 400;
