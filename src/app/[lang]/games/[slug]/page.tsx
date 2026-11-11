import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameView, gameMetadata } from "@/components/seo/views";
import { isLocale, subdomainLocales, type Locale } from "@/lib/i18n";
import { L10N } from "@/content/l10n";
import { GAMES_ALL } from "@/content/games";

// Страница игры на языке поддомена. Контент — src/content/l10n/<код>.ts (games);
// навыки и премиум — из общего реестра игр по `key`.

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const langs = params?.lang ? [params.lang] : subdomainLocales();
  return langs.flatMap((lang) => (isLocale(lang) ? (L10N[lang]?.games ?? []).map((g) => ({ lang, slug: g.slug })) : []));
}

function find(lang: string, slug: string) {
  return isLocale(lang) ? L10N[lang]?.games.find((g) => g.slug === slug) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const g = find(lang, slug);
  return g && isLocale(lang) ? gameMetadata(g.slug, g.key, g.page, lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const g = find(lang, slug);
  const game = g && GAMES_ALL.find((x) => x.slug === g.key);
  if (!g || !game || !isLocale(lang)) notFound();
  const all = L10N[lang as Locale]?.games ?? [];
  const related = all
    .filter((o) => o.key !== g.key)
    .filter((o) => GAMES_ALL.find((x) => x.slug === o.key)?.skills.some((s) => game.skills.includes(s)))
    .slice(0, 4)
    .map((o) => ({ href: `/games/${o.slug}`, title: o.name, body: o.blurb }));
  return <GameView game={game} slug={g.slug} name={g.name} page={g.page} lang={lang} related={related} />;
}
