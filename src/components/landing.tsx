// Лендинг (главная): одна вёрстка на все языки, тексты — src/content/landing.ts.
// Правка дизайна здесь меняет главную сразу на brainura.app и на всех языковых поддоменах.

import Image from "next/image";
import Link from "next/link";
import {
  BrainCircuit,
  Timer,
  Users,
  Trophy,
  Target,
  ShieldOff,
  Apple as AppleStore,
  Play,
  Puzzle,
  ChevronDown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { absoluteUrl, type Locale } from "@/lib/i18n";
import { APP_STORE_URL, CHROME_URL, playUrl } from "@/lib/site";
import { LANDING, type FeatureIcon } from "@/content/landing";

const ICONS: Record<FeatureIcon, LucideIcon> = {
  brain: BrainCircuit,
  timer: Timer,
  users: Users,
  target: Target,
  trophy: Trophy,
  shield: ShieldOff,
};

const AREA_COLORS = [
  "from-[#4A90E2] to-[#3B7DD8]",
  "from-[#7B68EE] to-[#6353D8]",
  "from-[#F39C12] to-[#E08D0F]",
  "from-[#27AE60] to-[#1F8C4E]",
  "from-[#EC4899] to-[#DB2777]",
];


/** Подставляет ссылку вместо маркера `{name}` в строке. */
function withLink(text: string, marker: string, link: React.ReactNode) {
  const [a, b] = text.split(marker);
  return (
    <>
      {a}
      {link}
      {b}
    </>
  );
}

export function LandingView({ lang = "en" }: { lang?: Locale }) {
  const L = LANDING[lang];
  if (!L) return null;
  const en = lang === "en";
  const hl = en ? undefined : lang;
  const play = (campaign: string) => playUrl(en ? campaign : `${lang}-${campaign}`, "website", hl);
  // Поддержка и юридические страницы — только на основном домене (на английском).
  const supportHref = en ? "/support" : absoluteUrl("en", "/support");
  const supportLink = (label: string, cls: string) =>
    en ? (
      <Link href={supportHref} className={cls}>
        {label}
      </Link>
    ) : (
      <a href={supportHref} className={cls}>
        {label}
      </a>
    );

  return (
    <>
      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary)]" />
              {L.badge}
            </span>

            <h1 className="mt-8 text-balance text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">
              {L.h1.before}
              <span className="gradient-text">
                <span className="whitespace-nowrap">{L.h1.nowrap}</span>
                {L.h1.accent}
              </span>
              {L.h1.after}
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-text-secondary)] sm:text-xl">{L.lead}</p>

            <div
              id="download"
              className="mx-auto mt-10 flex w-full max-w-xs flex-col items-stretch gap-4 scroll-mt-24 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
            >
              <a
                href={play("home-hero")}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-black px-6 py-3 text-white shadow-lg transition hover:scale-[1.02]"
              >
                <Play className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide opacity-80">{L.stores.playTop}</span>
                  <span className="text-lg font-semibold">{L.stores.playName}</span>
                </span>
              </a>

              <a
                href={APP_STORE_URL}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-3 text-[var(--color-text)] shadow-sm transition hover:scale-[1.02]"
              >
                <AppleStore className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">{L.stores.appleTop}</span>
                  <span className="text-lg font-semibold">{L.stores.appleName}</span>
                </span>
              </a>

              <a
                href={CHROME_URL}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-3 text-[var(--color-text)] shadow-sm transition hover:scale-[1.02]"
              >
                <Puzzle className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">{L.stores.chromeTop}</span>
                  <span className="text-lg font-semibold">{L.stores.chromeName}</span>
                </span>
              </a>
            </div>

            <p className="mt-4 text-xs text-[var(--color-muted)]">{L.stores.note}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {L.areas.map((name, i) => (
                <span
                  key={name}
                  className={`bg-gradient-to-br ${AREA_COLORS[i % AREA_COLORS.length]} rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-sm`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="relative overflow-hidden bg-[var(--color-surface)]/40">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">{L.screenshots.title}</h2>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">{L.screenshots.lead}</p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            {L.screenshots.shots.map(({ src, caption }) => (
              <div key={src} className="group flex w-[calc(50%-0.5rem)] flex-col items-center sm:w-[calc(20%-1.2rem)]">
                <div className="relative aspect-[704/1520] w-full overflow-hidden rounded-2xl border border-[var(--color-border)]/60 bg-white shadow-md transition group-hover:-translate-y-1 group-hover:shadow-xl">
                  <Image src={src} alt={caption} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover" />
                </div>
                <span className="mt-3 text-center text-xs font-medium text-[var(--color-text-secondary)]">{caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20 sm:py-28 scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
            {L.features.title} <span className="gradient-text">{L.features.accent}</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{L.features.lead}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {L.features.items.map(({ icon, title, body }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-primary)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-surface)]/40">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">{L.faq.title}</h2>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              {withLink(L.faq.lead, "{support}", supportLink(L.faq.supportLink, "text-[var(--color-primary)] underline"))}
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {L.faq.items.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm transition open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
                  <span>{q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <div className="btn-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-2xl sm:px-12 sm:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{L.cta.title}</h2>
            <p className="mt-4 text-lg text-white/90">{L.cta.body}</p>
            <div className="mx-auto mt-8 flex w-full max-w-xs flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <a
                href={play("home-cta")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] shadow-md transition hover:scale-[1.02]"
              >
                <Play className="h-5 w-5" />
                {L.cta.play}
              </a>
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-[1.02]"
              >
                <AppleStore className="h-5 w-5" />
                {L.cta.apple}
              </a>
              <a
                href={CHROME_URL}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-[1.02]"
              >
                <Puzzle className="h-5 w-5" />
                {L.cta.chrome}
              </a>
            </div>
            <p className="mt-6 text-xs text-white/70">
              {withLink(L.cta.help, "{link}", supportLink(L.cta.helpLink, "underline"))}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
