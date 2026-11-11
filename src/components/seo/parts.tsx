// Общие блоки SEO-страниц (SEO_PLAN §2, шаг 0.6): JSON-LD, хлебные крошки,
// FAQ, источники, «скачать», связанные страницы.

import Link from "next/link";
import { ChevronDown, ChevronRight, Play, Apple as AppleStore } from "lucide-react";
import { APP_STORE_URL, playUrl } from "@/lib/site";
import type { Crumb } from "@/lib/schema";

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // `<` экранируем: иначе строка из контента может закрыть <script>.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-secondary)]">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[var(--color-muted)]" aria-hidden="true" />}
            {i < crumbs.length - 1 ? (
              <Link href={c.path} className="hover:text-[var(--color-text)] hover:underline">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[var(--color-text)]">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqList({ faq, title = "Frequently asked questions" }: { faq: FaqItem[]; title?: string }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-3">
        {faq.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm open:shadow-md"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[var(--color-text)] [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-semibold">{q}</h3>
              <ChevronDown className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export interface Source {
  text: string;
  url?: string;
}

export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <section className="mt-16 border-t border-[var(--color-border)] pt-8">
      <h2 className="text-lg font-bold text-[var(--color-text)]">Sources</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-[var(--color-text-secondary)]">
        {sources.map((s) => (
          <li key={s.text}>
            {s.url ? (
              <a href={s.url} rel="nofollow noopener" target="_blank" className="hover:underline">
                {s.text}
              </a>
            ) : (
              s.text
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Блок «скачать приложение»: Play с UTM по `campaign` (обычно слаг страницы). */
export function DownloadBlock({
  campaign,
  title,
  body,
}: {
  campaign: string;
  title: string;
  body: string;
}) {
  return (
    <section className="btn-gradient mt-16 rounded-3xl px-6 py-10 text-center shadow-xl sm:px-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-white/90">{body}</p>
      <div className="mx-auto mt-6 flex w-full max-w-xs flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <a
          href={playUrl(campaign)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] shadow-md transition hover:scale-[1.02]"
        >
          <Play className="h-5 w-5" aria-hidden="true" />
          Get it on Google Play
        </a>
        <a
          href={APP_STORE_URL}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-[1.02]"
        >
          <AppleStore className="h-5 w-5" aria-hidden="true" />
          Download on the App Store
        </a>
      </div>
      <p className="mt-4 text-xs text-white/75">Free to install · no ads · no account needed</p>
    </section>
  );
}

export interface RelatedLink {
  href: string;
  title: string;
  body: string;
}

export function Related({ links, title = "Try next" }: { links: RelatedLink[]; title?: string }) {
  if (!links.length) return null;
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-[var(--color-text)]">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="font-semibold text-[var(--color-text)]">{l.title}</span>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{l.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Стили текстового тела страницы (h2/h3/p/ul/table) — как у юридических страниц. */
export const proseClass =
  "[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-text)] " +
  "[&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--color-text)] " +
  "[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-[var(--color-text-secondary)] " +
  "[&_a]:text-[var(--color-primary)] [&_a]:underline " +
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 " +
  "[&_li]:mt-1 [&_li]:text-[var(--color-text-secondary)] " +
  "[&_strong]:text-[var(--color-text)] " +
  "[&_table]:mt-6 [&_table]:w-full [&_table]:text-sm [&_th]:border-b [&_th]:border-[var(--color-border)] " +
  "[&_th]:py-2 [&_th]:text-left [&_th]:text-[var(--color-text)] [&_td]:border-b [&_td]:border-[var(--color-border)]/60 " +
  "[&_td]:py-2 [&_td]:text-[var(--color-text-secondary)]";
