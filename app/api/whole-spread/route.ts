import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type WholeSpreadRequest = {
  locale: "tr" | "en";
  spreadTitle: string;
  spreadDescription: string;
  intention?: string;
  cards: Array<{
    positionLabel: string;
    positionMeaning: string;
    cardTitle: string;
    cardSummary: string;
    cardMeaning: string;
  }>;
};

function buildInstructions(locale: "tr" | "en") {
  if (locale === "tr") {
    return [
      "Sen Freudstarot için çalışan, dikkatli ve düşünsel bir bütünsel açılım yorumlayıcısısın.",
      "Görevin kartların yerine geçmek değil, tüm açılımı bir bütün olarak sentezlemek.",
      "Kehanet dili kullanma. Kesin hüküm verme. Klinik tanı koyma. Kader dili kullanma.",
      "Dil sakin, editoryal, düşünmeye açan ve psikanalitik çağrışımlara açık olsun.",
      "Şu yapıyla yaz:",
      "1) Kısa bir başlık",
      "2) 2 kısa paragrafla genel bütünsel okuma",
      "3) 'Dikkat çeken eksenler' başlığı altında 3 kısa madde",
      "4) 'Düşünmeye açık sorular' başlığı altında 2 kısa madde",
      "Kart metinlerini birebir tekrar etme; sentez yap.",
    ].join(" ");
  }

  return [
    "You are a careful whole-spread interpreter for Freudstarot.",
    "Your task is not to replace the card meanings but to synthesize the spread as a whole.",
    "Do not use prophetic language. Do not make clinical diagnoses. Do not speak with certainty.",
    "Use a calm, editorial, psychologically literate tone with psychoanalytic sensitivity.",
    "Write in this structure:",
    "1) A short title",
    "2) Two short paragraphs of whole-spread reading",
    "3) A section titled 'Notable tensions' with 3 short bullet points",
    "4) A section titled 'Questions to stay with' with 2 short bullet points",
    "Do not merely repeat each card; synthesize them.",
  ].join(" ");
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const body = (await request.json()) as WholeSpreadRequest;

    if (!body.cards || body.cards.length === 0) {
      return NextResponse.json({ error: "No cards provided" }, { status: 400 });
    }

    const input = [
      `Locale: ${body.locale}`,
      `Spread title: ${body.spreadTitle}`,
      `Spread description: ${body.spreadDescription}`,
      `Intention: ${body.intention || ""}`,
      "Cards:",
      ...body.cards.map(
        (item, index) =>
          `${index + 1}. Position: ${item.positionLabel} | Position meaning: ${item.positionMeaning} | Card: ${item.cardTitle} | Card summary: ${item.cardSummary} | Card meaning: ${item.cardMeaning}`
      ),
    ].join("\n");

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.2",
      instructions: buildInstructions(body.locale),
      input,
      max_output_tokens: 700,
    });

    const text = response.output_text?.trim();

    if (!text) {
      return NextResponse.json({ error: "No output returned" }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
