import type { ReactNode } from "react";

interface LegalShellProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalShell({ title, updated, children }: LegalShellProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="mb-10 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          Last updated: {updated}
        </p>
      </div>

      <div className="prose prose-slate max-w-none [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-text)] [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--color-text)] [&_p]:mt-4 [&_p]:text-[var(--color-text-secondary)] [&_p]:leading-relaxed [&_a]:text-[var(--color-primary)] [&_a]:underline [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-[var(--color-text-secondary)]">
        {children}
      </div>
    </article>
  );
}
