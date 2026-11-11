import Image from "next/image";
import Link from "next/link";
import { sectionPath, type Locale } from "@/lib/i18n";
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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)]/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Brainura" width={32} height={32} className="rounded-lg" priority />
          <span className="text-lg font-bold tracking-tight text-[var(--color-text)]">Brainura</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)]">
          {en && (
            <Link href="/#features" className={`hidden sm:block ${item}`}>
              Features
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
          {en && (
            <Link href="/support" className={`hidden sm:block ${item}`}>
              {t.support}
            </Link>
          )}
          <a
            href={en ? "/#download" : playUrl(`${lang}-header`, "seo", lang)}
            className="btn-gradient ml-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            {t.download}
          </a>
        </nav>
      </div>
    </header>
  );
}
