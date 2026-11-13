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
      a: "Subscriptions are managed by Apple App Store (iOS) or Google Play (Android). Open your device Settings → Apple ID / Google Account → Subscriptions → Brainura → Cancel. Your premium access remains until the end of the current billing period.",
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

export const SUPPORT: Partial<Record<Locale, Support>> = { en: EN, qa: EN };

export function supportFor(lang: Locale): Support | undefined {
  return SUPPORT[lang];
}
