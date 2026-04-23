"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Card, ReadingPhase, SpreadPosition } from "@/types/tarot";

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
        className={["group relative block w-[150px] sm:w-[170px] md:w-[190px]", "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B8B6E]", !interactive ? "cursor-default" : "cursor-pointer"].join(" ")}
        style={{ perspective: "1400px" }}
      >
        <motion.div animate={{ rotateY: revealed ? 180 : 0 }} transition={{ duration: 0.78, ease: [0.4, 0, 0.2, 1] }} style={{ transformStyle: "preserve-3d" }} className="relative aspect-[2/3]">
          <div className={["absolute inset-0 overflow-hidden rounded-[18px] border bg-[#1A1715] shadow-[0_14px_40px_rgba(0,0,0,0.10)] transition-all duration-300", active ? "ring-1 ring-[#9B8B6E]" : "", canReveal ? "border-[#9B8B6E]/30" : isNext ? "border-white/10" : "border-black/10"].join(" ")} style={{ backfaceVisibility: "hidden" }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 flex items-center justify-center"><div className="h-20 w-px bg-[#F4EFE4]/20" /></div>
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE4]/28">{canReveal && !revealed ? "Reveal" : revealed ? position.label : "Waiting"}</p>
            </div>
          </div>

          <div className={["absolute inset-0 overflow-hidden rounded-[18px] border bg-[#F4EFE4] shadow-[0_14px_40px_rgba(0,0,0,0.08)]", active ? "ring-1 ring-[#9B8B6E]" : "border-black/10"].join(" ")} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(255,255,255,0))]" />
            <div className="relative flex h-full w-full flex-col p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B8B6E]">{card.category}</p>
                {typeof card.number === "number" ? <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">{String(card.number).padStart(2, "0")}</p> : null}
              </div>
              <div className="relative mt-4 flex-1 overflow-hidden rounded-[12px] border border-black/8 bg-[#ECE5D8]">
                {card.image ? <Image src={card.image} alt={card.title} fill sizes="(max-width: 768px) 150px, 190px" className="object-cover" /> : <div className="flex h-full items-center justify-center"><div className="h-16 w-px bg-black/15" /></div>}
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-[22px] leading-[1.05] text-[#161310]">{card.title}</h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-[1.45] text-black/55">{card.summary}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
