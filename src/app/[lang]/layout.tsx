import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { absoluteUrl, isLocale, LOCALES, subdomainLocales } from "@/lib/i18n";
import { sectionsAvailable } from "@/content/registry";
import "../globals.css";

// Корневой layout языковых поддоменов (<код>.brainura.app → /<код>/… через src/proxy.ts).
// Свой <html lang>; шапка и подвал — на языке, только с разделами, где есть страницы.
// Чат поддержки не подключён: он только на английском.

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "vietnamese"],
  variable: "--font-manrope",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return subdomainLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    metadataBase: new URL(absoluteUrl(lang, "/")),
    title: { default: "Brainura", template: "%s | Brainura" },
    applicationName: "Brainura",
    openGraph: { type: "website", siteName: "Brainura", locale: LOCALES[lang].hreflang },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !subdomainLocales().includes(lang)) notFound();
  const sections = sectionsAvailable(lang);
  return (
    <html lang={LOCALES[lang].hreflang} className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader lang={lang} sections={sections} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} sections={sections} />
        <Analytics />
      </body>
    </html>
  );
}
