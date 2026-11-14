// Русская версия сайта (ru.brainura.app). Волна 1 — 9 страниц (12.11), волна 2 — остальные 14
// (14.11, решение владельца: тот же набор страниц, что на английском). Ядра —
// docs/growth/seo/pages/*/*.ru.md, статус — docs/growth/seo/l10n/STATUS_ru.md.
// Порядок в массивах = порядок карточек в хабах (сначала страницы с большим спросом).

import type { LocaleContent } from "./index";
import { RU_TESTS } from "./ru-tests";
import { RU_TESTS_2 } from "./ru-tests-2";
import { RU_GAMES } from "./ru-games";
import { RU_GAMES_2 } from "./ru-games-2";
import { RU_ARTICLES } from "./ru-articles";
import { RU_ARTICLES_2 } from "./ru-articles-2";

export const RU: LocaleContent = {
  tests: [...RU_TESTS, ...RU_TESTS_2],
  games: [...RU_GAMES, ...RU_GAMES_2],
  articles: [...RU_ARTICLES, ...RU_ARTICLES_2],
};
