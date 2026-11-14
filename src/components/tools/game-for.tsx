// Игра в браузере по слагу страницы игры (/games/<slug>) — для всех языков.
// Нет записи — у страницы только текст и кнопки «скачать».

import type { Locale } from "@/lib/i18n";
import { AnagramsGame } from "./anagrams-game";
import { CardMatchGame } from "./card-match-game";
import { MergeNumbersGame } from "./merge-numbers-game";

export const PLAYABLE_GAMES = new Set(["card-match", "anagrams", "merge-numbers"]);

export function GameFor({ slug, lang }: { slug: string; lang: Locale }) {
  switch (slug) {
    case "card-match":
      return <CardMatchGame lang={lang} />;
    case "anagrams":
      return <AnagramsGame lang={lang} />;
    case "merge-numbers":
      return <MergeNumbersGame lang={lang} />;
    default:
      return null;
  }
}
