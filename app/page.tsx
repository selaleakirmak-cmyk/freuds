import Link from "next/link";

function HeroCard({ label, title }: { label: string; title: string }) {
  return (
    <div className="rounded-[22px] border border-black/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%),linear-gradient(180deg,#ece5d8,#e4dccd)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="aspect-[2/3] rounded-[16px] border border-black/8 p-4">
        <div className="flex h-full flex-col">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9B8B6E]">{label}</p>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-black/10">
              <div className="absolute h-8 w-8 rounded-full border border-black/10" />
              <div className="h-10 w-px bg-black/20" />
            </div>
          </div>
          <h3 className="font-serif text-[22px] leading-[1.05] text-[#161310]">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-8">
      <section className="grid gap-12 border-b border-black/6 pb-16 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9B8B6E]">
            A structured reflection tool
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[54px] leading-[0.98] text-[#161310] md:text-[78px]">
            Not fortune-telling.
            <br />
            A slower way of reading what is already in motion.
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.9] text-black/58">
            Freudstarot is a psychoanalytically-inspired card interface for reflection. You choose a spread, reveal cards one by one, and read them through position, meaning, and tension. The point is not certainty. The point is attention.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/spreads" className="inline-flex items-center justify-center rounded-full border border-[#161310] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#161310] transition hover:bg-[#161310] hover:text-[#F4EFE4]">
              Begin a reading
            </Link>
            <Link href="/deck" className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/60 transition hover:border-black/20 hover:text-[#161310]">
              Browse the deck
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="grid grid-cols-2 gap-4">
            <HeroCard label="Major" title="Semptom" />
            <HeroCard label="Relation" title="Aktarım" />
          </div>
          <div className="rounded-[28px] border border-black/8 bg-[#EEE7DB] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">How it works</p>
            <ol className="mt-6 space-y-6">
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">01</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/62">Choose a spread that matches the scale of your question.</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">02</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/62">Write an intention or leave the field open.</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">03</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/62">Reveal cards one by one and read the spread slowly.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="grid gap-14 py-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">Method</p>
          <h2 className="mt-4 font-serif text-[38px] leading-[1.04] text-[#161310]">
            Cards do not explain you.
            <br />
            They structure a way of looking.
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.9] text-black/58">
            Freudstarot does not aim to predict, diagnose, or resolve. It offers a composed encounter between symbolic material and the question you bring. Spread positions frame the inquiry. Cards introduce a theme. Meaning emerges in relation.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">Tone</p>
          <div className="mt-4 grid gap-px border border-black/8 bg-black/8">
            {[
              {
                title: "Not mystical",
                text: "The interface stays symbolic without becoming occult or theatrical.",
              },
              {
                title: "Not gamified",
                text: "Cards are revealed deliberately, not consumed as fast interaction.",
              },
              {
                title: "Not therapeutic substitution",
                text: "The tool may support reflection, but it does not replace treatment or supervision.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#F4EFE4] p-6">
                <h3 className="font-serif text-[24px] text-[#161310]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.8] text-black/56">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/6 pt-16">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">Begin</p>
          <h2 className="mt-4 font-serif text-[40px] leading-[1.04] text-[#161310]">Start with a simple spread.</h2>
          <p className="mt-5 text-[16px] leading-[1.85] text-black/58">
            The single-card reading is often enough. A strong reading does not depend on many cards. It depends on precision, pacing, and what the question can bear.
          </p>
          <div className="mt-8">
            <Link href="/spreads" className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] transition hover:text-[#161310]">
              Go to spreads →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
