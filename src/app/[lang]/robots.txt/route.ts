import { absoluteUrl, isLocale, subdomainLocales } from "@/lib/i18n";

// robots.txt поддомена языка (src/proxy.ts → /<код>/robots.txt). Sitemap — свой.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return subdomainLocales().map((lang) => ({ lang }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(lang, "/sitemap.xml")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
