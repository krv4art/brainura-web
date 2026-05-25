import Link from "next/link";

const FEATURES = [
  {
    icon: "🧠",
    title: "15 Science-Backed Exercises",
    body: "Stroop Test, Memory Matrix, Schulte Tables, Quick Math, Anagrams and more — each targets a specific cognitive skill.",
  },
  {
    icon: "⚡",
    title: "5 Minutes a Day",
    body: "Daily training rounds designed for busy adults aged 35-55. Quick sessions, lasting impact.",
  },
  {
    icon: "📈",
    title: "Track Your Brain Age",
    body: "Personalised brain-age estimate updated after every session. See your cognitive trajectory over time.",
  },
  {
    icon: "🏆",
    title: "200+ Achievements",
    body: "Bronze, silver, gold and platinum tiers. Build streaks, master skills, collect rare badges.",
  },
  {
    icon: "🎯",
    title: "Adaptive Difficulty",
    body: "Each exercise has 80 levels with auto-progression. Always challenged, never overwhelmed.",
  },
  {
    icon: "🌐",
    title: "English · Русский · Українська",
    body: "Full localisation including exercise content. Train in the language that feels natural.",
  },
] as const;

const COGNITIVE_AREAS = [
  { name: "Memory", color: "from-[#4A90E2] to-[#3B7DD8]" },
  { name: "Attention", color: "from-[#7B68EE] to-[#6353D8]" },
  { name: "Processing Speed", color: "from-[#F39C12] to-[#E08D0F]" },
  { name: "Logic", color: "from-[#27AE60] to-[#1F8C4E]" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
              Now on iOS & Android
            </span>

            <h1 className="mt-8 text-balance text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">
              Train your brain in{" "}
              <span className="gradient-text">5 minutes a day</span>
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-text-secondary)] sm:text-xl">
              Brainura is a focused training app for adults who want sharper
              memory, faster thinking, and better focus. 15 science-backed
              exercises, personalised brain-age tracking, and 200+ achievements
              to keep you coming back.
            </p>

            <div
              id="download"
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="https://apps.apple.com/app/id6761497811"
                className="inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-3 text-white shadow-lg transition hover:scale-[1.02]"
              >
                <AppleIcon />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide opacity-80">
                    Download on the
                  </span>
                  <span className="text-lg font-semibold">App Store</span>
                </span>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.brainura.app"
                className="inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-3 text-white shadow-lg transition hover:scale-[1.02]"
              >
                <GooglePlayIcon />
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] uppercase tracking-wide opacity-80">
                    Get it on
                  </span>
                  <span className="text-lg font-semibold">Google Play</span>
                </span>
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
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

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Built for adults who care about{" "}
            <span className="gradient-text">cognitive longevity</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Not another puzzle dump. Brainura&apos;s exercises map to formal
            cognitive-skill categories and adapt as you improve.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-2xl">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pb-24">
          <div className="btn-gradient relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-2xl sm:px-12 sm:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to train smarter?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Free to install. Premium plans from $0.99/week. Start your first
              session in under a minute.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/app/id6761497811"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] shadow-md transition hover:scale-[1.02]"
              >
                Get on App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.brainura.app"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
              >
                Get on Google Play
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

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-7 w-7"
      aria-hidden
    >
      <path d="M17.05 12.04c-.03-2.94 2.4-4.35 2.51-4.42-1.37-2-3.51-2.28-4.27-2.31-1.81-.19-3.55 1.07-4.47 1.07-.94 0-2.36-1.05-3.88-1.02-2 .03-3.85 1.16-4.88 2.95-2.08 3.6-.53 8.93 1.49 11.85.99 1.43 2.17 3.04 3.69 2.98 1.48-.06 2.04-.96 3.83-.96 1.79 0 2.29.96 3.86.93 1.59-.03 2.6-1.46 3.58-2.9 1.13-1.66 1.59-3.27 1.62-3.36-.04-.02-3.1-1.19-3.08-4.81zM14.27 4.07c.82-.99 1.36-2.37 1.21-3.74-1.17.05-2.59.78-3.43 1.77-.76.87-1.42 2.27-1.24 3.61 1.3.1 2.64-.66 3.46-1.64z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-7 w-7"
      aria-hidden
    >
      <path d="M3.609 1.814L13.792 12 3.609 22.186a1 1 0 01-.609-.92V2.733a1 1 0 01.609-.919zm10.89 10.892l2.602 2.601-10.804 6.157L14.499 12.706zM5.297 2.337l10.804 6.156-2.602 2.602L5.297 2.337zm12.27 7.058l3.077 1.756c.677.386.677 1.342 0 1.728l-3.077 1.756L14.706 12l2.86-2.605z" />
    </svg>
  );
}
