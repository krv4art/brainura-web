// Контент страниц на языках поддоменов. Один файл на язык: src/content/l10n/<код>.ts.
//
// Правила (docs/growth/seo/SUBDOMAINS.md в репо приложения):
//   • страница языка пишется по ЯДРУ страницы (docs/growth/seo/pages/<раздел>/<slug>.<код>.md),
//     а не построчным переводом английской: свой главный ключ, свой title/H1/слаг;
//   • `key` = английский слаг — по нему строится hreflang между версиями;
//   • факты и источники — те же, что в английской версии; нормы, зависящие от языка
//     (скорость чтения, слова-цвета Струпа), — из источника по этому языку;
//   • вручную, по одному языку за сессию (CLAUDE.md, правила локализации).

import type { FaqItem, Source } from "@/components/seo/parts";
import type { BlockSection } from "@/components/seo/blocks";
import type { Locale } from "@/lib/i18n";
import type { Article } from "../articles";
import type { GamePageContent } from "../games";
import { QA } from "./qa";
import { RU } from "./ru";
import { UK } from "./uk";

/** Инструменты в браузере — у каждого свой словарь строк по языкам. */
export type ToolKey = "memory-test" | "reading-speed-test" | "reaction-time-test" | "schulte-table" | "stroop-test";

export interface TestPageContent {
  key: ToolKey;
  slug: string;
  name: string;
  blurb: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: BlockSection[];
  faq: FaqItem[];
  sources: Source[];
  download: { title: string; body: string };
  updated: string;
}

export interface LocalizedGame {
  /** = слаг английской страницы игры. */
  key: string;
  slug: string;
  /** Имя игры — как в переводах приложения (exercise_names). */
  name: string;
  blurb: string;
  page: GamePageContent;
}

export interface LocaleContent {
  tests: TestPageContent[];
  games: LocalizedGame[];
  articles: Article[];
}

export const L10N: Partial<Record<Locale, LocaleContent>> = {
  ru: RU,
  uk: UK,
  qa: QA,
};
