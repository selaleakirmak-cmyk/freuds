import type { Card } from "@/types/tarot";

export const cards: Card[] = [
  {
    id: "symptom",
    slug: "symptom",
    title: "Semptom",
    category: "major",
    number: 0,
    image: "/cards/majors/major-00.png",
    keywords: ["uzlaşma", "dolaylı ifade", "çatışma", "ikame"],
    summary:
      "Görünürde anlamsız olan şey, bastırılmış bir çatışmanın dolaylı ifadesi olabilir.",
    meaning:
      "Semptom kartı, yalnızca bozulma ya da engel değil; yasaklanmış bir dürtü, savunma ve cezanın aynı anda örgütlendiği bir uzlaşma formasyonunu düşündürür. Burada mesele semptomu hemen ortadan kaldırmak değil, onun neyi taşıdığını duymaktır.",
    reflectionQuestions: [
      "Hayatında tekrar eden ama yalnızca sorun gibi görünen şey ne?",
      "Seni zorlayan bu örüntü aynı zamanda neyi koruyor olabilir?",
      "Ortadan kalkmasını istediğin şey, hangi ihtiyacı dolaylı biçimde sürdürüyor olabilir?",
    ],
    sourceNote: "Freud — symptom as compromise formation",
  },
  {
    id: "repression",
    slug: "repression",
    title: "Bastırma",
    category: "major",
    number: 2,
    image: "/cards/majors/major-02.png",
    keywords: ["dışlama", "yasak", "geri itme", "bilinçdışı"],
    summary:
      "Bazı içerikler kaybolmaz; yalnızca bilinç alanından uzaklaştırılır.",
    meaning:
      "Bastırma kartı, psişik malzemenin yok edilmediğini, yalnızca doğrudan düşünülmesinin zorlaştığını ima eder. Düşünemediğin şey başka yollarla geri dönebilir: duygulanım, davranış, hata, semptom ya da ilişki içinde.",
    reflectionQuestions: [
      "Şu anda doğrudan düşünmekten kaçındığın şey ne olabilir?",
      "Aklında tutamadığın şey başka nerede beliriyor?",
      "Bu içeriğin görünür olması neden zor olabilir?",
    ],
    sourceNote: "Freud — repression",
  },
  {
    id: "transference",
    slug: "transference",
    title: "Aktarım",
    category: "relation",
    image: "/cards/transference.png",
    keywords: ["tekrar", "ilişki", "geçmişin dönüşü", "beklenti"],
    summary:
      "Şimdiki ilişki, daha eski bir ilişkinin duygusal yükünü taşıyor olabilir.",
    meaning:
      "Aktarım kartı, mevcut kişiye verilen tepkinin yalnızca şimdiye ait olmayabileceğini düşündürür. Eski beklentiler, eski korkular ve eski ihtiyaçlar bugünkü ilişkinin içine yerleşmiş olabilir.",
    reflectionQuestions: [
      "Bu kişiden beklediğin şey sana başka kimi hatırlatıyor?",
      "Verdiğin tepkinin bugüne ait olmayan kısmı ne olabilir?",
      "Şu an gerçekten karşındaki kişiye mi, yoksa daha eski bir figüre mi cevap veriyorsun?",
    ],
    sourceNote: "Freud — transference",
  },
  {
    id: "repetition-compulsion",
    slug: "repetition-compulsion",
    title: "Tekrar Zorlantısı",
    category: "major",
    image: "/cards/majors/major-10.png",
    keywords: ["tekrar", "döngü", "çözülmemişlik", "eyleme vurma"],
    summary: "Çözülemeyen şey bazen hatırlanmak yerine yeniden yaşanır.",
    meaning:
      "Tekrar zorlantısı kartı, kişinin acı veren bir örüntüye neden yeniden girdiğini sormaya açılır. Burada tekrar, basit alışkanlık değil; çalışılamamış bir düğümün yeniden sahnelenmesi olabilir.",
    reflectionQuestions: [
      "Hayatında farklı kişilerle ama benzer biçimde tekrar eden şey ne?",
      "Bu tekrarın çözmeye çalıştığı şey ne olabilir?",
      "Hatırlamak yerine yeniden yaşadığın bir örüntü var mı?",
    ],
    sourceNote: "Freud — repetition compulsion",
  },
  {
    id: "anxiety-signal",
    slug: "anxiety-signal",
    title: "Kaygı Sinyali",
    category: "anxiety",
    suit: "anxiety",
    number: 1,
    image: "/cards/anxiety-signal.png",
    keywords: ["tehlike", "uyarı", "hazırlık", "ego"],
    summary:
      "Kaygı her zaman dağılma değil; bazen yaklaşan tehlikenin sinyalidir.",
    meaning:
      "Bu kart kaygıyı yalnızca taşkınlık olarak değil, egonun bir tehlikeyi sezip savunmaları harekete geçirme girişimi olarak düşünmeyi önerir. Burada soru, kaygının neden ortaya çıktığı kadar, neye karşı örgütlendiğidir.",
    reflectionQuestions: [
      "Şu anda seni alarma geçiren şey ne olabilir?",
      "Bu kaygı neyi önlemeye çalışıyor gibi görünüyor?",
      "Kaygının mesajını duyup yine de onun tarafından yutulmadan kalmak mümkün mü?",
    ],
    sourceNote: "Freud — signal anxiety",
  },
  {
    id: "regression",
    slug: "regression",
    title: "Regresyon",
    category: "defense",
    suit: "defense",
    image: "/cards/regression.png",
    keywords: ["geri çekilme", "erken örgütlenme", "korunma", "zorlanma"],
    summary:
      "Şimdiki yük fazla geldiğinde psişe daha eski bir örgütlenmeye dönebilir.",
    meaning:
      "Regresyon kartı, daha ilkel ya da daha erken bir işleyişe dönüşü yalnızca başarısızlık olarak değil, bazen dayanma biçimi olarak ele alır. Ancak bu dönüş aynı zamanda bugünkü karmaşıklığı taşımayı zorlaştırabilir.",
    reflectionQuestions: [
      "Ne zaman daha küçük, daha çaresiz ya da daha bağımlı hissetmeye başlıyorsun?",
      "Bu geri çekiliş seni neden koruyor olabilir?",
      "Bugünkü durumun hangi kısmı taşınması zor geldiği için eski bir yere dönüyorsun?",
    ],
    sourceNote: "Freud — regression",
  },
  {
    id: "sublimation",
    slug: "sublimation",
    title: "Süblimasyon",
    category: "desire",
    suit: "desire",
    image: "/cards/sublimation.png",
    keywords: ["dönüşüm", "yaratma", "dürtü", "biçim verme"],
    summary:
      "Dürtü doğrudan ifade bulamadığında başka bir düzlemde üretkenleşebilir.",
    meaning:
      "Süblimasyon kartı, dürtüsel enerjinin yok olmadığını; yön değiştirerek kültürel, yaratıcı ya da düşünsel bir biçim kazandığını düşündürür. Burada bastırma değil, dönüştürme söz konusudur.",
    reflectionQuestions: [
      "İçindeki hangi enerji doğrudan değil ama dolaylı biçimde üretime dönüşüyor?",
      "Yaratıcılık senin için hangi dürtüsel gerilimi işler hale getiriyor?",
      "Bir baskıyı dağıtmak yerine onu biçimlendirmek mümkün mü?",
    ],
    sourceNote: "Freud — sublimation",
  },
];
