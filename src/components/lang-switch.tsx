"use client";

// Переключатель языка в шапке. Ведёт на ту же страницу на другом языке, если она есть:
// адрес берётся из <link rel="alternate" hreflang> текущей страницы (их уже строит
// alternatesFor для каждой страницы), иначе — на главную выбранного языка.
// Читаем при открытии списка, а не при рендере: после клиентской навигации <head> обновляется позже.

import { useState } from "react";
import { Globe } from "lucide-react";

export interface LangOption {
  /** BCP 47 из LOCALES — совпадает с hreflang страницы. */
  hreflang: string;
  /** Название языка на нём самом. */
  name: string;
  /** Главная языка (запасной адрес). */
  home: string;
}

export function LangSwitch({ current, options }: { current: string; options: LangOption[] }) {
  const [alts, setAlts] = useState<Record<string, string>>({});

  const readAlternates = () => {
    const found: Record<string, string> = {};
    document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((l) => {
      found[l.hreflang.toLowerCase()] = l.href;
    });
    setAlts(found);
  };

  const cur = options.find((o) => o.hreflang === current);
  return (
    <details className="relative" onToggle={(e) => e.currentTarget.open && readAlternates()}>
      <summary
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] [&::-webkit-details-marker]:hidden"
        aria-label={cur?.name ?? current}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{current}</span>
      </summary>
      <ul className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white py-1 shadow-lg">
        {options.map((o) => (
          <li key={o.hreflang}>
            <a
              href={alts[o.hreflang.toLowerCase()] ?? o.home}
              hrefLang={o.hreflang}
              lang={o.hreflang}
              aria-current={o.hreflang === current ? "true" : undefined}
              className={`block px-4 py-2 text-sm hover:bg-[var(--color-surface)] ${
                o.hreflang === current ? "font-semibold text-[var(--color-text)]" : "text-[var(--color-text-secondary)]"
              }`}
            >
              {o.name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
