import { absoluteUrl, isLocale, LOCALES, subdomainLocales, type Locale } from "@/lib/i18n";
import { SECTIONS, hubVersions, pagesOf, versionsOf, type SectionKey } from "@/content/registry";

// sitemap.xml поддомена языка: <код>.brainura.app/sitemap.xml (src/proxy.ts переписывает
// в /<код>/sitemap.xml). Только страницы этого языка; у каждой — hreflang всех версий.
// Search Console «Домен» видит sitemap всех поддоменов.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return subdomainLocales().map((lang) => ({ lang }));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function urlTag(loc: string, lastmod: string | undefined, alts: { lang: Locale; path: string }[]) {
  const links = alts
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${LOCALES[a.lang].hreflang}" href="${esc(absoluteUrl(a.lang, a.path))}"/>`)
    .join("\n");
  const xdef = alts.find((a) => a.lang === "en");
  const x = xdef ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl("en", xdef.path))}"/>` : "";
  return `  <url>\n    <loc>${esc(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n${links}${x}\n  </url>`;
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const urls: string[] = [urlTag(absoluteUrl(lang, "/"), undefined, [{ lang, path: "/" }])];
  for (const section of Object.keys(SECTIONS) as SectionKey[]) {
    const pages = pagesOf(section, lang);
    if (!pages.length) continue;
    const latest = pages.map((p) => p.updated).sort().at(-1);
    urls.push(urlTag(absoluteUrl(lang, SECTIONS[section].path), latest, hubVersions(section)));
    for (const p of pages) {
      urls.push(urlTag(absoluteUrl(lang, `${SECTIONS[section].path}/${p.slug}`), p.updated, versionsOf(section, p.key)));
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
