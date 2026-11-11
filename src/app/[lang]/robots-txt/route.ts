import { absoluteUrl, isLocale, subdomainLocales } from "@/lib/i18n";

// robots.txt поддомена языка (src/proxy.ts → /<код>/robots-txt). Sitemap — свой.

// Папка без расширения в имени (`sitemap-xml`, не `sitemap.xml`): с точкой сборщик Vercel
// падал «failed to find source route … for prerender». Ответ динамический — дёшево и без
// пререндера пустого списка языков.
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !subdomainLocales().includes(lang)) return new Response("Not found", { status: 404 });
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(lang, "/sitemap.xml")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
