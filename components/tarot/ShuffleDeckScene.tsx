"use client";

import { motion } from "framer-motion";

type ShuffleDeckSceneProps = {
  label: string;
};

function DeckCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "absolute left-1/2 top-1/2 h-[220px] w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-black/10 bg-[#1A1715] shadow-[0_18px_50px_rgba(0,0,0,0.12)]",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-px bg-[#F4EFE4]/20" />
      </div>
    </div>
  );
}

export default function ShuffleDeckScene({ label }: ShuffleDeckSceneProps) {
  return (
    <div className="rounded-[28px] border border-black/8 bg-[#EEE7DB] p-6 md:p-8">
      <div className="mb-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">
          {label}
        </p>
      </div>

      <div className="relative mx-auto h-[360px] max-w-[520px] overflow-hidden rounded-[24px] border border-black/6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),rgba(255,255,255,0)_58%),linear-gradient(180deg,#efe8dc,#e8e0d2)]">
        <motion.div
          initial={{ x: -26, y: 12, rotate: -8 }}
          animate={{ x: [-26, -70, -18], y: [12, -8, 10], rotate: [-8, -16, -8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <DeckCard />
        </motion.div>

        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: [0, 0, 0], y: [0, 4, 0], rotate: [0, 0, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <DeckCard className="z-10" />
        </motion.div>

        <motion.div
          initial={{ x: 26, y: -10, rotate: 8 }}
          animate={{ x: [26, 72, 16], y: [-10, 8, -8], rotate: [8, 16, 8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <DeckCard />
        </motion.div>
      </div>
    </div>
  );
}
