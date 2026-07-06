import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-gray-800 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          MarkGauge — personal equity monitoring workspace.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <Link href="/" className="footer-link">
            Dashboard
          </Link>
          <Link href="/watchlist" className="footer-link">
            Watchlist
          </Link>
        </div>
      </div>
    </footer>
  );
}
