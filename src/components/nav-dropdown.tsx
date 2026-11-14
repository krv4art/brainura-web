"use client";

// Выпадающая панель шапки на десктопе («Игры ▾», «Тесты ▾»). Ссылки отрисованы сервером и всегда
// лежат в HTML; клиентская часть только закрывает панель после выбора пункта.
//
// 🔒 Почему нужен state: панель показывается по `:hover` и `:focus-within`. После клика по пункту
// шапка (она в layout) не перерисовывается, курсор остаётся над панелью, а фокус — на ссылке, поэтому
// панель висела открытой, пока не кликнешь мимо. Теперь клик помечает группу `data-closed` (панель
// принудительно скрыта) и снимает фокус; метка снимается при следующем заходе курсора или фокусе.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { MenuGroup } from "./mobile-menu";

export function NavDropdown({ group, itemClass }: { group: MenuGroup; itemClass: string }) {
  const [closed, setClosed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Переход состоялся (в т.ч. по ссылке-заголовку): закрыть и снять фокус.
  // Только при СМЕНЕ адреса — на первой отрисовке эффект тоже срабатывает, и меню было бы закрыто сразу.
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setClosed(true);
    (document.activeElement as HTMLElement | null)?.blur?.();
  }, [pathname]);

  const close = () => {
    setClosed(true);
    (document.activeElement as HTMLElement | null)?.blur?.();
  };

  return (
    <div
      ref={ref}
      data-closed={closed}
      // Открыть снова — при новом заходе курсора или фокусе с клавиатуры. Не по mouseleave: клик прячет
      // панель, браузер сразу шлёт mouseleave, а эффект смены адреса ставит метку уже ПОСЛЕ него —
      // курсор снаружи, событий больше нет, и меню оставалось заблокированным.
      onMouseEnter={() => setClosed(false)}
      onFocus={() => setClosed(false)}
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest("a")) close();
      }}
      className="group relative hidden md:block"
    >
      <Link href={group.href} className={`inline-flex items-center gap-1 ${itemClass}`}>
        {group.title}
        <ChevronDown
          className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180 group-data-[closed=true]:!rotate-0"
          aria-hidden="true"
        />
      </Link>
      <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 group-data-[closed=true]:!invisible group-data-[closed=true]:!opacity-0">
        <ul
          className={`grid gap-1 rounded-2xl border border-[var(--color-border)]/70 bg-white p-3 shadow-xl ${
            group.links.length > 8 ? "w-[640px] grid-cols-3" : "w-[440px] grid-cols-2"
          }`}
        >
          {group.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
