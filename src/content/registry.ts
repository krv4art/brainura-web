// Реестр SEO-страниц: из него строятся хабы, «связанные», sitemap.
// Новая страница = запись здесь + папка роута. Карта страниц с кластерами и
// статусами — docs/growth/seo/page_map.md в репозитории приложения.

import type { Locale } from "@/lib/i18n";
import { GAME_PAGES } from "./games";
import { ARTICLES_ALL } from "./articles";

export interface PageEntry {
  slug: string;
  /** Короткое имя для карточек и хлебных крошек. */
  name: string;
  /** Одна строка для карточки в хабе. */
  blurb: string;
  /** Языки, на которых страница есть (для hreflang и sitemap). */
  locales: Locale[];
  /** Дата последней содержательной правки (sitemap lastmod). */
  updated: string;
}

export const TESTS: PageEntry[] = [
  {
    slug: "reaction-time-test",
    name: "Reaction Time Test",
    blurb: "Click when the screen turns green. Five tries, average in milliseconds.",
    locales: ["en"],
    updated: "2026-11-11",
  },
  {
    slug: "schulte-table",
    name: "Schulte Table",
    blurb: "Find the numbers 1 to 25 in order. A classic attention and visual search drill.",
    locales: ["en"],
    updated: "2026-11-11",
  },
  {
    slug: "stroop-test",
    name: "Stroop Test",
    blurb: "Name the ink color, not the word. Measure your own Stroop effect.",
    locales: ["en"],
    updated: "2026-11-11",
  },
];

// Игры с готовой страницей (контент — src/content/games.ts).
export const GAMES: PageEntry[] = GAME_PAGES().map((g) => ({
  slug: g.slug,
  name: g.name,
  blurb: g.blurb,
  locales: ["en"],
  updated: g.page!.updated,
}));
export const ARTICLES: PageEntry[] = ARTICLES_ALL.map((a) => ({
  slug: a.slug,
  name: a.name,
  blurb: a.blurb,
  locales: ["en"],
  updated: a.updated ?? a.published,
}));
export const COMPARISONS: PageEntry[] = [];

export const SECTIONS = {
  tests: { path: "/tests", name: "Tests", pages: TESTS },
  games: { path: "/games", name: "Games", pages: GAMES },
  learn: { path: "/learn", name: "Learn", pages: ARTICLES },
  compare: { path: "/compare", name: "Compare", pages: COMPARISONS },
} as const;

export function entry(section: keyof typeof SECTIONS, slug: string): PageEntry {
  const e = (SECTIONS[section].pages as PageEntry[]).find((p) => p.slug === slug);
  if (!e) throw new Error(`Нет страницы ${section}/${slug} в реестре`);
  return e;
}

/** «Попробуйте ещё» — остальные страницы раздела. */
export function siblings(section: keyof typeof SECTIONS, slug: string) {
  const s = SECTIONS[section];
  return (s.pages as PageEntry[])
    .filter((p) => p.slug !== slug)
    .map((p) => ({ href: `${s.path}/${p.slug}`, title: p.name, body: p.blurb }));
}
