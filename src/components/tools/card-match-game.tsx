"use client";

// «Найди пару» (memory cards): карточки рубашкой вверх, открыть две — если
// совпали, остаются открытыми, иначе закрываются. Цель — открыть все пары за
// меньшее число ходов. Ход = открытая пара карточек. Рекорд — меньше ходов на
// каждом размере поля. Раскладка — только по «Начать» (SSR без случайности).

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { pluralRu } from "@/lib/plural-ru";
import { loadBest, saveBest } from "./storage";

// Пиктограммы — эмодзи фруктов: читаются на любом экране и не зависят от языка.
const FACES = ["🍎", "🍋", "🍇", "🍓", "🥝", "🍒", "🍑", "🍍", "🥥", "🍌", "🍉", "🫐"];

const SIZES = [
  { key: "s", cols: 4, pairs: 6 },
  { key: "m", cols: 4, pairs: 8 },
  { key: "l", cols: 5, pairs: 10 },
  { key: "xl", cols: 6, pairs: 12 },
] as const;
type SizeKey = (typeof SIZES)[number]["key"];

function deal(pairs: number): number[] {
  const deck = Array.from({ length: pairs * 2 }, (_, i) => i % pairs);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// 🔒 Строки — по языкам; новый язык в Locale без своей записи не соберётся.
interface Strings {
  size: string;
  pairs: (n: number) => string;
  moves: (n: number) => string;
  found: (done: number, total: number) => string;
  best: string;
  start: string;
  result: (moves: number, secs: string) => string;
  hint: string;
  card: string;
  sec: string;
}

const EN: Strings = {
  size: "Cards:",
  pairs: (n) => `${n} pairs`,
  moves: (n) => `${n} move${n === 1 ? "" : "s"}`,
  found: (d, t) => `pairs ${d}/${t}`,
  best: "Best:",
  start: "Start",
  result: (m, s) => `${m} move${m === 1 ? "" : "s"} · ${s} s — play again`,
  hint: "Flip two cards at a time. Matching pairs stay open; the others turn back over. Remember where each picture was and clear the board in as few moves as you can.",
  card: "Card",
  sec: "s",
};

const RU: Strings = {
  size: "Карточки:",
  pairs: (n) => `${n} ${pluralRu(n, "пара", "пары", "пар")}`,
  moves: (n) => `${n} ${pluralRu(n, "ход", "хода", "ходов")}`,
  found: (d, t) => `пары ${d}/${t}`,
  best: "Рекорд:",
  start: "Начать",
  result: (m, s) => `${m} ${pluralRu(m, "ход", "хода", "ходов")} · ${s} с — ещё раз`,
  hint: "Открывайте по две карточки. Одинаковые остаются открытыми, остальные переворачиваются обратно. Запоминайте, где какая картинка, и откройте всё поле за как можно меньшее число ходов.",
  card: "Карточка",
  sec: "с",
};

const UK: Strings = {
  size: "Картки:",
  pairs: (n) => `${n} ${pluralRu(n, "пара", "пари", "пар")}`,
  moves: (n) => `${n} ${pluralRu(n, "хід", "ходи", "ходів")}`,
  found: (d, t) => `пари ${d}/${t}`,
  best: "Рекорд:",
  start: "Почати",
  result: (m, s) => `${m} ${pluralRu(m, "хід", "ходи", "ходів")} · ${s} с — ще раз`,
  hint: "Відкривайте по дві картки. Однакові лишаються відкритими, решта перевертаються назад. Запам'ятовуйте, де яка картинка, і відкрийте все поле за якомога менше ходів.",
  card: "Картка",
  sec: "с",
};

const STRINGS: Record<Locale, Strings> = { en: EN, ru: RU, uk: UK, qa: EN };

export function CardMatchGame({ lang = "en" }: { lang?: Locale }) {
  const tx = STRINGS[lang];
  const [sizeKey, setSizeKey] = useState<SizeKey>("m");
  const size = SIZES.find((s) => s.key === sizeKey)!;
  const [deck, setDeck] = useState<number[]>(() => Array.from({ length: 16 }, (_, i) => i % 8));
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const started = useRef(0);
  const lock = useRef(false);

  useEffect(() => setBest(loadBest(`card-match-${sizeKey}`)), [sizeKey]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(performance.now() - started.current), 250);
    return () => clearInterval(id);
  }, [running]);

  const reset = (key: SizeKey) => {
    const s = SIZES.find((x) => x.key === key)!;
    setSizeKey(key);
    setDeck(Array.from({ length: s.pairs * 2 }, (_, i) => i % s.pairs));
    setOpen([]);
    setMatched(new Set());
    setMoves(0);
    setElapsed(0);
    setRunning(false);
    setDone(false);
  };

  const start = () => {
    setDeck(deal(size.pairs));
    setOpen([]);
    setMatched(new Set());
    setMoves(0);
    setElapsed(0);
    setDone(false);
    setRunning(true);
    lock.current = false;
    started.current = performance.now();
  };

  const flip = (i: number) => {
    if (!running || lock.current || open.includes(i) || matched.has(deck[i])) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length < 2) return;
    const m = moves + 1;
    setMoves(m);
    const [a, b] = next;
    if (deck[a] === deck[b]) {
      const got = new Set(matched).add(deck[a]);
      setMatched(got);
      setOpen([]);
      if (got.size === size.pairs) {
        setElapsed(performance.now() - started.current);
        setRunning(false);
        setDone(true);
        setBest(saveBest(`card-match-${sizeKey}`, m, "min"));
      }
    } else {
      lock.current = true;
      setTimeout(() => {
        setOpen([]);
        lock.current = false;
      }, 750);
    }
  };

  const secs = (elapsed / 1000).toFixed(0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">{tx.size}</span>
        {SIZES.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => reset(s.key)}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${s.key === sizeKey ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-text)]"}`}
            aria-pressed={s.key === sizeKey}
          >
            {tx.pairs(s.pairs)}
          </button>
        ))}
        <span className="ml-auto text-sm tabular-nums text-[var(--color-text-secondary)]" aria-live="polite">
          {running ? (
            <>
              {tx.moves(moves)} · {tx.found(matched.size, size.pairs)} · {secs} {tx.sec}
            </>
          ) : best !== null ? (
            <>
              {tx.best} <strong className="text-[var(--color-text)]">{tx.moves(best)}</strong>
            </>
          ) : null}
        </span>
      </div>

      {/* Ширина по числу колонок: поле целиком помещается в экран и на десктопе. */}
      <div className="relative mx-auto mt-4 w-full" style={{ maxWidth: size.cols * 100 }}>
        <div
          className="grid w-full gap-2 rounded-3xl bg-[var(--color-surface)] p-2 shadow-inner sm:gap-3 sm:p-3"
          style={{ gridTemplateColumns: `repeat(${size.cols}, minmax(0, 1fr))` }}
        >
          {deck.map((face, i) => {
            const shown = open.includes(i) || matched.has(face) || done;
            return (
              <button
                key={`${sizeKey}-${i}`}
                type="button"
                disabled={!running}
                onClick={() => flip(i)}
                aria-label={shown ? FACES[face] : `${tx.card} ${i + 1}`}
                className={`flex aspect-square items-center justify-center rounded-xl border text-3xl transition-all duration-200 touch-manipulation select-none sm:text-4xl ${
                  shown
                    ? matched.has(face)
                      ? "border-transparent bg-[var(--color-primary)]/10"
                      : "border-[var(--color-primary)] bg-white"
                    : "border-transparent bg-[var(--color-primary)] shadow-sm"
                } ${!running && !done ? "opacity-60" : ""}`}
              >
                {shown ? FACES[face] : <span className="text-xl font-black text-white/70">?</span>}
              </button>
            );
          })}
        </div>
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={start}
              className="btn-gradient rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.03]"
            >
              {done ? tx.result(moves, secs) : tx.start}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{tx.hint}</p>
    </div>
  );
}
