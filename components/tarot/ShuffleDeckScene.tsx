"use client";

import { motion } from "framer-motion";

type ShuffleDeckSceneProps = {
  label: string;
  intro?: string;
};

function DeckCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "absolute left-1/2 top-1/2 h-[220px] w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-[#F4EDE4]/10 bg-[linear-gradient(180deg,#1D171C,#141012)] shadow-[0_22px_60px_rgba(0,0,0,0.22)]",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0)_48%)]" />
      <div className="absolute inset-4 rounded-[14px] border border-[#F4EDE4]/8" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-px bg-[#F4EFE4]/24" />
      </div>
    </div>
  );
}

export default function ShuffleDeckScene({ label, intro }: ShuffleDeckSceneProps) {
  return (
    <div className="dream-surface rounded-[28px] p-6 md:p-8">
      <div className="mb-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5F4959]">{label}</p>
        {intro ? <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.8] text-black/64">{intro}</p> : null}
      </div>

      <div className="relative mx-auto h-[360px] max-w-[520px] overflow-hidden rounded-[24px] border border-black/12 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.36),rgba(255,255,255,0)_42%),radial-gradient(circle_at_22%_28%,rgba(95,73,89,0.16),rgba(95,73,89,0)_34%),linear-gradient(180deg,#eadfd5,#daccc3)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(23,18,16,0.04),rgba(255,255,255,0)_48%,rgba(95,73,89,0.08))]" />
        <motion.div
          initial={{ x: -26, y: 12, rotate: -8 }}
          animate={{ x: [-26, -70, -18], y: [12, -8, 10], rotate: [-8, -16, -8] }}
          transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <DeckCard />
        </motion.div>

        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: [0, 0, 0], y: [0, 4, 0], rotate: [0, 0, 0] }}
          transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <DeckCard className="z-10" />
        </motion.div>

        <motion.div
          initial={{ x: 26, y: -10, rotate: 8 }}
          animate={{ x: [26, 72, 16], y: [-10, 8, -8], rotate: [8, 16, 8] }}
          transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <DeckCard />
        </motion.div>
      </div>
    </div>
  );
}
