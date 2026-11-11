import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView, articleMetadata } from "@/components/seo/views";
import { ARTICLES_ALL, articleBySlug } from "@/content/articles";

// Статья под info-кластер (SEO_PLAN §5, тип «Статья»). Контент — src/content/articles.ts,
// вёрстка — ArticleView (общая с языковыми версиями).

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES_ALL.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  return a ? articleMetadata(a, "en") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  return <ArticleView a={a} lang="en" />;
}
