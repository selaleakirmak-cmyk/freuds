import type { Locale } from "@/lib/i18n";
import type { ResolvedReading, ResolvedReadingCard } from "@/types/tarot";

export type WholeSpreadSynthesis = {
  title: string;
  overview: string;
  notableAxes: string[];
  reflectionQuestions: string[];
};

function countKeywords(cards: ResolvedReadingCard[]) {
  const counts = new Map<string, number>();
  for (const item of cards) {
    for (const keyword of item.card.keywords) {
      counts.set(keyword, (counts.get(keyword) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function countCategories(cards: ResolvedReadingCard[]) {
  const counts = new Map<string, number>();
  for (const item of cards) {
    counts.set(item.card.category, (counts.get(item.card.category) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function topKeywords(cards: ResolvedReadingCard[]) {
  return countKeywords(cards)
    .filter(([, count]) => count > 1)
    .slice(0, 3)
    .map(([keyword]) => keyword);
}

function topCategory(cards: ResolvedReadingCard[]) {
  return countCategories(cards)[0]?.[0] || null;
}

function buildTitle(locale: Locale, keywords: string[], category: string | null) {
  const firstKeyword = keywords[0];

  if (locale === "tr") {
    if (firstKeyword) return `${firstKeyword} etrafında dönen bir açılım`;
    if (category) return `${category} ekseninde bir açılım`;
    return "Bütünsel açılım okuması";
  }

  if (firstKeyword) return `A spread turning around ${firstKeyword}`;
  if (category) return `A spread organized around ${category}`;
  return "Whole spread reading";
}

function buildOverview(locale: Locale, reading: ResolvedReading, keywords: string[], category: string | null) {
  const intention = reading.intention?.trim();
  const first = reading.cards[0];
  const last = reading.cards[reading.cards.length - 1];
  const recurring = keywords.length > 0 ? keywords.join(locale === "tr" ? ", " : ", ") : null;

  if (locale === "tr") {
    const intentionLine = intention
      ? `Bu açılım, getirdiğin “${intention}” niyetini doğrudan cevaplamaktan çok, onun etrafında örgütlenen iç düzeni görünür kılıyor.`
      : "Bu açılım, tek tek kartlardan çok, onların birlikte kurduğu iç düzeni görünür kılıyor.";

    const recurringLine = recurring
      ? `Tekrarlayan eksenler özellikle ${recurring} etrafında toplanıyor; bu da sorunun yalnızca yüzeyde değil, daha derindeki bir örgütlenmede çalıştığını düşündürüyor.`
      : category
      ? `Kartların ortak ağırlığı özellikle ${category} alanında toplanıyor; bu da açılımın belirli bir psişik işleve doğru yoğunlaştığını düşündürüyor.`
      : "Kartlar birbirini tekrar etmese de, aynı sorunun farklı yüzlerini yan yana getiriyor.";

    const arcLine = first && last
      ? `Açılımın hareketi ${first.position.label.toLowerCase()} ile ${last.position.label.toLowerCase()} arasında bir geçiş kuruyor; bu da başlangıçtaki malzemenin nasıl taşındığını ve nerede açılabildiğini düşündürmek için önemli.`
      : "Açılım kendi içinde kapalı bir sonuç vermiyor; daha çok çalışılabilir bir düşünme yönü açıyor.";

    return `${intentionLine}

${recurringLine} ${arcLine}`;
  }

  const intentionLine = intention
    ? `Rather than answering your intention — “${intention}” — too quickly, this spread makes visible the inner organization gathering around it.`
    : "Rather than standing as separate cards, this spread begins to read as a single inner arrangement.";

  const recurringLine = recurring
    ? `The most recurrent motifs gather around ${recurring}, suggesting that the question is being carried not only at the surface, but through a deeper pattern of organization.`
    : category
    ? `The cards lean most heavily toward ${category}, which suggests that the spread is concentrating around a particular psychic function.`
    : "Even where the cards differ, they seem to circle the same question from different angles.";

  const arcLine = first && last
    ? `There is also a movement between ${first.position.label.toLowerCase()} and ${last.position.label.toLowerCase()}, which helps the spread feel less like a static picture and more like a shifting internal map.`
    : "The spread does not close the question down so much as open a way of staying with it.";

  return `${intentionLine}

${recurringLine} ${arcLine}`;
}

function buildAxes(locale: Locale, reading: ResolvedReading, keywords: string[], category: string | null) {
  const cards = reading.cards;
  const axes: string[] = [];

  if (keywords.length > 0) {
    axes.push(
      locale === "tr"
        ? `Tekrarlayan tema: ${keywords.join(", ")}. Aynı mesele birkaç kartta farklı yüzleriyle geri dönüyor.`
        : `Recurring motif: ${keywords.join(", ")}. The same issue seems to return in more than one form.`
    );
  }

  if (category) {
    axes.push(
      locale === "tr"
        ? `Baskın ton: ${category}. Açılımın ağırlığı özellikle bu psişik işleve ya da ilişki alanına yığılıyor.`
        : `Dominant tone: ${category}. The spread leans noticeably toward this psychic function or relational field.`
    );
  }

  if (cards.length >= 2) {
    const middle = cards[Math.floor(cards.length / 2)];
    axes.push(
      locale === "tr"
        ? `${cards[0].position.label} ile ${middle.position.label.toLowerCase()} arasında belirgin bir gerilim var; bu da görünen şey ile onu düzenleyen yapı arasındaki farkı düşündürüyor.`
        : `There is a notable tension between ${cards[0].position.label.toLowerCase()} and ${middle.position.label.toLowerCase()}, which suggests a gap between what appears and what organizes it.`
    );
  }

  return axes.slice(0, 3);
}

function buildQuestions(locale: Locale, reading: ResolvedReading, keywords: string[]) {
  const firstKeyword = keywords[0];
  const first = reading.cards[0];
  const last = reading.cards[reading.cards.length - 1];

  if (locale === "tr") {
    return [
      firstKeyword
        ? `${firstKeyword} temasının hayatında tekrar tekrar dönmesi neyi düşünmekten alıkoyuyor olabilir?`
        : "Bu açılımın tekrar tekrar işaret ettiği ama doğrudan söylemediği şey ne olabilir?",
      first && last
        ? `${first.position.label} ile ${last.position.label.toLowerCase()} arasında nasıl bir iç hareket hissediyorsun?`
        : "Bu açılım seni hangi yeni düşünme yönüne çağırıyor?`,"
    ];
  }

  return [
    firstKeyword
      ? `What might the recurring motif of ${firstKeyword} be protecting you from having to think directly?`
      : "What does this spread keep indicating without saying too directly?",
    first && last
      ? `What movement do you notice between ${first.position.label.toLowerCase()} and ${last.position.label.toLowerCase()}?`
      : "What direction of thought is this spread asking you to stay with?"
  ];
}

export function generateWholeSpreadSynthesis(locale: Locale, reading: ResolvedReading): WholeSpreadSynthesis {
  const keywords = topKeywords(reading.cards);
  const category = topCategory(reading.cards);

  return {
    title: buildTitle(locale, keywords, category),
    overview: buildOverview(locale, reading, keywords, category),
    notableAxes: buildAxes(locale, reading, keywords, category),
    reflectionQuestions: buildQuestions(locale, reading, keywords),
  };
}
