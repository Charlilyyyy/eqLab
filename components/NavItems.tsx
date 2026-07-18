'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SearchCommand } from '@/components/SearchCommand';
import { NAV_ITEMS } from '@/lib/constants';

export function NavItems({
  initialStocks = [],
}: {
  initialStocks?: StockWithWatchlistStatus[];
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <ul className="nav-list">
      {NAV_ITEMS.map((item) => {
        if (item.label === 'Search') {
          return (
            <li key="search-trigger">
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
              />
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`transition-colors hover:text-yellow-500 ${
                isActive(item.href) ? 'text-gray-100' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
