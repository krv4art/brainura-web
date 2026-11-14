import Link from "next/link";
import { absoluteUrl, LOCALES, sectionPath, type Locale } from "@/lib/i18n";
import { UI } from "@/lib/ui";
import { builtLocales, supportHref } from "@/content/registry";
import { SecretLangSwitch, type SecretLang } from "./secret-lang-switch";
import { ConsentSettingsLink } from "./site-analytics";

// Языки скрытого переключателя: всё, что собирается в этой сборке (qa — только локально).
const SECRET_LANGS: SecretLang[] = builtLocales().map((l) => ({
  hreflang: LOCALES[l].hreflang,
  label: l,
  home: absoluteUrl(l, "/"),
}));

/**
 * Подвал. На поддомене языка: свои разделы относительными ссылками, а юридические
 * страницы и поддержка — на brainura.app (они только на английском), плюс ссылка
 * на английскую версию сайта.
 */
export function SiteFooter({ lang = "en", sections }: { lang?: Locale; sections?: { games: boolean; tests: boolean; learn: boolean } }) {
  const t = UI[lang].footer;
  const en = lang === "en";
  const has = sections ?? { games: true, tests: true, learn: true };
  const main = (p: string) => (en ? p : absoluteUrl("en", p));
  return (
    <footer className="border-t border-[var(--color-border)]/60 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <span className="text-base font-bold text-[var(--color-text)]">Brainura</span>
          {/* data-secret-langs: 5 быстрых нажатий включают скрытый переключатель языка (secret-lang-switch.tsx). */}
          <p data-secret-langs className="select-none text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Brainura. {t.rights}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-secondary)]">
          {has.games && <Link href={sectionPath(lang, "games")} className="hover:text-[var(--color-text)]">{t.brainGames}</Link>}
          {has.tests && <Link href={sectionPath(lang, "tests")} className="hover:text-[var(--color-text)]">{t.brainTests}</Link>}
          {has.learn && <Link href={sectionPath(lang, "learn")} className="hover:text-[var(--color-text)]">{t.learn}</Link>}
          <a href={main("/privacy")} className="hover:text-[var(--color-text)]">{t.privacy}</a>
          <a href={main("/terms")} className="hover:text-[var(--color-text)]">{t.terms}</a>
          <a href={supportHref(lang)} className="hover:text-[var(--color-text)]">{t.support}</a>
          <a href="mailto:krv4art.dev@gmail.com" className="hover:text-[var(--color-text)]">krv4art.dev@gmail.com</a>
          <ConsentSettingsLink label={UI[lang].consent.settings} />
          {!en && (
            <a href={absoluteUrl("en", "/")} hrefLang="en" className="hover:text-[var(--color-text)]">{LOCALES.en.nativeName}</a>
          )}
        </nav>
      </div>
      <SecretLangSwitch current={LOCALES[lang].hreflang} langs={SECRET_LANGS} />
    </footer>
  );
}
