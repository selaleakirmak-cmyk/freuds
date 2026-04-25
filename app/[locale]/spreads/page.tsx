import Link from "next/link";
import { notFound } from "next/navigation";
import { spreads } from "@/lib/data/spreads";
import { isValidLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

export default async function SpreadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="mb-10 md:mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] md:text-[11px]">
          {t.spreads.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-[38px] leading-[1.05] text-[#171210] md:text-[44px]">
          {t.spreads.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-black/68">
          {t.spreads.body}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-px md:border md:border-black/14 md:bg-black/14">
        {spreads.map((spread) => (
          <Link
            key={spread.id}
            href={`/${locale}/reading/${spread.slug}`}
            className="group rounded-[24px] border border-black/12 bg-[#F1E8DC] p-5 transition-colors duration-300 hover:bg-[#171210] md:rounded-none md:border-0 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] group-hover:text-[#D7C6BD] md:text-[11px]">
                  {spread.cardCount} {t.spreads.cardSuffix}
                  {locale === "en" && spread.cardCount > 1 ? "s" : ""} — {spread.estimatedTime}
                </p>
                <h2 className="mt-3 font-serif text-[25px] leading-[1.05] text-[#171210] group-hover:text-[#F4EFE4] md:text-[28px]">
                  {spread.title}
                </h2>
              </div>
              {spread.recommended ? (
                <span className="shrink-0 border border-[#5F4959] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#5F4959] group-hover:border-[#D7C6BD] group-hover:text-[#D7C6BD] md:text-[10px]">
                  {t.spreads.start}
                </span>
              ) : null}
            </div>

            <p className="mt-5 text-[14px] leading-[1.75] text-black/66 group-hover:text-[#F4EFE4]/76 md:mt-6">
              {spread.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 md:mt-6 md:gap-4">
              {spread.positions.map((pos) => (
                <span
                  key={pos.id}
                  className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/48 group-hover:text-[#F4EFE4]/54 md:text-[10px]"
                >
                  {pos.label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
