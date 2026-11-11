// Общие представления SEO-страниц: одна вёрстка для английских маршрутов (src/app/(en)/…)
// и языковых (src/app/[lang]/…). Маршрут только находит контент и вызывает view.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticlePage, GamePage, ToolPage } from "./templates";
import { BlockSections, Inline } from "./blocks";
import { Breadcrumbs, DownloadBlock, JsonLd } from "./parts";
import { breadcrumbLd } from "@/lib/schema";
import { absoluteUrl, alternatesFor, sectionPath, type Locale } from "@/lib/i18n";
import { UI } from "@/lib/ui";
import type { Article } from "@/content/articles";
import type { Game, GamePageContent } from "@/content/games";
import type { TestPageContent } from "@/content/l10n";
import { SECTIONS, hubVersions, pagesOf, versionsOf, type SectionKey } from "@/content/registry";
import { ToolFor } from "@/components/tools/tool-for";

// ─────────────── статьи ───────────────

export function articleMetadata(a: Article, lang: Locale): Metadata {
  const path = `${sectionPath(lang, "learn")}/${a.slug}`;
  return {
    title: { absolute: a.title },
    description: a.description,
    alternates: alternatesFor(lang, path, versionsOf("learn", a.key ?? a.slug)),
    openGraph: {
      title: a.title,
      description: a.description,
      url: absoluteUrl(lang, path),
      type: "article",
      publishedTime: a.published,
      modifiedTime: a.updated ?? a.published,
    },
  };
}

export function ArticleView({ a, lang }: { a: Article; lang: Locale }) {
  const ui = UI[lang];
  const path = `${sectionPath(lang, "learn")}/${a.slug}`;
  return (
    <ArticlePage
      lang={lang}
      path={path}
      crumbs={[
        { name: ui.nav.home, path: "/" },
        { name: ui.nav.learn, path: sectionPath(lang, "learn") },
        { name: a.name, path },
      ]}
      h1={a.h1}
      description={a.description}
      lead={<p>{a.lead}</p>}
      takeaways={a.takeaways}
      sections={a.sections}
      faq={a.faq}
      sources={a.sources}
      related={a.related}
      campaign={`learn-${a.key ?? a.slug}`}
      published={a.published}
      modified={a.updated}
      download={ui.download}
    >
      <BlockSections sections={a.sections} pagePath={path} labels={ui.blocks} />
    </ArticlePage>
  );
}

// ─────────────── игры ───────────────

export function gameMetadata(slug: string, key: string, p: GamePageContent, lang: Locale): Metadata {
  const path = `${sectionPath(lang, "games")}/${slug}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: alternatesFor(lang, path, versionsOf("games", key)),
    openGraph: { title: p.title, description: p.description, url: absoluteUrl(lang, path), type: "website" },
  };
}

export function GameView({
  game,
  slug,
  name,
  page: p,
  lang,
  related,
}: {
  game: Game;
  slug: string;
  name: string;
  page: GamePageContent;
  lang: Locale;
  related: { href: string; title: string; body: string }[];
}) {
  const ui = UI[lang];
  const path = `${sectionPath(lang, "games")}/${slug}`;
  return (
    <GamePage
      lang={lang}
      path={path}
      crumbs={[
        { name: ui.nav.home, path: "/" },
        { name: ui.nav.games, path: sectionPath(lang, "games") },
        { name, path },
      ]}
      h1={p.h1}
      description={p.description}
      lead={<p>{p.lead}</p>}
      hero={
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {game.skills.map((s) => (
            <span key={s} className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 font-semibold text-[var(--color-primary)]">
              {ui.skills[s]}
            </span>
          ))}
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[var(--color-text-secondary)]">
            {game.premium ? ui.game.premium : ui.game.free}
          </span>
        </div>
      }
      faq={p.faq}
      sources={p.sources}
      related={related}
      campaign={`game-${game.slug}`}
      download={{ title: ui.game.playIn(name), body: ui.game.playInBody }}
    >
      <BlockSections
        sections={[{ id: "how-to-play", h2: ui.game.howToPlay(name), blocks: [{ t: "steps", items: p.howToPlay }] }, ...p.sections]}
        pagePath={path}
        labels={ui.blocks}
      />
    </GamePage>
  );
}

// ─────────────── тесты (языковые версии; английские — свои файлы в (en)/tests) ───────────────

export function testMetadata(t: TestPageContent, lang: Locale): Metadata {
  const path = `${sectionPath(lang, "tests")}/${t.slug}`;
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: alternatesFor(lang, path, versionsOf("tests", t.key)),
    openGraph: { title: t.title, description: t.description, url: absoluteUrl(lang, path), type: "website" },
  };
}

export function TestView({ t, lang }: { t: TestPageContent; lang: Locale }) {
  const ui = UI[lang];
  const path = `${sectionPath(lang, "tests")}/${t.slug}`;
  const related = pagesOf("tests", lang)
    .filter((p) => p.key !== t.key)
    .map((p) => ({ href: `${sectionPath(lang, "tests")}/${p.slug}`, title: p.name, body: p.blurb }));
  return (
    <ToolPage
      lang={lang}
      path={path}
      crumbs={[
        { name: ui.nav.home, path: "/" },
        { name: ui.nav.tests, path: sectionPath(lang, "tests") },
        { name: t.name, path },
      ]}
      h1={t.h1}
      toolName={t.name}
      description={t.description}
      lead={<p><Inline text={t.lead} /></p>}
      tool={<ToolFor tool={t.key} lang={lang} />}
      faq={t.faq}
      sources={t.sources}
      related={related}
      campaign={t.key}
      download={t.download}
    >
      <BlockSections sections={t.sections} pagePath={path} labels={ui.blocks} />
    </ToolPage>
  );
}

// ─────────────── хабы языка ───────────────

const HUB_TEXT = (lang: Locale) => {
  const h = UI[lang].hub;
  return {
    tests: { title: h.testsTitle, lead: h.testsLead, cta: h.takeTest },
    games: { title: h.gamesTitle, lead: h.gamesLead, cta: h.about },
    learn: { title: h.learnTitle, lead: h.learnLead, cta: h.read },
    compare: { title: h.learnTitle, lead: h.learnLead, cta: h.read },
  };
};

export function hubMetadata(section: SectionKey, lang: Locale): Metadata {
  const t = HUB_TEXT(lang)[section];
  return {
    title: { absolute: `${t.title} | Brainura` },
    description: t.lead,
    alternates: alternatesFor(lang, sectionPath(lang, section), hubVersions(section)),
  };
}

function Cards({ section, lang }: { section: SectionKey; lang: Locale }) {
  const base = sectionPath(lang, section);
  const cta = HUB_TEXT(lang)[section].cta;
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {pagesOf(section, lang).map((p) => (
        <Link
          key={p.key}
          href={`${base}/${p.slug}`}
          className="group flex flex-col rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h3 className="text-xl font-bold text-[var(--color-text)]">{p.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{p.blurb}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
            {cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function HubView({ section, lang }: { section: SectionKey; lang: Locale }) {
  const ui = UI[lang];
  const t = HUB_TEXT(lang)[section];
  const crumbs = [
    { name: ui.nav.home, path: "/" },
    { name: t.title, path: sectionPath(lang, section) },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <JsonLd data={breadcrumbLd(crumbs, lang)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">{t.lead}</p>
      <Cards section={section} lang={lang} />
      <div className="max-w-3xl">
        <DownloadBlock campaign={`hub-${section}`} title={ui.download.title} body={ui.download.body} lang={lang} />
      </div>
    </div>
  );
}

/** Главная языка: все разделы, в которых есть страницы. */
export function LangHomeView({ lang }: { lang: Locale }) {
  const ui = UI[lang];
  const sections = (["tests", "games", "learn"] as const).filter((s) => pagesOf(s, lang).length > 0);
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
      <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">{ui.hub.homeTitle}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">{ui.hub.homeLead}</p>
      {sections.map((s) => (
        <section key={s} className="mt-14">
          <h2 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            <Link href={sectionPath(lang, s)} className="hover:text-[var(--color-primary)]">{HUB_TEXT(lang)[s].title}</Link>
          </h2>
          <Cards section={s} lang={lang} />
        </section>
      ))}
      <div className="max-w-3xl">
        <DownloadBlock campaign="home" title={ui.download.title} body={ui.download.body} lang={lang} />
      </div>
    </div>
  );
}
