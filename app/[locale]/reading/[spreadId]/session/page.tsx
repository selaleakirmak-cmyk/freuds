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
import { generateWholeSpreadSynthesis } from "@/lib/synthesis";
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
  const [wholeSpreadText, setWholeSpreadText] = useState("");
  const [isGeneratingWholeSpread, setIsGeneratingWholeSpread] = useState(false);
  const [wholeSpreadError, setWholeSpreadError] = useState("");

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
    return <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:px-8 md:pb-20 md:pt-32"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/52">{t.reading.loading}</p></div>;
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

  function handleWholeSpreadReading() {
    setIsGeneratingWholeSpread(true);
    setWholeSpreadError("");

    try {
      const synthesis = generateWholeSpreadSynthesis(locale, resolved);
      const text = [
        synthesis.title,
        "",
        synthesis.overview,
        "",
        locale === "tr" ? "Dikkat çeken eksenler" : "Notable tensions",
        ...synthesis.notableAxes.map((item) => `• ${item}`),
        "",
        locale === "tr" ? "Düşünmeye açık sorular" : "Questions to stay with",
        ...synthesis.reflectionQuestions.map((item) => `• ${item}`),
      ].join("\n");
      setWholeSpreadText(text);
    } catch {
      setWholeSpreadError(t.reading.wholeSpreadError);
    } finally {
      setIsGeneratingWholeSpread(false);
    }
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
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="mb-7 flex flex-col gap-4 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] md:text-[11px]">{t.reading.sessionEyebrow}</p>
          <h1 className="mt-3 font-serif text-[34px] leading-[1.02] text-[#171210] md:text-[50px]">{spread.title}</h1>
          {resolved.intention ? (
            <p className="mt-4 max-w-2xl text-[15px] italic leading-[1.75] text-black/68">{resolved.intention}</p>
          ) : (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-black/56">{t.reading.openField}</p>
          )}
        </div>
        <div className="w-fit rounded-full border border-black/14 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/56 md:text-[11px]">{statusLabel}</p>
        </div>
      </div>
      {currentSession.phase === "shuffling" ? (
        <div className="grid grid-cols-1 gap-5 md:gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            <ShuffleDeckScene label={t.reading.shuffleDeck} intro={locale === "tr" ? "Deste karıştırılıyor. Açılım birazdan biçim kazanacak." : "The deck is being shuffled. The spread is about to take form."} />
          </section>
          <section>
            <InterpretationPanel activeCard={null} interpretation={null} />
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
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
        <div className="mt-8 space-y-6 md:mt-10 md:space-y-8">
          <div className="dream-panel rounded-[24px] p-5 md:rounded-[28px] md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] md:text-[11px]">{t.reading.wholeSpreadTitle}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.75] text-black/66">{t.reading.wholeSpreadPrompt}</p>
            <div className="mt-5 flex flex-wrap gap-4 md:mt-6">
              <button
                type="button"
                onClick={handleWholeSpreadReading}
                disabled={isGeneratingWholeSpread}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#171210] bg-[#171210] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4EFE4] transition hover:bg-[#5F4959] hover:border-[#5F4959] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {isGeneratingWholeSpread ? t.reading.generatingWholeSpread : t.reading.readWholeSpread}
              </button>
            </div>
            {wholeSpreadError ? <p className="mt-4 text-[14px] leading-[1.7] text-black/60">{wholeSpreadError}</p> : null}
            {wholeSpreadText ? (
              <div className="mt-6 border-t border-black/14 pt-6">
                <div className="max-w-none whitespace-pre-line text-[15px] leading-[1.9] text-black/76">{wholeSpreadText}</div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-5">
            <button type="button" onClick={() => router.push(`/${locale}/spreads`)} className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] hover:text-[#171210] md:text-[11px]">
              {t.reading.returnToSpreads}
            </button>
            <button type="button" onClick={() => router.push(`/${locale}/reading/${spread.slug}`)} className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5F4959] hover:text-[#171210] md:text-[11px]">
              {t.reading.startNew}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
