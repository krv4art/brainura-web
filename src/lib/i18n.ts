// Каркас языков сайта (SEO_PLAN §2, шаг 0.3).
//
// 🔒 Схема URL: английский — БЕЗ префикса (`/tests/stroop-test`), он же x-default;
// любой другой язык — под префиксом (`/de/tests/<слаг>`). Так существующие адреса
// (`/privacy`, `/support`, ссылки Арены `/d/…`) не переезжают никогда.
//
// Добавить язык: строку в LOCALES → папку `src/app/[lang]/…` с теми же шаблонами
// (generateStaticParams по `publishedLocales()`) → контент страницы на этом языке
// в её реестре (`locales: ["en", "de"]`). Слаги на других языках — свои, под ключи
// языка, а не перевод английских (ключи собираются заново: SEO_PLAN §6, волна 4).

import { SITE_URL } from "./site";

export type Locale = "en";

interface LocaleInfo {
  /** BCP 47 для hreflang и <html lang>. */
  hreflang: string;
  /** Префикс пути: "" у английского. */
  prefix: string;
  /** Название языка на нём самом — для переключателя. */
  nativeName: string;
}

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: Record<Locale, LocaleInfo> = {
  en: { hreflang: "en", prefix: "", nativeName: "English" },
};

/** Путь страницы на языке: ("en", "/tests") → "/tests"; ("de", "/tests") → "/de/tests". */
export function localizedPath(lang: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  const prefix = LOCALES[lang].prefix;
  return (prefix ? `/${prefix}` : "") + clean || "/";
}

export function absoluteUrl(lang: Locale, path: string): string {
  return SITE_URL + localizedPath(lang, path);
}

/**
 * `alternates` для generateMetadata: canonical + hreflang для каждого языка, на
 * котором страница существует, + x-default (английская версия).
 * Пример: pageAlternates("/tests/stroop-test", "en", ["en"]).
 */
export function pageAlternates(path: string, lang: Locale, available: Locale[] = ["en"]) {
  const languages: Record<string, string> = {};
  for (const l of available) languages[LOCALES[l].hreflang] = absoluteUrl(l, path);
  if (available.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, path);
  }
  return { canonical: absoluteUrl(lang, path), languages };
}
