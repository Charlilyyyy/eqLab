import { redirect } from 'next/navigation';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getCurrentUser } from '@/lib/better-auth/session';

export const dynamic = 'force-dynamic';

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex min-h-screen flex-col text-gray-400">
      <Header user={user} />
      <div className="container flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}
