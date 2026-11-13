"use client";

// Меню шапки на телефоне (☰). Ссылки отрисованы сервером и всегда есть в HTML (их видит поисковик);
// клиентская часть только закрывает меню после перехода — шапка живёт в layout и без этого осталась бы открытой.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export interface MenuGroup {
  title: string;
  href: string;
  links: { name: string; href: string }[];
}

export function MobileMenu({ label, groups, extra }: { label: string; groups: MenuGroup[]; extra: { name: string; href: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group md:hidden">
      <summary
        aria-label={label}
        className="flex cursor-pointer list-none items-center rounded-full p-2 text-[var(--color-text)] hover:bg-[var(--color-surface)] [&::-webkit-details-marker]:hidden"
      >
        <Menu className="h-6 w-6 group-open:hidden" aria-hidden="true" />
        <X className="hidden h-6 w-6 group-open:block" aria-hidden="true" />
      </summary>
      <div className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--color-border)]/60 bg-white px-6 pb-6 pt-2 shadow-lg">
        {groups.map((g) => (
          <div key={g.href} className="mt-4">
            <Link href={g.href} className="text-base font-bold text-[var(--color-text)]">
              {g.title}
            </Link>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {extra.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)]/60 pt-4">
            {extra.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
