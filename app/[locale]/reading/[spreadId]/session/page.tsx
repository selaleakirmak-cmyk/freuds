import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

export default async function ReadingSessionRedirectPage({
  params,
}: {
  params: Promise<{ locale: string; spreadId: string }>;
}) {
  const { locale, spreadId } = await params;

  if (!isValidLocale(locale)) {
    redirect("/tr/spreads");
  }

  redirect(`/${locale}/reading/${spreadId}`);
}
