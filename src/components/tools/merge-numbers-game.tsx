"use client";

// «Слияние чисел» (жанр 2048): поле 4×4, сдвиг всех плиток в одну сторону,
// две одинаковые при столкновении сливаются в одну с суммой (за ход каждая
// плитка сливается не больше одного раза). После каждого хода появляется
// новая плитка: 2 (90 %) или 4. Счёт = сумма всех слияний. Управление:
// стрелки/WASD, когда поле в фокусе, и свайпы. Рекорд — лучший счёт.

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { loadBest, saveBest } from "./storage";

const N = 4;
type Board = number[]; // N*N, 0 = пусто
type Dir = "left" | "right" | "up" | "down";

function empty(): Board {
  return Array(N * N).fill(0);
}

function spawn(b: Board): Board {
  const free = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  if (!free.length) return b;
  const out = b.slice();
  out[free[Math.floor(Math.random() * free.length)]] = Math.random() < 0.9 ? 2 : 4;
  return out;
}

/** Индексы клеток линии в порядке движения (первая — та, к которой сдвигаем). */
function lines(dir: Dir): number[][] {
  const out: number[][] = [];
  for (let k = 0; k < N; k++) {
    const line: number[] = [];
    for (let j = 0; j < N; j++) {
      if (dir === "left") line.push(k * N + j);
      if (dir === "right") line.push(k * N + (N - 1 - j));
      if (dir === "up") line.push(j * N + k);
      if (dir === "down") line.push((N - 1 - j) * N + k);
    }
    out.push(line);
  }
  return out;
}

function move(b: Board, dir: Dir): { board: Board; gained: number; moved: boolean } {
  const out = b.slice();
  let gained = 0;
  for (const line of lines(dir)) {
    const vals = line.map((i) => b[i]).filter(Boolean);
    const merged: number[] = [];
    for (let i = 0; i < vals.length; i++) {
      if (i + 1 < vals.length && vals[i] === vals[i + 1]) {
        merged.push(vals[i] * 2);
        gained += vals[i] * 2;
        i++;
      } else merged.push(vals[i]);
    }
    line.forEach((idx, j) => (out[idx] = merged[j] ?? 0));
  }
  return { board: out, gained, moved: out.some((v, i) => v !== b[i]) };
}

function canMove(b: Board): boolean {
  return (["left", "right", "up", "down"] as Dir[]).some((d) => move(b, d).moved);
}

// Цвета плиток: от светлого к насыщенному фиолетовому, крупные — тёплые.
function tileStyle(v: number): { bg: string; fg: string } {
  const map: Record<number, [string, string]> = {
    2: ["#EEF0FF", "#3B3F72"],
    4: ["#DDE1FF", "#3B3F72"],
    8: ["#B9BFFF", "#1F2350"],
    16: ["#959DFB", "#FFFFFF"],
    32: ["#7C83F5", "#FFFFFF"],
    64: ["#6366F1", "#FFFFFF"],
    128: ["#8B5CF6", "#FFFFFF"],
    256: ["#A855F7", "#FFFFFF"],
    512: ["#D946EF", "#FFFFFF"],
    1024: ["#EC4899", "#FFFFFF"],
    2048: ["#F59E0B", "#FFFFFF"],
  };
  const [bg, fg] = map[v] ?? ["#EA580C", "#FFFFFF"];
  return { bg, fg };
}

// 🔒 Строки — по языкам; новый язык в Locale без своей записи не соберётся.
interface Strings {
  score: string;
  best: string;
  start: string;
  newGame: string;
  over: (score: number) => string;
  won: string;
  keepGoing: string;
  hint: string;
  board: string;
}

const EN: Strings = {
  score: "Score",
  best: "Best",
  start: "Start",
  newGame: "New game",
  over: (s) => `No moves left · ${s} points — play again`,
  won: "You made 2048!",
  keepGoing: "Keep going",
  hint: "Use the arrow keys or swipe to slide all tiles. Two tiles with the same number merge into one. Plan a few moves ahead: keep your biggest tile in a corner and build towards it.",
  board: "Number board. Use the arrow keys to move the tiles.",
};

const RU: Strings = {
  score: "Счёт",
  best: "Рекорд",
  start: "Начать",
  newGame: "Новая игра",
  over: (s) => `Ходов больше нет · ${s} очк. — ещё раз`,
  won: "Вы собрали 2048!",
  keepGoing: "Играть дальше",
  hint: "Стрелками или свайпом сдвигайте все плитки разом. Две плитки с одинаковым числом сливаются в одну. Думайте на пару ходов вперёд: держите самую крупную плитку в углу и собирайте к ней.",
  board: "Поле с числами. Сдвигайте плитки стрелками.",
};

const UK: Strings = {
  score: "Рахунок",
  best: "Рекорд",
  start: "Почати",
  newGame: "Нова гра",
  over: (s) => `Ходів більше немає · ${s} оч. — ще раз`,
  won: "Ви зібрали 2048!",
  keepGoing: "Грати далі",
  hint: "Стрілками або свайпом зсувайте всі плитки разом. Дві плитки з однаковим числом зливаються в одну. Думайте на кілька ходів наперед: тримайте найбільшу плитку в куті й збирайте до неї.",
  board: "Поле з числами. Зсувайте плитки стрілками.",
};

const STRINGS: Record<Locale, Strings> = { en: EN, ru: RU, uk: UK, qa: EN };

const KEYS: Record<string, Dir> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
};

export function MergeNumbersGame({ lang = "en" }: { lang?: Locale }) {
  const tx = STRINGS[lang];
  const [board, setBoard] = useState<Board>(empty);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "play" | "won" | "over">("idle");
  const [wonShown, setWonShown] = useState(false);
  const [fresh, setFresh] = useState<number>(-1);
  const boardRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setBest(loadBest("merge-numbers")), []);

  const start = () => {
    const b = spawn(spawn(empty()));
    setBoard(b);
    setScore(0);
    setPhase("play");
    setWonShown(false);
    setFresh(-1);
    boardRef.current?.focus();
  };

  const play = (dir: Dir) => {
    if (phase !== "play") return;
    const r = move(board, dir);
    if (!r.moved) return;
    const next = spawn(r.board);
    setFresh(next.findIndex((v, i) => v !== r.board[i]));
    const total = score + r.gained;
    setBoard(next);
    setScore(total);
    if (!wonShown && next.some((v) => v >= 2048)) {
      setWonShown(true);
      setPhase("won");
      setBest(saveBest("merge-numbers", total, "max"));
      return;
    }
    if (!canMove(next)) {
      setPhase("over");
      setBest(saveBest("merge-numbers", total, "max"));
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    const dir = KEYS[e.key] ?? KEYS[e.key.toLowerCase()];
    if (!dir || phase !== "play") return;
    e.preventDefault();
    play(dir);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const t = touch.current;
    touch.current = null;
    if (!t) return;
    const dx = e.clientX - t.x;
    const dy = e.clientY - t.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    play(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up");
  };

  const overlay = phase === "idle" || phase === "over" || phase === "won";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-semibold tabular-nums text-[var(--color-primary)]" aria-live="polite">
          {tx.score}: {score}
        </span>
        {best !== null && (
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm tabular-nums text-[var(--color-text-secondary)]">
            {tx.best}: <strong className="text-[var(--color-text)]">{best}</strong>
          </span>
        )}
        {phase === "play" && (
          <button
            type="button"
            onClick={start}
            className="ml-auto rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm font-semibold text-[var(--color-text)]"
          >
            {tx.newGame}
          </button>
        )}
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[440px]">
        <div
          ref={boardRef}
          tabIndex={0}
          role="application"
          aria-label={tx.board}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (touch.current = null)}
          className="grid aspect-square w-full touch-none select-none grid-cols-4 gap-2 rounded-3xl bg-[var(--color-surface)] p-2 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:gap-3 sm:p-3"
        >
          {board.map((v, i) => {
            const st = v ? tileStyle(v) : null;
            return (
              <div
                key={i}
                className={`flex items-center justify-center rounded-xl font-black tabular-nums ${v ? "" : "bg-white/70"} ${i === fresh ? "animate-[pop_.18s_ease-out]" : ""}`}
                style={
                  st
                    ? {
                        background: st.bg,
                        color: st.fg,
                        fontSize: v >= 1024 ? "clamp(16px, 5vw, 30px)" : v >= 128 ? "clamp(18px, 6vw, 36px)" : "clamp(20px, 7vw, 44px)",
                      }
                    : undefined
                }
              >
                {v || ""}
              </div>
            );
          })}
        </div>
        {overlay && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/40 backdrop-blur-[1px]">
            {phase === "won" && <p className="text-xl font-black text-[var(--color-text)]">{tx.won}</p>}
            <button
              type="button"
              onClick={() => {
                if (phase === "won") {
                  setPhase("play");
                  boardRef.current?.focus();
                } else start();
              }}
              className="btn-gradient rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.03]"
            >
              {phase === "won" ? tx.keepGoing : phase === "over" ? tx.over(score) : tx.start}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{tx.hint}</p>
    </div>
  );
}
