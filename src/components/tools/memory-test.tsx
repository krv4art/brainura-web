"use client";

// Тест памяти, три режима:
//  • digits    — цифры по одной (как digit span), набрать в том же порядке;
//  • backwards — те же цифры, набрать задом наперёд (рабочая память);
//  • grid      — клетки сетки 4×4 вспыхивают по очереди, повторить порядок (как Corsi).
// Длина растёт на 1 после верного ответа. На каждой длине две попытки: вторая
// ошибка подряд завершает тест. Результат = самая длинная верно повторённая длина.

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { pluralRu } from "@/lib/plural-ru";
import { loadBest, saveBest } from "./storage";

type Mode = "digits" | "backwards" | "grid";
type Phase = "idle" | "show" | "input" | "feedback" | "done";

const MODES: { key: Mode; start: number }[] = [
  { key: "digits", start: 3 },
  { key: "backwards", start: 2 },
  { key: "grid", start: 3 },
];
const GRID = 4;
const MAX_GRID = GRID * GRID;

function makeSeq(mode: Mode, len: number): number[] {
  if (mode === "grid") {
    const cells = Array.from({ length: MAX_GRID }, (_, i) => i);
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    return cells.slice(0, Math.min(len, MAX_GRID));
  }
  const out: number[] = [];
  while (out.length < len) {
    const d = Math.floor(Math.random() * 10);
    if (d !== out[out.length - 1]) out.push(d); // без одинаковых подряд — их не различить при показе
  }
  return out;
}

// 🔒 Строки — по языкам; новый язык в Locale без своей записи не соберётся.
// Нормы (6–8 / 4–6 / 5–7) от языка не зависят.
interface Strings {
  modes: Record<Mode, string>;
  modeGroup: string;
  best: string;
  length: string;
  lastTry: string;
  /** Число с единицей: «4 digits» / «4 цифры». */
  unit: (mode: Mode, n: number) => string;
  /** Только единица (после крупного числа на экране результата). */
  unitWord: (mode: Mode, n: number) => string;
  cell: (n: number) => string;
  typeInOrder: string;
  typeReverse: string;
  check: string;
  tapInOrder: (done: number, total: number) => string;
  intro: Record<Mode, string>;
  start: string;
  correct: string;
  notQuite: string;
  next: (what: string) => string;
  sequenceWas: string;
  cellsOrder: string;
  oneMore: (what: string) => string;
  cont: string;
  yourSpan: string;
  tryAgain: string;
  typical: Record<Mode, string>;
  note: (mode: Mode) => string;
}

const EN: Strings = {
  modes: { digits: "Numbers", backwards: "Numbers backwards", grid: "Grid sequence" },
  modeGroup: "Test mode",
  best: "Best:",
  length: "Length",
  lastTry: " · last try",
  unit: (m, n) => `${n} ${m === "grid" ? "positions" : "digits"}`,
  unitWord: (m) => (m === "grid" ? "positions" : "digits"),
  cell: (n) => `Cell ${n}`,
  typeInOrder: "Type the digits in order",
  typeReverse: "Type the digits in reverse order",
  check: "Check",
  tapInOrder: (d, t) => `Tap the cells in the same order (${d}/${t})`,
  intro: {
    grid: "Cells light up one after another. Then tap them in the same order.",
    backwards: "Digits appear one at a time. Then type them backwards: 4 7 1 becomes 174.",
    digits: "Digits appear one at a time. Then type them in the same order.",
  },
  start: "Start",
  correct: "Correct!",
  notQuite: "Not quite",
  next: (w) => `Next: ${w}.`,
  sequenceWas: "The sequence was",
  cellsOrder: " (cells counted left to right, top to bottom)",
  oneMore: (w) => `. One more try at ${w}.`,
  cont: "Continue",
  yourSpan: "Your span",
  tryAgain: "Try again",
  typical: {
    digits: "Most adults recall about 6 to 8 digits in order.",
    backwards: "Repeating digits backwards is harder: most adults manage about 4 to 6.",
    grid: "On sequence tasks like this one, most adults repeat about 5 to 7 positions.",
  },
  note: (m) =>
    `Each correct answer adds one more ${m === "grid" ? "cell" : "digit"}. You get two tries at every length; the test ends after two misses in a row. Your best span is saved on this device.`,
};

const ruUnit = (m: Mode, n: number) =>
  m === "grid" ? pluralRu(n, "позиция", "позиции", "позиций") : pluralRu(n, "цифра", "цифры", "цифр");

const RU: Strings = {
  modes: { digits: "Цифры", backwards: "Цифры наоборот", grid: "Клетки на сетке" },
  modeGroup: "Режим теста",
  best: "Рекорд:",
  length: "Длина",
  lastTry: " · последняя попытка",
  unit: (m, n) => `${n} ${ruUnit(m, n)}`,
  unitWord: (m, n) => ruUnit(m, n),
  cell: (n) => `Клетка ${n}`,
  typeInOrder: "Введите цифры в том же порядке",
  typeReverse: "Введите цифры в обратном порядке",
  check: "Проверить",
  tapInOrder: (d, t) => `Нажимайте клетки в том же порядке (${d}/${t})`,
  intro: {
    grid: "Клетки подсвечиваются по одной. Затем нажмите на них в том же порядке.",
    backwards: "Цифры появляются по одной. Затем введите их наоборот: 4 7 1 превращается в 174.",
    digits: "Цифры появляются по одной. Затем введите их в том же порядке.",
  },
  start: "Начать",
  correct: "Верно!",
  notQuite: "Не совсем",
  next: (w) => `Дальше: ${w}.`,
  sequenceWas: "Это была последовательность",
  cellsOrder: " (клетки считаются слева направо и сверху вниз)",
  oneMore: (w) => `. Ещё одна попытка: ${w}.`,
  cont: "Дальше",
  yourSpan: "Ваш объём",
  tryAgain: "Ещё раз",
  typical: {
    digits: "Большинство взрослых повторяют от 6 до 8 цифр подряд.",
    backwards: "Наоборот сложнее: большинство взрослых справляются с 4–6 цифрами.",
    grid: "В заданиях на последовательность большинство взрослых повторяют 5–7 позиций.",
  },
  note: (m) =>
    `Каждый верный ответ добавляет ${m === "grid" ? "ещё одну клетку" : "ещё одну цифру"}. На каждой длине две попытки: тест заканчивается после двух ошибок подряд. Рекорд хранится на вашем устройстве.`,
};

const STRINGS: Record<Locale, Strings> = { en: EN, ru: RU, uk: EN, qa: EN };

export function MemoryTest({ lang = "en" }: { lang?: Locale }) {
  const t = STRINGS[lang];
  const [mode, setMode] = useState<Mode>("digits");
  const [phase, setPhase] = useState<Phase>("idle");
  const [len, setLen] = useState(3);
  const [seq, setSeq] = useState<number[]>([]);
  const [lit, setLit] = useState<number | null>(null);
  const [strike, setStrike] = useState(false);
  const [span, setSpan] = useState(0);
  const [entry, setEntry] = useState("");
  const [taps, setTaps] = useState<number[]>([]);
  const [lastOk, setLastOk] = useState(true);
  const [wrongCell, setWrongCell] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contRef = useRef<HTMLButtonElement>(null);

  const cfg = MODES.find((m) => m.key === mode)!;

  useEffect(() => setBest(loadBest(`memory-${mode}`)), [mode]);

  // Показ последовательности: элемент горит `on` мс, пауза `off` мс.
  useEffect(() => {
    if (phase !== "show") return;
    const on = mode === "grid" ? 650 : 900;
    const off = 250;
    const ids: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const tick = () => {
      if (i >= seq.length) {
        setLit(null);
        setPhase("input");
        return;
      }
      setLit(i);
      ids.push(
        setTimeout(() => {
          setLit(null);
          i++;
          ids.push(setTimeout(tick, off));
        }, on),
      );
    };
    ids.push(setTimeout(tick, 600));
    return () => ids.forEach(clearTimeout);
  }, [phase, seq, mode]);

  useEffect(() => {
    if (phase === "input" && mode !== "grid") inputRef.current?.focus();
    if (phase === "feedback" || phase === "done") contRef.current?.focus();
  }, [phase, mode]);

  const round = (n: number) => {
    setLen(n);
    setSeq(makeSeq(mode, n));
    setEntry("");
    setTaps([]);
    setWrongCell(null);
    setPhase("show");
  };

  const begin = () => {
    setSpan(0);
    setStrike(false);
    round(cfg.start);
  };

  const finish = (ok: boolean) => {
    setLastOk(ok);
    if (ok) {
      setSpan(len);
      setStrike(false);
      if (mode === "grid" && len >= MAX_GRID) {
        setBest(saveBest(`memory-${mode}`, len, "max"));
        setPhase("done");
        return;
      }
      setPhase("feedback");
    } else if (strike) {
      if (span > 0) setBest(saveBest(`memory-${mode}`, span, "max"));
      setPhase("done");
    } else {
      setStrike(true);
      setPhase("feedback");
    }
  };

  const next = () => round(lastOk ? len + 1 : len);

  const submitDigits = () => {
    const want = (mode === "backwards" ? [...seq].reverse() : seq).join("");
    finish(entry.trim() === want);
  };

  const tapCell = (c: number) => {
    if (phase !== "input" || mode !== "grid") return;
    const k = taps.length;
    const t = [...taps, c];
    setTaps(t);
    if (seq[k] !== c) {
      setWrongCell(c);
      finish(false);
    } else if (t.length === seq.length) {
      finish(true);
    }
  };

  const pickMode = (m: Mode) => {
    setMode(m);
    setPhase("idle");
    setSpan(0);
    setStrike(false);
    setLit(null);
  };

  const shownSeq = (mode === "grid" ? seq.map((c) => c + 1) : seq).join(" ");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.modeGroup}>
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => pickMode(m.key)}
            aria-pressed={m.key === mode}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${m.key === mode ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-text)]"}`}
          >
            {t.modes[m.key]}
          </button>
        ))}
        <span className="ml-auto text-sm tabular-nums text-[var(--color-text-secondary)]" aria-live="polite">
          {phase === "idle" || phase === "done"
            ? best !== null && <>{t.best} <strong className="text-[var(--color-text)]">{t.unit(mode, best)}</strong></>
            : <>{t.length} <strong className="text-[var(--color-text)]">{len}</strong>{strike && t.lastTry}</>}
        </span>
      </div>

      <div className="relative mx-auto mt-4 flex min-h-[340px] w-full max-w-[520px] flex-col items-center justify-center rounded-3xl bg-[var(--color-surface)] p-4 shadow-inner sm:min-h-[380px]">
        {mode === "grid" ? (
          <div
            className="grid aspect-square w-full max-w-[340px] gap-2"
            style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: MAX_GRID }, (_, c) => {
              const on = phase === "show" && lit !== null && seq[lit] === c;
              const tapped = phase === "input" && taps.includes(c) && wrongCell !== c;
              const bad = wrongCell === c && phase !== "show";
              return (
                <button
                  key={c}
                  type="button"
                  disabled={phase !== "input"}
                  onPointerDown={(e) => { e.preventDefault(); tapCell(c); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tapCell(c); } }}
                  aria-label={t.cell(c + 1)}
                  className={`rounded-xl border transition-colors duration-100 touch-manipulation select-none ${
                    bad ? "border-[#E74C3C] bg-[#FDECEA]" : on ? "border-transparent bg-[var(--color-primary)]" : tapped ? "border-transparent bg-[var(--color-primary)]/25" : "border-[var(--color-border)] bg-white"
                  }`}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center" aria-live="off">
            {phase === "show" && (
              <span className="text-8xl font-extrabold tabular-nums text-[var(--color-text)]">
                {lit !== null ? seq[lit] : ""}
              </span>
            )}
            {phase === "input" && (
              <form
                onSubmit={(e) => { e.preventDefault(); submitDigits(); }}
                className="flex w-full max-w-[320px] flex-col items-center gap-3"
              >
                <label htmlFor="mem-entry" className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {mode === "backwards" ? t.typeReverse : t.typeInOrder}
                </label>
                <input
                  id="mem-entry"
                  ref={inputRef}
                  inputMode="numeric"
                  autoComplete="off"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value.replace(/\D/g, "").slice(0, 20))}
                  className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-center text-3xl font-bold tracking-[0.3em] tabular-nums text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                />
                <button type="submit" disabled={!entry} className="btn-gradient rounded-full px-8 py-3 font-bold text-white disabled:opacity-50">
                  {t.check}
                </button>
              </form>
            )}
          </div>
        )}

        {mode === "grid" && phase === "input" && (
          <p className="mt-3 text-sm font-medium text-[var(--color-text-secondary)]">
            {t.tapInOrder(taps.length, seq.length)}
          </p>
        )}

        {(phase === "idle" || phase === "feedback" || phase === "done") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-[var(--color-surface)]/90 p-6 text-center backdrop-blur-[2px]">
            {phase === "idle" && (
              <>
                <p className="max-w-xs text-[var(--color-text-secondary)]">
                  {t.intro[mode]}
                </p>
                <button type="button" onClick={begin} className="btn-gradient rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.03]">
                  {t.start}
                </button>
              </>
            )}
            {phase === "feedback" && (
              <>
                <p className="text-2xl font-bold text-[var(--color-text)]">
                  {lastOk ? t.correct : t.notQuite}
                </p>
                <p className="max-w-xs text-sm text-[var(--color-text-secondary)]">
                  {lastOk
                    ? t.next(t.unit(mode, len + 1))
                    : <>{t.sequenceWas} <strong className="tabular-nums text-[var(--color-text)]">{shownSeq}</strong>{mode === "grid" ? t.cellsOrder : ""}{t.oneMore(t.unit(mode, len))}</>}
                </p>
                <button ref={contRef} type="button" onClick={next} className="btn-gradient rounded-full px-8 py-3 font-bold text-white">
                  {t.cont}
                </button>
              </>
            )}
            {phase === "done" && (
              <>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">{t.yourSpan}</p>
                <p className="text-5xl font-extrabold tabular-nums text-[var(--color-text)]">
                  {span > 0 ? span : `< ${cfg.start}`} <span className="text-2xl font-bold">{t.unitWord(mode, span > 0 ? span : cfg.start)}</span>
                </p>
                <p className="max-w-xs text-sm text-[var(--color-text-secondary)]">{t.typical[mode]}</p>
                <button ref={contRef} type="button" onClick={begin} className="btn-gradient rounded-full px-8 py-3 font-bold text-white">
                  {t.tryAgain}
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
        {t.note(mode)}
      </p>
    </div>
  );
}
