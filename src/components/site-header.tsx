import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { sectionPath, supportPath, type Locale } from "@/lib/i18n";
import { supportFor } from "@/content/support";
// Переключатель языка (./lang-switch.tsx) временно снят с шапки по просьбе владельца 13.11.
// Вернуть: импортировать LangSwitch + собрать LANG_OPTIONS из DEFAULT_LOCALE/subdomainLocales()/LOCALES
// и поставить <LangSwitch current={LOCALES[lang].hreflang} options={LANG_OPTIONS} /> перед кнопкой «Скачать».
import { landingFor } from "@/content/landing";
import { pagesOf } from "@/content/registry";
import { UI } from "@/lib/ui";
import { playUrl } from "@/lib/site";
import { MobileMenu, type MenuGroup } from "./mobile-menu";

const item = "rounded-full px-3 py-2 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]";

/**
 * Шапка. «Игры ▾» и «Тесты ▾» — мега-меню со ВСЕМИ страницами раздела на языке страницы
 * (решение владельца 13.11.2026: сквозные ссылки на игры и тесты с каждой страницы сайта).
 * 🔒 Ссылки отрисованы сервером и всегда лежат в HTML — панель только прячется CSS-ом
 * (hover / focus-within), а не подгружается скриптом: иначе поисковик их не увидит.
 * Список берётся из реестра — новая страница появится в меню сама. На телефоне — ☰ (MobileMenu).
 */
export function SiteHeader({ lang = "en", sections }: { lang?: Locale; sections?: { games: boolean; tests: boolean; learn: boolean } }) {
  const t = UI[lang].nav;
  const en = lang === "en";
  const has = sections ?? { games: true, tests: true, learn: true };
  // У языка с лендингом на главной есть якоря #features и #download — шапка как у английской.
  const landing = en || !!landingFor(lang);

  const groups: MenuGroup[] = (["games", "tests"] as const)
    .filter((s) => has[s])
    .map((s) => ({
      title: s === "games" ? t.games : t.tests,
      href: sectionPath(lang, s),
      links: pagesOf(s, lang).map((p) => ({ name: p.name, href: `${sectionPath(lang, s)}/${p.slug}` })),
    }))
    .filter((g) => g.links.length > 0);

  const extra = [
    ...(landing ? [{ name: t.features, href: "/#features" }] : []),
    ...(!en && has.learn ? [{ name: t.learn, href: sectionPath(lang, "learn") }] : []),
    ...(supportFor(lang) ? [{ name: t.support, href: supportPath(lang) }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)]/60 bg-white/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Brainura" width={32} height={32} className="rounded-lg" priority />
          <span className="text-lg font-bold tracking-tight text-[var(--color-text)]">Brainura</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)]">
          {landing && (
            <Link href="/#features" className={`hidden md:block ${item}`}>
              {t.features}
            </Link>
          )}
          {groups.map((g) => (
            <div key={g.href} className="group relative hidden md:block">
              <Link href={g.href} className={`inline-flex items-center gap-1 ${item}`}>
                {g.title}
                <ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </Link>
              <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul
                  className={`grid gap-1 rounded-2xl border border-[var(--color-border)]/70 bg-white p-3 shadow-xl ${
                    g.links.length > 8 ? "w-[640px] grid-cols-3" : "w-[440px] grid-cols-2"
                  }`}
                >
                  {g.links.map((l) => (
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
          ))}
          {!en && has.learn && (
            <Link href={sectionPath(lang, "learn")} className={`hidden md:block ${item}`}>
              {t.learn}
            </Link>
          )}
          {/* Поддержка — только если у языка есть своя страница: не уводить на чужую версию. */}
          {supportFor(lang) && (
            <Link href={supportPath(lang)} className={`hidden md:block ${item}`}>
              {t.support}
            </Link>
          )}
          <a
            href={landing ? "/#download" : playUrl(`${lang}-header`, "seo", lang)}
            className="btn-gradient ml-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            {t.download}
          </a>
          {(groups.length > 0 || extra.length > 0) && <MobileMenu label={t.menu} groups={groups} extra={extra} />}
        </nav>
      </div>
    </header>
  );
}
