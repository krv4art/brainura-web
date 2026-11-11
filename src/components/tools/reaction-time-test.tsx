"use client";

// Тест времени реакции: 5 попыток, экран зеленеет через случайную паузу 1,5–4,5 с.
// Время меряем от кадра, в котором зелёный реально нарисован (rAF после коммита),
// до pointerdown/клавиши — так браузер добавляет меньше лишнего.

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { saveBest, loadBest } from "./storage";

const TRIALS = 5;
type Phase = "idle" | "wait" | "go" | "early" | "shown" | "done";

// 🔒 Строки — по языкам; новый язык в Locale без своей записи не соберётся.
interface Strings {
  idle: [string, string];
  wait: string;
  go: string;
  early: [string, string];
  shown: (attempt: number, total: number) => string;
  doneTitle: (avg: number) => string;
  doneSub: string;
  bestAvg: string;
  fastest: string;
  slowest: string;
  deviceNote: string;
  /** единица миллисекунд: «ms» / «мс» */
  ms: string;
}

const EN: Strings = {
  idle: ["Reaction time test", "Click or tap here (or press Space) to start. Wait for green, then click as fast as you can."],
  wait: "Wait for green…",
  go: "CLICK!",
  early: ["Too soon!", "You clicked before it turned green. Click to try this round again."],
  shown: (a, t) => `Attempt ${a} of ${t}. Click to continue.`,
  doneTitle: (avg) => `${avg} ms average`,
  doneSub: "Click to try again.",
  bestAvg: "Your best average:",
  fastest: "Fastest:",
  slowest: "slowest:",
  deviceNote: "Your device adds its own delay, so compare your scores on the same device rather than with other people.",
  ms: "ms",
};

const RU: Strings = {
  idle: ["Тест на реакцию", "Нажмите сюда (или клавишу «пробел»), чтобы начать. Дождитесь зелёного цвета и нажмите как можно быстрее."],
  wait: "Ждите зелёного…",
  go: "ЖМИТЕ!",
  early: ["Слишком рано!", "Вы нажали до того, как стало зелёным. Нажмите, чтобы повторить этот раунд."],
  shown: (a, t) => `Попытка ${a} из ${t}. Нажмите, чтобы продолжить.`,
  doneTitle: (avg) => `В среднем ${avg} мс`,
  doneSub: "Нажмите, чтобы пройти ещё раз.",
  bestAvg: "Лучшее среднее:",
  fastest: "Быстрее всего:",
  slowest: "медленнее всего:",
  deviceNote: "Устройство вносит свою задержку, поэтому сравнивайте результаты на одном и том же устройстве, а не с другими людьми.",
  ms: "мс",
};

const STRINGS: Record<Locale, Strings> = { en: EN, ru: RU, qa: EN };

export function ReactionTimeTest({ lang = "en" }: { lang?: Locale }) {
  const tx = STRINGS[lang];
  const [phase, setPhase] = useState<Phase>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const goAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setBest(loadBest("reaction-time")), []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (phase !== "go") return;
    const id = requestAnimationFrame(() => { goAt.current = performance.now(); });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  const arm = useCallback(() => {
    setPhase("wait");
    const delay = 1500 + Math.random() * 3000;
    timer.current = setTimeout(() => setPhase("go"), delay);
  }, []);

  const press = useCallback(() => {
    if (phase === "idle" || phase === "early" || phase === "shown") {
      arm();
    } else if (phase === "wait") {
      if (timer.current) clearTimeout(timer.current);
      setPhase("early");
    } else if (phase === "go") {
      const ms = Math.round(performance.now() - (goAt.current || performance.now()));
      const next = [...times, ms];
      setTimes(next);
      if (next.length >= TRIALS) {
        const avg = Math.round(next.reduce((a, b) => a + b, 0) / next.length);
        setBest(saveBest("reaction-time", avg, "min"));
        setPhase("done");
      } else {
        setPhase("shown");
      }
    } else if (phase === "done") {
      setTimes([]);
      arm();
    }
  }, [phase, times, arm]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "Enter") return;
      const t = e.target as HTMLElement | null;
      if (t && t.id !== "rt-pad" && ["INPUT", "TEXTAREA", "BUTTON", "A", "SUMMARY"].includes(t.tagName)) return;
      e.preventDefault();
      press();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const last = times[times.length - 1];

  const look: Record<Phase, { bg: string; title: string; sub: string }> = {
    idle: { bg: "bg-[#4A90E2]", title: tx.idle[0], sub: tx.idle[1] },
    wait: { bg: "bg-[#C0392B]", title: tx.wait, sub: "" },
    go: { bg: "bg-[#27AE60]", title: tx.go, sub: "" },
    early: { bg: "bg-[#E67E22]", title: tx.early[0], sub: tx.early[1] },
    shown: { bg: "bg-[#4A90E2]", title: `${last} ${tx.ms}`, sub: tx.shown(times.length, TRIALS) },
    done: { bg: "bg-[#4A90E2]", title: tx.doneTitle(avg), sub: tx.doneSub },
  };
  const l = look[phase];

  return (
    <div>
      <button
        id="rt-pad"
        type="button"
        onPointerDown={(e) => { e.preventDefault(); press(); }}
        onKeyDown={(e) => { if (e.code === "Space" || e.code === "Enter") e.preventDefault(); }}
        className={`${l.bg} flex min-h-[300px] w-full select-none flex-col items-center justify-center rounded-3xl px-6 text-center text-white shadow-lg transition-colors duration-75 touch-manipulation sm:min-h-[340px]`}
        aria-live="polite"
      >
        <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">{l.title}</span>
        {l.sub && <span className="mt-3 max-w-md text-base text-white/90">{l.sub}</span>}
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        {Array.from({ length: TRIALS }, (_, i) => (
          <span
            key={i}
            className={`rounded-full border px-3 py-1 tabular-nums ${times[i] ? "border-[var(--color-primary)] text-[var(--color-text)]" : "border-[var(--color-border)]"}`}
          >
            {times[i] ? `${times[i]} ${tx.ms}` : `#${i + 1}`}
          </span>
        ))}
        {best !== null && <span className="ml-auto">{tx.bestAvg} <strong className="text-[var(--color-text)]">{best} {tx.ms}</strong></span>}
      </div>
      {phase === "done" && (
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          {tx.fastest} <strong className="text-[var(--color-text)]">{Math.min(...times)} {tx.ms}</strong> · {tx.slowest}{" "}
          <strong className="text-[var(--color-text)]">{Math.max(...times)} {tx.ms}</strong>. {tx.deviceNote}
        </p>
      )}
    </div>
  );
}
