import { TradingViewWidget } from '@/components/TradingViewWidget';
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from '@/lib/constants';

const SCRIPT_BASE =
  'https://s3.tradingview.com/external-embedding/embed-widget-';

export default function DashboardPage() {
  return (
    <div className="home-wrapper flex min-h-screen">
      <section className="home-section grid w-full gap-8">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market overview"
            scriptUrl={`${SCRIPT_BASE}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
            className="custom-chart"
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock heatmap"
            scriptUrl={`${SCRIPT_BASE}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>

      <section className="home-section grid w-full gap-8">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Top stories"
            scriptUrl={`${SCRIPT_BASE}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            height={600}
            className="custom-chart"
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Market quotes"
            scriptUrl={`${SCRIPT_BASE}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
}
