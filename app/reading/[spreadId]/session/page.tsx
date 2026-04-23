"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { cards as deck } from "@/lib/data/cards";
import { spreads } from "@/lib/data/spreads";
import ReadingBoard from "@/components/tarot/ReadingBoard";
import InterpretationPanel from "@/components/tarot/InterpretationPanel";
import {
  buildInterpretationBlock,
  getNextUnrevealedPositionId,
  isReadingComplete,
  loadReadingSession,
  resolveReading,
  revealReadingCard,
  saveReadingSession,
} from "@/lib/reading-session";
import type {
  InterpretationBlock,
  ReadingSessionState,
  ResolvedReadingCard,
} from "@/types/tarot";

export default function ReadingSessionPage() {
  const params = useParams<{ spreadId: string }>();
  const router = useRouter();

  const spread = useMemo(() => spreads.find((item) => item.slug === params.spreadId), [params.spreadId]);
  const [session, setSession] = useState<ReadingSessionState | null>(null);

  useEffect(() => {
    if (!spread) return;

    const stored = loadReadingSession();
    if (!stored || !stored.reading || stored.spreadId !== spread.id) {
      router.replace('/reading/' + params.spreadId);
      return;
    }

    const drawingState: ReadingSessionState = { ...stored, phase: "drawing", activePositionId: null };
    setSession(drawingState);
    saveReadingSession(drawingState);

    const drawingTimer = window.setTimeout(() => {
      setSession((prev) => {
        if (!prev) return prev;
        const next = { ...prev, phase: "dealing" as const };
        saveReadingSession(next);
        return next;
      });
    }, 220);

    const dealingTimer = window.setTimeout(() => {
      setSession((prev) => {
        if (!prev) return prev;
        const next = { ...prev, phase: "ready_to_reveal" as const };
        saveReadingSession(next);
        return next;
      });
    }, 1080);

    return () => {
      window.clearTimeout(drawingTimer);
      window.clearTimeout(dealingTimer);
    };
  }, [params.spreadId, router, spread]);

  if (!spread) notFound();

  if (!session || !session.reading) {
    return (
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">Loading session</p>
      </div>
    );
  }

  const resolved = resolveReading(session.reading, spread, deck);
  const nextRevealPositionId = getNextUnrevealedPositionId(session.reading);

  const activeCard: ResolvedReadingCard | null =
    resolved.cards.find((item) => item.position.id === session.activePositionId) ??
    resolved.cards.find((item) => item.position.id === session.lastRevealedPositionId) ??
    null;

  const interpretation: InterpretationBlock | null = activeCard
    ? buildInterpretationBlock(activeCard.position, activeCard.card)
    : null;

  function handleReveal(positionId: string) {
    if (!session.reading) return;
    if (session.phase !== "ready_to_reveal" && session.phase !== "revealing") return;
    if (nextRevealPositionId !== positionId) return;

    const updatedReading = revealReadingCard(session.reading, positionId);
    const completed = isReadingComplete(updatedReading);

    const nextState: ReadingSessionState = {
      ...session,
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

    const nextState: ReadingSessionState = { ...session, activePositionId: positionId };
    setSession(nextState);
    saveReadingSession(nextState);
  }

  const statusLabel =
    session.phase === "drawing"
      ? "Preparing"
      : session.phase === "dealing"
      ? "Laying out the cards"
      : session.phase === "ready_to_reveal"
      ? "Ready to begin"
      : session.phase === "revealing"
      ? nextRevealPositionId
        ? "Reading in progress"
        : "Sit with the spread"
      : "Reading complete";

  const completionNote = session.phase === "complete" ? "Return to any revealed card." : null;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-8">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">Reading session</p>
          <h1 className="mt-3 font-serif text-[38px] leading-[1.02] text-[#161310] md:text-[50px]">{spread.title}</h1>
          {resolved.intention ? (
            <p className="mt-4 max-w-2xl text-[15px] italic leading-[1.75] text-black/52">“{resolved.intention}”</p>
          ) : (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-black/42">The field has been left open.</p>
          )}
        </div>

        <div className="rounded-full border border-black/8 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">{statusLabel}</p>
          {completionNote ? <p className="mt-1 text-[12px] leading-[1.5] text-black/42">{completionNote}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section>
          <ReadingBoard
            spread={spread}
            cards={resolved.cards}
            phase={session.phase}
            activePositionId={session.activePositionId}
            nextRevealPositionId={nextRevealPositionId}
            onReveal={handleReveal}
            onSelect={handleSelect}
          />
        </section>

        <section>
          <InterpretationPanel activeCard={activeCard} interpretation={interpretation} />
        </section>
      </div>

      {session.phase === "complete" ? (
        <div className="mt-10 flex flex-wrap gap-6">
          <button type="button" onClick={() => router.push('/spreads')} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] hover:text-[#161310]">
            Return to spreads
          </button>
          <button type="button" onClick={() => router.push('/reading/' + spread.slug)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] hover:text-[#161310]">
            Start a new reading
          </button>
        </div>
      ) : null}
    </div>
  );
}
