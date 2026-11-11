import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GamePage } from "@/components/seo/templates";
import { GAME_PAGES, gameBySlug } from "@/content/games";
import { TESTS } from "@/content/registry";
import { pageAlternates } from "@/lib/i18n";

// Страница игры приложения (SEO_PLAN §5, тип «Страница игры»). Контент — в
// src/content/games.ts; страницы только у игр с `page`, остальные слаги — 404.

export const dynamicParams = false;

export function generateStaticParams() {
  return GAME_PAGES().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = gameBySlug(slug);
  if (!g?.page) return {};
  const path = `/games/${g.slug}`;
  return {
    title: { absolute: g.page.title },
    description: g.page.description,
    alternates: pageAlternates(path, "en"),
    openGraph: { title: g.page.title, description: g.page.description, url: path, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = gameBySlug(slug);
  if (!g?.page) notFound();
  const p = g.page;
  const path = `/games/${g.slug}`;

  // Связанные: тесты по теме + игры с общим навыком.
  const relatedTests = (p.tests ?? [])
    .map((s) => TESTS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => !!t)
    .map((t) => ({ href: `/tests/${t.slug}`, title: `${t.name} (online)`, body: t.blurb }));
  const relatedGames = GAME_PAGES()
    .filter((o) => o.slug !== g.slug && o.skills.some((s) => g.skills.includes(s)))
    .slice(0, 4 - Math.min(relatedTests.length, 2))
    .map((o) => ({ href: `/games/${o.slug}`, title: o.name, body: o.blurb }));

  return (
    <GamePage
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Games", path: "/games" },
        { name: g.name, path },
      ]}
      h1={p.h1}
      description={p.description}
      lead={<p>{p.lead}</p>}
      hero={
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {g.skills.map((s) => (
            <span key={s} className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 font-semibold text-[var(--color-primary)]">
              {s}
            </span>
          ))}
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[var(--color-text-secondary)]">
            {g.premium ? "Premium · free for the first 7 days" : "Free in the app"}
          </span>
        </div>
      }
      faq={p.faq}
      sources={p.sources}
      related={[...relatedTests, ...relatedGames]}
      campaign={`game-${g.slug}`}
      download={{
        title: `Play ${g.name} in Brainura`,
        body: "One of 26 short brain games with levels that adapt as you improve. Five minutes a day, no ads, no account.",
      }}
    >
      <h2>How to play {g.name}</h2>
      <ol>
        {p.howToPlay.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {p.sections.map((s) => (
        <section key={s.h2}>
          <h2>{s.h2}</h2>
          {s.paragraphs.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </section>
      ))}
    </GamePage>
  );
}
