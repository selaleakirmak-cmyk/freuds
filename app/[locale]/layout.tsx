import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/messages";
import { getOtherLocale, isValidLocale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale);
  const otherLocale = getOtherLocale(locale);

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/6 bg-[#F4EFE4]/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
          <Link href={`/${locale}`} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#161310] transition hover:text-[#9B8B6E]">
            Freudstarot
          </Link>
          <nav className="flex items-center gap-6">
            <Link href={`/${locale}/spreads`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/55 transition hover:text-[#161310]">
              {t.nav.spreads}
            </Link>
            <Link href={`/${locale}/deck`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/55 transition hover:text-[#161310]">
              {t.nav.deck}
            </Link>
            <Link href={`/${otherLocale}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] transition hover:text-[#161310]">
              {t.nav.switchLabel}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-black/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/38">
            {t.footer.line1}
          </p>
          <p className="text-[13px] leading-[1.6] text-black/42">
            {t.footer.line2}
          </p>
        </div>
      </footer>
    </div>
  );
}
