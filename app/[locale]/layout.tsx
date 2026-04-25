import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/messages";
import { getOtherLocale, isValidLocale } from "@/lib/i18n";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

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
    <div className="relative flex min-h-screen flex-col pb-24 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/15 bg-[#F1E8DC]/92 backdrop-blur-md mobile-top-safe">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
          <Link href={`/${locale}`} className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#171210] transition hover:text-[#5F4959]">
            Freudstarot
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href={`/${locale}/spreads`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/70 transition hover:text-[#171210]">
              {t.nav.spreads}
            </Link>
            <Link href={`/${locale}/deck`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/70 transition hover:text-[#171210]">
              {t.nav.deck}
            </Link>
            <Link href={`/${otherLocale}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959] transition hover:text-[#171210]">
              {t.nav.switchLabel}
            </Link>
          </nav>
          <Link href={`/${otherLocale}`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959] md:hidden">
            {t.nav.switchLabel}
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
      <MobileBottomNav locale={locale} />

      <footer className="hidden border-t border-black/15 md:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/54">
            {t.footer.line1}
          </p>
          <p className="text-[13px] leading-[1.6] text-black/58">
            {t.footer.line2}
          </p>
        </div>
      </footer>
    </div>
  );
}
