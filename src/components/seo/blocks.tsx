// Блоки контента SEO-страниц: статьи (и дальше — игры, тесты, языковые версии) пишутся
// данными, а не JSX. Задача — разнообразная подача: таблицы, списки, шаги, врезки,
// цифры, сравнения, «миф/факт», картинки. Правило: в разделе больше одного типа блока,
// абзацы — короткие (2–4 предложения).
//
// Встроенная разметка в строках: **жирный** и [текст](/путь) — больше ничего.
//
// Картинки: файл кладётся в public по пути `figurePath(page, id)` (.webp). Есть файл —
// картинка показывается; нет — на превью видна заглушка с описанием (brief), на проде
// блок не рисуется вовсе.

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ImageIcon, Lightbulb, Info, XCircle, ArrowRight } from "lucide-react";

export type Block =
  | { t: "p"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  /** Нумерованные шаги с заголовком у каждого. */
  | { t: "steps"; items: { title: string; text: string }[] }
  | { t: "table"; head: string[]; rows: string[][]; caption?: string; note?: string }
  | { t: "callout"; kind: "tip" | "note" | "warning"; title?: string; text: string }
  /** Крупные цифры-карточки (2–4 штуки). */
  | { t: "stats"; items: { value: string; label: string }[] }
  /** Горизонтальные столбцы: сравнить величины одной единицы. */
  | { t: "bars"; title: string; unit: string; items: { label: string; value: number; highlight?: boolean }[]; note?: string }
  | { t: "mythFact"; items: { myth: string; fact: string }[] }
  /** Две колонки: «работает / не работает», «плюсы / минусы». */
  | { t: "compare"; good: { title: string; items: string[] }; bad: { title: string; items: string[] } }
  | { t: "quote"; text: string; cite?: string }
  /** Картинка. id — имя файла без расширения; brief — что должно быть на картинке (для автора). */
  | { t: "figure"; id: string; alt: string; caption?: string; brief: string; aspect?: "16/9" | "4/3" | "1/1" }
  /** Карточка-переход на инструмент или игру посреди текста. */
  | { t: "cta"; href: string; title: string; text: string; button: string };

export interface BlockSection {
  /** Якорь для оглавления (латиница, через дефис). */
  id: string;
  h2: string;
  blocks: Block[];
}

// ---------- встроенная разметка ----------

export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={k++}>{m[1]}</strong>);
    else {
      const href = m[3];
      out.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href} className="text-[var(--color-primary)] underline underline-offset-2 hover:no-underline">{m[2]}</Link>
        ) : (
          <a key={k++} href={href} className="text-[var(--color-primary)] underline underline-offset-2 hover:no-underline">{m[2]}</a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

// ---------- картинки ----------

/** Путь картинки страницы в public: `/learn/<slug>/<id>.webp`. */
export function figurePath(pagePath: string, id: string) {
  return `${pagePath}/${id}.webp`;
}

function figureExists(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

const SHOW_PLACEHOLDERS = process.env.VERCEL_ENV !== "production";

function Figure({ b, pagePath }: { b: Extract<Block, { t: "figure" }>; pagePath: string }) {
  const src = figurePath(pagePath, b.id);
  const aspect = b.aspect ?? "16/9";
  if (figureExists(src)) {
    return (
      <figure className="mt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={b.alt} loading="lazy" className="w-full rounded-2xl border border-[var(--color-border)]/60" style={{ aspectRatio: aspect, objectFit: "cover" }} />
        {b.caption && <figcaption className="mt-2 text-center text-sm text-[var(--color-muted)]"><Inline text={b.caption} /></figcaption>}
      </figure>
    );
  }
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <figure className="mt-8" data-figure-placeholder={src}>
      <div
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center"
        style={{ aspectRatio: aspect }}
      >
        <ImageIcon className="h-8 w-8 text-[var(--color-muted)]" aria-hidden="true" />
        <p className="text-sm font-semibold text-[var(--color-text)]">Картинка: {src}</p>
        <p className="max-w-md text-xs text-[var(--color-text-secondary)]">{b.brief}</p>
      </div>
      {b.caption && <figcaption className="mt-2 text-center text-sm text-[var(--color-muted)]"><Inline text={b.caption} /></figcaption>}
    </figure>
  );
}

// ---------- блоки ----------

const CALLOUT = {
  tip: { icon: Lightbulb, box: "border-[#27AE60]/30 bg-[#27AE60]/[0.07]", ink: "text-[#1E8449]" },
  note: { icon: Info, box: "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/[0.07]", ink: "text-[var(--color-primary)]" },
  warning: { icon: AlertTriangle, box: "border-[#E67E22]/35 bg-[#E67E22]/[0.08]", ink: "text-[#B9580A]" },
} as const;

export interface BlockLabels {
  callout: Record<"tip" | "note" | "warning", string>;
  myth: string;
  fact: string;
}

function BlockView({ b, pagePath, labels }: { b: Block; pagePath: string; labels: BlockLabels }) {
  switch (b.t) {
    case "p":
      return <p><Inline text={b.text} /></p>;
    case "h3":
      return <h3><Inline text={b.text} /></h3>;
    case "ul":
      return (
        <ul>
          {b.items.map((x, i) => <li key={i}><Inline text={x} /></li>)}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((x, i) => <li key={i}><Inline text={x} /></li>)}
        </ol>
      );
    case "steps":
      return (
        <ol className="!mt-6 !list-none !pl-0 space-y-4">
          {b.items.map((s, i) => (
            <li key={i} className="!mt-0 flex gap-4">
              <span className="btn-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">{i + 1}</span>
              <div>
                <p className="!mt-0.5 font-semibold !text-[var(--color-text)]"><Inline text={s.title} /></p>
                <p className="!mt-1"><Inline text={s.text} /></p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure className="mt-6">
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]/70">
            <table className="!mt-0 min-w-full">
              {b.caption && <caption className="bg-[var(--color-surface)] px-4 py-2.5 text-left text-sm font-semibold text-[var(--color-text)]">{b.caption}</caption>}
              <thead className="bg-[var(--color-surface)]">
                <tr>{b.head.map((h, i) => <th key={i} scope="col" className="!px-4 whitespace-nowrap"><Inline text={h} /></th>)}</tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j} className={`!px-4 align-top ${j === 0 ? "font-medium !text-[var(--color-text)]" : ""}`}><Inline text={c} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note && <figcaption className="mt-2 text-xs text-[var(--color-muted)]"><Inline text={b.note} /></figcaption>}
        </figure>
      );
    case "callout": {
      const c = CALLOUT[b.kind];
      const Icon = c.icon;
      return (
        <aside className={`mt-6 flex gap-3 rounded-2xl border p-4 sm:p-5 ${c.box}`}>
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${c.ink}`} aria-hidden="true" />
          <div>
            <p className={`!mt-0 text-sm font-bold uppercase tracking-wide ${c.ink}`}>{b.title ?? labels.callout[b.kind]}</p>
            <p className="!mt-1 !text-[var(--color-text)]"><Inline text={b.text} /></p>
          </div>
        </aside>
      );
    }
    case "stats":
      return (
        <div className={`mt-6 grid gap-3 ${b.items.length === 4 ? "grid-cols-2 sm:grid-cols-4" : b.items.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
          {b.items.map((s, i) => (
            <div key={i} className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-4 text-center shadow-sm">
              <p className="text-gradient !mt-0 text-3xl font-extrabold tabular-nums">{s.value}</p>
              <p className="!mt-1 text-sm leading-snug"><Inline text={s.label} /></p>
            </div>
          ))}
        </div>
      );
    case "bars": {
      const max = Math.max(...b.items.map((x) => x.value));
      return (
        <figure className="mt-6 rounded-2xl border border-[var(--color-border)]/70 bg-white p-4 shadow-sm sm:p-5">
          <p className="!mt-0 font-semibold !text-[var(--color-text)]">{b.title}</p>
          <div className="mt-4 space-y-3">
            {b.items.map((x, i) => (
              <div key={i}>
                <div className="flex justify-between gap-3 text-sm">
                  <span className={x.highlight ? "font-semibold text-[var(--color-text)]" : "text-[var(--color-text-secondary)]"}>{x.label}</span>
                  <span className="font-semibold tabular-nums text-[var(--color-text)]">{x.value} {b.unit}</span>
                </div>
                <div className="mt-1 h-2.5 rounded-full bg-[var(--color-border)]/50">
                  <div className={`h-full rounded-full ${x.highlight ? "btn-gradient" : "bg-[var(--color-primary)]/45"}`} style={{ width: `${(x.value / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          {b.note && <figcaption className="mt-3 text-xs text-[var(--color-muted)]"><Inline text={b.note} /></figcaption>}
        </figure>
      );
    }
    case "mythFact":
      return (
        <div className="mt-6 space-y-3">
          {b.items.map((x, i) => (
            <div key={i} className="grid overflow-hidden rounded-2xl border border-[var(--color-border)]/70 sm:grid-cols-2">
              <div className="flex gap-3 bg-[#E74C3C]/[0.06] p-4">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#C0392B]" aria-hidden="true" />
                <div>
                  <p className="!mt-0 text-xs font-bold uppercase tracking-wide text-[#C0392B]">{labels.myth}</p>
                  <p className="!mt-1 !text-[var(--color-text)]"><Inline text={x.myth} /></p>
                </div>
              </div>
              <div className="flex gap-3 bg-[#27AE60]/[0.06] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E8449]" aria-hidden="true" />
                <div>
                  <p className="!mt-0 text-xs font-bold uppercase tracking-wide text-[#1E8449]">{labels.fact}</p>
                  <p className="!mt-1 !text-[var(--color-text)]"><Inline text={x.fact} /></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "compare":
      return (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { side: b.good, Icon: CheckCircle2, ink: "text-[#1E8449]", box: "border-[#27AE60]/30 bg-[#27AE60]/[0.05]" },
            { side: b.bad, Icon: XCircle, ink: "text-[#C0392B]", box: "border-[#E74C3C]/25 bg-[#E74C3C]/[0.04]" },
          ].map(({ side, Icon, ink, box }, i) => (
            <div key={i} className={`rounded-2xl border p-4 sm:p-5 ${box}`}>
              <p className={`!mt-0 font-bold ${ink}`}>{side.title}</p>
              <ul className="!mt-3 !list-none !pl-0 space-y-2">
                {side.items.map((x, j) => (
                  <li key={j} className="!mt-0 flex gap-2">
                    <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${ink}`} aria-hidden="true" />
                    <span><Inline text={x} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-4 border-[var(--color-primary)] pl-5">
          <p className="!mt-0 text-lg italic !text-[var(--color-text)]"><Inline text={b.text} /></p>
          {b.cite && <footer className="mt-2 text-sm text-[var(--color-muted)]">— {b.cite}</footer>}
        </blockquote>
      );
    case "figure":
      return <Figure b={b} pagePath={pagePath} />;
    case "cta":
      return (
        <Link
          href={b.href}
          className="group mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--color-primary)]/25 bg-gradient-to-br from-[#667EEA]/[0.08] to-[#764BA2]/[0.08] p-5 !no-underline transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="block font-bold text-[var(--color-text)]">{b.title}</span>
            <span className="mt-1 block text-sm text-[var(--color-text-secondary)]">{b.text}</span>
          </span>
          <span className="btn-gradient inline-flex shrink-0 items-center justify-center gap-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white">
            {b.button} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      );
  }
}

export function Blocks({ blocks, pagePath, labels }: { blocks: Block[]; pagePath: string; labels: BlockLabels }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} pagePath={pagePath} labels={labels} />
      ))}
    </>
  );
}

export function BlockSections({ sections, pagePath, labels }: { sections: BlockSection[]; pagePath: string; labels: BlockLabels }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24">
          <h2>{s.h2}</h2>
          <Blocks blocks={s.blocks} pagePath={pagePath} labels={labels} />
        </section>
      ))}
    </>
  );
}

/** «Главное за минуту» — над оглавлением. */
export function Takeaways({ title, items }: { title: string; items: string[] }) {
  return (
    <aside className="mt-8 rounded-3xl border border-[var(--color-primary)]/20 bg-gradient-to-br from-[#667EEA]/[0.07] to-[#764BA2]/[0.07] p-5 sm:p-6">
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary)]">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((x, i) => (
          <li key={i} className="flex gap-2.5 text-[var(--color-text)]">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            <span className="leading-relaxed"><Inline text={x} /></span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Оглавление по H2 разделов. */
export function Toc({ title, sections }: { title: string; sections: { id: string; h2: string }[] }) {
  return (
    <nav aria-label={title} className="mt-6 rounded-2xl border border-[var(--color-border)]/70 bg-white p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">{title}</p>
      <ol className="mt-3 grid gap-1.5 text-[15px] sm:grid-cols-2 sm:gap-x-6">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-2">
            <span className="tabular-nums text-[var(--color-muted)]">{i + 1}.</span>
            <a href={`#${s.id}`} className="text-[var(--color-text)] hover:text-[var(--color-primary)] hover:underline">{s.h2}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Слов в разделах — для «N мин чтения». */
export function countWords(sections: BlockSection[]): number {
  const texts: string[] = [];
  for (const s of sections) {
    texts.push(s.h2);
    for (const b of s.blocks) {
      switch (b.t) {
        case "p": case "h3": case "quote": texts.push(b.text); break;
        case "ul": case "ol": texts.push(...b.items); break;
        case "steps": b.items.forEach((x) => texts.push(x.title, x.text)); break;
        case "table": texts.push(...b.head, ...b.rows.flat()); break;
        case "callout": texts.push(b.text); break;
        case "stats": b.items.forEach((x) => texts.push(x.value, x.label)); break;
        case "bars": texts.push(b.title, ...b.items.map((x) => x.label)); break;
        case "mythFact": b.items.forEach((x) => texts.push(x.myth, x.fact)); break;
        case "compare": texts.push(...b.good.items, ...b.bad.items); break;
        case "cta": texts.push(b.title, b.text); break;
        case "figure": break;
      }
    }
  }
  return texts.join(" ").split(/\s+/).filter(Boolean).length;
}
