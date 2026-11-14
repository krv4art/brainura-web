"use client";

// «Анаграммы» (word scramble): буквы слова перемешаны, собрать слово. Раунд —
// 60 секунд, очки = собранные слова. Буквы — кликом по плиткам или с клавиатуры,
// Backspace убирает последнюю. Слово проверяется, когда набраны все буквы.
// 🔒 Списки слов — свои на каждый язык (не перевод), без слов, у которых есть
// другая анаграмма-слово (garden/danger, ракета/карета): иначе верный ответ
// засчитался бы как ошибка. Рекорд — больше слов за раунд.

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { pluralRu } from "@/lib/plural-ru";
import { loadBest, saveBest } from "./storage";

const ROUND_MS = 60_000;

const WORDS_EN = [
  "planet", "winter", "bridge", "pencil", "rocket", "market", "island", "doctor", "travel", "monkey",
  "summer", "guitar", "yellow", "button", "kitten", "purple", "school", "cookie", "butter", "ticket",
  "jacket", "office", "letter", "camera", "puzzle", "number", "memory", "family", "wizard", "basket",
  "dragon", "pepper", "spring", "coffee", "window", "thunder", "blanket", "morning", "chicken", "battery",
  "library", "balance", "captain", "diamond", "freedom", "lantern", "mystery", "pyramid", "journey", "compass",
  "sunrise", "picture", "holiday", "orange", "castle", "helmet", "garlic", "pirate", "violin", "carrot",
];

const WORDS_RU = [
  "дорога", "яблоко", "машина", "солнце", "облако", "письмо", "кружка", "бабочка", "учитель", "картина",
  "телефон", "подарок", "цветок", "лягушка", "черепаха", "неделя", "праздник", "музыка", "дерево", "остров",
  "гитара", "кровать", "звезда", "улитка", "морковь", "ладонь", "огурец", "медведь", "собака", "зеркало",
  "комната", "конфета", "тетрадь", "карандаш", "фонарь", "корабль", "капуста", "ромашка", "пингвин", "крокодил",
  "автобус", "подушка", "чемодан", "компас", "тюльпан", "снеговик", "радуга", "загадка", "колесо", "ракушка",
  "клубника", "шоколад", "молоко", "одеяло",
];

const WORDS_UK = [
  "дорога", "яблуко", "машина", "сонце", "хмара", "чашка", "метелик", "вчитель", "картина", "телефон",
  "подарунок", "квітка", "черепаха", "тиждень", "свято", "музика", "дерево", "пташка", "острів", "гітара",
  "ліжко", "зірка", "равлик", "морква", "долоня", "огірок", "ведмідь", "собака", "дзеркало", "кімната",
  "цукерка", "зошит", "олівець", "ліхтар", "корабель", "капуста", "ромашка", "каструля", "пінгвін", "крокодил",
  "автобус", "подушка", "валіза", "компас", "тюльпан", "сніговик", "веселка", "морозиво", "загадка", "колесо",
  "драбина", "полуниця", "шоколад", "молоко", "ковдра", "бджола", "книжка", "годинник",
];

const WORDS: Record<Locale, string[]> = { en: WORDS_EN, ru: WORDS_RU, uk: WORDS_UK, qa: WORDS_EN };

function scramble(word: string): string[] {
  const letters = [...word];
  for (let attempt = 0; attempt < 10; attempt++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    if (letters.join("") !== word) break;
  }
  return letters;
}

function pickWord(lang: Locale, prev: string | null): string {
  const list = WORDS[lang];
  let w = prev;
  while (w === prev) w = list[Math.floor(Math.random() * list.length)];
  return w!;
}

// 🔒 Строки — по языкам; новый язык в Locale без своей записи не соберётся.
interface Strings {
  words: (n: number) => string;
  best: string;
  start: string;
  result: (n: number) => string;
  skip: string;
  clear: string;
  answerWas: (w: string) => string;
  hint: string;
  sec: string;
}

const EN: Strings = {
  words: (n) => `${n} word${n === 1 ? "" : "s"}`,
  best: "Best:",
  start: "Start · 60 s",
  result: (n) => `${n} word${n === 1 ? "" : "s"} in 60 s — play again`,
  skip: "Skip",
  clear: "Clear",
  answerWas: (w) => `It was “${w}”`,
  hint: "Unscramble as many words as you can in 60 seconds. Click the letters in order or just type the word. Stuck? Skip to the next one: the clock keeps running, so do not spend too long on a single word.",
  sec: "s",
};

const RU: Strings = {
  words: (n) => `${n} ${pluralRu(n, "слово", "слова", "слов")}`,
  best: "Рекорд:",
  start: "Начать · 60 с",
  result: (n) => `${n} ${pluralRu(n, "слово", "слова", "слов")} за 60 с — ещё раз`,
  skip: "Пропустить",
  clear: "Стереть",
  answerWas: (w) => `Было слово «${w}»`,
  hint: "Соберите из перемешанных букв как можно больше слов за 60 секунд. Нажимайте буквы по порядку или просто наберите слово на клавиатуре. Не получается — пропустите: время идёт, и на одно слово лучше не тратить слишком много.",
  sec: "с",
};

const UK: Strings = {
  words: (n) => `${n} ${pluralRu(n, "слово", "слова", "слів")}`,
  best: "Рекорд:",
  start: "Почати · 60 с",
  result: (n) => `${n} ${pluralRu(n, "слово", "слова", "слів")} за 60 с — ще раз`,
  skip: "Пропустити",
  clear: "Стерти",
  answerWas: (w) => `Було слово «${w}»`,
  hint: "Складіть із перемішаних літер якомога більше слів за 60 секунд. Натискайте літери по черзі або просто наберіть слово на клавіатурі. Не виходить — пропустіть: час іде, і на одне слово краще не витрачати забагато.",
  sec: "с",
};

const STRINGS: Record<Locale, Strings> = { en: EN, ru: RU, uk: UK, qa: EN };

export function AnagramsGame({ lang = "en" }: { lang?: Locale }) {
  const tx = STRINGS[lang];
  const [word, setWord] = useState<string>(WORDS[lang][0]);
  const [tiles, setTiles] = useState<string[]>(() => [...WORDS[lang][0]]);
  const [picked, setPicked] = useState<number[]>([]);
  const [solved, setSolved] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(ROUND_MS);
  const [best, setBest] = useState<number | null>(null);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [skipped, setSkipped] = useState<string | null>(null);
  const started = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const solvedRef = useRef(0);

  useEffect(() => setBest(loadBest(`anagrams-${lang}`)), [lang]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const rest = ROUND_MS - (performance.now() - started.current);
      if (rest <= 0) {
        setLeft(0);
        setRunning(false);
        setDone(true);
        setBest(saveBest(`anagrams-${lang}`, solvedRef.current, "max"));
      } else setLeft(rest);
    }, 200);
    return () => clearInterval(id);
  }, [running, lang]);

  const nextWord = (prev: string | null) => {
    const w = pickWord(lang, prev);
    setWord(w);
    setTiles(scramble(w));
    setPicked([]);
  };

  const start = () => {
    solvedRef.current = 0;
    setSolved(0);
    setSkipped(null);
    setDone(false);
    setLeft(ROUND_MS);
    nextWord(null);
    setRunning(true);
    started.current = performance.now();
    setTimeout(() => boxRef.current?.focus(), 0);
  };

  const check = (sel: number[]) => {
    const guess = sel.map((i) => tiles[i]).join("");
    if (guess === word) {
      solvedRef.current += 1;
      setSolved(solvedRef.current);
      setSkipped(null);
      setFlash("ok");
      setTimeout(() => setFlash(null), 300);
      nextWord(word);
    } else {
      setFlash("bad");
      setTimeout(() => {
        setFlash(null);
        setPicked([]);
      }, 350);
    }
  };

  const pick = (i: number) => {
    if (!running || picked.includes(i) || flash === "bad") return;
    const sel = [...picked, i];
    setPicked(sel);
    if (sel.length === tiles.length) check(sel);
  };

  const unpick = () => setPicked((p) => p.slice(0, -1));

  const skip = () => {
    if (!running) return;
    setSkipped(word);
    nextWord(word);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!running) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      unpick();
      return;
    }
    if (e.key.length !== 1) return;
    const ch = e.key.toLowerCase();
    const i = tiles.findIndex((t, k) => t === ch && !picked.includes(k));
    if (i >= 0) {
      e.preventDefault();
      pick(i);
    }
  };

  const secs = Math.ceil(left / 1000);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-semibold tabular-nums text-[var(--color-primary)]" aria-live="polite">
          {tx.words(solved)}
        </span>
        {running && (
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm tabular-nums text-[var(--color-text-secondary)]">
            {secs} {tx.sec}
          </span>
        )}
        {!running && best !== null && (
          <span className="text-sm tabular-nums text-[var(--color-text-secondary)]">
            {tx.best} <strong className="text-[var(--color-text)]">{tx.words(best)}</strong>
          </span>
        )}
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[560px]">
        <div
          ref={boxRef}
          tabIndex={0}
          onKeyDown={onKey}
          className="flex min-h-[260px] flex-col items-center justify-center gap-5 rounded-3xl bg-[var(--color-surface)] p-4 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <div
            className={`flex min-h-14 flex-wrap justify-center gap-1.5 rounded-2xl px-2 py-1 transition-colors ${
              flash === "ok" ? "bg-[#E8F8EF]" : flash === "bad" ? "bg-[#FDECEA]" : ""
            }`}
            aria-live="polite"
          >
            {tiles.map((_, k) => (
              <span
                key={k}
                className="flex h-12 w-10 items-center justify-center border-b-4 border-[var(--color-primary)]/40 text-2xl font-black uppercase text-[var(--color-text)] sm:h-14 sm:w-12"
              >
                {picked[k] !== undefined ? tiles[picked[k]] : ""}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {tiles.map((t, i) => (
              <button
                key={`${word}-${i}`}
                type="button"
                disabled={!running || picked.includes(i)}
                onClick={() => pick(i)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl font-black uppercase touch-manipulation select-none transition sm:h-14 sm:w-14 ${
                  picked.includes(i)
                    ? "border-transparent bg-[var(--color-primary)]/10 text-transparent"
                    : "border-[var(--color-border)] bg-white text-[var(--color-text)] shadow-sm hover:-translate-y-0.5"
                } ${!running && !done ? "blur-[3px]" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>

          {running && (
            <div className="flex gap-2">
              <button type="button" onClick={unpick} className="rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-semibold text-[var(--color-text)]">
                {tx.clear}
              </button>
              <button type="button" onClick={skip} className="rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-semibold text-[var(--color-text)]">
                {tx.skip}
              </button>
            </div>
          )}
          {running && skipped && <p className="text-sm text-[var(--color-text-secondary)]">{tx.answerWas(skipped)}</p>}
        </div>
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={start}
              className="btn-gradient rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.03]"
            >
              {done ? tx.result(solved) : tx.start}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{tx.hint}</p>
    </div>
  );
}
