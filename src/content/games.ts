// Игры приложения для раздела /games (SEO_PLAN §6, волна 2).
//
// Источник правды — репозиторий приложения: имена из `name:` в
// lib/models/brain_training/exercise_metadata_table.dart, доступ из `isPremiumOnly`,
// состав прода из lib/config/feature_flags.dart. Здесь — только игры в проде.
// Страница игры появляется, когда у записи есть `page` (порядок — по спросу из
// docs/growth/seo/page_map.md); остальные видны в хабе карточкой без ссылки.

import type { FaqItem, Source } from "@/components/seo/parts";
import { GAME_PAGE_CONTENT } from "./game-pages";

export type Skill = "Memory" | "Attention" | "Speed" | "Logic" | "Language" | "Emotions";

export interface GamePageContent {
  /** <title>, ≤ 60 символов, с главным ключом кластера. */
  title: string;
  /** meta description, ≤ 155. */
  description: string;
  h1: string;
  lead: string;
  /** Главный кластер и соседние фразы — для карты страниц. */
  cluster: string;
  howToPlay: string[];
  /** Тело: разделы H2 с абзацами. Абзац — обычный текст. */
  sections: { h2: string; paragraphs: string[] }[];
  faq: FaqItem[];
  sources?: Source[];
  /** Слаги тестов /tests/*, на которые сослаться. */
  tests?: string[];
  updated: string;
}

export interface Game {
  slug: string;
  /** Имя в приложении (как в сторе). */
  name: string;
  premium: boolean;
  skills: Skill[];
  blurb: string;
  page?: GamePageContent;
  /** Своей страницы нет, но есть подходящая: тест в браузере или страница соседней игры. */
  seeAlso?: string;
}

export const GAMES_ALL: Game[] = [
  { slug: "stroop", seeAlso: "/tests/stroop-test", name: "Stroop Test", premium: false, skills: ["Attention", "Speed"], blurb: "Pick the ink color, not the word." },
  { slug: "card-match", name: "Card Match", premium: false, skills: ["Memory"], blurb: "Flip cards and find every matching pair." },
  { slug: "quick-math", name: "Quick Math", premium: false, skills: ["Speed", "Logic"], blurb: "Mental arithmetic against the clock." },
  { slug: "sudoku", name: "Sudoku", premium: false, skills: ["Logic"], blurb: "The classic 9×9 number puzzle." },
  { slug: "schulte-tables", seeAlso: "/tests/schulte-table", name: "Schulte Tables", premium: false, skills: ["Attention", "Speed"], blurb: "Find the numbers in order, eyes on the center." },
  { slug: "mind-matrix", name: "Mind Matrix", premium: false, skills: ["Memory"], blurb: "Remember where the objects were in the grid." },
  { slug: "word-groups", name: "Word Groups", premium: false, skills: ["Language", "Logic"], blurb: "Sort a board of words into hidden groups." },
  { slug: "anagrams", name: "Anagrams", premium: false, skills: ["Language"], blurb: "Unscramble the letters into a word." },
  { slug: "fly", name: "Fly", premium: false, skills: ["Memory", "Attention"], blurb: "Track an invisible fly and say where it landed." },
  { slug: "merge-numbers", name: "Merge Numbers", premium: false, skills: ["Logic"], blurb: "Slide tiles, merge equal numbers, climb high." },
  { slug: "reflex", seeAlso: "/tests/reaction-time-test", name: "Reflex", premium: false, skills: ["Speed"], blurb: "Tap the instant the screen turns green." },
  { slug: "line-tracing", name: "Line Tracing", premium: false, skills: ["Attention"], blurb: "Follow tangled lines with your eyes only." },
  { slug: "upside-down-reading", seeAlso: "/games/mirror-reading", name: "Upside Down Reading", premium: false, skills: ["Language", "Attention"], blurb: "Read text turned upside down." },
  { slug: "mirror-reading", name: "Mirror Reading", premium: true, skills: ["Language", "Attention"], blurb: "Read text written backwards." },
  { slug: "whats-next", name: "What's Next", premium: true, skills: ["Logic"], blurb: "Predict the next item in a sequence." },
  { slug: "masked-text", name: "Masked Text", premium: true, skills: ["Language", "Memory"], blurb: "Read lines that are partly hidden, then answer questions." },
  { slug: "mathmoji", name: "Mathmoji", premium: true, skills: ["Logic"], blurb: "Crack emoji equations." },
  { slug: "bourdon-test", name: "Bourdon Test", premium: true, skills: ["Attention"], blurb: "Find and count target symbols in a grid." },
  { slug: "scrambled-text", name: "Scrambled Text", premium: true, skills: ["Language"], blurb: "Read words with shuffled letters." },
  { slug: "math-snake", name: "Math Snake", premium: true, skills: ["Speed", "Logic"], blurb: "Steer the snake to the right answer." },
  { slug: "math-cross", name: "Math Cross", premium: true, skills: ["Logic"], blurb: "Place every number so all equations hold." },
  { slug: "number-path", name: "Number Path", premium: true, skills: ["Logic"], blurb: "One path through all cells, numbers in order." },
  { slug: "quarters", name: "Quarters", premium: true, skills: ["Logic"], blurb: "Cut the grid into rectangles by their areas." },
  { slug: "mirror-drawing", name: "Mirror Drawing", premium: true, skills: ["Attention", "Logic"], blurb: "Draw the mirrored half of a picture." },
  { slug: "mood-swipe", name: "Mood Swipe", premium: true, skills: ["Emotions", "Speed"], blurb: "Read the face and swipe pleasant or unpleasant." },
  { slug: "read-the-face", name: "Read the Face", premium: true, skills: ["Emotions"], blurb: "Name the emotion, from smiles to contempt." },
];

// Тексты страниц живут отдельно (game-pages.ts), чтобы этот реестр оставался коротким.
for (const g of GAMES_ALL) {
  const page = GAME_PAGE_CONTENT[g.slug];
  if (page) g.page = page;
}

export const GAME_PAGES = (): Game[] => GAMES_ALL.filter((g) => g.page);

export function gameBySlug(slug: string): Game | undefined {
  return GAMES_ALL.find((g) => g.slug === slug && g.page);
}
