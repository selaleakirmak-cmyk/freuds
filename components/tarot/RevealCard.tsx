"use client";

import { motion } from "framer-motion";
import type { Card, ReadingPhase, SpreadPosition } from "@/types/tarot";
import CardArtwork from "@/components/tarot/CardArtwork";

type Props = {
  card: Card;
  position: SpreadPosition;
  revealed: boolean;
  active: boolean;
  phase: ReadingPhase;
  index?: number;
  canReveal: boolean;
  isNext: boolean;
  onReveal: () => void;
  onSelect: () => void;
};

function canSelect(phase: ReadingPhase, revealed: boolean) {
  return revealed && (phase === "revealing" || phase === "complete");
}

export default function RevealCard({ card, position, revealed, active, phase, index = 0, canReveal, isNext, onReveal, onSelect }: Props) {
  const selectable = canSelect(phase, revealed);
  const interactive = canReveal || selectable;

  const handleClick = () => {
    if (canReveal && !revealed) return onReveal();
    if (selectable) return onSelect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={phase === "dealing" || phase === "ready_to_reveal" || phase === "revealing" || phase === "complete" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.99 }}
      transition={{ duration: 0.72, delay: 0.2 * index, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={!interactive}
        className={["group relative block w-[150px] sm:w-[170px] md:w-[190px]", "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5F4959]", !interactive ? "cursor-default" : "cursor-pointer"].join(" ")}
        style={{ perspective: "1400px" }}
      >
        <motion.div animate={{ rotateY: revealed ? 180 : 0 }} transition={{ duration: 0.78, ease: [0.4, 0, 0.2, 1] }} style={{ transformStyle: "preserve-3d" }} className="relative aspect-[2/3]">
          <div className={["absolute inset-0 overflow-hidden rounded-[18px] border bg-[linear-gradient(180deg,#1D171C,#141012)] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300", active ? "ring-1 ring-[#5F4959]" : "", canReveal ? "border-[#8A7482]/45" : isNext ? "border-[#F4EDE4]/14" : "border-[#F4EDE4]/8"].join(" ")} style={{ backfaceVisibility: "hidden" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0)_45%)]" />
            <div className="absolute inset-4 rounded-[14px] border border-[#F4EDE4]/8" />
            <div className="absolute inset-0 flex items-center justify-center"><div className="h-20 w-px bg-[#F4EFE4]/24" /></div>
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE4]/42">{canReveal && !revealed ? "Reveal" : revealed ? position.label : "Waiting"}</p>
            </div>
          </div>

          <div className={["absolute inset-0 overflow-hidden rounded-[18px] border bg-[linear-gradient(180deg,#F2EBDD,#E3D6CC)] shadow-[0_18px_46px_rgba(0,0,0,0.12)]", active ? "ring-1 ring-[#5F4959]" : "border-black/14"].join(" ")} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),rgba(255,255,255,0)_52%)]" />
            <div className="relative flex h-full w-full flex-col p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5F4959]">{card.category}</p>
                {typeof card.number === "number" ? <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50">{String(card.number).padStart(2, "0")}</p> : null}
              </div>
              <CardArtwork src={card.image} alt={card.title} variant="inline" title={card.title} summary={card.summary} />
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
