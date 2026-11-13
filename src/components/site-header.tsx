import Image from "next/image";
import Link from "next/link";
import { sectionPath, supportPath, type Locale } from "@/lib/i18n";
import { supportFor } from "@/content/support";
// Переключатель языка (./lang-switch.tsx) временно снят с шапки по просьбе владельца 13.11.
// Вернуть: импортировать LangSwitch + собрать LANG_OPTIONS из DEFAULT_LOCALE/subdomainLocales()/LOCALES
// и поставить <LangSwitch current={LOCALES[lang].hreflang} options={LANG_OPTIONS} /> перед кнопкой «Скачать».
import { landingFor } from "@/content/landing";
import { UI } from "@/lib/ui";
import { playUrl } from "@/lib/site";

const item = "rounded-full px-3 py-2 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]";

/**
 * Шапка. Английская — как была (лендинг с якорями). Языковая (поддомен) — разделы,
 * в которых на этом языке есть страницы, и «Скачать» сразу в Play на языке страницы.
 */
export function SiteHeader({ lang = "en", sections }: { lang?: Locale; sections?: { games: boolean; tests: boolean; learn: boolean } }) {
  const t = UI[lang].nav;
  const en = lang === "en";
  const has = sections ?? { games: true, tests: true, learn: true };
  // У языка с лендингом на главной есть якоря #features и #download — шапка как у английской.
  const landing = en || !!landingFor(lang);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)]/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Brainura" width={32} height={32} className="rounded-lg" priority />
          <span className="text-lg font-bold tracking-tight text-[var(--color-text)]">Brainura</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)]">
          {landing && (
            <Link href="/#features" className={`hidden sm:block ${item}`}>
              {t.features}
            </Link>
          )}
          {has.games && (
            <Link href={sectionPath(lang, "games")} className={`hidden sm:block ${item}`}>
              {t.games}
            </Link>
          )}
          {has.tests && (
            <Link href={sectionPath(lang, "tests")} className={item}>
              {t.tests}
            </Link>
          )}
          {!en && has.learn && (
            <Link href={sectionPath(lang, "learn")} className={`hidden sm:block ${item}`}>
              {t.learn}
            </Link>
          )}
          {/* Поддержка — только если у языка есть своя страница: не уводить на чужую версию. */}
          {supportFor(lang) && (
            <Link href={supportPath(lang)} className={`hidden sm:block ${item}`}>
              {t.support}
            </Link>
          )}
          <a
            href={landing ? "/#download" : playUrl(`${lang}-header`, "seo", lang)}
            className="btn-gradient ml-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            {t.download}
          </a>
        </nav>
      </div>
    </header>
  );
}
