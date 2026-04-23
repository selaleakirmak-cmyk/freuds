import Link from "next/link";
import { spreads } from "@/lib/data/spreads";

export default function SpreadsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-8">
      <div className="mb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">
          Structures
        </p>
        <h1 className="mt-4 font-serif text-[44px] leading-[1.05] text-[#161310]">
          Choose a spread
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-black/55">
          A spread defines how many cards are drawn and what each position asks.
          Start simple. Depth comes from attention, not complexity.
        </p>
      </div>

      <div className="grid gap-px border border-black/8 bg-black/8 md:grid-cols-2">
        {spreads.map((spread) => (
          <Link
            key={spread.id}
            href={`/reading/${spread.slug}`}
            className="group bg-[#F4EFE4] p-8 transition-colors duration-300 hover:bg-[#161310]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] group-hover:text-[#C4B49A]">
                  {spread.cardCount} card{spread.cardCount > 1 ? "s" : ""} — {spread.estimatedTime}
                </p>
                <h2 className="mt-3 font-serif text-[28px] text-[#161310] group-hover:text-[#F4EFE4]">
                  {spread.title}
                </h2>
              </div>
              {spread.recommended ? (
                <span className="border border-[#9B8B6E] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9B8B6E] group-hover:border-[#C4B49A] group-hover:text-[#C4B49A]">
                  Start
                </span>
              ) : null}
            </div>

            <p className="mt-6 text-[14px] leading-[1.7] text-black/55 group-hover:text-[#F4EFE4]/70">
              {spread.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              {spread.positions.map((pos) => (
                <span
                  key={pos.id}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/30 group-hover:text-[#F4EFE4]/40"
                >
                  {pos.label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
