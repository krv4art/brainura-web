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

export type Locale = "en" | "ru" | "uk" | "qa";

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
  ru: { hreflang: "ru", host: "ru.brainura.app", nativeName: "Русский", dateLocale: "ru-RU" },
  // uk: в проде с 13.11.2026 — пока только лендинг (разделы без страниц отдают 404). Страницы — STATUS_uk.md.
  uk: { hreflang: "uk", host: "uk.brainura.app", nativeName: "Українська", dateLocale: "uk-UA" },
  qa: { hreflang: "en-GB", host: "qa.brainura.app", nativeName: "QA", dateLocale: "en-GB", preview: true },
};

export const QA_ENABLED = process.env.SITE_QA_LOCALE === "1";

// Разделы сайта и их адреса по языкам. 🔒 Решение владельца 12.11: названия разделов
// переводятся и несут поисковую фразу (`/testy-dlya-mozga`), внутри сайт по-прежнему
// знает их как tests / games / learn. Править адреса языка — только в SECTION_SLUGS;
// прокси (src/proxy.ts) сам переводит их во внутренние маршруты `[lang]/tests/…`.
export type SectionName = "tests" | "games" | "learn" | "compare";

const EN_SECTIONS: Record<SectionName, string> = { tests: "tests", games: "games", learn: "learn", compare: "compare" };

export const SECTION_SLUGS: Record<Locale, Record<SectionName, string>> = {
  en: EN_SECTIONS,
  // ru: адреса утверждены владельцем 12.11.2026 (тесты для мозга 58 · игры для мозга 503 — точная частота)
  ru: { tests: "testy-dlya-mozga", games: "igry-dlya-mozga", learn: "stati", compare: "sravneniya" },
  // uk: слаги ВРЕМЕННЫЕ (английские) — утвердить по главным ключам хабов на этапе 5 (STATUS_uk.md), до публикации
  uk: EN_SECTIONS,
  // qa: другие слаги, чтобы проверить, что нигде не осталось жёстких «/tests»
  qa: { tests: "testy-qa", games: "igry-qa", learn: "stati-qa", compare: "compare-qa" },
};

/** Путь раздела на языке: sectionPath("ru", "tests") → "/testy-dlya-mozga". */
export function sectionPath(lang: Locale, section: SectionName): string {
  return `/${SECTION_SLUGS[lang][section]}`;
}

/** Раздел по первому сегменту пути на хосте языка (локализованному), иначе null. */
export function sectionFromSegment(lang: Locale, seg: string): SectionName | null {
  for (const k of Object.keys(EN_SECTIONS) as SectionName[]) if (SECTION_SLUGS[lang][k] === seg) return k;
  return null;
}

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
