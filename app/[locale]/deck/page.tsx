import Link from "next/link";
import { notFound } from "next/navigation";
import { cards } from "@/lib/data/cards";
import { isValidLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import CardArtwork from "@/components/tarot/CardArtwork";

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
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 md:px-8 md:pt-32 md:pb-20">
      <div className="mb-10 md:mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] md:text-[11px]">{t.deck.eyebrow}</p>
        <h1 className="mt-4 font-serif text-[38px] leading-[1.05] text-[#171210] md:text-[44px]">{cards.length} {t.deck.titleSuffix}</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-black/68">{t.deck.body}</p>
      </div>
      {categories.map((category) => (
        <div key={category} className="mb-10 md:mb-14">
          <p className="mb-4 border-b border-black/14 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-black/52 md:mb-6 md:text-[11px]">{category}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-px md:border md:border-black/14 md:bg-black/14">
            {cards.filter((card) => card.category === category).map((card) => (
              <Link key={card.id} href={`/${locale}/deck/${card.slug}`} className="group rounded-[22px] border border-black/12 bg-[#F1E8DC] p-3 transition-colors duration-300 hover:bg-[#171210] md:rounded-none md:border-0 md:p-5">
                <CardArtwork src={card.image} alt={card.title} variant="thumb" />
                <h3 className="font-serif text-[18px] leading-[1.05] text-[#171210] group-hover:text-[#F4EFE4] md:text-[20px]">{card.title}</h3>
                <p className="mt-2 line-clamp-3 text-[12px] leading-[1.5] text-black/60 group-hover:text-[#F4EFE4]/70 md:text-[13px] md:leading-[1.55]">{card.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
