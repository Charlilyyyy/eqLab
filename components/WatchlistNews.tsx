import Link from 'next/link';

import { formatTimeAgo } from '@/lib/utils';

export function WatchlistNews({ news = [] }: WatchlistNewsProps) {
  if (news.length === 0) {
    return (
      <section className="px-4 py-8 text-center">
        <p className="mb-2 text-gray-500/50">No news available</p>
      </section>
    );
  }

  return (
    <ul className="watchlist-news">
      {news.map((article, index) => (
        <li key={article.id + index} className="news-item">
          <Link
            href={article.url || '#'}
            target="_blank"
            className="flex h-full flex-col"
          >
            {article.related && (
              <span className="news-tag">{article.related}</span>
            )}
            <div className="mb-3">
              <h3 className="news-title">{article.headline || 'Untitled'}</h3>
              <div className="news-meta">
                <span>{article.source || 'Unknown source'}</span>
                {article.datetime && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="mx-1">
                      {formatTimeAgo(article.datetime)}
                    </span>
                  </>
                )}
              </div>
            </div>
            <p className="news-summary">{article.summary}</p>
            <span className="news-cta">Read more →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
