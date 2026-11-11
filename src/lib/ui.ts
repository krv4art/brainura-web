// Строки интерфейса вокруг контента: меню, крошки, FAQ, кнопки магазинов, подписи блоков.
// 🔒 `Record<Locale, Ui>`: новый язык в `Locale` без своих строк здесь не соберётся.
// Перевод — вручную, по правилам локализации (CLAUDE.md), не скриптом.

import type { BlockLabels } from "@/components/seo/blocks";
import type { Locale } from "./i18n";

export interface Ui {
  nav: { home: string; games: string; tests: string; learn: string; support: string; download: string };
  footer: { brainGames: string; brainTests: string; learn: string; privacy: string; terms: string; support: string; rights: string };
  faq: string;
  sources: string;
  tryNext: string;
  store: { play: string; appStore: string; note: string };
  article: { team: string; minRead: (n: number) => string; toc: string; takeaways: string; updated: string };
  blocks: BlockLabels;
  hub: {
    homeTitle: string;
    homeLead: string;
    testsTitle: string;
    testsLead: string;
    gamesTitle: string;
    gamesLead: string;
    learnTitle: string;
    learnLead: string;
    takeTest: string;
    read: string;
    about: string;
  };
  game: { free: string; premium: string; howToPlay: (name: string) => string; playIn: (name: string) => string; playInBody: string };
  skills: Record<"Memory" | "Attention" | "Speed" | "Logic" | "Language" | "Emotions", string>;
  download: { title: string; body: string };
  notFound: { title: string; body: string; home: string };
}

const EN: Ui = {
  nav: { home: "Home", games: "Games", tests: "Tests", learn: "Learn", support: "Support", download: "Download" },
  footer: {
    brainGames: "Brain games",
    brainTests: "Brain tests",
    learn: "Learn",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support",
    rights: "All rights reserved.",
  },
  faq: "Frequently asked questions",
  sources: "Sources",
  tryNext: "Try next",
  store: { play: "Get it on Google Play", appStore: "Download on the App Store", note: "Free to install · no ads · no account needed" },
  article: {
    team: "Brainura team",
    minRead: (n) => `${n} min read`,
    toc: "In this article",
    takeaways: "The short version",
    updated: "Updated",
  },
  blocks: { callout: { tip: "Tip", note: "Good to know", warning: "Watch out" }, myth: "Myth", fact: "What research says" },
  hub: {
    homeTitle: "Brain games and tests",
    homeLead: "Free online tests, short brain games and plain-language articles on memory, attention and reading.",
    testsTitle: "Free brain tests online",
    testsLead: "Quick tests based on classic tasks from cognitive psychology. No account, your best result saved on this device.",
    gamesTitle: "Brain games for adults",
    gamesLead: "Short daily games for memory, attention, speed and logic in the Brainura app.",
    learnTitle: "Learn",
    learnLead: "Plain-language articles on memory, attention and reading, with the research behind every claim.",
    takeTest: "Take the test",
    read: "Read",
    about: "About",
  },
  game: {
    free: "Free in the app",
    premium: "Premium · free for the first 7 days",
    howToPlay: (n) => `How to play ${n}`,
    playIn: (n) => `Play ${n} in Brainura`,
    playInBody: "One of 26 short brain games with levels that adapt as you improve. Five minutes a day, no ads, no account.",
  },
  skills: { Memory: "Memory", Attention: "Attention", Speed: "Speed", Logic: "Logic", Language: "Language", Emotions: "Emotions" },
  download: {
    title: "Five minutes of brain games a day",
    body: "Brainura has 26 short games for memory, attention, speed and logic, with honest expectations and no ads.",
  },
  notFound: { title: "Page not found", body: "This page does not exist or has moved.", home: "Go to the home page" },
};

export const UI: Record<Locale, Ui> = {
  en: EN,
  qa: EN,
};
