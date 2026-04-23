export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}
