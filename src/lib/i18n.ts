// Каркас языков сайта (SEO_PLAN §2, шаг 0.3).
//
// 🔒 Схема URL — ПОДДОМЕНЫ (решение владельца 11.11.2026): английский на brainura.app
// (он же x-default), каждый другой язык — на своём поддомене с теми же путями:
// `de.brainura.app/tests/stroop-test`. Существующие адреса brainura.app не переезжают.
//
// Зачем поддомены: языки с низкой конкуренцией набирают органику отдельно, а их вес
// уходит на ключевые английские страницы контекстными ссылками («в белую»: ссылки в
// тексте по смыслу + hreflang, без скрытых и сквозных блоков). Search Console — один
// ресурс «Домен» (DNS) на все поддомены.
//
// Добавить язык:
//   1. строка в LOCALES (host = "<код>.brainura.app");
//   2. DNS в Cloudflare: CNAME <код> → cname.vercel-dns.com (или один wildcard `*`);
//      домен <код>.brainura.app в проекте Vercel;
//   3. src/proxy.ts: запрос на <код>.brainura.app переписывается во внутренний
//      `/<код>/…` → папка `src/app/[lang]/…` с теми же шаблонами
//      (generateStaticParams по языкам, у которых есть контент);
//   4. sitemap: у каждого поддомена свой `/sitemap.xml` (Search Console «Домен» видит все);
//   5. контент страницы на этом языке — в её реестре (`locales: ["en", "de"]`). Слаги —
//      свои, под ключи языка; ключи собираются заново (SEO_PLAN §6, волна 4), тексты
//      пишутся вручную, по языку за сессию.

export type Locale = "en";

interface LocaleInfo {
  /** BCP 47 для hreflang и <html lang>. */
  hreflang: string;
  /** Хост языка. */
  host: string;
  /** Название языка на нём самом — для переключателя. */
  nativeName: string;
}

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: Record<Locale, LocaleInfo> = {
  en: { hreflang: "en", host: "brainura.app", nativeName: "English" },
};

/** Путь на хосте языка не меняется: поддомен сам задаёт язык. */
export function localizedPath(_lang: Locale, path: string): string {
  return path || "/";
}

export function absoluteUrl(lang: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return `https://${LOCALES[lang].host}${clean}` || "/";
}

/**
 * `alternates` для generateMetadata: canonical + hreflang для каждого языка, на
 * котором страница существует, + x-default (английская версия на brainura.app).
 * Пример: pageAlternates("/tests/stroop-test", "en", ["en"]).
 */
export function pageAlternates(path: string, lang: Locale, available: Locale[] = ["en"]) {
  const languages: Record<string, string> = {};
  for (const l of available) languages[LOCALES[l].hreflang] = absoluteUrl(l, path);
  if (available.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, path);
  }
  return { canonical: absoluteUrl(lang, path), languages };
}
