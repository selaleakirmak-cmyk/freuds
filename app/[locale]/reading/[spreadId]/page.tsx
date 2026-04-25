"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { spreads } from "@/lib/data/spreads";
import { createInitialSessionState, createReading, saveReadingSession } from "@/lib/reading-session";
import { cards } from "@/lib/data/cards";
import { getMessages } from "@/lib/messages";
import { isValidLocale } from "@/lib/i18n";

export default function ReadingSetupPage() {
  const params = useParams<{ locale: string; spreadId: string }>();
  const router = useRouter();
  const [intention, setIntention] = useState("");

  const locale = params.locale;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale);
  const spread = useMemo(() => spreads.find((item) => item.slug === params.spreadId), [params.spreadId]);

  if (!spread) {
    notFound();
  }

  const currentSpread = spread;
  const setupIntro =
    locale === "tr"
      ? "Bir soru, bir düğüm ya da yalnızca bir yön duygusu yeterli. Burada amaç kesin bir cevap değil, bakmanın biçimini kurmak."
      : "A question, a knot, or even a faint sense of direction is enough. The aim here is not certainty, but a way of looking.";

  function handleBegin() {
    const reading = createReading(currentSpread, cards, intention);
    const initialState = createInitialSessionState(currentSpread.id, intention);

    saveReadingSession({
      ...initialState,
      phase: "drawing",
      reading,
    });

    router.push(`/${locale}/reading/${currentSpread.slug}/session`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="dream-panel rounded-[28px] px-5 py-7 md:rounded-[32px] md:px-10 md:py-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5F4959] md:text-[11px]">{currentSpread.estimatedTime ?? "Reading"}</p>
        <h1 className="mt-4 font-serif text-[36px] leading-[1.02] text-[#171210] md:text-[56px]">{currentSpread.title}</h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-black/68 md:text-[16px]">{currentSpread.description}</p>

        <div className="dream-surface mt-7 rounded-[22px] p-5 md:mt-8 md:rounded-[24px] md:p-6">
          <p className="text-[15px] leading-[1.85] text-black/70">{setupIntro}</p>
        </div>

        <div className="mt-8 border-t border-black/14 pt-7 md:mt-10 md:pt-8">
          <label htmlFor="intention" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-black/52 md:text-[11px]">{t.reading.setupEyebrow}</label>
          <p className="mt-3 max-w-xl text-[14px] leading-[1.7] text-black/60">{t.reading.setupPrompt}</p>
          <textarea
            id="intention"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder={t.reading.setupPlaceholder}
            rows={5}
            className="mt-5 w-full resize-none rounded-[20px] border border-black/14 bg-[#E8DDD3] px-5 py-4 text-[16px] leading-[1.7] text-[#171210] outline-none transition placeholder:text-black/34 focus:border-[#5F4959]/45"
          />
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-black/14 pt-7 sm:flex-row sm:items-center sm:justify-between md:mt-10 md:pt-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/52 md:text-[11px]">{t.reading.structure}</p>
            <p className="mt-2 text-[14px] leading-[1.7] text-black/66">{currentSpread.cardCount} {locale === "tr" ? "kart açılacak." : currentSpread.cardCount === 1 ? "card will be drawn." : "cards will be drawn."}</p>
          </div>
          <button type="button" onClick={handleBegin} className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#171210] bg-[#171210] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4EFE4] transition hover:bg-[#5F4959] hover:border-[#5F4959] sm:w-auto">{t.reading.begin}</button>
        </div>
      </div>
    </div>
  );
}
