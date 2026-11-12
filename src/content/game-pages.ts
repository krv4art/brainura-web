// Тексты страниц игр (волна 2). Механика сверена с кодом приложения:
// lib/screens/brain_training/services/level_params/*_params.dart и обучалками в
// assets/translations/en/brain_training.json. Правила: без медицинских обещаний,
// без чужих товарных знаков в заголовках, источники — для научных утверждений.
// Порядок и ключи — docs/growth/seo/page_map.md, ядра — docs/growth/seo/pages/games/.
//
// Подача — блоками (src/components/seo/blocks.tsx): в каждом разделе не только абзацы.
// «Как играть» — шаги, рисуются первым разделом автоматически. Слот `screenshot` —
// скриншот игры (файл public/games/<slug>/screenshot.webp появляется сам).
// 🔒 Новые факты о механике — только сверив с кодом приложения.

import type { GamePageContent } from "./games";
import type { Block } from "@/components/seo/blocks";

const U = "2026-11-12";

const SIMONS_2016 = {
  text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
  url: "https://doi.org/10.1177/1529100616661983",
};

const shot = (game: string, what: string): Block => ({
  t: "figure",
  id: "screenshot",
  alt: `${game} in the Brainura app`,
  caption: `${game} in Brainura.`,
  brief: `Скриншот игры «${game}» из приложения, вертикальный 3:4: ${what}. Можно снять с web-сборки (scripts/aso_visuals/capture_web.py).`,
  aspect: "3/4",
});

const PREMIUM_NOTE: Block = {
  t: "callout",
  kind: "note",
  title: "Premium game",
  text: "Premium games are part of the Premium subscription.",
};

export const GAME_PAGE_CONTENT: Record<string, GamePageContent> = {
  // ───────────────────────────── Card Match ─────────────────────────────
  "card-match": {
    title: "Memory Matching Game for Adults: Card Match",
    description:
      "Card Match is a memory matching game for adults: flip cards, find every pair, and work up from a 4×4 grid to 8×8. How it works and tips to remember more.",
    h1: "Card Match: a memory matching game for adults",
    cluster: "memory matching game · matching game · memory card game · card matching game",
    lead:
      "The classic pairs game, built for grown-ups: a short look at the cards, then flip two at a time and find every match with as few misses as possible.",
    howToPlay: [
      { title: "Memorize", text: "At the start of a round all cards are shown face up for a moment. Take in as many as you can." },
      { title: "Flip two", text: "The cards turn over. Tap two cards to turn them face up." },
      { title: "Match or learn", text: "If they match, they stay open. If not, they flip back, and now you know two more positions." },
      { title: "Clear the board", text: "Find every pair with as few wrong guesses as you can. Fewer misses mean a better score." },
    ],
    sections: [
      {
        id: "levels",
        h2: "How the levels work",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "8 → 32", label: "pairs, from a 4×4 to an 8×8 grid" },
              { value: "3 s → 1 s", label: "preview before the cards flip" },
              { value: "Free", label: "in the app, no ads" },
            ],
          },
          {
            t: "table",
            head: ["Board", "Pairs", "What it takes"],
            rows: [
              ["**4×4**, level 1", "8", "You can simply remember the cards."],
              ["Grids in between", "grows step by step", "Remember a few cards for sure instead of all of them vaguely."],
              ["**8×8**, top levels", "32", "A system: scan in rows, track every card you've seen."],
            ],
          },
          {
            t: "p",
            text: "Your level follows your results: play well and it climbs, have an off day and it eases back. On big boards, resist flipping a card you know nothing about when a known pair is waiting.",
          },
          shot("Card Match", "середина партии на поле 6×6, несколько пар уже открыты"),
        ],
      },
      {
        id: "tips",
        h2: "Tips to remember more cards",
        blocks: [
          {
            t: "ul",
            items: [
              "**Anchor a few, not all.** Use the preview to lock in one row or one corner. Trying to take in the whole board usually leaves you with nothing certain.",
              "**Name what you see.** “Cat, top left” in your head is easier to keep than a picture alone.",
              "**Work the edges first.** Corners and edges are easier to recall than cells in the middle of a big grid.",
            ],
          },
          {
            t: "callout",
            kind: "tip",
            title: "The free-pair trick",
            text: "No known pair? Flip a card you have **never** seen first. If it matches one you remember, you get a pair for free.",
          },
        ],
      },
      {
        id: "what-it-trains",
        h2: "What the game exercises",
        blocks: [
          {
            t: "p",
            text: "Matching games lean on **visual working memory**: the short-term store that holds what something looked like and where it was. Each wrong flip adds a card and a position to hold until its partner appears.",
          },
          {
            t: "mythFact",
            items: [
              {
                myth: "Playing memory games makes your everyday memory better.",
                fact: "Practice reliably improves the game itself; evidence that it improves memory in daily life is weak.",
              },
            ],
          },
          {
            t: "cta",
            href: "/tests/memory-test",
            title: "How long is your memory span?",
            text: "Try the free online memory test: digits forwards, backwards or a grid sequence.",
            button: "Take the test",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is the memory matching game good for adults?",
        a: "It is a simple, enjoyable way to give your short-term visual memory a workout, and larger grids make it challenging even for adults who play a lot. Expect to get better at the game itself; claims that it improves everyday memory are not well supported.",
      },
      {
        q: "How many cards are in the game?",
        a: "Brainura starts at 16 cards (8 pairs) and goes up to 64 cards (32 pairs) at the highest levels.",
      },
      {
        q: "Is Card Match free?",
        a: "Yes. Card Match is one of the 13 free games in Brainura, with no ads.",
      },
      {
        q: "What is a good strategy for matching games?",
        a: "Use the preview to lock in a few positions, open unknown cards before guessing, and take a known pair as soon as you have it. Systematic scanning beats random flipping on large boards.",
      },
    ],
    sources: [SIMONS_2016],
    tests: ["memory-test"],
    updated: U,
  },

  // ───────────────────────────── Anagrams ─────────────────────────────
  anagrams: {
    title: "Anagram Game: Unscramble Letters Into Words",
    description:
      "Anagrams is a word scramble game for adults: unscramble the letters into a word before time runs out. Levels, hints and tips for solving anagrams faster.",
    h1: "Anagrams: the word scramble game",
    cluster: "anagram game · word scramble game · anagrams game · scrambled words game",
    lead:
      "You get a jumble of letters. Find the word hidden in them before the timer runs out. Short to play, hard to put down.",
    howToPlay: [
      { title: "Look", text: "Study the scrambled letters and find the word they spell." },
      { title: "Type", text: "Type your answer and submit it." },
      { title: "Hint if stuck", text: "On the first 50 levels you can use a hint." },
      { title: "Beat the clock", text: "Each word has its own timer. Solve as many as you can." },
    ],
    sections: [
      {
        id: "levels",
        h2: "How the levels get harder",
        blocks: [
          {
            t: "table",
            head: ["Levels", "Words", "What changes"],
            rows: [
              ["1–10", "Easy, everyday", "About a minute per word"],
              ["11–30", "Medium", "Less time per word"],
              ["31–40", "Hard", "Less time again"],
              ["41–50", "Hard", "**Extra letters** that don't belong to the word"],
              ["51+", "Hard", "Extra letters, **no hints**, under 20 seconds at the top"],
            ],
          },
          {
            t: "p",
            text: "From level 41 you can no longer use every letter you see, and from level 51 you are on your own. Together they turn a relaxed word game into a real test of vocabulary under pressure.",
          },
          shot("Anagrams", "перемешанные буквы и поле ввода, таймер вверху"),
        ],
      },
      {
        id: "solve-faster",
        h2: "How to solve anagrams faster",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Pull off the ending", text: "Look for -ING, -ED, -ER, -LY, -TION. Setting them aside leaves a shorter, easier jumble." },
              { title: "Pair up letters", text: "TH, CH, SH, QU, CK often sit together. Try them at the start or end of the word." },
              { title: "Alternate", text: "Split vowels and consonants in your head and try consonant-vowel patterns. English words alternate more than you'd think." },
              { title: "Say it out loud", text: "Reading the letters in a new order aloud often unlocks the word faster than staring." },
            ],
          },
          {
            t: "callout",
            kind: "tip",
            title: "Worked example",
            text: "**GNIKLAW** → pull out I, N, G → you're left with K, L, A, W → **WALK** + ING = **WALKING**.",
          },
        ],
      },
      {
        id: "why",
        h2: "Why word games feel good for the brain",
        blocks: [
          {
            t: "p",
            text: "An anagram makes you search your mental dictionary in an unusual way: not from meaning to word, but from a bag of letters to a word that fits. That search is what makes the moment of finding it so satisfying.",
          },
          {
            t: "callout",
            kind: "note",
            text: "Playing regularly makes you faster at spotting letter patterns and recalling words. It is a fun habit, not a treatment: research on brain games shows gains mostly stay with the trained task.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is an anagram?",
        a: "A word or phrase made by rearranging the letters of another one, using each letter once. LISTEN and SILENT are anagrams of each other.",
      },
      {
        q: "Is there a time limit?",
        a: "Yes. Each word has its own timer: about a minute on the easiest levels, under 20 seconds at the top.",
      },
      {
        q: "Is the anagram game free?",
        a: "Yes, Anagrams is one of the free games in Brainura, with no ads.",
      },
    ],
    sources: [SIMONS_2016],
    updated: U,
  },

  // ───────────────────────────── Merge Numbers ─────────────────────────────
  "merge-numbers": {
    title: "Merge Numbers: a 2048-Style Sliding Puzzle",
    description:
      "Merge Numbers is a 2048-style puzzle in Brainura: slide the tiles, merge equal numbers and climb as high as you can. Rules, scoring and strategy tips.",
    h1: "Merge Numbers: the 2048-style sliding puzzle",
    cluster: "2048 game · merge numbers game · number merge game",
    lead:
      "Slide every tile at once, merge equal numbers into their sum, and see how high you can climb before the board locks up. No timer, no move limit.",
    howToPlay: [
      { title: "Slide", text: "Use the arrow pad to slide all tiles in one direction at once." },
      { title: "Merge", text: "Two equal tiles that collide become one tile with double the value: 2 + 2 = 4, 4 + 4 = 8, and so on." },
      { title: "New tile", text: "After each move a new small tile appears on an empty cell." },
      { title: "Climb", text: "The game ends when no move can change the board. Your highest tile is your score." },
    ],
    sections: [
      {
        id: "scoring",
        h2: "Scoring and stars",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "256", label: "highest tile for ★" },
              { value: "512", label: "highest tile for ★★" },
              { value: "1024", label: "highest tile for ★★★" },
            ],
          },
          {
            t: "p",
            text: "There are no levels: every game is the same puzzle, and the board itself is the challenge. With **no clock and no move limit**, Merge Numbers is the calm game in Brainura's line-up. It rewards planning several moves ahead, not fast reflexes.",
          },
          shot("Merge Numbers", "поле 4×4 с плитками, крупная плитка в углу"),
        ],
      },
      {
        id: "strategy",
        h2: "Strategy that works",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Pick a corner", text: "Keep your biggest tile there. Most good games are built around one corner, with the largest numbers along one edge." },
              { title: "Use two or three directions", text: "Moving away from your corner is sometimes necessary, but each time a small tile can land where your big tile just was." },
              { title: "Keep the edge row full", text: "If the row with your big tiles always has four tiles, sideways moves won't shift it out of order." },
              { title: "Merge small tiles early", text: "Scattered 2s and 4s fill the board fast and end the game." },
            ],
          },
          {
            t: "compare",
            good: { title: "Do", items: ["Build a descending row along one edge", "Think one move ahead before every swipe", "Clean up small tiles early"] },
            bad: { title: "Avoid", items: ["Swiping in all four directions", "Pulling the big tile out of its corner", "Letting small tiles pile up"] },
          },
        ],
      },
      {
        id: "history",
        h2: "Where the idea comes from",
        blocks: [
          {
            t: "p",
            text: "Sliding-merge puzzles became hugely popular in 2014 with an open-source web game built around reaching the 2048 tile, itself inspired by earlier mobile games. The rules take seconds to learn, and the planning goes surprisingly deep.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is Merge Numbers the same as 2048?",
        a: "It plays by the same rules: slide, merge equal numbers, avoid filling the board. In Brainura the stars come at 256, 512 and 1024 rather than requiring 2048.",
      },
      {
        q: "Is there a time limit?",
        a: "No. There is no timer and no move limit, so you can think about every move.",
      },
      {
        q: "What is the best strategy for 2048-style games?",
        a: "Keep your biggest tile in one corner, build a descending row along that edge, and avoid moves that pull the big tile out of its corner.",
      },
      {
        q: "Is it free?",
        a: "Yes, Merge Numbers is free in Brainura, with no ads.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Quick Math ─────────────────────────────
  "quick-math": {
    title: "Mental Math Games for Adults: Quick Math",
    description:
      "Quick Math is a mental math game for adults: solve arithmetic against the clock, from simple sums to multi-step problems. Levels and tips to calculate faster.",
    h1: "Quick Math: a mental math game for adults",
    cluster: "mental math games · math games for adults · quick math game · speed math",
    lead:
      "A problem, a few answer options, and a clock. Pick the right answer as fast as you can; faster answers earn more points.",
    howToPlay: [
      { title: "Read", text: "The problem appears at the top of the screen." },
      { title: "Tap the answer", text: "Choose the correct answer from the options below." },
      { title: "Be quick", text: "Speed adds bonus points to every correct answer." },
      { title: "See your score", text: "Finish the round and check your accuracy and points." },
    ],
    sections: [
      {
        id: "levels",
        h2: "From warm-up sums to real mental math",
        blocks: [
          {
            t: "table",
            head: ["Levels", "Operations", "Answer options"],
            rows: [
              ["1–10", "Addition, small numbers", "3–4"],
              ["11–30", "+ subtraction", "more as you climb"],
              ["31–40", "+ multiplication", "more as you climb"],
              ["41+", "+ division; numbers grow to 200 at the top", "up to 6"],
            ],
          },
          {
            t: "p",
            text: "With six options, estimating alone stops being enough. The level follows your results automatically, so the game stays in the zone where you have to concentrate but can still win.",
          },
          shot("Quick Math", "пример сверху и варианты ответа снизу"),
        ],
      },
      {
        id: "tips",
        h2: "Tips to calculate faster in your head",
        blocks: [
          {
            t: "table",
            head: ["Trick", "Example"],
            rows: [
              ["**Round and correct**", "49 + 37 = 50 + 37 − 1 = 86"],
              ["**Split a number**", "8 × 27 = 8 × 25 + 8 × 2 = 200 + 16 = 216"],
              ["**Estimate first**", "With answers to choose from, a rough estimate often rules out most options at once"],
              ["**Learn anchors**", "Squares up to 15, multiples of 25 and 12 make many problems instant"],
            ],
          },
          {
            t: "callout",
            kind: "tip",
            text: "Accuracy first, then speed. A fast wrong answer costs more than a slightly slower right one.",
          },
        ],
      },
      {
        id: "why",
        h2: "Why practise mental arithmetic",
        blocks: [
          {
            t: "p",
            text: "Mental math is a skill like any other: short regular practice makes it quicker and less effortful. It shows up when you split a bill, compare prices or check a number at work.",
          },
          {
            t: "callout",
            kind: "note",
            text: "Treat it as practising a useful skill rather than a general brain upgrade: studies of brain training find the clearest gains on the practised task.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What are good mental math games for adults?",
        a: "Look for games that adapt to your level and put you under a little time pressure. Quick Math in Brainura does both, and Math Cross adds a puzzle-style challenge where every number has to fit two equations.",
      },
      {
        q: "Which operations are included?",
        a: "Addition first, then subtraction (from level 11), multiplication (from level 31) and division (from level 41).",
      },
      {
        q: "Is Quick Math free?",
        a: "Yes, it is one of the free games in Brainura, with no ads.",
      },
    ],
    sources: [SIMONS_2016],
    tests: ["reaction-time-test"],
    updated: U,
  },

  // ───────────────────────────── Quarters (shikaku) ─────────────────────────────
  quarters: {
    title: "Shikaku Puzzle Online: How to Play Quarters",
    description:
      "Quarters is Brainura's take on the shikaku puzzle: divide the grid into rectangles whose areas match the numbers. Rules, solving techniques and levels.",
    h1: "Quarters: the rectangle-dividing logic puzzle",
    cluster: "shikaku · shikaku puzzle · rectangles puzzle · divide by box",
    lead:
      "Cut the grid into rectangles so that each one holds exactly one number, and that number equals its area. No math beyond counting, all logic.",
    howToPlay: [
      { title: "Draw", text: "Drag across the grid to draw a rectangle." },
      { title: "One number each", text: "Every rectangle must contain exactly one number." },
      { title: "Match the area", text: "The number of cells must equal that number." },
      { title: "Fill it all", text: "Cover the whole grid with no gaps or overlaps. Tap a rectangle to remove it." },
    ],
    sections: [
      {
        id: "shapes",
        h2: "Which rectangles can a number make?",
        blocks: [
          {
            t: "table",
            head: ["Number", "Possible rectangles", "Why it helps"],
            rows: [
              ["1", "1×1", "Always a single cell: draw it straight away"],
              ["4", "1×4, 2×2, 4×1", "Three shapes, often one fits"],
              ["5, 7 (primes)", "1×5, 5×1 · 1×7, 7×1", "Only straight lines: at most two orientations"],
              ["6", "1×6, 2×3, 3×2, 6×1", "Four shapes: wait for neighbours to decide"],
            ],
          },
          shot("Quarters", "сетка 6×6 с числами, часть прямоугольников уже нарисована"),
        ],
      },
      {
        id: "techniques",
        h2: "Solving techniques",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Start with the certain ones", text: "1s, and numbers squeezed into a corner or between other numbers, often have only one shape that fits." },
              { title: "Look at empty cells", text: "If a cell can only be reached by one number's rectangle, it belongs to that number. This often breaks a hard puzzle open." },
              { title: "Use primes", text: "A 5 or a 7 can only be a straight line, so there are at most two orientations to check." },
              { title: "Re-scan after every move", text: "Each rectangle removes options for its neighbours. Look around it for numbers that just became forced." },
            ],
          },
        ],
      },
      {
        id: "levels",
        h2: "How the levels grow",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "5×5", label: "first grids, several hints" },
              { value: "10×10", label: "top grids, fewer hints" },
              { value: "1", label: "solution per puzzle, no guessing" },
            ],
          },
          {
            t: "p",
            text: "Grids grow through 6×6, 7×7 and 8×8 to 9×9 and 10×10. This type of puzzle comes from Japan, where puzzle magazines made it popular; in English it is known as **shikaku** or “divide by squares”. In Brainura it is called Quarters.",
          },
          PREMIUM_NOTE,
        ],
      },
    ],
    faq: [
      {
        q: "What are the rules of shikaku?",
        a: "Divide the grid into rectangles so that each rectangle contains exactly one number and its area equals that number. Every cell belongs to exactly one rectangle.",
      },
      {
        q: "Do I need to guess?",
        a: "No. Every puzzle in Brainura has a unique solution that can be found by logic alone.",
      },
      {
        q: "Is Quarters free?",
        a: "Quarters is a Premium game. Premium games are part of the Premium subscription.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Word Groups ─────────────────────────────
  "word-groups": {
    title: "Word Association Game: Sort Words Into Groups",
    description:
      "Word Groups is a word association game: sort a board of words into hidden groups. Tricky words fit two groups at once. How to play and how to solve.",
    h1: "Word Groups: a word association game",
    cluster: "word association game · word groups game · categories game · group the words",
    lead:
      "Every word on the board belongs to a hidden group. Find the groups. The catch: some words look like they fit two of them.",
    howToPlay: [
      { title: "Scan the board", text: "Every word belongs to one hidden group." },
      { title: "Pick a group", text: "Tap its words. The group locks in as soon as you pick its last word." },
      { title: "Wrong pick?", text: "It flashes red and clears." },
      { title: "Level up", text: "Higher levels add spare words that belong nowhere, closer categories and a timer." },
    ],
    sections: [
      {
        id: "difficulty",
        h2: "Where the difficulty comes from",
        blocks: [
          {
            t: "p",
            text: "Word Groups doesn't get harder by adding more words. It gets harder through **decoys**:",
          },
          {
            t: "ul",
            items: [
              "**Two-way words** that plausibly belong to two categories on the same board.",
              "**Close categories** that sit right next to each other in meaning.",
              "**Spare words** that belong to no group at all.",
            ],
          },
          {
            t: "callout",
            kind: "warning",
            title: "The obvious group is often a trap",
            text: "Find the group with no ambiguous members first, and leave the tempting one for later.",
          },
          shot("Word Groups", "доска из слов, одна группа уже собрана и подсвечена"),
        ],
      },
      {
        id: "solve",
        h2: "How to solve a board",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Find the odd words", text: "A word that can only mean one thing tells you a category for sure." },
              { title: "Spot double meanings", text: "Words that are both a noun and a verb, or belong to two topics, are the decoys." },
              { title: "Count", text: "One word too many for a group means one of them belongs elsewhere." },
              { title: "Save the hardest for last", text: "Once the others are locked in, it often solves itself." },
            ],
          },
        ],
      },
      {
        id: "languages",
        h2: "Built for every language",
        blocks: [
          {
            t: "p",
            text: "The word banks are not translations. Each language has its own words and categories, written for that language, because good decoys only work inside a language: a pun or a double meaning rarely survives translation.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is a word association game?",
        a: "A game where you connect words by meaning: by category, by topic or by a shared feature. In Word Groups you sort a board of words into the groups they belong to.",
      },
      {
        q: "Why does a word fit two groups?",
        a: "On purpose. Words that look right for two categories are the main source of difficulty. Only one arrangement puts every word in the right group.",
      },
      {
        q: "Is Word Groups free?",
        a: "Yes, Word Groups is free in Brainura, with no ads.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Mirror Drawing ─────────────────────────────
  "mirror-drawing": {
    title: "Mirror Drawing Game: Draw the Mirrored Half",
    description:
      "Mirror Drawing is a spatial game: complete the mirror image of a picture across an axis, corner by corner on a grid. How it works and how to get it right.",
    h1: "Mirror Drawing: complete the mirror image",
    cluster: "mirror drawing · mirror drawing game · draw the other half · symmetry drawing",
    lead:
      "One half of a picture is drawn on a grid. Draw the other half as its exact mirror image across the dashed axis.",
    howToPlay: [
      { title: "Start on the axis", text: "Touch the start dot on the dashed line." },
      { title: "Draw", text: "Drag to draw. The line stays straight behind your finger, and a corner locks in when you turn." },
      { title: "Fix with care", text: "Going back along your line erases it, but every erased corner costs accuracy." },
      { title: "Finish", text: "Reach the finish ring to see how close your half was." },
    ],
    sections: [
      {
        id: "why-hard",
        h2: "Why it is harder than it looks",
        blocks: [
          {
            t: "p",
            text: "Mirroring flips left and right while keeping up and down. Your hand naturally wants to copy the shape as it is, so every turn is a small decision: toward the axis, or away from it?",
          },
          {
            t: "table",
            head: ["Levels", "What you see while drawing"],
            rows: [
              ["1–10", "The correct path, shown faintly"],
              ["11+", "Nothing: you draw blind and see the answer at the finish"],
              ["Higher", "More corners and several separate details per picture"],
            ],
          },
          shot("Mirror Drawing", "половина картинки на сетке, пунктирная ось, частично нарисованная вторая половина"),
        ],
      },
      {
        id: "tips",
        h2: "Tips",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Trace with your eyes first", text: "A quick look along the original path before you start saves erasing later." },
              { title: "Count squares, don't eyeball", text: "Each mirrored corner sits at the same distance from the axis as its original." },
              { title: "Go corner by corner", text: "Find the next corner of the original, mirror its position, and only then draw." },
            ],
          },
          {
            t: "callout",
            kind: "note",
            title: "Not the mirror-tracing test",
            text: "In the classic lab task you trace a shape while watching your hand in a mirror. Here you see your hand normally and draw the mirrored half yourself.",
          },
          PREMIUM_NOTE,
        ],
      },
    ],
    faq: [
      {
        q: "What does mirror drawing train?",
        a: "It is an exercise in spatial reasoning: holding a shape in mind and flipping it. It is fun practice for that specific skill; claims about broad brain benefits are not well supported.",
      },
      {
        q: "Is this the same as the mirror-tracing test?",
        a: "No. In the classic mirror-tracing task you trace a shape while watching your hand in a mirror. Here you see your hand normally and draw the mirrored half of a picture yourself.",
      },
      {
        q: "Is Mirror Drawing free?",
        a: "It is a Premium game. Premium games are part of the Premium subscription.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Math Cross ─────────────────────────────
  "math-cross": {
    title: "Math Crossword Puzzle: Place Every Number",
    description:
      "Math Cross is a math crossword puzzle: place every number from the bank so that all equations across and down are correct. Rules, levels and tips.",
    h1: "Math Cross: the math crossword puzzle",
    cluster: "math crossword · math crossword puzzle · number crossword · cross math",
    lead:
      "A crossword made of equations. Every row and column is a calculation, and each number from the bank goes into exactly one empty cell.",
    howToPlay: [
      { title: "Read the board", text: "Every row and every column is an equation." },
      { title: "Place a number", text: "Tap a number in the bank, then tap an empty cell." },
      { title: "Each number once", text: "Tap a placed number to take it back. A wrong number is rejected and bounces back to the bank." },
      { title: "Left to right", text: "Equations are read left to right and top to bottom, without operator precedence." },
    ],
    sections: [
      {
        id: "order",
        h2: "The one rule that surprises people",
        blocks: [
          {
            t: "callout",
            kind: "warning",
            title: "No “multiplication first”",
            text: "Each equation is calculated strictly in reading order: **3 + 4 × 2 = 14**, because 3 + 4 = 7 and then 7 × 2 = 14.",
          },
          shot("Math Cross", "сетка с уравнениями по строкам и столбцам, банк чисел снизу"),
        ],
      },
      {
        id: "levels",
        h2: "How the levels grow",
        blocks: [
          {
            t: "table",
            head: ["Levels", "Operations"],
            rows: [
              ["1–4", "Addition"],
              ["5–12", "+ subtraction"],
              ["13–24", "+ multiplication"],
              ["25+", "+ division"],
            ],
          },
          {
            t: "p",
            text: "Boards grow from **7 equations to 14**, with more empty cells, bigger numbers and longer chains of operations.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Solving tips",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "One gap first", text: "A cell in an equation with only one empty spot can be calculated directly." },
              { title: "Use the bank", text: "Each number is used once. If only one number fits a cell, it goes there and is gone for every other cell." },
              { title: "Crossings are the key", text: "A number where two equations cross must work both across and down." },
            ],
          },
          PREMIUM_NOTE,
        ],
      },
    ],
    faq: [
      {
        q: "What is a math crossword?",
        a: "A grid where rows and columns form equations instead of words. You fill in the missing numbers so that every equation is correct.",
      },
      {
        q: "Why is 3 + 4 × 2 equal to 14 here?",
        a: "Each equation on the board is calculated strictly left to right, without operator precedence: 3 + 4 = 7, then 7 × 2 = 14.",
      },
      {
        q: "Is Math Cross free?",
        a: "It is a Premium game. Premium games are part of the Premium subscription.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Read the Face ─────────────────────────────
  "read-the-face": {
    title: "Emotion Recognition Game: Read the Face",
    description:
      "Read the Face is an emotion recognition game: name the emotion on the face, from a broad smile to a flash of contempt, and learn to tell them apart.",
    h1: "Read the Face: an emotion recognition game",
    cluster: "emotion recognition game · facial expression game · guess the emotion · read faces",
    lead:
      "A face appears. Name the emotion it shows. At higher levels the expressions get subtler, flash for a split second, or show only the eyes.",
    howToPlay: [
      { title: "Look", text: "A face appears. Tap the emotion it shows." },
      { title: "Be quick", text: "The faster you answer, the more points the face is worth." },
      { title: "Learn from misses", text: "Wrong answer? The face is shown at full strength and the right name lights up." },
      { title: "Level up", text: "Emotions get subtler and the choices look more alike. Later a face only flashes briefly, and sometimes only the eyes are visible." },
    ],
    sections: [
      {
        id: "tell-apart",
        h2: "How to tell similar emotions apart",
        blocks: [
          {
            t: "table",
            caption: "What to look for",
            head: ["Emotion", "Tell-tale signs"],
            rows: [
              ["**Happiness** (genuine)", "Cheeks lift and the skin around the eyes crinkles. A polite smile often stays in the mouth."],
              ["**Surprise**", "Brows rise in an arch, eyes widen, jaw drops."],
              ["**Fear**", "Eyes widen too, but brows pull together and the lips stretch sideways."],
              ["**Anger**", "Brows lower and draw together, lips tighten."],
              ["**Disgust**", "Nose wrinkles, upper lip rises."],
              ["**Contempt**", "One-sided: a single corner of the mouth tightens and lifts."],
            ],
          },
          {
            t: "callout",
            kind: "tip",
            title: "Fear or surprise?",
            text: "Both widen the eyes. Check the brows: arched and raised means surprise, pulled together means fear.",
          },
          shot("Read the Face", "нарисованное лицо сверху и кнопки с названиями эмоций снизу"),
        ],
      },
      {
        id: "faces",
        h2: "How the faces are made",
        blocks: [
          {
            t: "p",
            text: "The faces are drawn by the app from the muscle movements that make up each expression, following the **Facial Action Coding System** researchers use to describe facial movement. That lets the game set exactly how strong an expression is, and show the same emotion on faces of different ages and looks.",
          },
          {
            t: "stats",
            items: [
              { value: "7", label: "emotions: six classic ones plus contempt" },
              { value: "1", label: "of them shows on just one side of the face" },
            ],
          },
          PREMIUM_NOTE,
        ],
      },
    ],
    faq: [
      {
        q: "Can you get better at reading facial expressions?",
        a: "With practice people do get faster and more accurate at recognizing expressions in tasks like this one. Real conversations add context, voice and body language, so treat the game as practice in noticing, not as a test of empathy.",
      },
      {
        q: "Which emotions are included?",
        a: "Happiness, sadness, anger, fear, surprise, disgust and contempt, at different intensities.",
      },
      {
        q: "Is Read the Face free?",
        a: "It is a Premium game. Premium games are part of the Premium subscription. Mood Swipe, a quicker game about pleasant and unpleasant expressions, is also Premium.",
      },
    ],
    sources: [
      {
        text: "Ekman, P., & Friesen, W. V. (1978). Facial Action Coding System: A technique for the measurement of facial movement. Consulting Psychologists Press.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Line Tracing ─────────────────────────────
  "line-tracing": {
    title: "Visual Tracing Game: Follow the Tangled Lines",
    description:
      "Line Tracing is a visual tracing game: follow a line through a tangle with your eyes only and find where it ends. Based on a classic visual tracing test.",
    h1: "Line Tracing: follow the line with your eyes",
    cluster: "line tracing game · visual tracing · follow the line puzzle · tangled lines",
    lead:
      "Numbers on the left, letters on the right, and a tangle of crossing lines between them. Follow one line with your eyes and tap the letter where it ends.",
    howToPlay: [
      { title: "Find the start", text: "A number appears below the tangle. Find its line on the left." },
      { title: "Follow with your eyes", text: "Track the line through every crossing, without your finger." },
      { title: "Tap the end", text: "Tap the letter where the line ends." },
      { title: "Level up", text: "Higher levels add more lines, more crossings and loops." },
    ],
    sections: [
      {
        id: "origin",
        h2: "Where the idea comes from",
        blocks: [
          {
            t: "p",
            text: "The game is based on the **Groffman Visual Tracing Test**, a task used in vision and attention research where a person follows lines through a tangle without using a finger. It asks your eyes to stay on one path while dozens of others try to pull them away.",
          },
          shot("Line Tracing", "клубок пересекающихся линий, цифры слева и буквы справа"),
        ],
      },
      {
        id: "tips",
        h2: "Tips",
        blocks: [
          {
            t: "ul",
            items: [
              "**Slow down at crossings.** Most mistakes happen where two lines meet at a shallow angle. Check which way your line continues before moving on.",
              "**Keep your hands still.** Tracing with a finger is easier, which is exactly why the game is about the eyes.",
              "**Lost the line? Restart it.** Go back to the beginning rather than guessing from the middle.",
            ],
          },
          {
            t: "cta",
            href: "/tests/schulte-table",
            title: "Another eyes-only drill",
            text: "The Schulte table: find the numbers 1 to 25 in order with your side vision.",
            button: "Try it online",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What does visual tracing train?",
        a: "Following a single line through distractions exercises visual tracking and selective attention. As with any brain game, expect to improve mostly at the game itself.",
      },
      {
        q: "Is Line Tracing free?",
        a: "Yes, Line Tracing is one of the free games in Brainura, with no ads.",
      },
    ],
    tests: ["schulte-table"],
    updated: U,
  },

  // ───────────────────────────── Sudoku ─────────────────────────────
  sudoku: {
    title: "Sudoku Without Ads: Classic, Diagonal and Odd-Even",
    description:
      "Play sudoku without ads in Brainura: classic 9×9 puzzles from easy to hard, then diagonal and odd-even variants. Notes, undo, and adaptive levels.",
    h1: "Sudoku in Brainura: classic and variants, no ads",
    cluster: "sudoku game · sudoku without ads · sudoku app · free sudoku",
    lead:
      "The classic 9×9 number puzzle, with a clean board, no ads between puzzles, and levels that move you from friendly grids to diagonal and odd-even variants.",
    howToPlay: [
      { title: "Fill the grid", text: "Every row, column and 3×3 box gets the digits 1 to 9." },
      { title: "No repeats", text: "A digit may not repeat in a row, a column or a box." },
      { title: "Your way", text: "Pick a cell and then a digit, or a digit and then cells. The digit pad sits right under the board." },
      { title: "Notes and undo", text: "Mark candidates, undo any move. A wrong digit is taken off the board." },
    ],
    sections: [
      {
        id: "levels",
        h2: "From easy to variant sudoku",
        blocks: [
          {
            t: "table",
            head: ["Levels", "Puzzle", "What changes"],
            rows: [
              ["1–10", "Classic", "46 clues, no clock: simple scanning is enough"],
              ["11–30", "Classic", "Fewer clues, and a time limit"],
              ["31–50", "**Diagonal**", "Both long diagonals must also hold 1 to 9"],
              ["51+", "**Odd-even**", "Every empty cell is marked odd or even"],
              ["Top", "Mixed", "Modes at random, clues down to the low twenties"],
            ],
          },
          {
            t: "stats",
            items: [
              { value: "0", label: "ads, ever" },
              { value: "1", label: "solution per puzzle, reachable by logic" },
              { value: "Free", label: "one of 13 free games" },
            ],
          },
          shot("Sudoku", "поле 9×9 с заметками в нескольких клетках и панель цифр под ним"),
        ],
      },
      {
        id: "techniques",
        h2: "Solving techniques worth learning",
        blocks: [
          {
            t: "table",
            head: ["Technique", "How it works"],
            rows: [
              ["**Hidden single**", "Look at one digit at a time. If a 7 can only go in one cell of a box, it goes there, even if that cell has other candidates."],
              ["**Naked single**", "If a cell has only one possible digit left, fill it."],
              ["**Pair**", "Two cells in a row that can only hold the same two digits: remove those digits from every other cell in that row."],
            ],
          },
          {
            t: "callout",
            kind: "tip",
            title: "In the variants",
            text: "In diagonal sudoku, treat the diagonals as extra rows. In odd-even puzzles, the mark roughly halves a cell's candidates before you start.",
          },
        ],
      },
      {
        id: "why",
        h2: "Why sudoku is a good daily puzzle",
        blocks: [
          {
            t: "p",
            text: "Sudoku needs no arithmetic, only logic: every digit placed is a small deduction. That makes it a calm, absorbing way to focus for a few minutes. Like any puzzle, it makes you better at sudoku; whether that spreads to other skills is not well established.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is there a sudoku app without ads?",
        a: "Brainura has no ads at all. Sudoku is free, along with 12 other games; Premium unlocks the rest of the 26 games.",
      },
      {
        q: "What is diagonal sudoku?",
        a: "A variant where, in addition to rows, columns and boxes, both main diagonals must contain the digits 1 to 9 once each.",
      },
      {
        q: "Can I use notes?",
        a: "Yes. You can mark candidates yourself or reveal the possible numbers for empty cells.",
      },
      {
        q: "Does every puzzle have one solution?",
        a: "Yes, each puzzle has a single solution that can be reached by logic.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Mathmoji ─────────────────────────────
  mathmoji: {
    title: "Emoji Math Puzzles: Solve the Equations",
    description:
      "Mathmoji is a game of emoji math puzzles: work out what number each icon stands for, then solve the final equation. How it works and how to crack them.",
    h1: "Mathmoji: emoji math puzzles",
    cluster: "emoji math · emoji math puzzles · emoji equations",
    lead:
      "A few equations made of icons instead of numbers. Work out what each icon is worth, then solve the last line.",
    howToPlay: [
      { title: "Study", text: "Each icon stands for one specific number." },
      { title: "Solve step by step", text: "Start with the equation that has a single unknown, then substitute." },
      { title: "Answer", text: "Solve the final line and pick the correct answer from the options." },
    ],
    sections: [
      {
        id: "example",
        h2: "A worked example",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "🍎 + 🍎 + 🍎 = 30", text: "Only one kind of icon, so one apple is **10**." },
              { title: "🍎 + 🍌 + 🍌 = 18", text: "10 + two bananas = 18, so one banana is **4**." },
              { title: "🍌 × 🍎 = ?", text: "4 × 10 = **40**." },
            ],
          },
          shot("Mathmoji", "три строки уравнений из иконок и варианты ответа"),
        ],
      },
      {
        id: "traps",
        h2: "How to avoid the traps",
        blocks: [
          {
            t: "p",
            text: "The wrong options aren't random. They are built from typical slips, so the answer that comes too easily deserves a second look:",
          },
          {
            t: "ul",
            items: [
              "a **flipped sign**: + read as −;",
              "a **forgotten multiplier**: one icon counted once instead of twice;",
              "an answer **off by one**;",
              "**two values swapped** between icons.",
            ],
          },
          {
            t: "callout",
            kind: "warning",
            text: "Some puzzles turn the question around and ask for the value of one icon, or for the operator missing from an equation. Read what is being asked before you calculate.",
          },
        ],
      },
      {
        id: "viral",
        h2: "Why these puzzles went viral",
        blocks: [
          {
            t: "p",
            text: "Picture equations look like a joke and turn out to be real algebra: every icon is a variable, and solving them is the same substitution you learned at school. Easy-looking pictures plus a sneaky final line are what make people share them, and argue about the answer.",
          },
          PREMIUM_NOTE,
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to be good at math?",
        a: "No. The arithmetic is simple. The challenge is careful reading and step-by-step logic.",
      },
      {
        q: "Is Mathmoji free?",
        a: "Mathmoji is a Premium game. Premium games are part of the Premium subscription.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Math Snake ─────────────────────────────
  "math-snake": {
    title: "Math Snake Game: Eat the Right Answer",
    description:
      "Math Snake is a snake game with math: steer the snake to the correct answer of the problem on screen. Wrong number ends the game. Rules and tips.",
    h1: "Math Snake: the snake game with math",
    cluster: "math snake game · snake math game",
    lead:
      "The classic snake, with a twist: a math problem floats above the board, and the snake has to eat the correct answer. Bite the wrong number and the game is over.",
    howToPlay: [
      { title: "Solve", text: "Work out the problem in the thought bubble." },
      { title: "Steer", text: "Guide the snake with the direction buttons toward the correct answer." },
      { title: "Don't bite wrong", text: "Eating a wrong number ends the game immediately." },
      { title: "Grow", text: "Each correct answer brings a new problem and a longer snake. Walls let you through to the other side, but don't bite yourself." },
    ],
    sections: [
      {
        id: "two-tasks",
        h2: "Two tasks at once",
        blocks: [
          {
            t: "p",
            text: "Math Snake makes you calculate while you plan a route. You can't stop to think: the snake keeps moving, so the answer has to come while you are already steering. Later stages bring harder problems and a faster, longer snake.",
          },
          {
            t: "compare",
            good: { title: "Can be fixed", items: ["A wrong turn", "A long detour", "Going through a wall"] },
            bad: { title: "Ends the game", items: ["Eating a wrong number", "Biting your own tail"] },
          },
          shot("Math Snake", "змейка на поле, пример в облачке и несколько чисел-ответов"),
        ],
      },
      {
        id: "tips",
        h2: "Tips",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Solve first, then steer", text: "A wrong turn can be fixed; a wrong number can't." },
              { title: "Use the walls", text: "Passing through one side and coming out the other is often the shortest way to the answer." },
              { title: "Mind the body", text: "As the snake grows, plan a loop that leaves room for the next turn." },
            ],
          },
          {
            t: "callout",
            kind: "note",
            title: "Premium game",
            text: "Premium games are part of the Premium subscription. Quick Math, the free mental math game, is a good place to start.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What kind of math is in Math Snake?",
        a: "Quick mental arithmetic that gets harder as you progress.",
      },
      {
        q: "Is Math Snake free?",
        a: "It is a Premium game. Premium games are part of the Premium subscription. Quick Math, the free mental math game, is a good place to start.",
      },
    ],
    updated: U,
  },

  // ───────────────────────────── Mirror Reading ─────────────────────────────
  "mirror-reading": {
    title: "Mirror Reading: Read Backwards and Upside Down",
    description:
      "Practice reading backwards text: Mirror Reading and Upside Down Reading in Brainura show a short text flipped, then ask questions about it. How to read faster.",
    h1: "Mirror Reading: read backwards and upside-down text",
    cluster: "backwards reading · mirror reading · reading upside down · upside down reading",
    lead:
      "A short text, flipped like in a mirror. Read it before time runs out, then answer questions about what it said. Its sibling, Upside Down Reading, turns the text on its head.",
    howToPlay: [
      { title: "Read", text: "Read the mirrored text carefully. Your level sets how much time you have." },
      { title: "Answer", text: "Answer the questions about the text you just read." },
      { title: "Level up", text: "At higher levels some words fade, letters move closer together and the text tilts." },
    ],
    sections: [
      {
        id: "why-hard",
        h2: "Why backwards text is hard",
        blocks: [
          {
            t: "p",
            text: "Skilled readers recognize whole words at a glance. Flip the text and that shortcut breaks:",
          },
          {
            t: "ul",
            items: [
              "letters like **b** and **d** swap roles;",
              "familiar word shapes disappear;",
              "your eyes have to work right to left.",
            ],
          },
          {
            t: "p",
            text: "You slow down and read almost letter by letter, then gradually speed up as the flipped shapes become familiar. And because questions follow, decoding isn't enough: you have to keep the meaning in mind while your attention is busy with the letters.",
          },
          shot("Mirror Reading", "абзац зеркального текста на экране"),
        ],
      },
      {
        id: "two-games",
        h2: "Two games, two flips",
        blocks: [
          {
            t: "table",
            head: ["Game", "How the text is flipped", "Access"],
            rows: [
              ["**Upside Down Reading**", "Turned on its head", "Free"],
              ["**Mirror Reading**", "Mirrored left to right", "Premium"],
            ],
          },
          {
            t: "quote",
            text: "The most famous mirror writer is Leonardo da Vinci, who filled his notebooks with right-to-left mirror script.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Tips",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Start on the right", text: "Find the start of the line and read in chunks of two or three words." },
              { title: "Use context", text: "Once you know the topic, you can predict many words from their first letters." },
              { title: "Don't reread", text: "Keep moving: the questions are about the main points, not every word." },
            ],
          },
          {
            t: "cta",
            href: "/tests/reading-speed-test",
            title: "How fast do you read normal text?",
            text: "Take the free reading speed test: words per minute with a comprehension check.",
            button: "Take the test",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is reading backwards good for your brain?",
        a: "It is a fun way to make an automatic skill effortful again, and you will get faster with practice. Evidence that it improves reading or thinking in general is lacking, so enjoy it as a challenge.",
      },
      {
        q: "Are the reading games free?",
        a: "Upside Down Reading is free. Mirror Reading is a Premium game.",
      },
    ],
    tests: ["reading-speed-test"],
    updated: U,
  },

  // ───────────────────────────── Bourdon Test ─────────────────────────────
  "bourdon-test": {
    title: "Bourdon Test Online: Attention and Cancellation Game",
    description:
      "Play the Bourdon test in Brainura: scan a grid, find and count target letters, numbers, dice dots or constellations. How it works and tips for accuracy.",
    h1: "Bourdon Test: a classic attention task as a game",
    cluster: "bourdon test · letter cancellation test · cancellation test · attention test",
    lead:
      "A grid full of symbols and a target. Scan carefully, count every occurrence of the target, and pick the right number before time runs out.",
    howToPlay: [
      { title: "See the target", text: "A letter, a number, a dice face or a constellation is shown above the grid." },
      { title: "Scan and count", text: "Count every occurrence of the target in the grid." },
      { title: "Pick the count", text: "Choose the correct number from the answer options." },
      { title: "Beat the clock", text: "Answer before time runs out. Higher levels bring denser grids and look-alike symbols." },
    ],
    sections: [
      {
        id: "modes",
        h2: "Four modes",
        blocks: [
          {
            t: "table",
            head: ["Mode", "What you count", "The hard part"],
            rows: [
              ["**Letters**", "A target letter", "Look-alikes such as b and d"],
              ["**Numbers**", "A target digit", "Look-alikes such as 6 and 9"],
              ["**Dice dots**", "A dice face", "Telling five dots from six at a glance"],
              ["**Constellations**", "A star pattern", "Patterns instead of symbols"],
            ],
          },
          shot("Bourdon Test", "сетка символов, цель сверху и варианты ответа"),
        ],
      },
      {
        id: "about",
        h2: "About the Bourdon test",
        blocks: [
          {
            t: "p",
            text: "The task goes back to the French psychologist **Benjamin Bourdon**, who described a letter-crossing test at the end of the 19th century. Versions of it, often called **cancellation tests**, are still used in psychology to observe sustained and selective attention: how steadily someone keeps scanning without skipping targets or marking the wrong ones.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Tips for accuracy",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Scan in a fixed pattern", text: "Row by row, the way you read. Jumping around is how targets get counted twice or missed." },
              { title: "Count under your breath", text: "Keep a running count instead of trying to see the total at once." },
              { title: "Double-check look-alikes", text: "A quick second look is cheaper than a wrong answer." },
            ],
          },
          {
            t: "cta",
            href: "/tests/stroop-test",
            title: "Another classic attention task",
            text: "The Stroop test: name the ink color, not the word, and measure your own interference effect.",
            button: "Try it online",
          },
          PREMIUM_NOTE,
        ],
      },
    ],
    faq: [
      {
        q: "What does the Bourdon test measure?",
        a: "Sustained and selective attention: the ability to keep scanning accurately for a target among distractors. The game version is for practice, not assessment.",
      },
      {
        q: "Is the Bourdon Test free?",
        a: "It is a Premium game. Premium games are part of the Premium subscription.",
      },
    ],
    tests: ["schulte-table", "stroop-test"],
    updated: U,
  },
};
