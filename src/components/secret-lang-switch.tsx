"use client";

// Скрытый переключатель языка для владельца (решение 14.11.2026): сравнивать одну и ту же
// страницу на en / ru / uk. Посетителям не виден.
//
// Как включить (и выключить тем же способом):
//   • клавиатура: Alt + Shift + L;
//   • телефон: 5 быстрых нажатий на строку «© … Brainura» в подвале;
//   • ссылкой: ?langs=1 (выключить — ?langs=0).
// Включение помнится cookie на весь `.brainura.app` (все поддомены) — переключился на ru,
// плашка на ru уже есть. На localhost cookie поддоменов не делит — там плашка несёт `?langs=1` в ссылке.
//
// Куда ведёт: та же страница на другом языке — из <link rel="alternate" hreflang> текущей страницы
// (их строит alternatesFor); если версии нет — главная языка, кнопка тогда пунктирная.

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface SecretLang {
  /** BCP 47, как в hreflang. */
  hreflang: string;
  /** Подпись на плашке. */
  label: string;
  /** Главная языка в проде (https://ru.brainura.app/). */
  home: string;
}

const COOKIE = "bl_langs";

function readOn(): boolean {
  try {
    return document.cookie.split("; ").some((c) => c === `${COOKIE}=1`) || localStorage.getItem(COOKIE) === "1";
  } catch {
    return false;
  }
}

function writeOn(on: boolean) {
  const host = location.hostname;
  const domain = host === "brainura.app" || host.endsWith(".brainura.app") ? "; domain=.brainura.app" : "";
  document.cookie = `${COOKIE}=${on ? "1" : "0"}; path=/; max-age=${on ? 31536000 : 0}; SameSite=Lax${domain}`;
  try {
    if (on) localStorage.setItem(COOKIE, "1");
    else localStorage.removeItem(COOKIE);
  } catch {
    /* приватное окно — живём на cookie */
  }
}

/** Прод-адрес → тот же адрес на локальном сервере (ru.brainura.app → ru.localhost:порт). */
function toLocal(href: string): string {
  const here = location;
  if (!here.hostname.endsWith("localhost")) return href;
  const u = new URL(href);
  const sub = u.hostname === "brainura.app" ? "" : u.hostname.replace(/\.brainura\.app$/, "") + ".";
  return `${here.protocol}//${sub}localhost${here.port ? ":" + here.port : ""}${u.pathname}${u.search}${u.hash}`;
}

export function SecretLangSwitch({ current, langs }: { current: string; langs: SecretLang[] }) {
  const [on, setOn] = useState(false);
  const [alts, setAlts] = useState<Record<string, string>>({});
  const pathname = usePathname();

  const toggle = useCallback((next?: boolean) => {
    setOn((prev) => {
      const v = next ?? !prev;
      writeOn(v);
      return v;
    });
  }, []);

  // Включение: ссылка ?langs=1 / 0 или память.
  useEffect(() => {
    const p = new URLSearchParams(location.search).get("langs");
    if (p === "1" || p === "0") toggle(p === "1");
    else setOn(readOn());
  }, [toggle]);

  // Alt+Shift+L и 5 нажатий на «©» в подвале.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.code === "KeyL") {
        e.preventDefault();
        toggle();
      }
    };
    let taps: number[] = [];
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-secret-langs]")) return;
      const now = Date.now();
      taps = [...taps.filter((t) => now - t < 2500), now];
      if (taps.length >= 5) {
        taps = [];
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [toggle]);

  // Версии текущей страницы — после каждой навигации (head обновляется чуть позже рендера).
  useEffect(() => {
    if (!on) return;
    const read = () => {
      const found: Record<string, string> = {};
      document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((l) => {
        found[l.hreflang.toLowerCase()] = l.href;
      });
      setAlts(found);
    };
    read();
    const t = setTimeout(read, 300);
    return () => clearTimeout(t);
  }, [on, pathname]);

  if (!on) return null;
  const local = typeof location !== "undefined" && location.hostname.endsWith("localhost");
  return (
    <nav
      aria-label="Языки (служебное)"
      className="fixed bottom-3 left-3 z-[100] flex items-center gap-1 rounded-full border border-black/10 bg-white/95 p-1 text-xs font-bold shadow-lg backdrop-blur"
    >
      {langs.map((l) => {
        const alt = alts[l.hreflang.toLowerCase()];
        const href = toLocal(alt ?? l.home) + (local ? (alt ?? l.home).includes("?") ? "&langs=1" : "?langs=1" : "");
        const isCur = l.hreflang === current;
        return (
          <a
            key={l.hreflang}
            href={href}
            hrefLang={l.hreflang}
            title={alt ? "Эта же страница" : "Версии нет — главная языка"}
            className={`rounded-full px-3 py-1.5 uppercase transition ${
              isCur
                ? "bg-[var(--color-primary)] text-white"
                : alt
                  ? "text-[var(--color-text)] hover:bg-black/5"
                  : "border border-dashed border-black/25 text-[var(--color-muted)] hover:bg-black/5"
            }`}
          >
            {l.label}
          </a>
        );
      })}
      <button
        type="button"
        onClick={() => toggle(false)}
        aria-label="Скрыть"
        className="rounded-full px-2 py-1.5 text-[var(--color-muted)] hover:bg-black/5"
      >
        ×
      </button>
    </nav>
  );
}
