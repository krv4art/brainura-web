// QA-псевдоязык: проверка механизма поддоменов без настоящего перевода.
// Собирается только при SITE_QA_LOCALE=1 (src/lib/i18n.ts), открывается на
// qa.localhost:<порт>. Тексты — английские; слаги нарочно другие (`-qa`), чтобы
// проверить, что hreflang связывает версии по `key`, а не по слагу.

import { ARTICLES_ALL } from "../articles";
import { GAME_PAGES } from "../games";
import type { LocaleContent } from "./index";

const card = GAME_PAGES().find((g) => g.slug === "card-match")!;

export const QA: LocaleContent = {
  tests: [
    {
      key: "memory-test",
      slug: "memory-test-qa",
      name: "Memory Test (QA)",
      blurb: "QA copy of the memory test.",
      title: "Memory Test (QA)",
      description: "QA copy of the memory test page.",
      h1: "Memory Test (QA)",
      lead: "QA copy: the tool below must work exactly like on brainura.app.",
      sections: [
        {
          id: "how",
          h2: "How it works",
          blocks: [
            { t: "steps", items: [
              { title: "Pick a mode", text: "Numbers, numbers backwards or grid." },
              { title: "Watch", text: "The sequence appears one item at a time." },
            ] },
            { t: "callout", kind: "tip", text: "Links stay on this subdomain: [all tests](/testy-qa)." },
          ],
        },
      ],
      faq: [{ q: "Is this a QA page?", a: "Yes." }],
      sources: [],
      download: { title: "QA download block", body: "Play link must carry hl=qa and a qa- campaign." },
      updated: "2026-11-11",
    },
    {
      key: "reading-speed-test",
      slug: "reading-speed-test-qa",
      name: "Reading Speed Test (QA)",
      blurb: "QA copy of the reading speed test.",
      title: "Reading Speed Test (QA)",
      description: "QA copy of the reading speed test page.",
      h1: "Reading Speed Test (QA)",
      lead: "QA copy.",
      sections: [],
      faq: [],
      sources: [],
      download: { title: "QA", body: "QA" },
      updated: "2026-11-11",
    },
  ],
  games: [{ key: card.slug, slug: "card-match-qa", name: card.name, blurb: card.blurb, page: card.page! }],
  articles: ARTICLES_ALL.slice(0, 1).map((a) => ({ ...a, key: a.slug, slug: `${a.slug}-qa` })),
};
