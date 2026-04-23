import { notFound } from "next/navigation";
import Link from "next/link";
import { cards } from "@/lib/data/cards";

export default async function CardPage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = await params;
  const card = cards.find((c) => c.slug === cardId);

  if (!card) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:px-8">
      <Link href="/deck" className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] hover:text-[#161310]">
        ← Back to deck
      </Link>

      <div className="mt-10 grid gap-16 md:grid-cols-2">
        <div>
          <div className="mb-8 flex aspect-[2/3] items-center justify-center bg-[#161310]">
            <div className="h-20 w-px bg-[#F4EFE4]/20" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{card.category}</p>
          <h1 className="mt-2 font-serif text-[40px] text-[#161310]">{card.title}</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            {card.keywords.map((k) => (
              <span key={k} className="border border-black/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                {k}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">Meaning</p>
            <p className="mt-4 text-[16px] leading-[1.8] text-black/70">{card.meaning}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">Reflection</p>
            <ol className="mt-4 space-y-4">
              {card.reflectionQuestions.map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[11px] text-[#9B8B6E]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[15px] leading-[1.7] text-black/65">{q}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
