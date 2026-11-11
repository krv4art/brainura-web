"use client";

// Тест времени реакции: 5 попыток, экран зеленеет через случайную паузу 1,5–4,5 с.
// Время меряем от кадра, в котором зелёный реально нарисован (rAF после коммита),
// до pointerdown/клавиши — так браузер добавляет меньше лишнего.

import { useCallback, useEffect, useRef, useState } from "react";
import { saveBest, loadBest } from "./storage";

const TRIALS = 5;
type Phase = "idle" | "wait" | "go" | "early" | "shown" | "done";

export function ReactionTimeTest() {
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
    idle: { bg: "bg-[#4A90E2]", title: "Reaction time test", sub: "Click or tap here (or press Space) to start. Wait for green, then click as fast as you can." },
    wait: { bg: "bg-[#C0392B]", title: "Wait for green…", sub: "" },
    go: { bg: "bg-[#27AE60]", title: "CLICK!", sub: "" },
    early: { bg: "bg-[#E67E22]", title: "Too soon!", sub: "You clicked before it turned green. Click to try this round again." },
    shown: { bg: "bg-[#4A90E2]", title: `${last} ms`, sub: `Attempt ${times.length} of ${TRIALS}. Click to continue.` },
    done: { bg: "bg-[#4A90E2]", title: `${avg} ms average`, sub: "Click to try again." },
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
            {times[i] ? `${times[i]} ms` : `#${i + 1}`}
          </span>
        ))}
        {best !== null && <span className="ml-auto">Your best average: <strong className="text-[var(--color-text)]">{best} ms</strong></span>}
      </div>
      {phase === "done" && (
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          Fastest: <strong className="text-[var(--color-text)]">{Math.min(...times)} ms</strong> · slowest:{" "}
          <strong className="text-[var(--color-text)]">{Math.max(...times)} ms</strong>. Your device adds its own delay,
          so compare your scores on the same device rather than with other people.
        </p>
      )}
    </div>
  );
}
