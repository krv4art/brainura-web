// Страница поддержки: одна вёрстка на все языки, тексты — src/content/support.ts.

import { SUPPORT, SUPPORT_EMAIL } from "@/content/support";
import type { Locale } from "@/lib/i18n";

export function SupportView({ lang = "en" }: { lang?: Locale }) {
  const S = SUPPORT[lang];
  if (!S) return null;
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl">
          {S.h1.before}
          <span className="gradient-text">{S.h1.accent}</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{S.lead}</p>
      </div>

      {/* Contact card */}
      <div className="mt-10 rounded-2xl border border-[var(--color-border)]/70 bg-gradient-to-br from-white to-[var(--color-surface)] p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-[var(--color-text)]">{S.email.title}</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{S.email.body}</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-text)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)]">{S.faqTitle}</h2>
        <div className="mt-8 space-y-4">
          {S.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm transition open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition group-open:rotate-180">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
