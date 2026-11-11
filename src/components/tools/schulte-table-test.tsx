"use client";

// Таблица Шульте: числа 1…N² вразброс, найти по порядку. Таймер — с первого клика
// по «Start», ошибки считаются, но не останавливают. Точка в центре — ориентир
// для взгляда (держать его в центре и искать периферийным зрением).

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { loadBest, saveBest } from "./storage";

const SIZES = [3, 4, 5, 6, 7] as const;

function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 🔒 Строки — по языкам; новый язык в Locale без своей записи не соберётся.
interface Strings {
  grid: string;
  find: string;
  errors: (n: number) => string;
  best: (size: number) => string;
  result: (secs: string, errors: number) => string;
  start: (size: number) => string;
  hint: (total: number) => string;
}

const EN: Strings = {
  grid: "Grid:",
  find: "Find",
  errors: (n) => `errors ${n}`,
  best: (n) => `Best ${n}×${n}:`,
  result: (secs, e) => `${secs} s · ${e} error${e === 1 ? "" : "s"} — play again`,
  start: (n) => `Start ${n}×${n}`,
  hint: (total) =>
    `Click the numbers from 1 to ${total} in order. Try to keep your eyes on the center of the grid and find the next number with your side vision.`,
};

const STRINGS: Record<Locale, Strings> = { en: EN, qa: EN };

export function SchulteTableTest({ lang = "en" }: { lang?: Locale }) {
  const tx = STRINGS[lang];
  const [size, setSize] = useState<number>(5);
  const [cells, setCells] = useState<number[]>(() => Array.from({ length: 25 }, (_, i) => i + 1));
  const [next, setNext] = useState(1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const started = useRef(0);

  useEffect(() => setBest(loadBest(`schulte-${size}`)), [size]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(performance.now() - started.current), 100);
    return () => clearInterval(id);
  }, [running]);

  const start = (n = size) => {
    setCells(shuffled(n * n));
    setNext(1);
    setErrors(0);
    setElapsed(0);
    setDone(false);
    setRunning(true);
    started.current = performance.now();
  };

  const pick = (v: number) => {
    if (!running) return;
    if (v === next) {
      if (v === size * size) {
        const t = performance.now() - started.current;
        setElapsed(t);
        setRunning(false);
        setDone(true);
        setBest(saveBest(`schulte-${size}`, Math.round(t / 100) / 10, "min"));
      } else {
        setNext(v + 1);
      }
    } else {
      setErrors((e) => e + 1);
      setWrong(v);
      setTimeout(() => setWrong((w) => (w === v ? null : w)), 250);
    }
  };

  const secs = (elapsed / 1000).toFixed(1);
  const total = size * size;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">{tx.grid}</span>
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => { setSize(s); setRunning(false); setDone(false); setCells(Array.from({ length: s * s }, (_, i) => i + 1)); setElapsed(0); }}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${s === size ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-text)]"}`}
            aria-pressed={s === size}
          >
            {s}×{s}
          </button>
        ))}
        <span className="ml-auto text-sm tabular-nums text-[var(--color-text-secondary)]" aria-live="polite">
          {running ? <>{tx.find} <strong className="text-[var(--color-text)]">{next}</strong> · {secs} s · {tx.errors(errors)}</> : best !== null ? <>{tx.best(size)} <strong className="text-[var(--color-text)]">{best} s</strong></> : null}
        </span>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[520px]">
        <div
          className="grid aspect-square w-full gap-1.5 rounded-3xl bg-[var(--color-surface)] p-2 shadow-inner sm:gap-2 sm:p-3"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {cells.map((v) => {
            const found = running || done ? v < next || done : false;
            return (
              <button
                key={`${size}-${v}`}
                type="button"
                disabled={!running}
                onPointerDown={(e) => { e.preventDefault(); pick(v); }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(v); } }}
                className={`flex items-center justify-center rounded-xl border font-bold tabular-nums transition-colors touch-manipulation select-none ${
                  wrong === v ? "border-[#E74C3C] bg-[#FDECEA] text-[#C0392B]" : found ? "border-transparent bg-[var(--color-primary)]/10 text-[var(--color-primary)]/50" : "border-[var(--color-border)] bg-white text-[var(--color-text)]"
                } ${!running && !done ? "blur-[3px]" : ""}`}
                style={{ fontSize: `clamp(14px, ${14 / size}vw, ${Math.round(140 / size)}px)` }}
                aria-label={String(v)}
              >
                {v}
              </button>
            );
          })}
        </div>
        {running && size % 2 === 0 && (
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E74C3C]" />
        )}
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => start()}
              className="btn-gradient rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.03]"
            >
              {done ? tx.result(secs, errors) : tx.start(size)}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
        {tx.hint(total)}
      </p>
    </div>
  );
}
