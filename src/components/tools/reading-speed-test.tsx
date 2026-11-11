"use client";

// Тест скорости чтения: выбрать текст → Start (текст открывается, таймер идёт) →
// «I'm done» (текст прячется) → 3 вопроса на понимание → слова в минуту + понимание.
// Число слов считается из текста, а не вписано руками. Рекорд сохраняется только
// при понимании не ниже 2 из 3: скорость без понимания — не скорость чтения.
// Быстрее SKIM wpm — уже пролистывание: результат показываем, но в рекорд не пишем.
// Средняя для взрослых (тихое чтение, нон-фикшн) — 238 wpm (Brysbaert, 2019).
//
// 🔒 По языкам (READING ниже): у каждого языка СВОИ тексты (≈ 300 слов нон-фикшна,
// пишутся на языке, не переводятся — число слов и сложность у перевода плывут) и СВОЯ
// норма средней скорости из источника по этому языку. Английские 238 wpm на другой
// язык не переносятся. Для ja/zh/ko/th тест не делается (слова не считаются так же).

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { loadBest, saveBest } from "./storage";

interface Question {
  q: string;
  options: string[];
  answer: number;
}
interface Passage {
  key: string;
  label: string;
  title: string;
  paragraphs: string[];
  questions: Question[];
}

const EN_PASSAGES: Passage[] = [
  {
    key: "bees",
    label: "Honeybees",
    title: "The dance of the honeybee",
    paragraphs: [
      "When a honeybee finds a rich patch of flowers, she does not keep it to herself. Back at the hive, she performs a dance on the vertical wall of the honeycomb that tells her sisters where to fly. The Austrian scientist Karl von Frisch spent decades decoding this behavior, and in 1973 he shared the Nobel Prize in Physiology or Medicine for his work.",
      "For flowers close to the hive, von Frisch described a round dance, in which the forager circles first one way and then the other. It announces that food is nearby without saying much about where. For more distant food, the bee switches to the waggle dance. She runs a short straight line while shaking her body from side to side, then loops back and repeats the run, again and again.",
      "The direction of the straight run carries the direction of the food. A run straight up the comb means “fly toward the sun.” A run tilted forty degrees to the right of vertical means “fly forty degrees to the right of the sun.” The length of the waggle run carries the distance: the longer she waggles, the farther away the flowers are.",
      "Because the sun moves across the sky, the angle of the dance slowly shifts during the day, and the bees adjust for it. The dancer also carries the scent of the flowers she visited, which helps the bees she recruits recognize the right patch when they arrive.",
      "Not every bee follows every dance. Experienced foragers often return to places they already know, and studies suggest that the dance matters most when good flowers are scarce and hard to find. Even so, it remains one of the most remarkable examples of symbolic communication in the animal world.",
    ],
    questions: [
      {
        q: "What does the direction of the waggle run tell other bees?",
        options: ["How far away the food is", "The direction of the food relative to the sun", "How much nectar the flowers have", "How many bees should go"],
        answer: 1,
      },
      {
        q: "How does a dancing bee show that the food is far away?",
        options: ["She dances faster", "She buzzes louder", "Her waggle run lasts longer", "She circles in both directions"],
        answer: 2,
      },
      {
        q: "According to the text, when does the dance matter most?",
        options: ["Early in the morning", "When the hive is new", "When good flowers are scarce and hard to find", "When the sun is directly overhead"],
        answer: 2,
      },
    ],
  },
  {
    key: "lighthouse",
    label: "Lighthouses",
    title: "The lens that lit the coasts",
    paragraphs: [
      "For centuries, lighthouses had a simple problem: their light did not reach far enough. Early lighthouses burned wood or coal in open fires, and later ones used oil lamps with polished metal reflectors behind them. Even with good reflectors, much of the light was wasted, scattered into the sky or absorbed by the metal.",
      "In 1822 the French physicist Augustin-Jean Fresnel proposed a better solution. An ordinary lens big enough to focus a lighthouse lamp would have been enormously thick and heavy, and its glass would have absorbed much of the light passing through it. Fresnel realized that only the curved surface of a lens actually bends the light. So he divided the lens into a series of thin rings, each with the right curve, and arranged them in steps around a small central lens. The result did the work of a huge lens with a fraction of the glass. He added rings of prisms above and below to catch light that would otherwise escape upward or downward.",
      "The first Fresnel lens was installed in 1823 in the Cordouan lighthouse, at the mouth of the Gironde estuary in France. The improvement was dramatic: a single lamp could now send a beam that sailors could see much farther out to sea.",
      "The lenses came in sizes called orders, from the huge first-order lenses used on major coastal lights to small sixth-order lenses for harbors. Many lighthouses rotated their lenses so that each light flashed in its own pattern, which let sailors tell one lighthouse from another at night.",
      "Today most lighthouses use modern electric lights, but Fresnel's stepped design lives on in traffic signals, stage lights, overhead projectors and thin plastic magnifiers.",
    ],
    questions: [
      {
        q: "What was Fresnel's key insight?",
        options: ["Metal reflects better than glass", "Only the curved surface of a lens bends light", "Oil burns brighter than coal", "Lighthouses should be built higher"],
        answer: 1,
      },
      {
        q: "Where was the first Fresnel lens installed?",
        options: ["In a harbor near Paris", "On the coast of England", "In the Cordouan lighthouse in France", "In a lighthouse in Italy"],
        answer: 2,
      },
      {
        q: "Why did many lighthouses rotate their lenses?",
        options: ["To spread heat evenly", "So each light flashed in its own pattern", "To save lamp oil", "To light the harbor and the sea at once"],
        answer: 1,
      },
    ],
  },
  {
    key: "leap",
    label: "Leap years",
    title: "Why we have leap years",
    paragraphs: [
      "A year, in the sense that matters for the seasons, is the time Earth takes to return to the same point in its cycle of seasons, for example from one spring equinox to the next. That takes about 365.2422 days, not a neat 365. The leftover quarter of a day sounds small, but it adds up. A calendar of exactly 365 days drifts against the seasons by about one day every four years, and by about a month in 120 years.",
      "Julius Caesar's calendar, introduced in 46 BC, tackled this with a simple rule: add an extra day every fourth year. That makes the average calendar year 365.25 days long. It is close, but slightly too long, by about 11 minutes a year. Over the centuries those minutes added up as well. By the 1500s the spring equinox was falling around March 11 instead of March 21, and that mattered to the Church, which used the equinox to set the date of Easter.",
      "In 1582 Pope Gregory XIII introduced a corrected calendar. Ten days were removed from that October in one go: in the countries that adopted the change at once, Thursday, October 4 was followed by Friday, October 15. The leap year rule was also fine-tuned. Years divisible by four remain leap years, except century years, which are leap years only if they are divisible by 400. So 1900 was not a leap year, but 2000 was.",
      "This Gregorian calendar averages 365.2425 days a year. It is off by only about 26 seconds a year, which adds up to a single day in roughly 3,000 years. Not every country switched right away: Britain and its colonies waited until 1752, when they had to skip eleven days.",
    ],
    questions: [
      {
        q: "Why does a calendar of exactly 365 days drift against the seasons?",
        options: ["Earth's orbit is slowing down", "The seasonal year is about a quarter of a day longer", "Months have different lengths", "The equinox moves by a week each year"],
        answer: 1,
      },
      {
        q: "Which of these years was not a leap year?",
        options: ["1600", "1900", "2000", "2024"],
        answer: 1,
      },
      {
        q: "Why did the Church care about the drift?",
        options: ["It used the spring equinox to set the date of Easter", "It collected taxes by the calendar", "Christmas was moving into spring", "Farmers asked for a new calendar"],
        answer: 0,
      },
    ],
  },
];

interface Strings {
  chooseText: string;
  text: string;
  bestLabel: string;
  best: (wpm: number) => string;
  intro: (title: string, words: number) => string;
  start: string;
  done: string;
  quizHint: string;
  seeResult: string;
  yourSpeed: string;
  wpm: string;
  summary: (words: number, secs: string) => string;
  understanding: (c: number, n: number) => string;
  average: (n: number) => string;
  verdict: { skim: string; missed: string; slow: string; typical: (lo: number, hi: number) => string; fast: string };
  answer: string;
  another: string;
  again: string;
  note: (skim: number) => string;
}

interface ReadingLocale {
  /** Средняя скорость тихого чтения нон-фикшна на этом языке (источник — в комментарии). */
  average: number;
  /** Обычный диапазон взрослых. */
  typical: [number, number];
  /** Выше — пролистывание: результат не идёт в рекорд. */
  skim: number;
  scaleMax: number;
  passages: Passage[];
  strings: Strings;
}

const EN_STRINGS: Strings = {
  chooseText: "Choose a text",
  text: "Text:",
  bestLabel: "Best:",
  best: (w) => `${w} wpm`,
  intro: (title, words) =>
    `“${title}”, ${words} words. Read at your normal pace, as if you wanted to remember it. Then answer three questions without looking back.`,
  start: "Start reading",
  done: "I’m done reading",
  quizHint: "Without looking back, answer three questions.",
  seeResult: "See my result",
  yourSpeed: "Your reading speed",
  wpm: "wpm",
  summary: (w, secs) => `${w} words in ${secs} s · understanding `,
  understanding: (c, n) => `${c} of ${n}`,
  average: (n) => `average ${n}`,
  verdict: {
    skim: "That is far beyond a normal reading pace, so this was most likely skimming.",
    missed: "You missed some details. A reading speed only counts with understanding, so try again a little slower.",
    slow: "Slower than the typical range. That is perfectly fine for careful reading, and practice on easy texts brings speed up.",
    typical: (lo, hi) => `Right in the typical range for adults, roughly ${lo} to ${hi} words per minute.`,
    fast: "Faster than most adults, with good understanding.",
  },
  answer: "Answer:",
  another: "Try another text",
  again: "Read it again",
  note: (skim) =>
    `The timer runs from “Start reading” to “I’m done reading”. Your best speed is saved on this device when you answer at least two of three questions correctly at a real reading pace (up to ${skim} words per minute; faster than that is skimming).`,
};

// Английский: Brysbaert (2019) — 238 wpm нон-фикшн, обычный диапазон 175–300.
const EN_READING: ReadingLocale = {
  average: 238,
  typical: [175, 300],
  skim: 700,
  scaleMax: 600,
  passages: EN_PASSAGES,
  strings: EN_STRINGS,
};

const READING: Record<Locale, ReadingLocale> = { en: EN_READING, qa: EN_READING };

const countWords = (p: Passage) => [p.title, ...p.paragraphs].join(" ").split(/\s+/).filter(Boolean).length;

type Phase = "idle" | "read" | "quiz" | "done";

export function ReadingSpeedTest({ lang = "en" }: { lang?: Locale }) {
  const R = READING[lang];
  const tx = R.strings;
  const PASSAGES = R.passages;
  const AVERAGE = R.average;
  const SKIM = R.skim;
  const bestKey = lang === "en" ? "reading-wpm" : `reading-wpm-${lang}`;
  const [pi, setPi] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [ms, setMs] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([null, null, null]);
  const [best, setBest] = useState<number | null>(null);
  const startedAt = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const p = PASSAGES[pi];
  const words = countWords(p);

  useEffect(() => setBest(loadBest(bestKey)), [bestKey]);

  const scrollToBox = () => boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const start = () => {
    setPicks(p.questions.map(() => null));
    setPhase("read");
    startedAt.current = performance.now();
    requestAnimationFrame(scrollToBox);
  };
  const doneReading = () => {
    setMs(performance.now() - startedAt.current);
    setPhase("quiz");
    requestAnimationFrame(scrollToBox);
  };

  const correct = picks.filter((a, i) => a === p.questions[i].answer).length;
  const wpm = ms > 0 ? Math.round(words / (ms / 60000)) : 0;

  const submit = () => {
    if (correct >= 2 && wpm <= SKIM) setBest(saveBest(bestKey, wpm, "max"));
    setPhase("done");
    requestAnimationFrame(scrollToBox);
  };

  const verdict =
    wpm > SKIM
      ? tx.verdict.skim
      : correct < 2
        ? tx.verdict.missed
        : wpm < R.typical[0]
          ? tx.verdict.slow
          : wpm <= R.typical[1]
            ? tx.verdict.typical(R.typical[0], R.typical[1])
            : tx.verdict.fast;

  const scaleMax = R.scaleMax;
  const pct = (v: number) => `${Math.min(100, (v / scaleMax) * 100)}%`;

  return (
    <div ref={boxRef} className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={tx.chooseText}>
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">{tx.text}</span>
        {PASSAGES.map((x, i) => (
          <button
            key={x.key}
            type="button"
            disabled={phase === "read" || phase === "quiz"}
            onClick={() => { setPi(i); setPhase("idle"); }}
            aria-pressed={i === pi}
            className={`rounded-full px-3 py-1 text-sm font-semibold disabled:opacity-50 ${i === pi ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border)] bg-white text-[var(--color-text)]"}`}
          >
            {x.label}
          </button>
        ))}
        <span className="ml-auto text-sm tabular-nums text-[var(--color-text-secondary)]">
          {best !== null && <>{tx.bestLabel} <strong className="text-[var(--color-text)]">{tx.best(best)}</strong></>}
        </span>
      </div>

      <div className="mt-4 rounded-3xl bg-[var(--color-surface)] p-4 shadow-inner sm:p-6">
        {phase === "idle" && (
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
            <p className="max-w-sm text-[var(--color-text-secondary)]">
              {tx.intro(p.title, words)}
            </p>
            <button type="button" onClick={start} className="btn-gradient rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.03]">
              {tx.start}
            </button>
          </div>
        )}

        {phase === "read" && (
          <article className="mx-auto max-w-[62ch] rounded-2xl bg-white p-5 sm:p-8">
            <h3 className="text-xl font-bold text-[var(--color-text)]">{p.title}</h3>
            {p.paragraphs.map((t, i) => (
              <p key={i} className="mt-4 text-[17px] leading-relaxed text-[var(--color-text)]">{t}</p>
            ))}
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={doneReading} className="btn-gradient rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg">
                {tx.done}
              </button>
            </div>
          </article>
        )}

        {phase === "quiz" && (
          <form
            onSubmit={(e) => { e.preventDefault(); submit(); }}
            className="mx-auto max-w-[62ch] rounded-2xl bg-white p-5 sm:p-8"
          >
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">{tx.quizHint}</p>
            {p.questions.map((q, qi) => (
              <fieldset key={qi} className="mt-6">
                <legend className="font-semibold text-[var(--color-text)]">{qi + 1}. {q.q}</legend>
                <div className="mt-3 grid gap-2">
                  {q.options.map((o, oi) => (
                    <label
                      key={oi}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-[15px] ${picks[qi] === oi ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-[var(--color-border)]"}`}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        checked={picks[qi] === oi}
                        onChange={() => setPicks((a) => a.map((v, i) => (i === qi ? oi : v)))}
                        className="accent-[var(--color-primary)]"
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className="mt-8 flex justify-center">
              <button type="submit" disabled={picks.some((a) => a === null)} className="btn-gradient rounded-full px-8 py-3 text-lg font-bold text-white disabled:opacity-50">
                {tx.seeResult}
              </button>
            </div>
          </form>
        )}

        {phase === "done" && (
          <div className="mx-auto max-w-[62ch] text-center" aria-live="polite">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">{tx.yourSpeed}</p>
            <p className="mt-1 text-5xl font-extrabold tabular-nums text-[var(--color-text)]">
              {wpm} <span className="text-2xl font-bold">{tx.wpm}</span>
            </p>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              {tx.summary(words, (ms / 1000).toFixed(0))}<strong className="text-[var(--color-text)]">{tx.understanding(correct, p.questions.length)}</strong>
            </p>

            <div className="mx-auto mt-6 max-w-md text-left">
              <div className="relative h-3 rounded-full bg-[var(--color-border)]/60">
                <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-primary)]" style={{ width: pct(wpm) }} />
                <div className="absolute -top-1 h-5 w-0.5 bg-[var(--color-text)]" style={{ left: pct(AVERAGE) }} aria-hidden="true" />
              </div>
              <div className="relative mt-1 h-5 text-xs text-[var(--color-text-secondary)]">
                <span className="absolute left-0">0</span>
                <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: pct(AVERAGE) }}>{tx.average(AVERAGE)}</span>
                <span className="absolute right-0">{scaleMax}+</span>
              </div>
            </div>

            <p className="mt-4 text-[var(--color-text)]">{verdict}</p>

            <ol className="mt-6 space-y-2 text-left text-sm">
              {p.questions.map((q, qi) => {
                const ok = picks[qi] === q.answer;
                return (
                  <li key={qi} className={`rounded-xl px-4 py-2 ${ok ? "bg-[#27AE60]/10" : "bg-[#E74C3C]/10"}`}>
                    <span className="font-semibold">{ok ? "✓" : "✗"} {q.q}</span>
                    {!ok && <span className="block text-[var(--color-text-secondary)]">{tx.answer} {q.options[q.answer]}</span>}
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => { setPi((pi + 1) % PASSAGES.length); setPhase("idle"); }}
                className="btn-gradient rounded-full px-6 py-3 font-bold text-white"
              >
                {tx.another}
              </button>
              <button type="button" onClick={start} className="rounded-full border border-[var(--color-border)] bg-white px-6 py-3 font-bold text-[var(--color-text)]">
                {tx.again}
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
        {tx.note(SKIM)}
      </p>
    </div>
  );
}
