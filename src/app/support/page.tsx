import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Brainura. Contact us by email or read the FAQ.",
};

const FAQ = [
  {
    q: "How do I cancel my subscription?",
    a: "Subscriptions are managed by Apple App Store (iOS) or Google Play (Android). Open your device Settings → Apple ID / Google Account → Subscriptions → Brainura → Cancel. Your premium access remains until the end of the current billing period.",
  },
  {
    q: "I purchased premium but it's not active in the app.",
    a: "Open Brainura → Settings → Restore Purchases. If that doesn't help, force-quit the app and reopen. If still no luck, email support@brainura.app with your purchase receipt — we'll investigate within 24 hours.",
  },
  {
    q: "Can I sync progress between iPhone and Android?",
    a: "Yes — sign in with the same Brainura account on both devices. Exercise scores, brain age, achievements, and subscription status sync automatically. Local-only data (recent in-memory state) does not sync.",
  },
  {
    q: "What happens to my data if I uninstall?",
    a: "Local data on the device is removed when you uninstall. Cloud-synced data (account, progress, achievements) is kept on our servers until you request deletion. To delete cloud data, contact support@brainura.app from your account email.",
  },
  {
    q: "How do I request a refund?",
    a: "Refunds for subscriptions are handled by Apple/Google directly: reportaproblem.apple.com (iOS) or play.google.com/store/account (Android). They typically approve refunds for unused billing periods. We do not process refunds for App Store / Play Store purchases.",
  },
  {
    q: "Is Brainura suitable for older adults / dementia support?",
    a: "Brainura is a wellness product, not a medical device. It is not intended to diagnose, treat, or cure any cognitive condition. If you have concerns about cognitive decline, please consult a qualified healthcare professional.",
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">
          We&apos;re here to <span className="gradient-text">help</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          Most answers are below. If you can&apos;t find what you need, drop us
          an email and we&apos;ll get back within one business day.
        </p>
      </div>

      {/* Contact card */}
      <div className="mt-10 rounded-2xl border border-[var(--color-border)]/70 bg-gradient-to-br from-white to-[var(--color-surface)] p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-[var(--color-text)]">
              Email support
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Reach us anytime at the address below — we read every message.
            </p>
            <a
              href="mailto:support@brainura.app"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-text)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              support@brainura.app
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm transition open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
