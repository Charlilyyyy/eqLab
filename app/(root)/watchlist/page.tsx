export default function WatchlistPage() {
  return (
    <section className="watchlist-empty-container container">
      <div className="watchlist-empty">
        <p className="empty-title">Your watchlist is empty</p>
        <p className="empty-description">
          Search for symbols and add them to your list once market data is
          connected.
        </p>
      </div>
    </section>
  );
}
