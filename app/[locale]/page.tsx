import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/messages";
import { isValidLocale } from "@/lib/i18n";

function HeroCard({ label, title }: { label: string; title: string }) {
  return (
    <div className="rounded-[20px] border border-black/12 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%),linear-gradient(180deg,#ece5d8,#e4dccd)] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.06)] md:rounded-[22px] md:p-4">
      <div className="aspect-[2/3] rounded-[15px] border border-black/12 p-3 md:rounded-[16px] md:p-4">
        <div className="flex h-full flex-col">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#5F4959] md:text-[10px]">{label}</p>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-black/14 md:h-16 md:w-16">
              <div className="absolute h-6 w-6 rounded-full border border-black/14 md:h-8 md:w-8" />
              <div className="h-8 w-px bg-black/24 md:h-10" />
            </div>
          </div>
          <h3 className="font-serif text-[18px] leading-[1.05] text-[#171210] md:text-[22px]">{title}</h3>
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
  const welcomeTitle = locale === "tr" ? "Freudstarot’a hoş geldin." : "Welcome to Freudstarot.";
  const welcomeBody =
    locale === "tr"
      ? "Burası kartlara bakmaktan çok, onlarla düşünmek için kuruldu. İstersen bir açılımla başlayabilir, istersen önce desteyi dolaşabilirsin."
      : "This is a place built less for prediction than for reflection through cards. You can begin with a spread, or browse the deck first.";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:px-8 md:pb-20 md:pt-32">
      <section className="grid gap-8 border-b border-black/12 pb-10 md:gap-12 md:pb-16 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5F4959] md:text-[11px]">{t.home.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-[42px] leading-[0.98] text-[#171210] md:text-[78px]">
            {t.home.heroLine1}
            <br />
            {t.home.heroLine2}
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-black/70 md:mt-8 md:text-[17px]">{t.home.body}</p>
          <div className="dream-panel mt-7 max-w-2xl rounded-[24px] p-5 md:mt-8 md:rounded-[28px] md:p-6">
            <p className="font-serif text-[25px] leading-[1.08] text-[#171210] md:text-[28px]">{welcomeTitle}</p>
            <p className="mt-3 text-[15px] leading-[1.8] text-black/68">{welcomeBody}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap md:mt-10 md:gap-4">
            <Link href={`/${locale}/spreads`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#171210] bg-[#171210] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4EFE4] transition hover:bg-[#5F4959] hover:border-[#5F4959]">
              {t.home.primaryCta}
            </Link>
            <Link href={`/${locale}/deck`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/18 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/72 transition hover:border-black/30 hover:text-[#171210]">
              {t.home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <HeroCard label={t.home.cardLabelMajor} title={locale === "tr" ? "Semptom" : "Symptom"} />
            <HeroCard label={t.home.cardLabelRelation} title={locale === "tr" ? "Aktarım" : "Transference"} />
          </div>
          <div className="dream-surface rounded-[24px] p-5 md:rounded-[28px] md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959]">{t.home.howTitle}</p>
            <ol className="mt-5 space-y-5 md:mt-6 md:space-y-6">
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/46">01</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/70">{t.home.step1}</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/46">02</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/70">{t.home.step2}</p>
              </li>
              <li>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/46">03</p>
                <p className="mt-2 text-[15px] leading-[1.75] text-black/70">{t.home.step3}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-10 md:gap-14 md:py-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959]">{t.home.methodEyebrow}</p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.04] text-[#171210] md:text-[38px]">
            {t.home.methodTitle1}
            <br />
            {t.home.methodTitle2}
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.85] text-black/70 md:mt-6 md:leading-[1.9]">{t.home.methodBody}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959]">{t.home.toneEyebrow}</p>
          <div className="mt-4 grid gap-px border border-black/14 bg-black/14">
            {[
              { title: t.home.tone1Title, text: t.home.tone1Body },
              { title: t.home.tone2Title, text: t.home.tone2Body },
              { title: t.home.tone3Title, text: t.home.tone3Body },
            ].map((item) => (
              <div key={item.title} className="bg-[#F1E8DC] p-5 md:p-6">
                <h3 className="font-serif text-[23px] text-[#171210] md:text-[24px]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.8] text-black/68">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/12 pt-10 md:pt-16">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959]">{t.home.beginEyebrow}</p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.04] text-[#171210] md:text-[40px]">{t.home.beginTitle}</h2>
          <p className="mt-5 text-[16px] leading-[1.85] text-black/70">{t.home.beginBody}</p>
          <div className="mt-8">
            <Link href={`/${locale}/spreads`} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5F4959] transition hover:text-[#171210]">
              {t.home.beginLink} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
