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
  /**
   * Скриншоты — свои у каждого языка, с интерфейсом на этом языке: набор стора Google Play
   * (`docs/aso/screenshots/_v2-testset/gp/<код>/`, 704×1520) → `public/screenshots/<код>/*.jpg`.
   */
  screenshots: { title: string; lead: string; shots: { src: string; caption: string }[] };
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
    shots: [
      { src: "/screenshots/shot-1.jpg", caption: "Your daily 5-minute workout" },
      { src: "/screenshots/shot-2.jpg", caption: "Duel your friends live" },
      { src: "/screenshots/shot-3.jpg", caption: "26 games, one for every skill" },
      { src: "/screenshots/shot-4.jpg", caption: "Levels that adapt as you improve" },
      { src: "/screenshots/shot-5.jpg", caption: "Earn XP, unlock achievements" },
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
      "Тренируйте мозг по пять минут в день. 26 коротких игр для памяти, внимания, скорости мышления и логики. 41 язык, ежедневный план, серии, без рекламы.",
  },
  badge: "26 игр для мозга · Без рекламы",
  h1: { before: "Тренируйте мозг ", accent: " в день", nowrap: "по 5 минут", after: "." },
  lead:
    "Brainura — набор коротких игр для тренировки памяти, внимания, скорости мышления и логики. Играйте сами или бросайте вызов другу, занимайтесь по ежедневному плану и следите, как растёт ваша серия. Без рекламы.",
  stores: {
    playTop: "Доступно в",
    playName: "Google Play",
    appleTop: "Загрузите в",
    appleName: "App Store",
    chromeTop: "Добавить в Chrome",
    chromeName: "Расширение для Chrome",
    note: "Установка бесплатна · 13 игр бесплатны и останутся такими",
  },
  areas: ["Память", "Внимание", "Скорость мышления", "Логика", "Эмоциональный интеллект"],
  screenshots: {
    title: "Посмотрите, как это работает",
    lead: "Так выглядит приложение для Android изнутри: ежедневная тренировка, каталог игр, Арена и награды.",
    // Русский набор стора (герой → каталог → Арена → награды, порядок стора с 22.10).
    shots: [
      { src: "/screenshots/ru/1_hero.jpg", caption: "Ежедневная 5-минутная тренировка" },
      { src: "/screenshots/ru/2_catalog.jpg", caption: "26 игр — на каждый навык" },
      { src: "/screenshots/ru/3_arena.jpg", caption: "Дуэли с друзьями в реальном времени" },
      { src: "/screenshots/ru/4_reward.jpg", caption: "Копите опыт, открывайте достижения" },
    ],
  },
  features: {
    title: "Что",
    accent: "внутри",
    lead:
      "Короткие игры по классическим заданиям когнитивной психологии, сгруппированные по тому, какой навык они тренируют: память, внимание, скорость мышления, логику и эмоциональный интеллект.",
    items: [
      {
        icon: "brain",
        title: "26 игр для мозга",
        body:
          "Тест Струпа, Таблицы Шульте, Матрица памяти, Судоку, Анаграммы, Эмпат и другие. Каждая тренирует память, внимание, скорость, логику или эмоциональный интеллект. 13 игр бесплатны и останутся бесплатными, остальные — в Premium.",
      },
      {
        icon: "timer",
        title: "Ежедневный план на пять минут",
        body: "Короткие занятия, программа на каждый день и напоминания, которыми управляете вы. Наращивайте серию, не жертвуя вечером.",
      },
      {
        icon: "users",
        title: "Дуэли с друзьями",
        body:
          "В ежедневном вызове Арены все решают одно и то же задание, а в живых дуэлях можно сразиться с другом один на один. Доступно на Android.",
      },
      {
        icon: "target",
        title: "Сложность, которая подстраивается",
        body:
          "В большинстве игр до 80 уровней. Получается — уровень растёт, не получается — становится легче: достаточно трудно, чтобы не было скучно, но без тупиков.",
      },
      {
        icon: "trophy",
        title: "Серии, опыт и достижения",
        body: "Более 100 достижений, ежедневные серии и очки опыта наглядно показывают вашу регулярность.",
      },
      {
        icon: "shield",
        title: "Без рекламы, 41 язык",
        body:
          "Никакой рекламы между играми. Приложение доступно на 41 языке — от английского и испанского до финского, хинди и тайского.",
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
        a: "Игры построены на классических заданиях когнитивной психологии: тест Струпа, таблицы Шульте, упражнения на время реакции и рабочую память. Brainura — приложение для тренировки и развлечения, а не медицинское изделие, и мы не утверждаем, что оно диагностирует, лечит или предотвращает какие-либо заболевания.",
      },
      {
        q: "Сколько это стоит?",
        a: "Установка бесплатна. 13 игр бесплатны и останутся такими. Остальные игры входят в Premium — это подписка: на Android её можно оформить на месяц или на год; цены зависят от страны и указаны в магазине приложений (например, в США — $5,99 в месяц или $21,99 в год). Приложение для iPhone пока бесплатно.",
      },
      {
        q: "Нужен ли аккаунт?",
        a: "Нет. Регистрации нет: откройте приложение и играйте. Большинство игр работает без интернета; для Арены и ещё некоторых функций нужен интернет.",
      },
      {
        q: "Синхронизируется ли прогресс между iPhone и Android?",
        a: "Пока нет. В Brainura нет аккаунтов, поэтому прогресс остаётся на том устройстве, где вы его заработали. Подписки покупаются через Apple или Google, поэтому покупка на одной платформе не переносится на другую автоматически.",
      },
      {
        q: "Для кого это приложение?",
        a: "Для всех, кому нужна быстрая ежедневная зарядка для ума. Сложность — от лёгкой до очень трудной, поэтому и новички, и любители головоломок найдут свой уровень.",
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
    lead: "Попробуйте тренировки для мозга прямо в браузере и узнайте, как они работают.",
  },
};

// Украинский: одобрен владельцем 13.11.2026 по таблице docs/growth/seo/l10n/audit_landing_uk.md
// (репо приложения). «ви», апостроф ’, «застосунок»; названия игр — exercise_names/uk.dart.
const UK: Landing = {
  meta: {
    title: "Brainura — тренування мозку за 5 хвилин на день",
    description:
      "Тренуйте мозок по п’ять хвилин на день. 26 коротких ігор для пам’яті, уваги, швидкості мислення та логіки. 41 мова, щоденний план, серії, без реклами.",
  },
  badge: "26 ігор для мозку · Без реклами",
  h1: { before: "Тренуйте мозок ", accent: " на день", nowrap: "по 5 хвилин", after: "." },
  lead:
    "Brainura — набір коротких ігор для тренування пам’яті, уваги, швидкості мислення та логіки. Грайте самі або киньте виклик другові, займайтеся за щоденним планом і стежте, як зростає ваша серія. Без реклами.",
  stores: {
    playTop: "Доступно в",
    playName: "Google Play",
    appleTop: "Завантажте в",
    appleName: "App Store",
    chromeTop: "Додати в Chrome",
    chromeName: "Розширення для Chrome",
    note: "Встановлення безкоштовне · 13 ігор безкоштовні й залишаться такими",
  },
  areas: ["Пам’ять", "Увага", "Швидкість мислення", "Логіка", "Емоційний інтелект"],
  screenshots: {
    title: "Подивіться, як це працює",
    lead: "Так виглядає застосунок для Android зсередини: щоденне тренування, каталог ігор, Арена й нагороди.",
    // Український набір стора (герой → каталог → Арена → нагороди).
    shots: [
      { src: "/screenshots/uk/1_hero.jpg", caption: "Щоденне 5-хвилинне тренування" },
      { src: "/screenshots/uk/2_catalog.jpg", caption: "26 ігор — на кожну навичку" },
      { src: "/screenshots/uk/3_arena.jpg", caption: "Дуелі з друзями в реальному часі" },
      { src: "/screenshots/uk/4_reward.jpg", caption: "Збирайте досвід, відкривайте досягнення" },
    ],
  },
  features: {
    title: "Що",
    accent: "всередині",
    lead:
      "Короткі ігри на основі класичних завдань когнітивної психології, згруповані за тим, яку навичку вони тренують: пам’ять, увагу, швидкість мислення, логіку та емоційний інтелект.",
    items: [
      {
        icon: "brain",
        title: "26 ігор для мозку",
        body:
          "Тест Струпа, Таблиці Шульте, Матриця пам’яті, Судоку, Анаграми, Емпат та інші. Кожна тренує пам’ять, увагу, швидкість, логіку або емоційний інтелект. 13 ігор безкоштовні й залишаться безкоштовними, решта — у Premium.",
      },
      {
        icon: "timer",
        title: "Щоденний план на п’ять хвилин",
        body: "Короткі заняття, програма на кожен день і нагадування, якими керуєте ви. Нарощуйте серію, не жертвуючи вечором.",
      },
      {
        icon: "users",
        title: "Дуелі з друзями",
        body:
          "У щоденному виклику Арени всі розв’язують одне й те саме завдання, а в живих дуелях можна позмагатися з другом сам на сам. Доступно на Android.",
      },
      {
        icon: "target",
        title: "Складність, що підлаштовується",
        body:
          "У більшості ігор до 80 рівнів. Виходить — рівень зростає, не виходить — стає легше: достатньо складно, щоб не було нудно, але без глухих кутів.",
      },
      {
        icon: "trophy",
        title: "Серії, досвід і досягнення",
        body: "Понад 100 досягнень, щоденні серії та очки досвіду наочно показують вашу регулярність.",
      },
      {
        icon: "shield",
        title: "Без реклами, 41 мова",
        body:
          "Жодної реклами між іграми. Застосунок доступний 41 мовою — від англійської та іспанської до фінської, гінді й тайської.",
      },
    ],
  },
  faq: {
    title: "Часті запитання",
    lead: "Короткі відповіді. Якщо щось лишилося незрозумілим, більше подробиць — на {support}.",
    supportLink: "сторінці підтримки",
    items: [
      {
        q: "Скільки часу це займає?",
        a: "Одне заняття — близько п’яти хвилин: оберіть будь-яку гру або займайтеся за щоденним планом. Грайте довше, коли захочеться.",
      },
      {
        q: "Це справді ґрунтується на науці?",
        a: "Ігри побудовані на класичних завданнях когнітивної психології: тест Струпа, таблиці Шульте, вправи на час реакції та робочу пам’ять. Brainura — застосунок для тренування й розваги, а не медичний виріб, і ми не стверджуємо, що він діагностує, лікує чи запобігає будь-яким захворюванням.",
      },
      {
        q: "Скільки це коштує?",
        a: "Встановлення безкоштовне. 13 ігор безкоштовні й залишаться такими. Решта ігор входить у Premium — це підписка: на Android її можна оформити на місяць або на рік; ціни залежать від країни й указані в магазині застосунків (наприклад, у США — $5,99 на місяць або $21,99 на рік). Застосунок для iPhone поки безкоштовний.",
      },
      {
        q: "Чи потрібен акаунт?",
        a: "Ні. Реєстрації немає: відкрийте застосунок і грайте. Більшість ігор працює без інтернету; для Арени та ще деяких функцій потрібен інтернет.",
      },
      {
        q: "Чи синхронізується прогрес між iPhone і Android?",
        a: "Поки ні. У Brainura немає акаунтів, тому прогрес залишається на тому пристрої, де ви його заробили. Підписки купуються через Apple або Google, тож покупка на одній платформі не переноситься на іншу автоматично.",
      },
      {
        q: "Для кого цей застосунок?",
        a: "Для всіх, кому потрібна швидка щоденна зарядка для розуму. Складність — від легкої до дуже складної, тож і новачки, і любителі головоломок знайдуть свій рівень.",
      },
      {
        q: "Що таке розширення для Chrome?",
        a: "Безкоштовне розширення з 6 іграми — для короткої перерви для мозку під час роботи. Встановити його можна з Інтернет-магазину Chrome кнопкою вище.",
      },
    ],
  },
  cta: {
    title: "Почніть перше п’ятихвилинне заняття сьогодні",
    body: "Встановлення безкоштовне. 13 ігор безкоштовні й залишаться такими.",
    play: "Завантажити з Google Play",
    apple: "Завантажити з App Store",
    chrome: "Додати розширення для Chrome",
    help: "Потрібна допомога? {link}.",
    helpLink: "Написати в підтримку",
  },
  catalog: {
    title: "Тести, ігри та статті",
    lead: "Спробуйте тренування для мозку просто в браузері й дізнайтеся, як вони працюють.",
  },
};

export const LANDING: Partial<Record<Locale, Landing>> = { en: EN, ru: RU, uk: UK, qa: EN };

export function landingFor(lang: Locale): Landing | undefined {
  return LANDING[lang];
}
