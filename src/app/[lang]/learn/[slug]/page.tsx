import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView, articleMetadata } from "@/components/seo/views";
import { isLocale, subdomainLocales } from "@/lib/i18n";
import { L10N } from "@/content/l10n";

// Статья на языке поддомена. Контент — src/content/l10n/<код>.ts (articles).

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const langs = params?.lang ? [params.lang] : subdomainLocales();
  return langs.flatMap((lang) => (isLocale(lang) ? (L10N[lang]?.articles ?? []).map((a) => ({ lang, slug: a.slug })) : []));
}

function find(lang: string, slug: string) {
  return isLocale(lang) ? L10N[lang]?.articles.find((a) => a.slug === slug) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = find(lang, slug);
  return a && isLocale(lang) ? articleMetadata(a, lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const a = find(lang, slug);
  if (!a || !isLocale(lang)) notFound();
  return <ArticleView a={a} lang={lang} />;
}
