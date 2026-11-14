"use client";

// Google Analytics 4 на сайте (решение владельца 14.11.2026): веб-поток «brainura.app (site)» в том же
// ресурсе GA4, что и приложение (527359208, поток 16340112520).
//
// 🔒 Согласие (Consent Mode v2): до ответа в баннере всё «denied» — GA шлёт только обезличенные пинги
// без cookie. «Принять» → analytics_storage = granted. Реклама (ad_storage и пр.) не включается никогда.
// Выбор помнится cookie `bl_consent` на весь `.brainura.app` (один ответ на всех поддоменах) и
// отзывается ссылкой «Настройки cookie» в подвале (событие `bl-consent-open`).
//
// 🔒 Страницы расширения (/extension/*) GA не грузят: политика обещает там только Vercel Analytics без cookie.
//
// События: `store_click` — клик по Google Play / App Store / Chrome Web Store. Параметры — уже
// зарегистрированные в ресурсе (лимит пользовательских параметров общий с приложением):
//   kind  = play | app_store | chrome
//   entry = header | promo | download | landing | footer | content
// Язык страницы виден по поддомену (измерение «Имя хоста»).

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { UI } from "@/lib/ui";

export const GA_ID = "G-CDE4TNLNJD";
const COOKIE = "bl_consent";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const m = document.cookie.match(/(?:^|; )bl_consent=(granted|denied)/);
    if (m) return m[1] as Choice;
    const ls = localStorage.getItem(COOKIE);
    return ls === "granted" || ls === "denied" ? ls : null;
  } catch {
    return null;
  }
}

function saveChoice(c: Choice) {
  const host = location.hostname;
  const domain = host === "brainura.app" || host.endsWith(".brainura.app") ? "; domain=.brainura.app" : "";
  document.cookie = `${COOKIE}=${c}; path=/; max-age=31536000; SameSite=Lax${domain}`;
  try {
    localStorage.setItem(COOKIE, c);
  } catch {
    /* приватное окно — живём на cookie */
  }
}

function area(a: Element): string {
  if (a.closest("header")) return "header";
  if (a.closest("footer")) return "footer";
  if (a.closest("aside")) return "promo";
  if (a.closest("section.btn-gradient")) return "download";
  if (a.closest("[data-landing]")) return "landing";
  return "content";
}

function storeOf(href: string): string | null {
  if (href.includes("play.google.com")) return "play";
  if (href.includes("apps.apple.com")) return "app_store";
  if (href.includes("chromewebstore.google.com") || href.includes("chrome.google.com/webstore")) return "chrome";
  return null;
}

// Инициализация до загрузки gtag.js: очередь dataLayer обработается по порядку, так что согласие
// по умолчанию гарантированно применится раньше config.
const INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var c = (document.cookie.match(/(?:^|; )bl_consent=(granted|denied)/) || [])[1];
try { c = c || localStorage.getItem('${COOKIE}'); } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: c === 'granted' ? 'granted' : 'denied',
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('js', new Date());
gtag('config', '${GA_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });
`;

export function SiteAnalytics({ lang = "en" }: { lang?: Locale }) {
  const pathname = usePathname();
  const off = pathname.startsWith("/extension");
  const [choice, setChoice] = useState<Choice | null>("denied"); // до чтения — баннер не мигает
  const t = UI[lang].consent;

  useEffect(() => {
    setChoice(readChoice());
    const reopen = () => setChoice(null);
    window.addEventListener("bl-consent-open", reopen);
    return () => window.removeEventListener("bl-consent-open", reopen);
  }, []);

  // Клики по магазинам — одним слушателем на весь документ.
  useEffect(() => {
    if (off) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]");
      if (!a) return;
      const kind = storeOf(a.getAttribute("href") ?? "");
      if (kind) window.gtag?.("event", "store_click", { kind, entry: area(a) }); // gtag сам шлёт пачку через sendBeacon при уходе со страницы
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [off]);

  const decide = (c: Choice) => {
    saveChoice(c);
    window.gtag?.("consent", "update", { analytics_storage: c });
    setChoice(c);
  };

  if (off) return null;
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">{INIT}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      {choice === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t.settings}
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-xl sm:p-5"
        >
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {t.text}{" "}
            <a href={t.privacyHref} className="font-semibold text-[var(--color-primary)] underline">
              {t.more}
            </a>
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface)]"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold text-white shadow"
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Ссылка «Настройки cookie» в подвале: снова показывает баннер. */
export function ConsentSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("bl-consent-open"))}
      className="hover:text-[var(--color-text)]"
    >
      {label}
    </button>
  );
}
