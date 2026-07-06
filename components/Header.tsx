import Image from 'next/image';
import Link from 'next/link';
import { NavItems } from './NavItems';

export function Header() {
  return (
    <header className="header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="MarkGauge"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/sign-in" className="transition-colors hover:text-yellow-500">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-yellow-500 px-4 py-2 text-gray-900 transition-colors hover:bg-yellow-400"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
