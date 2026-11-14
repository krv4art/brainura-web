// Строки интерфейса вокруг контента: меню, крошки, FAQ, кнопки магазинов, подписи блоков.
// 🔒 `Record<Locale, Ui>`: новый язык в `Locale` без своих строк здесь не соберётся.
// Перевод — вручную, по правилам локализации (CLAUDE.md), не скриптом.

import type { BlockLabels } from "@/components/seo/blocks";
import type { Locale } from "./i18n";

export interface Ui {
  /** `menu` — подпись кнопки ☰ на телефоне (для экранного диктора). */
  nav: { home: string; features: string; games: string; tests: string; learn: string; support: string; download: string; menu: string };
  footer: { brainGames: string; brainTests: string; learn: string; privacy: string; terms: string; support: string; rights: string };
  faq: string;
  sources: string;
  tryNext: string;
  /** `chrome` — кнопка расширения (только на играх/тестах из расширения, content/extension.ts). */
  store: { play: string; appStore: string; chrome: string; note: string };
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
  /** Заметный блок «больше игр в приложении» под инструментом/игрой. */
  promo: { title: string; body: string };
  notFound: { title: string; body: string; home: string };
}

const EN: Ui = {
  nav: { home: "Home", features: "Features", games: "Games", tests: "Tests", learn: "Learn", support: "Support", download: "Download", menu: "Menu" },
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
  store: { play: "Get it on Google Play", appStore: "Download on the App Store", chrome: "Add to Chrome", note: "Free to install · no ads · no account needed" },
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
    premium: "Premium game",
    howToPlay: (n) => `How to play ${n}`,
    playIn: (n) => `Play ${n} in Brainura`,
    playInBody: "One of 26 short brain games with levels that adapt as you improve. Five minutes a day, no ads, no account.",
  },
  skills: { Memory: "Memory", Attention: "Attention", Speed: "Speed", Logic: "Logic", Language: "Language", Emotions: "Emotions" },
  download: {
    title: "Five minutes of brain games a day",
    body: "Brainura has 26 short games for memory, attention, speed and logic, with honest expectations and no ads.",
  },
  promo: {
    title: "More brain games in the app",
    body: "Brainura has 26 short games for memory, attention, speed and logic, a daily plan and levels that adapt to you. 13 games are free.",
  },
  notFound: { title: "Page not found", body: "This page does not exist or has moved.", home: "Go to the home page" },
};

// Русский (ru.brainura.app). Регистр — «вы», типографика — «ёлочки» и тире «—».
const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10, m100 = n % 100;
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
};

const RU: Ui = {
  nav: { home: "Главная", features: "Возможности", games: "Игры", tests: "Тесты", learn: "Статьи", support: "Поддержка", download: "Скачать", menu: "Меню" },
  footer: {
    brainGames: "Игры для мозга",
    brainTests: "Тесты для мозга",
    learn: "Статьи",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    support: "Поддержка",
    rights: "Все права защищены.",
  },
  faq: "Частые вопросы",
  sources: "Источники",
  tryNext: "Попробуйте ещё",
  store: { play: "Скачать в Google Play", appStore: "Загрузить в App Store", chrome: "Добавить в Chrome", note: "Бесплатно · без рекламы · без регистрации" },
  article: {
    team: "Команда Brainura",
    minRead: (n) => `${n} ${plural(n, "минута", "минуты", "минут")} на чтение`,
    toc: "В этой статье",
    takeaways: "Коротко о главном",
    updated: "Обновлено",
  },
  blocks: { callout: { tip: "Совет", note: "Важно знать", warning: "Осторожно" }, myth: "Миф", fact: "Что говорят исследования" },
  hub: {
    homeTitle: "Игры и тесты для мозга",
    homeLead: "Бесплатные онлайн-тесты, короткие игры для мозга и статьи простым языком о памяти, внимании и чтении.",
    testsTitle: "Тесты на память и внимание онлайн",
    testsLead: "Быстрые тесты по классическим заданиям когнитивной психологии. Без регистрации, лучший результат хранится на вашем устройстве.",
    gamesTitle: "Игры для мозга и тренажёры для взрослых",
    gamesLead: "Короткие ежедневные игры на память, внимание, скорость и логику в приложении Brainura.",
    learnTitle: "Статьи",
    learnLead: "Статьи простым языком о памяти, внимании и чтении, с исследованиями за каждым утверждением.",
    takeTest: "Пройти тест",
    read: "Читать",
    about: "Подробнее",
  },
  game: {
    free: "Бесплатно в приложении",
    premium: "Игра Premium",
    howToPlay: (n) => `Как играть: ${n}`,
    playIn: (n) => `Играйте в «${n}» в Brainura`,
    playInBody: "Одна из 26 коротких игр для мозга: уровни подстраиваются под вас. Пять минут в день, без рекламы и регистрации.",
  },
  skills: { Memory: "Память", Attention: "Внимание", Speed: "Скорость", Logic: "Логика", Language: "Язык", Emotions: "Эмоции" },
  download: {
    title: "Пять минут игр для мозга в день",
    body: "В Brainura 26 коротких игр на память, внимание, скорость и логику. Без рекламы и без громких обещаний.",
  },
  promo: {
    title: "Больше игр для мозга — в приложении",
    body: "В Brainura 26 коротких игр на память, внимание, скорость и логику, ежедневный план и уровни, которые подстраиваются под вас. 13 игр бесплатны.",
  },
  notFound: { title: "Страница не найдена", body: "Такой страницы нет или она переехала.", home: "На главную" },
};

// Украинский: одобрен владельцем 13.11.2026 (docs/growth/seo/l10n/audit_landing_uk.md, §2).
// Заголовки хабов (hub.*Title) — временные: заменятся главными ключами из ядра uk.
const UK: Ui = {
  nav: { home: "Головна", features: "Можливості", games: "Ігри", tests: "Тести", learn: "Статті", support: "Підтримка", download: "Завантажити", menu: "Меню" },
  footer: {
    brainGames: "Ігри для мозку",
    brainTests: "Тести для мозку",
    learn: "Статті",
    privacy: "Політика конфіденційності",
    terms: "Умови використання",
    support: "Підтримка",
    rights: "Усі права захищені.",
  },
  faq: "Часті запитання",
  sources: "Джерела",
  tryNext: "Спробуйте ще",
  store: { play: "Завантажити з Google Play", appStore: "Завантажити з App Store", chrome: "Додати в Chrome", note: "Безкоштовно · без реклами · без реєстрації" },
  article: {
    team: "Команда Brainura",
    minRead: (n) => `${n} ${plural(n, "хвилина", "хвилини", "хвилин")} читання`,
    toc: "У цій статті",
    takeaways: "Коротко про головне",
    updated: "Оновлено",
  },
  blocks: { callout: { tip: "Порада", note: "Варто знати", warning: "Обережно" }, myth: "Міф", fact: "Що кажуть дослідження" },
  hub: {
    homeTitle: "Ігри та тести для мозку",
    homeLead: "Безкоштовні онлайн-тести, короткі ігри для мозку й статті простою мовою про пам’ять, увагу та читання.",
    testsTitle: "Тести на пам’ять і увагу онлайн",
    testsLead: "Швидкі тести на основі класичних завдань когнітивної психології. Без реєстрації, найкращий результат зберігається на вашому пристрої.",
    gamesTitle: "Ігри для мозку й тренажери для дорослих",
    gamesLead: "Короткі щоденні ігри на пам’ять, увагу, швидкість і логіку в застосунку Brainura.",
    learnTitle: "Статті",
    learnLead: "Статті простою мовою про пам’ять, увагу та читання, з дослідженнями за кожним твердженням.",
    takeTest: "Пройти тест",
    read: "Читати",
    about: "Детальніше",
  },
  game: {
    free: "Безкоштовно в застосунку",
    premium: "Гра Premium",
    howToPlay: (n) => `Як грати: ${n}`,
    playIn: (n) => `Грайте в «${n}» у Brainura`,
    playInBody: "Одна з 26 коротких ігор для мозку: рівні підлаштовуються під вас. П’ять хвилин на день, без реклами й реєстрації.",
  },
  skills: { Memory: "Пам’ять", Attention: "Увага", Speed: "Швидкість", Logic: "Логіка", Language: "Мова", Emotions: "Емоції" },
  download: {
    title: "П’ять хвилин ігор для мозку на день",
    body: "У Brainura 26 коротких ігор на пам’ять, увагу, швидкість і логіку. Без реклами й гучних обіцянок.",
  },
  promo: {
    title: "Більше ігор для мозку — у застосунку",
    body: "У Brainura 26 коротких ігор на пам’ять, увагу, швидкість і логіку, щоденний план і рівні, що підлаштовуються під вас. 13 ігор безкоштовні.",
  },
  notFound: { title: "Сторінку не знайдено", body: "Такої сторінки немає або її перенесено.", home: "На головну" },
};

export const UI: Record<Locale, Ui> = {
  en: EN,
  ru: RU,
  uk: UK,
  qa: EN,
};
