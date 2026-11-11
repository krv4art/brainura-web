import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/seo/templates";
import { ARTICLES_ALL, articleBySlug } from "@/content/articles";
import { pageAlternates } from "@/lib/i18n";

// Статья под info-кластер (SEO_PLAN §5, тип «Статья»). Контент — src/content/articles.ts.

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES_ALL.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  const path = `/learn/${a.slug}`;
  return {
    title: { absolute: a.title },
    description: a.description,
    alternates: pageAlternates(path, "en"),
    openGraph: {
      title: a.title,
      description: a.description,
      url: path,
      type: "article",
      publishedTime: a.published,
      modifiedTime: a.updated ?? a.published,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const path = `/learn/${a.slug}`;
  return (
    <ArticlePage
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
        { name: a.name, path },
      ]}
      h1={a.h1}
      description={a.description}
      lead={<p>{a.lead}</p>}
      faq={a.faq}
      sources={a.sources}
      related={a.related}
      campaign={`learn-${a.slug}`}
      published={a.published}
      modified={a.updated}
      download={{
        title: "Five minutes of brain games a day",
        body: "Brainura has 26 short games for memory, attention, speed and logic, with honest expectations and no ads.",
      }}
    >
      {a.sections.map((s) => (
        <section key={s.h2}>
          <h2>{s.h2}</h2>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </section>
      ))}
    </ArticlePage>
  );
}
