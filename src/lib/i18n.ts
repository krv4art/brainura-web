// Языки сайта (SEO_PLAN §2, шаг 0.3; механизм — docs/growth/seo/SUBDOMAINS.md в репо приложения).
//
// 🔒 Схема URL — ПОДДОМЕНЫ (решение владельца 11.11.2026): английский на brainura.app
// (он же x-default), каждый другой язык — на своём поддомене: `de.brainura.app/tests/…`.
// Адреса brainura.app не переезжают.
//
// Как устроено:
//   • src/proxy.ts: запрос на `<код>.brainura.app/путь` внутри переписывается в
//     `/<код>/путь` → маршруты `src/app/[lang]/…`. Английские маршруты — в `src/app/(en)/`.
//     Прямой заход на `brainura.app/<код>/…` уводится 308 на поддомен (без дублей).
//   • Слаг страницы на языке свой (под ключи языка); языковые версии одной страницы
//     связывает `key` (= английский слаг) → hreflang (src/content/registry.ts).
//   • Строки интерфейса — `Record<Locale, …>` (src/lib/ui.ts и словари инструментов):
//     добавил язык в `Locale` — компилятор перечислит всё, что не переведено.
//
// Добавить язык (подробно — SUBDOMAINS.md):
//   1. код в `Locale` и строка в LOCALES;
//   2. перевести всё, на что ругнётся `npx tsc --noEmit` (UI, словари инструментов);
//   3. контент страниц — src/content/l10n/<код>.ts (по ядру страницы, не построчным переводом);
//   4. `python scripts/seo/add_site_locale.py <код>` в репо приложения: домен в Vercel + DNS.
//
// `qa` — псевдо-язык для проверки механизма: собирается только при SITE_QA_LOCALE=1,
// открывается на `qa.localhost:<порт>`; в проде его нет.

export type Locale = "en" | "qa";

export interface LocaleInfo {
  /** BCP 47 для hreflang и <html lang>. */
  hreflang: string;
  /** Хост языка в проде. */
  host: string;
  /** Название языка на нём самом. */
  nativeName: string;
  /** Локаль для дат (toLocaleDateString). */
  dateLocale: string;
  /** Только для локальной проверки (не собирается в проде). */
  preview?: boolean;
}

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: Record<Locale, LocaleInfo> = {
  en: { hreflang: "en", host: "brainura.app", nativeName: "English", dateLocale: "en-US" },
  qa: { hreflang: "en-GB", host: "qa.brainura.app", nativeName: "QA", dateLocale: "en-GB", preview: true },
};

export const QA_ENABLED = process.env.SITE_QA_LOCALE === "1";

export function isLocale(x: string): x is Locale {
  return Object.prototype.hasOwnProperty.call(LOCALES, x);
}

/** Языки на поддоменах, которые собираются в этой сборке. */
export function subdomainLocales(): Locale[] {
  return (Object.keys(LOCALES) as Locale[]).filter(
    (l) => l !== DEFAULT_LOCALE && (!LOCALES[l].preview || QA_ENABLED),
  );
}

/** Язык по заголовку Host: `de.brainura.app` или `de.localhost:3000` → "de"; иначе null. */
export function localeFromHost(host: string | null): Locale | null {
  if (!host) return null;
  const h = host.toLowerCase().split(":")[0];
  for (const l of subdomainLocales()) {
    if (h === LOCALES[l].host || h === `${l}.localhost`) return l;
  }
  return null;
}

export function absoluteUrl(lang: Locale, path: string): string {
  const clean = !path || path === "/" ? "" : path;
  return `https://${LOCALES[lang].host}${clean}`;
}

/** Версия страницы на языке: путь на его хосте. */
export interface LangVersion {
  lang: Locale;
  path: string;
}

/**
 * `alternates` для metadata: canonical + hreflang всех языковых версий + x-default
 * (английская, если есть). `versions` — из registry.versionsOf(...).
 */
export function alternatesFor(lang: Locale, path: string, versions: LangVersion[] = [{ lang, path }]) {
  const languages: Record<string, string> = {};
  for (const v of versions) languages[LOCALES[v.lang].hreflang] = absoluteUrl(v.lang, v.path);
  const en = versions.find((v) => v.lang === DEFAULT_LOCALE);
  if (en) languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, en.path);
  return { canonical: absoluteUrl(lang, path), languages };
}

/** Совместимость: страница с одинаковым путём на всех языках из списка. */
export function pageAlternates(path: string, lang: Locale, available: Locale[] = ["en"]) {
  return alternatesFor(lang, path, available.map((l) => ({ lang: l, path })));
}
