import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/messages";
import { isValidLocale } from "@/lib/i18n";

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

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-8">
      <section className="grid gap-12 border-b border-black/6 pb-16 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9B8B6E]">
            {t.home.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[54px] leading-[0.98] text-[#161310] md:text-[78px]">
            {t.home.heroLine1}
            <br />
            {t.home.heroLine2}
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-[1.9] text-black/58">
            {t.home.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={`/${locale}/spreads`} className="inline-flex items-center justify-center rounded-full border border-[#161310] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#161310] transition hover:bg-[#161310] hover:text-[#F4EFE4]">
              {t.home.primaryCta}
            </Link>
            <Link href={`/${locale}/deck`} className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/60 transition hover:border-black/20 hover:text-[#161310]">
              {t.home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="grid grid-cols-2 gap-4">
            <HeroCard label={t.home.cardLabelMajor} title={locale === "tr" ? "Semptom" : "Symptom"} />
            <HeroCard label={t.home.cardLabelRelation} title={locale === "tr" ? "Aktarım" : "Transference"} />
          </div>
          <div className="rounded-[28px] border border-black/8 bg-[#EEE7DB] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{t.home.howTitle}</p>
            <ol className="mt-6 space-y-6">
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">01</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/62">{t.home.step1}</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">02</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/62">{t.home.step2}</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">03</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/62">{t.home.step3}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="grid gap-14 py-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{t.home.methodEyebrow}</p>
          <h2 className="mt-4 font-serif text-[38px] leading-[1.04] text-[#161310]">
            {t.home.methodTitle1}
            <br />
            {t.home.methodTitle2}
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.9] text-black/58">{t.home.methodBody}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{t.home.toneEyebrow}</p>
          <div className="mt-4 grid gap-px border border-black/8 bg-black/8">
            {[
              { title: t.home.tone1Title, text: t.home.tone1Body },
              { title: t.home.tone2Title, text: t.home.tone2Body },
              { title: t.home.tone3Title, text: t.home.tone3Body },
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
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E]">{t.home.beginEyebrow}</p>
          <h2 className="mt-4 font-serif text-[40px] leading-[1.04] text-[#161310]">{t.home.beginTitle}</h2>
          <p className="mt-5 text-[16px] leading-[1.85] text-black/58">{t.home.beginBody}</p>
          <div className="mt-8">
            <Link href={`/${locale}/spreads`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9B8B6E] transition hover:text-[#161310]">
              {t.home.beginLink} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
