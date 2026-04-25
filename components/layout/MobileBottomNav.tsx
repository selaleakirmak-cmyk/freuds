import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getMessages, messages } from "@/lib/messages";

type Props = {
  locale: Locale;
};

export default function MobileBottomNav({ locale }: Props) {
  const t = getMessages(locale);

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[22px] border border-black/15 bg-[#F1E8DC]/92 px-3 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl md:hidden mobile-bottom-safe">
      <div className="grid grid-cols-3 gap-2 text-center">
        <Link href={`/${locale}`} className="rounded-[16px] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/68 active:bg-black/8">
          Home
        </Link>
        <Link href={`/${locale}/spreads`} className="rounded-[16px] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5F4959] active:bg-black/8">
          {t.nav.spreads}
        </Link>
        <Link href={`/${locale}/deck`} className="rounded-[16px] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/68 active:bg-black/8">
          {t.nav.deck}
        </Link>
      </div>
    </nav>
  );
}
