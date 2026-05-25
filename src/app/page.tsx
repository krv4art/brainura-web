import Image from "next/image";
import Link from "next/link";
import {
  BrainCircuit,
  Timer,
  TrendingUp,
  Trophy,
  Target,
  ShieldOff,
  Apple as AppleStore,
  Play,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    Icon: BrainCircuit,
    title: "15 Science-Backed Exercises",
    body:
      "Stroop Test, Memory Matrix, Schulte Tables, Anagrams and more — each targets a specific cognitive skill from peer-reviewed research.",
  },
  {
    Icon: Timer,
    title: "5 Minutes a Day",
    body:
      "Short, focused sessions built for busy adults. Less than the time it takes to make coffee, with measurable impact over weeks.",
  },
  {
    Icon: TrendingUp,
    title: "Track Your Brain Age",
    body:
      "Personalised brain-age estimate updates after every session. Watch your cognitive trajectory bend in the right direction.",
  },
  {
    Icon: Trophy,
    title: "200+ Achievements",
    body:
      "Bronze, silver, gold and platinum tiers. Build streaks, master skills, unlock rare badges that mark real progress.",
  },
  {
    Icon: Target,
    title: "Adaptive Difficulty",
    body:
      "Each exercise has 80 levels with auto-progression. Always challenged, never overwhelmed — the sweet spot for cognitive growth.",
  },
  {
    Icon: ShieldOff,
    title: "No Ads, Ever",
    body:
      "Premium training experience without interruption. Your focus stays on the exercise, never on a banner or pop-up.",
  },
] as const;

const COGNITIVE_AREAS = [
  { name: "Memory", color: "from-[#4A90E2] to-[#3B7DD8]" },
  { name: "Attention", color: "from-[#7B68EE] to-[#6353D8]" },
  { name: "Processing Speed", color: "from-[#F39C12] to-[#E08D0F]" },
  { name: "Logic", color: "from-[#27AE60] to-[#1F8C4E]" },
] as const;

const SCREENSHOTS = [
  { src: "/screenshots/1.jpg", caption: "Daily training session" },
  { src: "/screenshots/2.jpg", caption: "15 science-backed exercises" },
  { src: "/screenshots/3.jpg", caption: "Track your Brain Age" },
  { src: "/screenshots/4.jpg", caption: "Earn 200+ achievements" },
] as const;

const FAQ = [
  {
    q: "Do I need to commit a lot of time?",
    a: "No. A complete session is around 5 minutes. Brainura is built for people who can&apos;t afford to lose an hour a day to an app — but want consistent, measurable cognitive gains.",
  },
  {
    q: "Is this actually based on science?",
    a: "Each of the 15 exercises maps to a well-studied cognitive task (Stroop, Schulte tables, n-back-style memory matrix, etc.). Brainura doesn&apos;t claim to cure or prevent any condition — but the underlying tests are decades-old standards used in cognitive psychology.",
  },
  {
    q: "How much does it cost?",
    a: "The app is free to install. Premium unlocks all features for $0.99/week or $7.99/year (regional pricing — US: $3.99/week or $33/year). A one-time introductory offer is available for new subscribers during onboarding.",
  },
  {
    q: "Can I use it without creating an account?",
    a: "Yes. Sign-in is optional and only needed if you want progress to sync across devices. The full experience works offline and anonymously.",
  },
  {
    q: "Will my progress sync between iPhone and Android?",
    a: "Yes — sign in with the same Brainura account on both devices. Exercise scores, Brain Age, achievements and subscription status sync automatically.",
  },
  {
    q: "What ages is Brainura designed for?",
    a: "Brainura is rated 4+ on the App Store but is designed primarily for adults aged 35-55 who want to stay cognitively sharp. The exercises scale from easy (level 1) to brutal (level 80).",
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
              Built on cognitive science · No ads
            </span>

            <h1 className="mt-8 text-balance text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">
              Memory slipping at 40?{" "}
              <span className="gradient-text">Sharpen it in 5 minutes</span> a
              day.
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-text-secondary)] sm:text-xl">
              Brainura is a focused training routine for adults who notice
              themselves forgetting names, losing focus, or thinking slower than
              they used to. 15 science-backed exercises, your personal Brain
              Age, and zero advertising.
            </p>

            <div
              id="download"
              className="mt-10 flex flex-wrap items-center justify-center gap-4 scroll-mt-24"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.brainura.app"
                className="inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-3 text-white shadow-lg transition hover:scale-[1.02]"
              >
                <Play className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide opacity-80">
                    Get it on
                  </span>
                  <span className="text-lg font-semibold">Google Play</span>
                </span>
              </a>

              <div
                className="inline-flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-3 text-[var(--color-text)] shadow-sm"
                aria-label="iOS coming soon"
              >
                <AppleStore className="h-7 w-7" />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">
                    Coming to
                  </span>
                  <span className="text-lg font-semibold">App Store</span>
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--color-muted)]">
              Free to install · From $0.99/week · Cancel anytime
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
              Designed for one-handed daily use. Premium UI, zero clutter, no
              dark patterns.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {SCREENSHOTS.map((shot) => (
              <div
                key={shot.src}
                className="group flex flex-col items-center"
              >
                <div className="relative aspect-[667/1440] w-full overflow-hidden rounded-2xl border border-[var(--color-border)]/60 bg-white shadow-md transition group-hover:-translate-y-1 group-hover:shadow-xl">
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <span className="mt-3 text-xs font-medium text-[var(--color-text-secondary)]">
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
            Six reasons it{" "}
            <span className="gradient-text">actually works</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Not another puzzle dump. Brainura&apos;s exercises map to formal
            cognitive-skill categories and adapt as you improve.
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
              Free to install. Premium from $0.99/week. Most users notice
              improved focus within two weeks.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.brainura.app"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] shadow-md transition hover:scale-[1.02]"
              >
                <Play className="h-5 w-5" />
                Get on Google Play
              </a>
              <div
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur"
                aria-label="iOS coming soon"
              >
                <AppleStore className="h-5 w-5" />
                App Store · Coming soon
              </div>
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
