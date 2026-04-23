import type { Spread } from "@/types/tarot";

export const spreads: Spread[] = [
  {
    id: "single-card",
    slug: "single-card",
    title: "Şimdiki Psişik Tema",
    description:
      "Tek kartlık kısa açılım. Şu anda en etkin olan temayı görünür kılmak için.",
    cardCount: 1,
    recommended: true,
    estimatedTime: "3–5 min",
    positions: [
      {
        id: "present-theme",
        label: "Şu Anda Etkin Olan",
        meaning:
          "Bu pozisyon şu anda görünür olan ya da görünmeden etkide bulunan temel temayı sorar.",
        x: 50,
        y: 50,
      },
    ],
  },
  {
    id: "three-part",
    slug: "three-part",
    title: "Belirti / Çatışma / Açıklık",
    description:
      "Üç kartlık açılım. Yüzeyde görünen örgüyü, alttaki çatışmayı ve çalışılabilir yönü birlikte düşünmek için.",
    cardCount: 3,
    estimatedTime: "8–12 min",
    positions: [
      {
        id: "surface",
        label: "Yüzeyde Görünen",
        meaning:
          "Şu anda ilk bakışta görünen, tanımlanabilen ya da dile gelen örgü burada okunur.",
        x: 20,
        y: 50,
      },
      {
        id: "conflict",
        label: "Alttaki Çatışma",
        meaning:
          "Bu pozisyon görünür yapının altında çalışan gerilimi, ikiliği ya da çelişkiyi sorar.",
        x: 50,
        y: 50,
      },
      {
        id: "opening",
        label: "Çalışılabilir Açıklık",
        meaning:
          "Bu pozisyon çözümü değil; düşünme, işleme ya da dönüşüm için açılabilecek yönü sorar.",
        x: 80,
        y: 50,
      },
    ],
  },
  {
    id: "five-part",
    slug: "five-part",
    title: "İç Harita",
    description:
      "Beş kartlık daha derin açılım. Bilinçte olan, bastırılan, savunma, tekrar eden örüntü ve açılabilir yön birlikte düşünülür.",
    cardCount: 5,
    estimatedTime: "12–18 min",
    positions: [
      {
        id: "conscious",
        label: "Bilinçte Olan",
        meaning:
          "Şu anda tanımlayabildiğin, düşündüğün ya da sahip çıktığın katman burada görünür olur.",
        x: 20,
        y: 28,
      },
      {
        id: "repressed",
        label: "Bastırılan",
        meaning:
          "Bu pozisyon doğrudan düşünülmeyen, uzak tutulan ya da dolaylı yollarla geri dönen katmanı sorar.",
        x: 50,
        y: 28,
      },
      {
        id: "defense",
        label: "Savunma",
        meaning:
          "Burada mesele neyin doğru olduğu değil, psişenin kendini nasıl koruduğudur.",
        x: 80,
        y: 28,
      },
      {
        id: "repetition",
        label: "Tekrar Eden Örüntü",
        meaning:
          "Bu pozisyon çözülememiş olanın nasıl yeniden kurulduğunu ya da sahnelendiğini sorar.",
        x: 35,
        y: 74,
      },
      {
        id: "opening",
        label: "Çalışılabilir Açıklık",
        meaning:
          "Burada çözüm değil; işlenebilir, düşünülebilir ve taşınabilir yeni bir yön aranır.",
        x: 65,
        y: 74,
      },
    ],
  },
];
