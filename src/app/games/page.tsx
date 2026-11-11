import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Breadcrumbs, DownloadBlock, JsonLd } from "@/components/seo/parts";
import { breadcrumbLd } from "@/lib/schema";
import { pageAlternates } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { GAMES_ALL, type Skill } from "@/content/games";

// Хаб игр. Кластер: brain games for adults / brain training games / memory games for adults.
const PATH = "/games";
const TITLE = "Brain Games for Adults: 26 Short Daily Games";
const DESCRIPTION =
  "26 brain games for adults in one app: memory, attention, speed, logic, words and emotions. Five-minute sessions, adaptive levels, no ads.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(PATH, "en"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const ORDER: Skill[] = ["Memory", "Attention", "Speed", "Logic", "Language", "Emotions"];

export default function GamesHub() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Games", path: PATH },
  ];
  const withPages = GAMES_ALL.filter((g) => g.page);
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: withPages.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}${PATH}/${g.slug}`,
              name: g.name,
            })),
          },
        ]}
      />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
        Brain games for adults
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
        Brainura has 26 short games, each built around a classic task from cognitive psychology or a well-loved
        puzzle. A session takes about five minutes, and most games have up to 80 levels that adjust to how you play.
        13 games are free; the rest are Premium, with 7 days free for new players.
      </p>

      {ORDER.map((skill) => {
        const games = GAMES_ALL.filter((g) => g.skills[0] === skill);
        if (!games.length) return null;
        return (
          <section key={skill} className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">{skill} games</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((g) => {
                const href = g.page ? `${PATH}/${g.slug}` : g.seeAlso;
                const card = (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-[var(--color-text)]">{g.name}</h3>
                      {g.premium && <Lock className="h-4 w-4 text-[var(--color-muted)]" aria-label="Premium" />}
                    </div>
                    <p className="mt-1 flex-1 text-sm text-[var(--color-text-secondary)]">{g.blurb}</p>
                    {href && (
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
                        {g.page ? "How it works" : g.seeAlso?.startsWith("/tests") ? "Try it online" : "Read more"}{" "}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </>
                );
                const cls = "flex flex-col rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm";
                return href ? (
                  <Link key={g.slug} href={href} className={`${cls} transition hover:-translate-y-0.5 hover:shadow-md`}>
                    {card}
                  </Link>
                ) : (
                  <div key={g.slug} className={cls}>{card}</div>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="mt-16 max-w-3xl text-[var(--color-text-secondary)]">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">Want to try before you install?</h2>
        <p className="mt-4 leading-relaxed">
          Three of the classic tasks run right in your browser: the{" "}
          <Link href="/tests/reaction-time-test" className="text-[var(--color-primary)] underline">reaction time test</Link>, the{" "}
          <Link href="/tests/schulte-table" className="text-[var(--color-primary)] underline">Schulte table</Link> and the{" "}
          <Link href="/tests/stroop-test" className="text-[var(--color-primary)] underline">Stroop test</Link>.
        </p>
        <p className="mt-4 leading-relaxed">
          A note on expectations: practice makes you better at the games you play, and research is much less certain
          that it carries over to everyday skills. Brainura is a training and entertainment app, not a medical device.
        </p>
      </section>

      <div className="max-w-3xl">
        <DownloadBlock
          campaign="games-hub"
          title="All 26 games, five minutes a day"
          body="A daily plan picks games for your goals. Streaks, achievements and duels with friends keep it going. No ads."
        />
      </div>
    </div>
  );
}
