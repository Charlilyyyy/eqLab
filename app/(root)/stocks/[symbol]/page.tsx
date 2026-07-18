import { notFound } from 'next/navigation';

import { TradingViewWidget } from '@/components/TradingViewWidget';
import { WatchlistButton } from '@/components/WatchlistButton';
import type { WatchlistItem } from '@/database/models/watchlist.model';
import { getStocksDetails } from '@/lib/actions/finnhub.actions';
import { getUserWatchlist } from '@/lib/actions/watchlist.actions';
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from '@/lib/constants';

const SCRIPT_BASE =
  'https://s3.tradingview.com/external-embedding/embed-widget-';

export default async function StockDetailPage({
  params,
}: StockDetailsPageProps) {
  const { symbol } = await params;
  const upperSymbol = symbol.toUpperCase();

  const stockData = await getStocksDetails(upperSymbol);
  if (!stockData) notFound();

  const watchlist = await getUserWatchlist();
  const isInWatchlist = watchlist.some(
    (item: WatchlistItem) => item.symbol === upperSymbol
  );

  return (
    <div className="stock-details-container grid">
      <section className="flex flex-col gap-6 lg:col-span-2">
        <TradingViewWidget
          scriptUrl={`${SCRIPT_BASE}symbol-info.js`}
          config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
          height={170}
          className="custom-chart"
        />

        <TradingViewWidget
          scriptUrl={`${SCRIPT_BASE}advanced-chart.js`}
          config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
        />

        <TradingViewWidget
          scriptUrl={`${SCRIPT_BASE}advanced-chart.js`}
          config={BASELINE_WIDGET_CONFIG(symbol)}
        />
      </section>

      <section className="flex w-full flex-col gap-6 lg:col-span-1">
        <WatchlistButton
          symbol={upperSymbol}
          company={stockData.company}
          isInWatchlist={isInWatchlist}
          type="button"
        />

        <TradingViewWidget
          scriptUrl={`${SCRIPT_BASE}technical-analysis.js`}
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
          height={400}
        />

        <TradingViewWidget
          scriptUrl={`${SCRIPT_BASE}symbol-profile.js`}
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
          height={440}
        />

        <TradingViewWidget
          scriptUrl={`${SCRIPT_BASE}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
          height={464}
        />
      </section>
    </div>
  );
}
