import Link from "next/link";
import { notFound } from "next/navigation";
import { cards } from "@/lib/data/cards";
import { isValidLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

function PlaceholderThumb() {
  return (
    <div className="mb-4 aspect-[2/3] overflow-hidden rounded-[18px] border border-black/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%),linear-gradient(180deg,#ece5d8,#e4dccd)] p-4">
      <div className="flex h-full items-center justify-center rounded-[12px] border border-black/8">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-black/10">
          <div className="absolute h-7 w-7 rounded-full border border-black/10" />
          <div className="h-10 w-px bg-black/20" />
        </div>
      </div>
    </div>
  );
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale);
  const categories = Array.from(new Set(cards.map((c) => c.category)));

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-20 md:px-8">
      <div className="mb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{t.deck.eyebrow}</p>
        <h1 className="mt-4 font-serif text-[44px] leading-[1.05] text-[#161310]">{cards.length} {t.deck.titleSuffix}</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-black/55">{t.deck.body}</p>
      </div>
      {categories.map((category) => (
        <div key={category} className="mb-14">
          <p className="mb-6 border-b border-black/8 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">{category}</p>
          <div className="grid grid-cols-2 gap-px border border-black/8 bg-black/8 sm:grid-cols-3 md:grid-cols-4">
            {cards.filter((card) => card.category === category).map((card) => (
              <Link key={card.id} href={`/${locale}/deck/${card.slug}`} className="group bg-[#F4EFE4] p-4 transition-colors duration-300 hover:bg-[#161310] md:p-5">
                <PlaceholderThumb />
                <h3 className="font-serif text-[20px] text-[#161310] group-hover:text-[#F4EFE4]">{card.title}</h3>
                <p className="mt-2 text-[13px] text-black/45 group-hover:text-[#F4EFE4]/60">{card.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
