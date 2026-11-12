// Реестр SEO-страниц: из него строятся хабы, «связанные», sitemap и hreflang.
// Новая английская страница = запись здесь + папка роута в src/app/(en)/. Языковые
// версии — src/content/l10n/<код>.ts. Карта страниц с кластерами и статусами —
// docs/growth/seo/page_map.md, ядро каждой страницы — docs/growth/seo/pages/ (репо приложения).

import { DEFAULT_LOCALE, sectionPath, subdomainLocales, type LangVersion, type Locale } from "@/lib/i18n";
import { GAME_PAGES } from "./games";
import { ARTICLES_ALL } from "./articles";
import { TESTS_EN } from "./tests";
import { L10N } from "./l10n";
import { landingFor } from "./landing";

export interface PageEntry {
  /** Общий ключ языковых версий страницы (= английский слаг). */
  key: string;
  /** Слаг на этом языке (под ключи языка). */
  slug: string;
  /** Короткое имя для карточек и хлебных крошек. */
  name: string;
  /** Одна строка для карточки в хабе. */
  blurb: string;
  /** Дата последней содержательной правки (sitemap lastmod). */
  updated: string;
}

// Тесты — из их контента (src/content/tests.ts).
export const TESTS: PageEntry[] = TESTS_EN.map((t) => ({
  key: t.key,
  slug: t.slug,
  name: t.name,
  blurb: t.blurb,
  updated: t.updated,
}));

// Игры с готовой страницей (контент — src/content/games.ts).
export const GAMES: PageEntry[] = GAME_PAGES().map((g) => ({
  key: g.slug,
  slug: g.slug,
  name: g.name,
  blurb: g.blurb,
  updated: g.page!.updated,
}));
export const ARTICLES: PageEntry[] = ARTICLES_ALL.map((a) => ({
  key: a.key ?? a.slug,
  slug: a.slug,
  name: a.name,
  blurb: a.blurb,
  updated: a.updated ?? a.published,
}));
export const COMPARISONS: PageEntry[] = [];

export const SECTIONS = {
  tests: { path: "/tests", name: "Tests", pages: TESTS },
  games: { path: "/games", name: "Games", pages: GAMES },
  learn: { path: "/learn", name: "Learn", pages: ARTICLES },
  compare: { path: "/compare", name: "Compare", pages: COMPARISONS },
} as const;

export type SectionKey = keyof typeof SECTIONS;

/** Страницы раздела на языке. */
export function pagesOf(section: SectionKey, lang: Locale): PageEntry[] {
  if (lang === DEFAULT_LOCALE) return SECTIONS[section].pages as PageEntry[];
  const c = L10N[lang];
  if (!c) return [];
  switch (section) {
    case "tests":
      return c.tests.map((t) => ({ key: t.key, slug: t.slug, name: t.name, blurb: t.blurb, updated: t.updated }));
    case "games":
      return c.games.map((g) => ({ key: g.key, slug: g.slug, name: g.name, blurb: g.blurb, updated: g.page.updated }));
    case "learn":
      return c.articles.map((a) => ({ key: a.key ?? a.slug, slug: a.slug, name: a.name, blurb: a.blurb, updated: a.updated ?? a.published }));
    case "compare":
      return [];
  }
}

/** Языки, которые собираются в этой сборке: английский + поддомены. */
export function builtLocales(): Locale[] {
  return [DEFAULT_LOCALE, ...subdomainLocales()];
}

/** Все языковые версии страницы с ключом `key` (для hreflang). */
export function versionsOf(section: SectionKey, key: string): LangVersion[] {
  const out: LangVersion[] = [];
  for (const lang of builtLocales()) {
    const p = pagesOf(section, lang).find((x) => x.key === key);
    if (p) out.push({ lang, path: `${sectionPath(lang, section)}/${p.slug}` });
  }
  return out;
}

/** Версии хаба раздела: язык, у которого в разделе есть хотя бы одна страница. */
export function hubVersions(section: SectionKey): LangVersion[] {
  return builtLocales()
    .filter((l) => pagesOf(section, l).length > 0)
    .map((lang) => ({ lang, path: sectionPath(lang, section) }));
}

/** Версии главной: языки, у которых есть лендинг (для hreflang brainura.app/ ↔ <код>.brainura.app/). */
export function homeVersions(): LangVersion[] {
  return builtLocales()
    .filter((l) => l !== "qa" && landingFor(l))
    .map((lang) => ({ lang, path: "/" }));
}

/** Какие разделы есть на языке — для шапки и подвала. */
export function sectionsAvailable(lang: Locale) {
  return {
    games: pagesOf("games", lang).length > 0,
    tests: pagesOf("tests", lang).length > 0,
    learn: pagesOf("learn", lang).length > 0,
  };
}

export function entry(section: SectionKey, slug: string): PageEntry {
  const e = (SECTIONS[section].pages as PageEntry[]).find((p) => p.slug === slug);
  if (!e) throw new Error(`Нет страницы ${section}/${slug} в реестре`);
  return e;
}

/** «Попробуйте ещё» — остальные страницы раздела на языке. */
export function siblings(section: SectionKey, key: string, lang: Locale = DEFAULT_LOCALE) {
  return pagesOf(section, lang)
    .filter((p) => p.key !== key)
    .map((p) => ({ href: `${sectionPath(lang, section)}/${p.slug}`, title: p.name, body: p.blurb }));
}
