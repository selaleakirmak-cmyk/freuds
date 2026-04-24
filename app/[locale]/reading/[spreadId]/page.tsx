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
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-32 md:px-8">
      <div className="rounded-[32px] border border-black/8 bg-[#F4EFE4] px-6 py-8 md:px-10 md:py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9B8B6E]">{currentSpread.estimatedTime ?? "Reading"}</p>
        <h1 className="mt-4 font-serif text-[42px] leading-[1.02] text-[#161310] md:text-[56px]">{currentSpread.title}</h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-black/58">{currentSpread.description}</p>

        <div className="mt-8 rounded-[24px] border border-black/8 bg-[#EEE7DB] p-5 md:p-6">
          <p className="text-[15px] leading-[1.85] text-black/58">{setupIntro}</p>
        </div>

        <div className="mt-10 border-t border-black/8 pt-8">
          <label htmlFor="intention" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">{t.reading.setupEyebrow}</label>
          <p className="mt-3 max-w-xl text-[14px] leading-[1.7] text-black/45">{t.reading.setupPrompt}</p>
          <textarea
            id="intention"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder={t.reading.setupPlaceholder}
            rows={5}
            className="mt-5 w-full resize-none rounded-[20px] border border-black/8 bg-[#EEE7DB] px-5 py-4 text-[16px] leading-[1.7] text-[#161310] outline-none transition focus:border-black/20"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-black/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">{t.reading.structure}</p>
            <p className="mt-2 text-[14px] leading-[1.7] text-black/55">{currentSpread.cardCount} {locale === "tr" ? "kart açılacak." : currentSpread.cardCount === 1 ? "card will be drawn." : "cards will be drawn."}</p>
          </div>
          <button type="button" onClick={handleBegin} className="inline-flex items-center justify-center rounded-full border border-[#161310] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#161310] transition hover:bg-[#161310] hover:text-[#F4EFE4]">{t.reading.begin}</button>
        </div>
      </div>
    </div>
  );
}
