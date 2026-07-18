import Image from 'next/image';
import Link from 'next/link';

import { NavItems } from '@/components/NavItems';
import { UserDropdown } from '@/components/UserDropdown';
import { searchStocks } from '@/lib/actions/finnhub.actions';

export async function Header({ user }: { user: User }) {
  const initialStocks = await searchStocks();

  return (
    <header className="header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="MarkGauge"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
            priority
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
}
