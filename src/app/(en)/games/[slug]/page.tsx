import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameView, gameMetadata } from "@/components/seo/views";
import { GAME_PAGES, gameBySlug } from "@/content/games";
import { TESTS } from "@/content/registry";

// Страница игры приложения (SEO_PLAN §5, тип «Страница игры»). Контент — в
// src/content/games.ts; страницы только у игр с `page`, остальные слаги — 404.
// Вёрстка — GameView (общая с языковыми версиями).

export const dynamicParams = false;

export function generateStaticParams() {
  return GAME_PAGES().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = gameBySlug(slug);
  return g?.page ? gameMetadata(g.slug, g.slug, g.page, "en") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = gameBySlug(slug);
  if (!g?.page) notFound();
  const p = g.page;

  // Связанные: тесты по теме + игры с общим навыком.
  const relatedTests = (p.tests ?? [])
    .map((s) => TESTS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => !!t)
    .map((t) => ({ href: `/tests/${t.slug}`, title: `${t.name} (online)`, body: t.blurb }));
  const relatedGames = GAME_PAGES()
    .filter((o) => o.slug !== g.slug && o.skills.some((s) => g.skills.includes(s)))
    .slice(0, 4 - Math.min(relatedTests.length, 2))
    .map((o) => ({ href: `/games/${o.slug}`, title: o.name, body: o.blurb }));

  return <GameView game={g} slug={g.slug} name={g.name} page={p} lang="en" related={[...relatedTests, ...relatedGames]} />;
}
