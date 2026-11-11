import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestView, testMetadata } from "@/components/seo/views";
import { isLocale, subdomainLocales } from "@/lib/i18n";
import { L10N } from "@/content/l10n";

// Тест на языке поддомена. Контент — src/content/l10n/<код>.ts, инструмент — по `key`.

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const langs = params?.lang ? [params.lang] : subdomainLocales();
  return langs.flatMap((lang) => (isLocale(lang) ? (L10N[lang]?.tests ?? []).map((t) => ({ lang, slug: t.slug })) : []));
}

function find(lang: string, slug: string) {
  return isLocale(lang) ? L10N[lang]?.tests.find((t) => t.slug === slug) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = find(lang, slug);
  return t && isLocale(lang) ? testMetadata(t, lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const t = find(lang, slug);
  if (!t || !isLocale(lang)) notFound();
  return <TestView t={t} lang={lang} />;
}
