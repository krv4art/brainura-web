// Тексты главной (лендинга) по языкам. Вёрстка — src/components/landing.tsx, одна на все языки.
//
// 🔒 Лендинг — НЕ SEO-страница: он пишется как презентабельное описание продукта и ПЕРЕВОДИТСЯ
// качественно, а не собирается под ключи (решение владельца 12.11.2026). Плотность ключей и
// ядро здесь не считаются; названия игр — как в приложении (exercise_names/<код>.dart).
// Язык без записи здесь получает вместо лендинга каталог разделов (LangHomeView).

import type { Locale } from "@/lib/i18n";

export type FeatureIcon = "brain" | "timer" | "users" | "target" | "trophy" | "shield";

export interface Landing {
  /** <title> и описание главной. */
  meta: { title: string; description: string };
  badge: string;
  /** H1 из трёх частей: до, акцент (градиент), после. `nowrap` — часть акцента без переноса. */
  h1: { before: string; accent: string; nowrap?: string; after: string };
  lead: string;
  stores: {
    playTop: string;
    playName: string;
    appleTop: string;
    appleName: string;
    chromeTop: string;
    chromeName: string;
    note: string;
  };
  areas: string[];
  screenshots: { title: string; lead: string; captions: [string, string, string, string, string] };
  features: { title: string; accent: string; lead: string; items: { icon: FeatureIcon; title: string; body: string }[] };
  faq: {
    title: string;
    /** Строка с маркером {support} — на его место ставится ссылка. */
    lead: string;
    supportLink: string;
    items: { q: string; a: string }[];
  };
  cta: { title: string; body: string; play: string; apple: string; chrome: string; help: string; helpLink: string };
  /** Заголовок каталога разделов под лендингом (только у языков). */
  catalog: { title: string; lead: string };
}

const EN: Landing = {
  meta: {
    title: "Brainura — Brain Training in 5 Minutes a Day",
    description:
      "Train your brain in 5 minutes a day. 26 short games for memory, focus, processing speed and logic. 41 languages, daily plan, streaks, no ads.",
  },
  badge: "26 brain games · No ads",
  h1: { before: "Give your brain a ", nowrap: "5-minute", accent: " workout", after: " every day." },
  lead:
    "Brainura is a collection of short brain games for memory, attention, speed and logic. Play solo or challenge a friend, follow a daily plan and watch your streak grow. No ads.",
  stores: {
    playTop: "Get it on",
    playName: "Google Play",
    appleTop: "Download on the",
    appleName: "App Store",
    chromeTop: "Add to Chrome",
    chromeName: "Chrome extension",
    note: "Free to install · 13 games are free and stay free",
  },
  areas: ["Memory", "Attention", "Processing Speed", "Logic", "Emotional Intelligence"],
  screenshots: {
    title: "See it in action",
    lead: "A look inside the Android app: your daily workout, the Arena, the game catalog and your rewards.",
    captions: [
      "Your daily 5-minute workout",
      "Duel your friends live",
      "26 games, one for every skill",
      "Levels that adapt as you improve",
      "Earn XP, unlock achievements",
    ],
  },
  features: {
    title: "What's",
    accent: "inside",
    lead:
      "Short games built on classic cognitive tasks and sorted by the skill they train: memory, attention, processing speed, logic and emotional intelligence.",
    items: [
      {
        icon: "brain",
        title: "26 Brain Games",
        body:
          "Stroop Test, Schulte Tables, Memory Matrix, Sudoku, Anagrams, Mood Swipe and more. Each one trains memory, attention, speed, logic or emotional intelligence. 13 are free and stay free; the rest are Premium.",
      },
      {
        icon: "timer",
        title: "A Daily Plan, Five Minutes",
        body: "Short sessions, a daily program and reminders you control. Build a streak without giving up your evening.",
      },
      {
        icon: "users",
        title: "Duel Your Friends",
        body:
          "The daily Arena challenge puts everyone on the same board, and live duels let you race a friend head-to-head. Available on Android.",
      },
      {
        icon: "target",
        title: "Difficulty That Adapts",
        body:
          "Most games have up to 80 levels. Play well and the level rises, struggle and it eases off: hard enough to stay interesting, never a wall.",
      },
      {
        icon: "trophy",
        title: "Streaks, XP & Achievements",
        body: "Over 100 achievements, daily streaks and XP make your consistency something you can actually see.",
      },
      {
        icon: "shield",
        title: "No Ads, 41 Languages",
        body:
          "No ads between your games. The app speaks 41 languages, from English and Spanish to Finnish, Hindi and Thai.",
      },
    ],
  },
  faq: {
    title: "Questions you might be asking",
    lead: "Short answers. If something's still unclear, our {support} has more.",
    supportLink: "support page",
    items: [
      {
        q: "How much time does it take?",
        a: "A session is about five minutes: pick any game or follow the daily plan. Play more whenever you feel like it.",
      },
      {
        q: "Is this actually based on science?",
        a: "The games are built on classic tasks from cognitive psychology: the Stroop test, Schulte tables, reaction-time and working-memory exercises. Brainura is a training and entertainment app, not a medical device, and we don't claim that it diagnoses, treats or prevents any condition.",
      },
      {
        q: "How much does it cost?",
        a: "Free to install. 13 games are free and stay free. The rest of the games are Premium, a subscription. On Android it is monthly or yearly: in the US $5.99/month or $21.99/year, with prices adjusted by country. The iPhone app is free for now.",
      },
      {
        q: "Do I need an account?",
        a: "No. There is no sign-up: open the app and play. Most games work offline; the Arena and some other features need an internet connection.",
      },
      {
        q: "Will my progress sync between iPhone and Android?",
        a: "Not yet. Brainura has no accounts, so progress stays on the device where you earned it. Subscriptions are bought through Apple or Google, so a purchase on one platform does not carry over to the other automatically.",
      },
      {
        q: "Who is it for?",
        a: "Anyone who wants a quick daily mental workout. Difficulty runs from easy to very hard, so beginners and puzzle fans both find a level.",
      },
      {
        q: "What is the Chrome extension?",
        a: "A free extension with 6 of the games for a quick brain break while you work. Get it from the Chrome Web Store using the button above.",
      },
    ],
  },
  cta: {
    title: "Start your first 5-minute session today",
    body: "Free to install. 13 games are free and stay free.",
    play: "Get on Google Play",
    apple: "Download on the App Store",
    chrome: "Add Chrome extension",
    help: "Need help? {link}.",
    helpLink: "Contact support",
  },
  catalog: { title: "Tests, games and articles", lead: "" },
};

const RU: Landing = {
  meta: {
    title: "Brainura — тренировка мозга за 5 минут в день",
    description:
      "Тренируйте мозг по пять минут в день. 26 коротких игр на память, внимание, скорость обработки и логику. 41 язык, ежедневный план, серии, без рекламы.",
  },
  badge: "26 игр для мозга · Без рекламы",
  h1: { before: "Давайте мозгу ", accent: " тренировку", nowrap: "5-минутную", after: " каждый день." },
  lead:
    "Brainura — это коллекция коротких игр для мозга на память, внимание, скорость и логику. Играйте в одиночку или бросайте вызов другу, следуйте ежедневному плану и смотрите, как растёт ваша серия. Без рекламы.",
  stores: {
    playTop: "Доступно в",
    playName: "Google Play",
    appleTop: "Загрузите в",
    appleName: "App Store",
    chromeTop: "Добавить в Chrome",
    chromeName: "Расширение для Chrome",
    note: "Установка бесплатна · 13 игр бесплатны и останутся такими",
  },
  areas: ["Память", "Внимание", "Скорость обработки", "Логика", "Эмоциональный интеллект"],
  screenshots: {
    title: "Посмотрите, как это работает",
    lead: "Взгляд изнутри приложения для Android: ежедневная тренировка, Арена, каталог игр и награды.",
    captions: [
      "Ежедневная 5-минутная тренировка",
      "Дуэли с друзьями в реальном времени",
      "26 игр — на каждый навык",
      "Уровни растут вместе с вами",
      "Копите опыт, открывайте достижения",
    ],
  },
  features: {
    title: "Что",
    accent: "внутри",
    lead:
      "Короткие игры по классическим заданиям когнитивной психологии, разложенные по тому, что они тренируют: память, внимание, скорость обработки, логику и эмоциональный интеллект.",
    items: [
      {
        icon: "brain",
        title: "26 игр для мозга",
        body:
          "Тест Струпа, Таблицы Шульте, Матрица памяти, Судоку, Анаграммы, Эмпат и другие. Каждая тренирует память, внимание, скорость, логику или эмоциональный интеллект. 13 игр бесплатны и такими останутся, остальные — в Premium.",
      },
      {
        icon: "timer",
        title: "Ежедневный план на пять минут",
        body: "Короткие занятия, программа на каждый день и напоминания, которыми управляете вы. Копите серию, не жертвуя вечером.",
      },
      {
        icon: "users",
        title: "Дуэли с друзьями",
        body:
          "В ежедневном вызове Арены все играют на одной доске, а в живых дуэлях можно сразиться с другом один на один. Доступно на Android.",
      },
      {
        icon: "target",
        title: "Сложность, которая подстраивается",
        body:
          "В большинстве игр до 80 уровней. Получается — уровень растёт, не получается — становится легче: достаточно трудно, чтобы не было скучно, и никогда не тупик.",
      },
      {
        icon: "trophy",
        title: "Серии, опыт и достижения",
        body: "Более 100 достижений, ежедневные серии и очки опыта делают вашу регулярность видимой.",
      },
      {
        icon: "shield",
        title: "Без рекламы, 41 язык",
        body:
          "Никакой рекламы между играми. Приложение говорит на 41 языке — от английского и испанского до финского, хинди и тайского.",
      },
    ],
  },
  faq: {
    title: "Частые вопросы",
    lead: "Короткие ответы. Если что-то осталось неясным, больше подробностей — на {support}.",
    supportLink: "странице поддержки",
    items: [
      {
        q: "Сколько времени это занимает?",
        a: "Одно занятие — около пяти минут: выберите любую игру или следуйте ежедневному плану. Играйте дольше, когда захочется.",
      },
      {
        q: "Это действительно основано на науке?",
        a: "Игры построены на классических заданиях когнитивной психологии: тест Струпа, таблицы Шульте, упражнения на время реакции и рабочую память. Brainura — приложение для тренировки и развлечения, а не медицинское изделие, и мы не утверждаем, что оно диагностирует, лечит или предотвращает какие-либо состояния.",
      },
      {
        q: "Сколько это стоит?",
        a: "Установка бесплатна. 13 игр бесплатны и останутся такими. Остальные игры — Premium, это подписка: на Android она на месяц или на год; цены зависят от страны и указаны в магазине приложений (например, в США — $5,99 в месяц или $21,99 в год). Приложение для iPhone пока бесплатно.",
      },
      {
        q: "Нужен ли аккаунт?",
        a: "Нет. Регистрации нет: откройте приложение и играйте. Большинство игр работает без интернета; Арене и некоторым другим функциям нужно подключение к сети.",
      },
      {
        q: "Синхронизируется ли прогресс между iPhone и Android?",
        a: "Пока нет. В Brainura нет аккаунтов, поэтому прогресс остаётся на том устройстве, где вы его заработали. Подписки покупаются через Apple или Google, поэтому покупка на одной платформе не переносится на другую автоматически.",
      },
      {
        q: "Для кого это приложение?",
        a: "Для всех, кому нужна быстрая ежедневная зарядка для ума. Сложность — от лёгкой до очень высокой, поэтому и новички, и любители головоломок найдут свой уровень.",
      },
      {
        q: "Что такое расширение для Chrome?",
        a: "Бесплатное расширение с 6 играми — для короткого перерыва для мозга во время работы. Установить его можно из Интернет-магазина Chrome по кнопке выше.",
      },
    ],
  },
  cta: {
    title: "Начните первое пятиминутное занятие сегодня",
    body: "Установка бесплатна. 13 игр бесплатны и останутся такими.",
    play: "Скачать в Google Play",
    apple: "Загрузить в App Store",
    chrome: "Добавить расширение для Chrome",
    help: "Нужна помощь? {link}.",
    helpLink: "Написать в поддержку",
  },
  catalog: {
    title: "Тесты, игры и статьи",
    lead: "Попробуйте то, что тренирует мозг, прямо в браузере, и узнайте больше о том, как это работает.",
  },
};

export const LANDING: Partial<Record<Locale, Landing>> = { en: EN, ru: RU, qa: EN };

export function landingFor(lang: Locale): Landing | undefined {
  return LANDING[lang];
}
