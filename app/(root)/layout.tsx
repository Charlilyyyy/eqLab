import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col text-gray-400">
      <Header />
      <div className="container flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}
