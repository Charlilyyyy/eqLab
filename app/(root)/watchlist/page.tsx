import { Star } from 'lucide-react';

import { AlertList } from '@/components/AlertList';
import { SearchCommand } from '@/components/SearchCommand';
import { WatchlistNews } from '@/components/WatchlistNews';
import { WatchlistTable } from '@/components/WatchlistTable';
import { getUserAlerts } from '@/lib/actions/alert.actions';
import { getNews, searchStocks } from '@/lib/actions/finnhub.actions';
import { getWatchlistWithData } from '@/lib/actions/watchlist.actions';

export default async function WatchlistPage() {
  const watchlist = await getWatchlistWithData();
  const initialStocks = await searchStocks();
  const symbols = watchlist.map((item: StockWithData) => item.symbol);
  const news = await getNews(symbols);
  const alerts = await getUserAlerts();

  if (watchlist.length === 0) {
    return (
      <section className="watchlist-empty-container flex">
        <div className="watchlist-empty">
          <Star className="watchlist-star" />
          <h2 className="empty-title">Your watchlist is empty</h2>
          <p className="empty-description">
            Start building your watchlist by searching for stocks and clicking
            the star icon to add them.
          </p>
        </div>
        <SearchCommand initialStocks={initialStocks} />
      </section>
    );
  }

  return (
    <div className="watchlist-container">
      <section className="watchlist">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="watchlist-title">Watchlist</h2>
            <SearchCommand initialStocks={initialStocks} />
          </div>
          <WatchlistTable watchlist={watchlist} />
        </div>
        <hr className="border-gray-700" />
        <div className="flex w-full flex-col gap-6">
          <h2 className="watchlist-title">News</h2>
          <WatchlistNews news={news} />
        </div>
      </section>

      <section className="watchlist-alerts flex">
        <h2 className="text-2xl font-bold text-gray-100">Alerts</h2>
        <AlertList alertData={alerts} />
      </section>
    </div>
  );
}
