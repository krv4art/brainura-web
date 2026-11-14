// Українська версія сайту (uk.brainura.app). 14.11.2026, рішення власника: той самий набір сторінок, що
// англійською й російською. Ядра — docs/growth/seo/pages/*/*.uk.md (частоти — KP UA), статус —
// docs/growth/seo/l10n/STATUS_uk.md. Порядок у масивах = порядок карток у хабах (спершу більший попит).

import type { LocaleContent } from "./index";
import { UK_TESTS } from "./uk-tests";
import { UK_GAMES } from "./uk-games";
import { UK_GAMES_2 } from "./uk-games-2";
import { UK_ARTICLES } from "./uk-articles";

export const UK: LocaleContent = {
  tests: UK_TESTS,
  games: [...UK_GAMES, ...UK_GAMES_2],
  articles: UK_ARTICLES,
};
