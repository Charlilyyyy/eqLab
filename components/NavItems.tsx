'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';

export function NavItems() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <ul className="nav-list">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          {item.label === 'Search' ? (
            <span className="search-text cursor-not-allowed opacity-60">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className={`transition-colors hover:text-yellow-500 ${
                isActive(item.href) ? 'text-gray-100' : ''
              }`}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
