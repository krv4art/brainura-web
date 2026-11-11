"use client";

// Тест Струпа: слово-название цвета напечатано цветом; ответить ЦВЕТОМ ЧЕРНИЛ.
// 24 предъявления, половина совпадающих (congruent), половина нет. Считаем среднее
// время верных ответов по каждому типу; разница = эффект Струпа (интерференция).
// Клавиши: R, G, B, Y. Фон стимула тёмный — все четыре цвета на нём читаются.

import { useCallback, useEffect, useRef, useState } from "react";
import { loadBest, saveBest } from "./storage";

const COLORS = [
  { key: "red", label: "Red", ink: "#FF5A4E", hotkey: "r" },
  { key: "green", label: "Green", ink: "#3DDC84", hotkey: "g" },
  { key: "blue", label: "Blue", ink: "#5AA9FF", hotkey: "b" },
  { key: "yellow", label: "Yellow", ink: "#FFD43B", hotkey: "y" },
] as const;
type ColorKey = (typeof COLORS)[number]["key"];

const TRIALS = 24;

interface Trial {
  word: ColorKey;
  ink: ColorKey;
}
interface Answer {
  congruent: boolean;
  correct: boolean;
  ms: number;
}

function makeTrials(): Trial[] {
  const out: Trial[] = [];
  for (let i = 0; i < TRIALS; i++) {
    const ink = COLORS[Math.floor(Math.random() * 4)].key;
    let word: ColorKey = ink;
    if (i % 2 === 1) {
      const others = COLORS.filter((c) => c.key !== ink);
      word = others[Math.floor(Math.random() * 3)].key;
    }
    out.push({ word, ink });
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const mean = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);

export function StroopTest() {
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const [trials, setTrials] = useState<Trial[]>([]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const shownAt = useRef(0);

  useEffect(() => setBest(loadBest("stroop-effect")), []);

  useEffect(() => {
    if (phase !== "run") return;
    const id = requestAnimationFrame(() => { shownAt.current = performance.now(); });
    return () => cancelAnimationFrame(id);
  }, [phase, i]);

  const start = () => {
    setTrials(makeTrials());
    setI(0);
    setAnswers([]);
    setPhase("run");
  };

  const answer = useCallback(
    (c: ColorKey) => {
      if (phase !== "run") return;
      const t = trials[i];
      const a: Answer = {
        congruent: t.word === t.ink,
        correct: c === t.ink,
        ms: performance.now() - shownAt.current,
      };
      const next = [...answers, a];
      setAnswers(next);
      setFlash(a.correct ? "ok" : "bad");
      setTimeout(() => setFlash(null), 150);
      if (i + 1 >= trials.length) {
        setPhase("done");
        const ok = next.filter((x) => x.correct);
        const eff = mean(ok.filter((x) => !x.congruent).map((x) => x.ms)) - mean(ok.filter((x) => x.congruent).map((x) => x.ms));
        setBest(saveBest("stroop-effect", eff, "min"));
      } else {
        setI(i + 1);
      }
    },
    [phase, trials, i, answers],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const c = COLORS.find((x) => x.hotkey === e.key.toLowerCase());
      if (c && phase === "run") {
        e.preventDefault();
        answer(c.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, phase]);

  const ok = answers.filter((a) => a.correct);
  const congruentMs = mean(ok.filter((a) => a.congruent).map((a) => a.ms));
  const incongruentMs = mean(ok.filter((a) => !a.congruent).map((a) => a.ms));
  const accuracy = answers.length ? Math.round((ok.length / answers.length) * 100) : 0;
  const t = trials[i];
  const inkOf = (k: ColorKey) => COLORS.find((c) => c.key === k)!.ink;

  return (
    <div>
      <div
        className={`flex min-h-[220px] flex-col items-center justify-center rounded-3xl bg-[#0E141A] px-6 text-center shadow-lg ring-4 transition ${flash === "ok" ? "ring-[#27AE60]" : flash === "bad" ? "ring-[#E74C3C]" : "ring-transparent"}`}
        aria-live="polite"
      >
        {phase === "idle" && (
          <>
            <p className="max-w-md text-base text-white/85">
              A color word appears in colored ink. Click the <strong className="text-white">ink color</strong>, not
              the word. {TRIALS} words, as fast and accurately as you can. Keyboard: R, G, B, Y.
            </p>
            <button type="button" onClick={start} className="btn-gradient mt-6 rounded-full px-8 py-3 text-lg font-bold text-white shadow-xl">
              Start the Stroop test
            </button>
          </>
        )}
        {phase === "run" && t && (
          <>
            <span className="select-none text-6xl font-extrabold uppercase tracking-wide sm:text-7xl" style={{ color: inkOf(t.ink) }}>
              {COLORS.find((c) => c.key === t.word)!.label}
            </span>
            <span className="mt-4 text-sm tabular-nums text-white/60">
              {i + 1} / {trials.length}
            </span>
          </>
        )}
        {phase === "done" && (
          <div className="w-full max-w-md text-white">
            <p className="text-sm uppercase tracking-wide text-white/60">Your Stroop effect</p>
            <p className="mt-1 text-5xl font-extrabold tabular-nums">{incongruentMs - congruentMs} ms</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div><p className="text-white/60">Matching</p><p className="text-lg font-bold tabular-nums">{congruentMs} ms</p></div>
              <div><p className="text-white/60">Mismatched</p><p className="text-lg font-bold tabular-nums">{incongruentMs} ms</p></div>
              <div><p className="text-white/60">Accuracy</p><p className="text-lg font-bold tabular-nums">{accuracy}%</p></div>
            </div>
            <button type="button" onClick={start} className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[var(--color-text)]">
              Try again
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COLORS.map((c) => (
          <button
            key={c.key}
            type="button"
            disabled={phase !== "run"}
            onPointerDown={(e) => { e.preventDefault(); answer(c.key); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); answer(c.key); } }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-4 text-base font-semibold text-[var(--color-text)] shadow-sm transition touch-manipulation select-none enabled:hover:-translate-y-0.5 disabled:opacity-50"
          >
            <span className="h-4 w-4 rounded-full" style={{ background: c.ink }} aria-hidden="true" />
            {c.label}
            <kbd className="ml-1 hidden rounded border border-[var(--color-border)] px-1.5 text-xs text-[var(--color-muted)] sm:inline">{c.hotkey.toUpperCase()}</kbd>
          </button>
        ))}
      </div>
      {phase === "done" && (
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          The Stroop effect is how much slower you answer when the word and the ink disagree. Only correct answers count.
          {best !== null && <> Your smallest effect so far: <strong className="text-[var(--color-text)]">{best} ms</strong>.</>}
        </p>
      )}
    </div>
  );
}
