"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { cards as deck } from "@/lib/data/cards";
import { spreads } from "@/lib/data/spreads";
import ReadingBoard from "@/components/tarot/ReadingBoard";
import InterpretationPanel from "@/components/tarot/InterpretationPanel";
import ShuffleDeckScene from "@/components/tarot/ShuffleDeckScene";
import {
  buildInterpretationBlock,
  getNextUnrevealedPositionId,
  isReadingComplete,
  loadReadingSession,
  resolveReading,
  revealReadingCard,
  saveReadingSession,
} from "@/lib/reading-session";
import type { InterpretationBlock, ReadingSessionState, ResolvedReadingCard } from "@/types/tarot";
import { getMessages } from "@/lib/messages";
import { isValidLocale } from "@/lib/i18n";

export default function ReadingSessionPage() {
  const params = useParams<{ locale: string; spreadId: string }>();
  const router = useRouter();
  const locale = params.locale;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale);
  const spread = useMemo(() => spreads.find((item) => item.slug === params.spreadId), [params.spreadId]);
  const [session, setSession] = useState<ReadingSessionState | null>(null);

  useEffect(() => {
    if (!spread) return;
    const stored = loadReadingSession();
    if (!stored || !stored.reading || stored.spreadId !== spread.id) {
      router.replace(`/${locale}/reading/${params.spreadId}`);
      return;
    }

    const shufflingState: ReadingSessionState = { ...stored, phase: "shuffling" };
    setSession(shufflingState);
    saveReadingSession(shufflingState);

    const shuffleTimer = window.setTimeout(() => {
      setSession((prev) => {
        if (!prev) return prev;
        const next = { ...prev, phase: "dealing" as const };
        saveReadingSession(next);
        return next;
      });
    }, 1200);

    const dealingTimer = window.setTimeout(() => {
      setSession((prev) => {
        if (!prev) return prev;
        const next = { ...prev, phase: "ready_to_reveal" as const };
        saveReadingSession(next);
        return next;
      });
    }, 2150);

    return () => {
      window.clearTimeout(shuffleTimer);
      window.clearTimeout(dealingTimer);
    };
  }, [locale, params.spreadId, router, spread]);

  if (!spread) notFound();
  if (session === null || session.reading === null) {
    return <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-8"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">{t.reading.loading}</p></div>;
  }

  const currentSession: ReadingSessionState = session;
  const reading = currentSession.reading;
  const resolved = resolveReading(reading, spread, deck);
  const nextRevealPositionId = getNextUnrevealedPositionId(reading);
  const activeCard: ResolvedReadingCard | null =
    resolved.cards.find((item) => item.position.id === currentSession.activePositionId) ??
    resolved.cards.find((item) => item.position.id === currentSession.lastRevealedPositionId) ??
    null;
  const interpretation: InterpretationBlock | null = activeCard ? buildInterpretationBlock(activeCard.position, activeCard.card) : null;

  function handleReveal(positionId: string) {
    if (currentSession.phase !== "ready_to_reveal" && currentSession.phase !== "revealing") return;
    if (nextRevealPositionId !== positionId) return;
    const updatedReading = revealReadingCard(reading, positionId);
    const completed = isReadingComplete(updatedReading);
    const nextState: ReadingSessionState = {
      ...currentSession,
      reading: updatedReading,
      activePositionId: positionId,
      lastRevealedPositionId: positionId,
      phase: completed ? "complete" : "revealing",
    };
    setSession(nextState);
    saveReadingSession(nextState);
  }

  function handleSelect(positionId: string) {
    const selected = resolved.cards.find((item) => item.position.id === positionId && item.revealed);
    if (!selected) return;
    const nextState: ReadingSessionState = { ...currentSession, activePositionId: positionId };
    setSession(nextState);
    saveReadingSession(nextState);
  }

  const statusLabel =
    currentSession.phase === "shuffling"
      ? t.reading.shuffling
      : currentSession.phase === "ready_to_reveal"
      ? t.reading.ready
      : currentSession.phase === "revealing"
      ? nextRevealPositionId ? t.reading.inProgress : t.reading.sitWithSpread
      : currentSession.phase === "complete"
      ? t.reading.complete
      : t.reading.loading;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-8">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{t.reading.sessionEyebrow}</p>
          <h1 className="mt-3 font-serif text-[38px] leading-[1.02] text-[#161310] md:text-[50px]">{spread.title}</h1>
          {resolved.intention ? (
            <p className="mt-4 max-w-2xl text-[15px] italic leading-[1.75] text-black/52">{resolved.intention}</p>
          ) : (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-black/42">{t.reading.openField}</p>
          )}
        </div>
        <div className="rounded-full border border-black/8 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">{statusLabel}</p>
        </div>
      </div>
      {currentSession.phase === "shuffling" ? (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            <ShuffleDeckScene label={t.reading.shuffleDeck} />
          </section>
          <section>
            <InterpretationPanel activeCard={null} interpretation={null} />
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            <ReadingBoard
              spread={spread}
              cards={resolved.cards}
              phase={currentSession.phase}
              activePositionId={currentSession.activePositionId}
              nextRevealPositionId={nextRevealPositionId}
              onReveal={handleReveal}
              onSelect={handleSelect}
            />
          </section>
          <section>
            <InterpretationPanel activeCard={activeCard} interpretation={interpretation} />
          </section>
        </div>
      )}
      {currentSession.phase === "complete" ? (
        <div className="mt-10 flex flex-wrap gap-6">
          <button type="button" onClick={() => router.push(`/${locale}/spreads`)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] hover:text-[#161310]">
            {t.reading.returnToSpreads}
          </button>
          <button type="button" onClick={() => router.push(`/${locale}/reading/${spread.slug}`)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] hover:text-[#161310]">
            {t.reading.startNew}
          </button>
        </div>
      ) : null}
    </div>
  );
}
