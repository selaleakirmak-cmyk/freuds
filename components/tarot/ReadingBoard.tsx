"use client";

import type { ReadingPhase, ResolvedReadingCard, Spread } from "@/types/tarot";
import RevealCard from "@/components/tarot/RevealCard";

type Props = {
  spread: Spread;
  cards: ResolvedReadingCard[];
  phase: ReadingPhase;
  activePositionId: string | null;
  nextRevealPositionId: string | null;
  onReveal: (positionId: string) => void;
  onSelect: (positionId: string) => void;
};

export default function ReadingBoard({ spread, cards, phase, activePositionId, nextRevealPositionId, onReveal, onSelect }: Props) {
  const boardUsesCoordinates =
    spread.positions.every((position) => typeof position.x === "number" && typeof position.y === "number") && cards.length > 1;

  function canRevealCard(positionId: string, revealed: boolean) {
    if (revealed) return false;
    if (phase !== "ready_to_reveal" && phase !== "revealing") return false;
    return nextRevealPositionId === positionId;
  }

  const helperText =
    phase === "drawing"
      ? "Preparing"
      : phase === "dealing"
      ? "Laying out the cards"
      : phase === "ready_to_reveal"
      ? "Reveal the first card"
      : phase === "revealing"
      ? nextRevealPositionId
        ? "Reveal the next card"
        : "Sit with the spread"
      : "Return to any revealed card";

  if (boardUsesCoordinates) {
    return (
      <div className="w-full">
        <div className="mb-5"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">{helperText}</p></div>
        <div className="hidden min-h-[540px] rounded-[28px] border border-black/8 bg-[#EEE7DB] p-6 md:block">
          <div className="relative h-[480px] w-full">
            {cards.map((item, index) => (
              <div key={item.position.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}>
                <div className="mb-3 text-center"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">{item.position.label}</p></div>
                <RevealCard
                  card={item.card}
                  position={item.position}
                  revealed={item.revealed}
                  active={activePositionId === item.position.id}
                  phase={phase}
                  index={index}
                  canReveal={canRevealCard(item.position.id, item.revealed)}
                  isNext={nextRevealPositionId === item.position.id}
                  onReveal={() => onReveal(item.position.id)}
                  onSelect={() => onSelect(item.position.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8 md:hidden">
          {cards.map((item, index) => (
            <div key={item.position.id} className="flex flex-col items-center">
              <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">{item.position.label}</p>
              <RevealCard
                card={item.card}
                position={item.position}
                revealed={item.revealed}
                active={activePositionId === item.position.id}
                phase={phase}
                index={index}
                canReveal={canRevealCard(item.position.id, item.revealed)}
                isNext={nextRevealPositionId === item.position.id}
                onReveal={() => onReveal(item.position.id)}
                onSelect={() => onSelect(item.position.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-black/8 bg-[#EEE7DB] p-6">
      <div className="mb-5"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">{helperText}</p></div>
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
        {cards.map((item, index) => (
          <div key={item.position.id} className="flex flex-col items-center">
            <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">{item.position.label}</p>
            <RevealCard
              card={item.card}
              position={item.position}
              revealed={item.revealed}
              active={activePositionId === item.position.id}
              phase={phase}
              index={index}
              canReveal={canRevealCard(item.position.id, item.revealed)}
              isNext={nextRevealPositionId === item.position.id}
              onReveal={() => onReveal(item.position.id)}
              onSelect={() => onSelect(item.position.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
