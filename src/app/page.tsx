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
} from "lucide-react";

const FEATURES = [
  {
    Icon: BrainCircuit,
    title: "26 Brain Games",
    body:
      "Stroop Test, Schulte Tables, Memory Matrix, Sudoku, Anagrams, Mood Swipe and more. Each one trains memory, attention, speed, logic or emotional intelligence. 13 are free and stay free; the rest are Premium.",
  },
  {
    Icon: Timer,
    title: "A Daily Plan, Five Minutes",
    body:
      "Short sessions, a daily program and reminders you control. Build a streak without giving up your evening.",
  },
  {
    Icon: Users,
    title: "Duel Your Friends",
    body:
      "The daily Arena challenge puts everyone on the same board, and live duels let you race a friend head-to-head. Available on Android.",
  },
  {
    Icon: Target,
    title: "Difficulty That Adapts",
    body:
      "Most games have up to 80 levels. Play well and the level rises, struggle and it eases off: hard enough to stay interesting, never a wall.",
  },
  {
    Icon: Trophy,
    title: "Streaks, XP & Achievements",
    body:
      "Over 100 achievements, daily streaks and XP make your consistency something you can actually see.",
  },
  {
    Icon: ShieldOff,
    title: "No Ads, 32 Languages",
    body:
      "No ads between your games. The app speaks 32 languages, from English and Spanish to Finnish and Thai.",
  },
] as const;

const COGNITIVE_AREAS = [
  { name: "Memory", color: "from-[#4A90E2] to-[#3B7DD8]" },
  { name: "Attention", color: "from-[#7B68EE] to-[#6353D8]" },
  { name: "Processing Speed", color: "from-[#F39C12] to-[#E08D0F]" },
  { name: "Logic", color: "from-[#27AE60] to-[#1F8C4E]" },
  { name: "Emotional Intelligence", color: "from-[#EC4899] to-[#DB2777]" },
] as const;

const SCREENSHOTS = [
  { src: "/screenshots/shot-1.jpg", caption: "Your daily 5-minute workout" },
  { src: "/screenshots/shot-2.jpg", caption: "Duel your friends live" },
  { src: "/screenshots/shot-3.jpg", caption: "26 games, one for every skill" },
  { src: "/screenshots/shot-4.jpg", caption: "Levels that adapt as you improve" },
  { src: "/screenshots/shot-5.jpg", caption: "Earn XP, unlock achievements" },
] as const;

const FAQ = [
  {
    q: "How much time does it take?",
    a: "A session is about five minutes: pick any game or follow the daily plan. Play more whenever you feel like it.",
  },
  {
    q: "Is this actually based on science?",
    a: "The games are built on classic tasks from cognitive psychology: the Stroop test, Schulte tables, reaction-time and working-memory exercises. Brainura is a training and entertainment app, not a medical device, and we don&apos;t claim that it diagnoses, treats or prevents any condition.",
  },
  {
    q: "How much does it cost?",
    a: "Free to install. 13 games are free and stay free. New users get 7 days of every Premium game with no card needed. After that, Premium on Android is a monthly or yearly subscription: in the US $5.99/month or $21.99/year, with prices adjusted by country. The iPhone app is free for now.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no sign-up: open the app and play. Most games work offline; the Arena and some other features need an internet connection.",
  },
  {
    q: "Will my progress sync between iPhone and Android?",
    a: "Not yet. Brainura has no accounts, so progress stays on the device where you earned it. Subscriptions are bought through Apple or Google, so a purchase on one platform does not carry over to the other automatically.",
  },
  {
    q: "Who is it for?",
    a: "Anyone who wants a quick daily mental workout. Difficulty runs from easy to very hard, so beginners and puzzle fans both find a level.",
  },
  {
    q: "What is the Chrome extension?",
    a: "A free extension with 6 of the games for a quick brain break while you work. Get it from the Chrome Web Store using the button above.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary)]" />
              26 brain games · No ads
            </span>

            <h1 className="mt-8 text-balance text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">
              Give your brain a{" "}
              <span className="gradient-text">
                <span className="whitespace-nowrap">5-minute</span> workout
              </span>{" "}
              every day.
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-text-secondary)] sm:text-xl">
              Brainura is a collection of short brain games for memory,
              attention, speed and logic. Play solo, follow a daily plan and
              watch your streak grow. No ads.
            </p>

            <div
              id="download"
              className="mx-auto mt-10 flex w-full max-w-xs flex-col items-stretch gap-4 scroll-mt-24 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.brainura.app"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-black px-6 py-3 text-white shadow-lg transition hover:scale-[1.02]"
              >
                <Play className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide opacity-80">
                    Get it on
                  </span>
                  <span className="text-lg font-semibold">Google Play</span>
                </span>
              </a>

              <a
                href="https://apps.apple.com/app/brain-training-games-brainura/id6793506406"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-3 text-[var(--color-text)] shadow-sm transition hover:scale-[1.02]"
              >
                <AppleStore className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">
                    Download on the
                  </span>
                  <span className="text-lg font-semibold">App Store</span>
                </span>
              </a>

              <a
                href="https://chromewebstore.google.com/detail/gkdlnpllacgajhhhicnhbgonemjjdcod"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-3 text-[var(--color-text)] shadow-sm transition hover:scale-[1.02]"
              >
                <Puzzle className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">
                    Add to Chrome
                  </span>
                  <span className="text-lg font-semibold">Browser extension</span>
                </span>
              </a>
            </div>

            <p className="mt-4 text-xs text-[var(--color-muted)]">
              Free to install · 7 days of Premium games free, no card needed
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {COGNITIVE_AREAS.map((area) => (
                <span
                  key={area.name}
                  className={`bg-gradient-to-br ${area.color} rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-sm`}
                >
                  {area.name}
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
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
              See it in action
            </h2>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              A look inside the Android app: your daily workout, the Arena, the
              game catalog and your rewards.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            {SCREENSHOTS.map((shot) => (
              <div
                key={shot.src}
                className="group flex w-[calc(50%-0.5rem)] flex-col items-center sm:w-[calc(20%-1.2rem)]"
              >
                <div className="relative aspect-[704/1520] w-full overflow-hidden rounded-2xl border border-[var(--color-border)]/60 bg-white shadow-md transition group-hover:-translate-y-1 group-hover:shadow-xl">
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <span className="mt-3 text-center text-xs font-medium text-[var(--color-text-secondary)]">
                  {shot.caption}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-6 py-20 sm:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
            What&apos;s{" "}
            <span className="gradient-text">inside</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Short games built on classic cognitive tasks and sorted by the
            skill they train: memory, attention, processing speed, logic and emotional intelligence.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-surface)]/40">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
              Questions you might be asking
            </h2>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              Short answers. If something&apos;s still unclear, our{" "}
              <Link
                href="/support"
                className="text-[var(--color-primary)] underline"
              >
                support page
              </Link>{" "}
              has more.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm transition open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
                  <span>{q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition group-open:rotate-180" />
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                  dangerouslySetInnerHTML={{ __html: a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <div className="btn-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-2xl sm:px-12 sm:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Start your first 5-minute session today
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Free to install. 7 days of every Premium game on us, no card
              needed.
            </p>
            <div className="mx-auto mt-8 flex w-full max-w-xs flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.brainura.app"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] shadow-md transition hover:scale-[1.02]"
              >
                <Play className="h-5 w-5" />
                Get on Google Play
              </a>
              <a
                href="https://apps.apple.com/app/brain-training-games-brainura/id6793506406"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-[1.02]"
              >
                <AppleStore className="h-5 w-5" />
                Download on the App Store
              </a>
              <a
                href="https://chromewebstore.google.com/detail/gkdlnpllacgajhhhicnhbgonemjjdcod"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-[1.02]"
              >
                <Puzzle className="h-5 w-5" />
                Add to Chrome
              </a>
            </div>
            <p className="mt-6 text-xs text-white/70">
              Need help?{" "}
              <Link href="/support" className="underline">
                Contact support
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
