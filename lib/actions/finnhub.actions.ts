'use server';

import { cache } from 'react';

import { POPULAR_STOCK_SYMBOLS } from '@/lib/constants';
import {
  formatArticle,
  formatChangePercent,
  formatMarketCapValue,
  formatPrice,
  getDateRange,
  validateArticle,
} from '@/lib/utils';

import { getCurrentUser } from '@/lib/better-auth/session';
import { redirect } from 'next/navigation';

import { getWatchlistSymbolsByEmail } from './watchlist.actions';

const FINNHUB_BASE_URL =
  process.env.FINNHUB_BASE_URL ?? 'https://finnhub.io/api/v1';
const FINNHUB_API_KEY =
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? process.env.FINNHUB_API_KEY ?? '';

// fetchJSON(url, seconds) caches for `seconds`; fetchJSON(url) never caches.
async function fetchJSON(url: string, revalidateSeconds?: number) {
  try {
    const fetchOptions = revalidateSeconds
      ? {
          cache: 'force-cache' as const,
          next: { revalidate: revalidateSeconds },
        }
      : { cache: 'no-store' as const };

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

export const searchStocks = cache(async (query?: string) => {
  const cleanQuery = query?.trim();

  try {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    const userWatchlistSymbols = await getWatchlistSymbolsByEmail(user.email);

    let allResults: FinnhubSearchResult[] = [];

    if (!cleanQuery) {
      const popularStocks = POPULAR_STOCK_SYMBOLS.slice(0, 10).map(
        async (symbol) => {
          try {
            const profileData = await fetchJSON(
              `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
              3600
            );

            if (profileData && profileData.name) {
              allResults.push({
                symbol,
                description: profileData.name,
                displaySymbol: symbol,
                type: 'Common Stock',
              });
            }
          } catch (error) {
            console.warn(`Failed to get profile for ${symbol}:`, error);
          }
        }
      );

      await Promise.all(popularStocks);
    } else {
      const searchData = (await fetchJSON(
        `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(
          cleanQuery
        )}&token=${FINNHUB_API_KEY}`,
        1800
      )) as FinnhubSearchResponse;

      allResults = searchData?.result ?? [];
    }

    const results = allResults
      ?.slice(0, 15)
      ?.map(
        (stock: FinnhubSearchResult): StockWithWatchlistStatus => ({
          symbol: stock.symbol.toUpperCase(),
          name: stock.description,
          exchange: stock.displaySymbol || 'US',
          type: stock.type || 'Stock',
          isInWatchlist: userWatchlistSymbols.includes(
            stock.symbol.toUpperCase()
          ),
        })
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    return results ?? [];
  } catch (error) {
    console.error('Error in stock search:', error);
    return [];
  }
});

export const getNews = cache(async (symbols?: string[]) => {
  const { from, to } = getDateRange(5);

  try {
    const cleanSymbols = symbols
      ?.map((symbol) => symbol.trim().toUpperCase())
      .filter((symbol) => symbol.length > 0);

    if (cleanSymbols?.length) {
      const newsFromSymbols: MarketNewsArticle[] = [];

      for (let i = 0; i < 6; i++) {
        const symbol = cleanSymbols[i % cleanSymbols.length];

        const newsData = await fetchJSON(
          `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`,
          3600
        );

        if (Array.isArray(newsData) && newsData.length) {
          const validArticles = (newsData as RawNewsArticle[]).filter(
            validateArticle
          );
          const articleIndex = Math.floor(i / cleanSymbols.length);
          const article = validArticles[articleIndex];
          if (article) {
            newsFromSymbols.push(formatArticle(article, true, symbol));
          }
        }
      }

      return newsFromSymbols.sort((a, b) => b.datetime - a.datetime);
    }

    const generalNews = await fetchJSON(
      `${FINNHUB_BASE_URL}/news?category=general&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`,
      3600
    );

    const seen = new Set<string>();
    return (generalNews as RawNewsArticle[])
      .filter(validateArticle)
      .filter((article) => {
        const uniqueKey = article.id ?? article.url ?? article.headline;
        if (seen.has(uniqueKey!.toString())) return false;
        seen.add(uniqueKey!.toString());
        return true;
      })
      .slice(0, 6)
      .map((article, index) => formatArticle(article, false, undefined, index));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news');
  }
});

export const getStocksDetails = cache(async (symbol: string) => {
  const cleanSymbol = symbol.trim().toUpperCase();

  try {
    const [quote, profile, financials] = await Promise.all([
      fetchJSON(
        `${FINNHUB_BASE_URL}/quote?symbol=${cleanSymbol}&token=${FINNHUB_API_KEY}`
      ),
      fetchJSON(
        `${FINNHUB_BASE_URL}/stock/profile2?symbol=${cleanSymbol}&token=${FINNHUB_API_KEY}`,
        3600
      ),
      fetchJSON(
        `${FINNHUB_BASE_URL}/stock/metric?symbol=${cleanSymbol}&metric=all&token=${FINNHUB_API_KEY}`,
        1800
      ),
    ]);

    const quoteData = quote as QuoteData;
    const profileData = profile as ProfileData;
    const financialsData = financials as FinancialsData;

    if (!quoteData?.c || !profileData?.name) {
      throw new Error('Invalid stock data received from API');
    }

    const changePercent = quoteData.dp || 0;
    const peRatio = financialsData?.metric?.peNormalizedAnnual ?? null;

    return {
      symbol: cleanSymbol,
      company: profileData.name,
      currentPrice: quoteData.c,
      changePercent,
      priceFormatted: formatPrice(quoteData.c),
      changeFormatted: formatChangePercent(changePercent),
      peRatio: peRatio?.toFixed(1) || '—',
      marketCapFormatted: formatMarketCapValue(
        profileData?.marketCapitalization || 0
      ),
    };
  } catch (error) {
    console.error(`Error fetching details for ${cleanSymbol}:`, error);
    throw new Error('Failed to fetch stock details');
  }
});
