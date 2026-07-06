import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="MarkGauge"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex flex-1 flex-col pb-6 lg:pb-8">{children}</div>
      </section>

      <section className="auth-right-section">
        <div className="relative z-10 lg:mb-16 lg:mt-4">
          <blockquote className="auth-blockquote">
            MarkGauge turned my scattered tabs into one calm workspace. The
            alerts actually fire when I need them — not when I remember to
            refresh.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">— Alex M.</cite>
              <p className="text-gray-500 max-md:text-xs">Active trader</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src="/assets/icons/star.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center rounded-xl border border-gray-600 bg-gray-900/50 p-8">
          <p className="max-w-sm text-center text-sm text-gray-500">
            Dashboard preview will appear here after widgets are integrated.
          </p>
        </div>
      </section>
    </main>
  );
}
