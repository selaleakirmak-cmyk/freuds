"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { InterpretationBlock, ResolvedReadingCard } from "@/types/tarot";

type InterpretationPanelProps = {
  activeCard: ResolvedReadingCard | null;
  interpretation: InterpretationBlock | null;
};

export default function InterpretationPanel({ activeCard, interpretation }: InterpretationPanelProps) {
  if (!activeCard || !interpretation) {
    return (
      <aside className="dream-panel rounded-[24px] p-6 md:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959]">Interpretation</p>
        <p className="mt-4 max-w-sm text-[15px] leading-[1.75] text-black/62">
          Kartları tek tek aç. Bir kart açıldığında burada o pozisyona ait anlam, kartın teması ve düşünmeyi açan sorular görünecek.
        </p>
      </aside>
    );
  }

  return (
    <aside className="dream-panel rounded-[24px] p-6 md:p-7">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCard.position.id + '-' + activeCard.card.id}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959]">{interpretation.positionLabel}</p>
          <p className="mt-3 text-[14px] leading-[1.7] text-black/64">{interpretation.positionMeaning}</p>

          <div className="mt-7 border-t border-black/12 pt-6">
            <h2 className="font-serif text-[34px] leading-[1.05] text-[#171210]">{interpretation.cardTitle}</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-black/66">{interpretation.cardSummary}</p>
          </div>

          <div className="mt-7 space-y-6">
            <section>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/48">Card meaning</p>
              <p className="mt-3 text-[15px] leading-[1.85] text-black/78">{interpretation.cardMeaning}</p>
            </section>

            <section>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/48">Position-specific synthesis</p>
              <p className="mt-3 text-[15px] leading-[1.85] text-black/78">{interpretation.synthesis}</p>
            </section>

            <section>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/48">Reflection questions</p>
              <ol className="mt-4 space-y-4">
                {interpretation.reflectionQuestions.map((question, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-[2px] font-mono text-[11px] tracking-[0.14em] text-[#5F4959]">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-[15px] leading-[1.75] text-black/74">{question}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
