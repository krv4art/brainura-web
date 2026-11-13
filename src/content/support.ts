// Тексты страницы поддержки по языкам. Вёрстка — src/components/support-view.tsx, одна на все языки.
// Адрес на языке — SUPPORT_SLUGS (src/lib/i18n.ts). Язык без записи здесь ведёт на английскую поддержку.
//
// 🔒 Факты сверены с приложением 13.11.2026: аккаунтов нет (вход анонимный); «Восстановить покупки» —
// на экране Premium (premium_screen.dart), не в настройках; сброс — Настройки → «Опасная зона» →
// «Сбросить все данные»; удаление серверных данных — письмом «Data Deletion Request», 30 дней
// (PRIVACY_POLICY.md §7.3). Названия кнопок в ответах — как в интерфейсе приложения на этом языке.

import type { Locale } from "@/lib/i18n";

export const SUPPORT_EMAIL = "krv4art.dev@gmail.com";

export interface Support {
  meta: { title: string; description: string };
  /** H1: до и акцент (градиент). */
  h1: { before: string; accent: string };
  lead: string;
  email: { title: string; body: string };
  faqTitle: string;
  items: { q: string; a: string }[];
}

const EN: Support = {
  meta: { title: "Support", description: "Get help with Brainura. Contact us by email or read the FAQ." },
  h1: { before: "We're here to ", accent: "help" },
  lead: "Most answers are below. If you can't find what you need, drop us an email and we'll get back within one business day.",
  email: { title: "Email support", body: "Reach us anytime at the address below — we read every message." },
  faqTitle: "Frequently asked questions",
  items: [
    {
      q: "How do I cancel my subscription?",
      a: "Subscriptions are managed by the App Store (iOS) and Google Play (Android). On iPhone: Settings → your name → Subscriptions → Brainura → Cancel Subscription. On Android: Google Play → profile icon → Payments & subscriptions → Subscriptions → Brainura → Cancel subscription. Your Premium access stays until the end of the current billing period.",
    },
    {
      q: "I purchased premium but it's not active in the app.",
      a: `Open the Premium screen in Brainura and tap Restore Purchases. If that doesn't help, force-quit the app and reopen it. Still no luck? Email ${SUPPORT_EMAIL} with your purchase receipt and we'll look into it within 24 hours.`,
    },
    {
      q: "Can I sync progress between iPhone and Android?",
      a: "Not yet. Brainura has no accounts, so progress stays on the device where you earned it. Subscriptions are bought through Apple or Google, so a purchase on one platform does not carry over to the other automatically.",
    },
    {
      q: "What happens to my data if I uninstall?",
      a: `Uninstalling removes everything stored on your device. To wipe your progress without uninstalling, open Settings → Danger Zone → Reset All Data. If you also want the data synced to our servers deleted, email ${SUPPORT_EMAIL} with the subject "Data Deletion Request" and we'll delete it within 30 days. Brainura has no accounts, so include your in-app nickname, if you set one, to help us find your data.`,
    },
    {
      q: "How do I request a refund?",
      a: "Refunds for subscriptions are handled by Apple/Google directly: reportaproblem.apple.com (iOS) or play.google.com/store/account (Android). They typically approve refunds for unused billing periods. We do not process refunds for App Store / Play Store purchases.",
    },
    {
      q: "Is Brainura suitable for older adults / dementia support?",
      a: "Brainura is a wellness product, not a medical device. It is not intended to diagnose, treat, or cure any cognitive condition. If you have concerns about cognitive decline, please consult a qualified healthcare professional.",
    },
  ],
};

// ru и uk: одобрено владельцем 13.11.2026 по docs/growth/seo/l10n/audit_support_ru_uk.md (репо приложения).
// Вопрос про Premium — безлично: пол пользователя неизвестен. Тема письма — по-английски (как в политике).
const RU: Support = {
  meta: { title: "Поддержка", description: "Помощь по Brainura: напишите нам на почту или найдите ответ в частых вопросах." },
  h1: { before: "Мы здесь, чтобы ", accent: "помочь" },
  lead: "Ответы на большинство вопросов — ниже. Если не нашли нужного, напишите нам — ответим в течение одного рабочего дня.",
  email: { title: "Поддержка по почте", body: "Пишите в любое время на адрес ниже — мы читаем каждое письмо." },
  faqTitle: "Частые вопросы",
  items: [
    {
      q: "Как отменить подписку?",
      a: "Подписками управляют App Store (iOS) и Google Play (Android). На iPhone: Настройки → ваше имя → Подписки → Brainura → Отменить подписку. На Android: Google Play → значок профиля → Платежи и подписки → Подписки → Brainura → Отменить подписку. Доступ к Premium сохранится до конца оплаченного периода.",
    },
    {
      q: "Premium куплен, но в приложении не активен.",
      a: `Откройте в Brainura экран Premium и нажмите «Восстановить покупки». Если не помогло, полностью закройте приложение и откройте снова. Всё ещё не работает? Напишите на ${SUPPORT_EMAIL} и приложите чек о покупке — разберёмся в течение 24 часов.`,
    },
    {
      q: "Можно ли перенести прогресс между iPhone и Android?",
      a: "Пока нет. В Brainura нет аккаунтов, поэтому прогресс остаётся на том устройстве, где вы его заработали. Подписки покупаются через Apple или Google, поэтому покупка на одной платформе не переносится на другую автоматически.",
    },
    {
      q: "Что будет с моими данными, если удалить приложение?",
      a: `При удалении приложения стирается всё, что хранится на устройстве. Чтобы стереть прогресс, не удаляя приложение, откройте Настройки → «Опасная зона» → «Сбросить все данные». Если нужно удалить и данные, синхронизированные с нашим сервером, напишите на ${SUPPORT_EMAIL} с темой «Data Deletion Request» — удалим в течение 30 дней. Аккаунтов в Brainura нет, поэтому укажите свой ник в приложении, если вы его задавали: так мы найдём ваши данные.`,
    },
    {
      q: "Как вернуть деньги?",
      a: "Возвраты за подписку оформляют сами Apple и Google: reportaproblem.apple.com (iOS) или play.google.com/store/account (Android). Обычно они одобряют возврат за неиспользованный период. Сами мы возвраты за покупки в App Store и Google Play не проводим.",
    },
    {
      q: "Подходит ли Brainura пожилым людям и при деменции?",
      a: "Brainura — приложение для тренировки и хорошего самочувствия, а не медицинское изделие. Оно не предназначено для диагностики, лечения или излечения каких-либо когнитивных нарушений. Если вас беспокоит ухудшение памяти или мышления, обратитесь к врачу.",
    },
  ],
};

const UK: Support = {
  meta: { title: "Підтримка", description: "Допомога з Brainura: напишіть нам на пошту або знайдіть відповідь у частих запитаннях." },
  h1: { before: "Ми тут, щоб ", accent: "допомогти" },
  lead: "Відповіді на більшість запитань — нижче. Якщо не знайшли потрібного, напишіть нам — відповімо протягом одного робочого дня.",
  email: { title: "Підтримка поштою", body: "Пишіть будь-коли на адресу нижче — ми читаємо кожен лист." },
  faqTitle: "Часті запитання",
  items: [
    {
      q: "Як скасувати підписку?",
      a: "Підписками керують App Store (iOS) і Google Play (Android). На iPhone: Параметри → ваше ім’я → Підписки → Brainura → Скасувати підписку. На Android: Google Play → значок профілю → Платежі й підписки → Підписки → Brainura → Скасувати підписку. Доступ до Premium збережеться до кінця оплаченого періоду.",
    },
    {
      q: "Premium придбано, але в застосунку він не активний.",
      a: `Відкрийте в Brainura екран Premium і натисніть «Відновити покупки». Якщо не допомогло, повністю закрийте застосунок і відкрийте знову. Досі не працює? Напишіть на ${SUPPORT_EMAIL} і додайте чек про покупку — розберемося протягом 24 годин.`,
    },
    {
      q: "Чи можна перенести прогрес між iPhone і Android?",
      a: "Поки ні. У Brainura немає акаунтів, тому прогрес залишається на тому пристрої, де ви його заробили. Підписки купуються через Apple або Google, тож покупка на одній платформі не переноситься на іншу автоматично.",
    },
    {
      q: "Що буде з моїми даними, якщо видалити застосунок?",
      a: `Під час видалення застосунку стирається все, що зберігається на пристрої. Щоб стерти прогрес, не видаляючи застосунок, відкрийте Налаштування → «Небезпечна зона» → «Скинути всі дані». Якщо потрібно видалити й дані, синхронізовані з нашим сервером, напишіть на ${SUPPORT_EMAIL} з темою «Data Deletion Request» — видалимо протягом 30 днів. Акаунтів у Brainura немає, тож укажіть свій нік у застосунку, якщо ви його задавали: так ми знайдемо ваші дані.`,
    },
    {
      q: "Як повернути кошти?",
      a: "Повернення коштів за підписку оформлюють самі Apple і Google: reportaproblem.apple.com (iOS) або play.google.com/store/account (Android). Зазвичай вони схвалюють повернення за невикористаний період. Самі ми повернення за покупки в App Store і Google Play не проводимо.",
    },
    {
      q: "Чи підходить Brainura літнім людям і при деменції?",
      a: "Brainura — застосунок для тренування й гарного самопочуття, а не медичний виріб. Він не призначений для діагностики, лікування чи зцілення будь-яких когнітивних порушень. Якщо вас турбує погіршення пам’яті чи мислення, зверніться до лікаря.",
    },
  ],
};

export const SUPPORT: Partial<Record<Locale, Support>> = { en: EN, ru: RU, uk: UK, qa: EN };

export function supportFor(lang: Locale): Support | undefined {
  return SUPPORT[lang];
}
