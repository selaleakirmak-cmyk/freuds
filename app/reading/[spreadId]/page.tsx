"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { spreads } from "@/lib/data/spreads";
import { createInitialSessionState, createReading, saveReadingSession } from "@/lib/reading-session";
import { cards } from "@/lib/data/cards";

export default function ReadingSetupPage() {
  const params = useParams<{ spreadId: string }>();
  const router = useRouter();
  const [intention, setIntention] = useState("");

  const spread = useMemo(() => spreads.find((item) => item.slug === params.spreadId), [params.spreadId]);

  if (!spread) {
    notFound();
  }

  function handleBegin() {
    const reading = createReading(spread, cards, intention);
    const initialState = createInitialSessionState(spread.id, intention);

    saveReadingSession({
      ...initialState,
      phase: "drawing",
      reading,
    });

    router.push('/reading/' + spread.slug + '/session');
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-32 md:px-8">
      <div className="rounded-[32px] border border-black/8 bg-[#F4EFE4] px-6 py-8 md:px-10 md:py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9B8B6E]">{spread.estimatedTime ?? 'Reading'}</p>
        <h1 className="mt-4 font-serif text-[42px] leading-[1.02] text-[#161310] md:text-[56px]">{spread.title}</h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-black/58">{spread.description}</p>

        <div className="mt-10 border-t border-black/8 pt-8">
          <label htmlFor="intention" className="block font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">Intention</label>
          <p className="mt-3 max-w-xl text-[14px] leading-[1.7] text-black/45">Istersen kisa bir niyet, soru ya da tasidigin dugumu yaz. Istersen bos birak.</p>
          <textarea
            id="intention"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Bugun neye bakmak istiyorsun?"
            rows={5}
            className="mt-5 w-full resize-none rounded-[20px] border border-black/8 bg-[#EEE7DB] px-5 py-4 text-[16px] leading-[1.7] text-[#161310] outline-none transition focus:border-black/20"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-black/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">Structure</p>
            <p className="mt-2 text-[14px] leading-[1.7] text-black/55">{spread.cardCount} kart acilacak.</p>
          </div>
          <button type="button" onClick={handleBegin} className="inline-flex items-center justify-center rounded-full border border-[#161310] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#161310] transition hover:bg-[#161310] hover:text-[#F4EFE4]">Begin reading</button>
        </div>
      </div>
    </div>
  );
}
