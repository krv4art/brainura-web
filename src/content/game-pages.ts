// Тексты страниц игр (волна 2). Механика сверена с кодом приложения:
// lib/screens/brain_training/services/level_params/*_params.dart и обучалками в
// assets/translations/en/brain_training.json. Правила: без медицинских обещаний,
// без чужих товарных знаков в заголовках, источники — для научных утверждений.
// Порядок и ключи — docs/growth/seo/page_map.md.

import type { GamePageContent } from "./games";

const U = "2026-11-11";

const SIMONS_2016 = {
  text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
  url: "https://doi.org/10.1177/1529100616661983",
};

export const GAME_PAGE_CONTENT: Record<string, GamePageContent> = {
  "card-match": {
    title: "Memory Matching Game for Adults: Card Match",
    description:
      "Card Match is a memory matching game for adults: flip cards, find every pair, and work up from a 4×4 grid to 8×8. How it works and tips to remember more.",
    h1: "Card Match: a memory matching game for adults",
    cluster: "memory matching game · matching game · memory card game · card matching game",
    lead:
      "The classic pairs game, built for grown-ups: a short look at the cards, then flip two at a time and find every match with as few misses as possible.",
    howToPlay: [
      "At the start of a round all cards are shown face up for a moment. Take in as many as you can.",
      "The cards flip over. Tap two cards to turn them face up.",
      "If they match, they stay open. If not, they flip back, and now you know two more positions.",
      "Clear the board with as few wrong pairs as you can. Fewer misses mean a better score.",
    ],
    sections: [
      {
        h2: "How the levels work",
        paragraphs: [
          "Level 1 starts on a 4×4 grid (8 pairs) with a three-second preview. As your level rises, the grid grows step by step to 8×8, which is 32 pairs, and the preview shrinks to about one second. Your level follows your results: play well and it climbs, have an off day and it eases back.",
          "The bigger grids change the game. On 4×4 you can simply remember. On 8×8 you need a system: scan in rows, keep track of the cards you have already seen, and resist the urge to flip a card you have no information about when a known pair is waiting.",
        ],
      },
      {
        h2: "What the game exercises",
        paragraphs: [
          "Matching games lean on visual working memory, the short-term store that holds what something looked like and where it was. Each wrong flip adds a card and a position you need to keep in mind until its partner appears, and the board quickly fills up with half-remembered locations.",
          "That makes it a good warm-up and a pleasant challenge, but keep expectations realistic: research on brain training finds that practice improves performance on the trained game far more reliably than it improves memory in everyday life.",
        ],
      },
      {
        h2: "Tips to remember more cards",
        paragraphs: [
          "Use the preview to anchor a few cards, not all of them. Pick one row or one corner and remember it well; trying to take in the whole board at once usually leaves you with nothing certain.",
          "Name what you see. Saying \"cat, top left\" in your head is easier to keep than a picture alone.",
          "Work the edges first. Corners and edges are easier to recall than cells in the middle of a large grid.",
          "When you have no known pair, flip a card you have never seen first. If it matches something you remember, you get a free pair.",
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
    updated: U,
  },

  anagrams: {
    title: "Anagram Game: Unscramble Letters Into Words",
    description:
      "Anagrams is a word scramble game for adults: unscramble the letters into a word before time runs out. Levels, hints and tips for solving anagrams faster.",
    h1: "Anagrams: the word scramble game",
    cluster: "anagram game · word scramble game · anagrams game · scrambled words game",
    lead:
      "You get a jumble of letters. Find the word hidden in them before the timer runs out. Short to play, hard to put down.",
    howToPlay: [
      "Look at the scrambled letters and find the word they spell.",
      "Type your answer and submit it.",
      "Stuck? On the first 50 levels you can use a hint.",
      "Solve as many words as you can within the time limit for each one.",
    ],
    sections: [
      {
        h2: "How the levels get harder",
        paragraphs: [
          "The first ten levels use easy, everyday words with about a minute per word. Medium words arrive from level 11 and hard words from level 31, while the time per word shrinks to well under half a minute at the top levels.",
          "From level 41 there are extra letters in the mix that don't belong to the word, so you can no longer use every letter you see. From level 51 hints are switched off. The combination turns a relaxed word game into a real test of vocabulary under pressure.",
        ],
      },
      {
        h2: "How to solve anagrams faster",
        paragraphs: [
          "Look for common endings first: -ING, -ED, -ER, -LY, -TION. Pulling them aside leaves a shorter, easier jumble.",
          "Find pairs that often sit together, like TH, CH, SH, QU, CK, and try them at the start or end of the word.",
          "Separate vowels and consonants in your head and try consonant-vowel patterns. Most English words alternate more than you would think.",
          "If nothing comes, say the letters in a different order out loud. Hearing a fragment often unlocks the word faster than staring.",
        ],
      },
      {
        h2: "Why word games feel good for the brain",
        paragraphs: [
          "An anagram makes you search your mental dictionary in an unusual way: instead of going from meaning to word, you go from a bag of letters to a word that fits. That search is what makes the moment of finding it so satisfying.",
          "Playing regularly makes you faster at spotting letter patterns and at recalling words. It is a fun habit, not a treatment; research on brain games shows that gains mostly stay with the trained task.",
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

  "merge-numbers": {
    title: "Merge Numbers: a 2048-Style Sliding Puzzle",
    description:
      "Merge Numbers is a 2048-style puzzle in Brainura: slide the tiles, merge equal numbers and climb as high as you can. Rules, scoring and strategy tips.",
    h1: "Merge Numbers: the 2048-style sliding puzzle",
    cluster: "2048 game · merge numbers game · number merge game",
    lead:
      "Slide every tile at once, merge equal numbers into their sum, and see how high you can climb before the board locks up. No timer, no move limit.",
    howToPlay: [
      "Use the arrow pad to slide all tiles in one direction at once.",
      "Two equal tiles that collide merge into one tile with double the value: 2 + 2 = 4, 4 + 4 = 8, and so on.",
      "After each move a new small tile appears on an empty cell.",
      "The game ends when no move can change the board. Your highest tile is your score.",
    ],
    sections: [
      {
        h2: "Scoring and stars",
        paragraphs: [
          "There are no levels here: every game is the same puzzle, and the board itself is the challenge. Reaching a 256 tile earns one star, 512 earns two, and 1024 earns three.",
          "Because there is no clock, Merge Numbers is the calm game in Brainura's line-up. It rewards planning several moves ahead rather than quick reflexes.",
        ],
      },
      {
        h2: "Strategy that works",
        paragraphs: [
          "Pick a corner and keep your biggest tile there. Most good games are built around one corner, with the largest numbers lined up along one edge.",
          "Use mostly two or three directions. Moving away from your corner is sometimes necessary, but every time you do it, a small tile can land in the spot your big tile just left.",
          "Keep the edge row full. If the row with your big tiles always has four tiles, sideways moves won't shift it out of order.",
          "Merge small tiles early. Leaving lots of 2s and 4s scattered around fills the board quickly and ends the game.",
        ],
      },
      {
        h2: "Where the idea comes from",
        paragraphs: [
          "Sliding-merge puzzles became hugely popular in 2014 with an open-source web game built around reaching the 2048 tile, itself inspired by earlier mobile games. The rules are simple enough to learn in seconds, and the planning goes surprisingly deep.",
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

  "quick-math": {
    title: "Mental Math Games for Adults: Quick Math",
    description:
      "Quick Math is a mental math game for adults: solve arithmetic against the clock, from simple sums to multi-step problems. Levels and tips to calculate faster.",
    h1: "Quick Math: a mental math game for adults",
    cluster: "mental math games · math games for adults · quick math game · speed math",
    lead:
      "A problem, a few answer options, and a clock. Pick the right answer as fast as you can; faster answers earn more points.",
    howToPlay: [
      "Read the problem at the top of the screen.",
      "Tap the correct answer from the options below.",
      "Answer quickly: speed adds bonus points to every correct answer.",
      "Finish the round and see your accuracy and score.",
    ],
    sections: [
      {
        h2: "From warm-up sums to real mental math",
        paragraphs: [
          "The first ten levels are addition only, with small numbers and three or four answers to choose from. Subtraction joins from level 11, multiplication from level 31 and division from level 41. The numbers grow (up to 200 at the top) and the number of answer options rises to six, so estimating alone stops being enough.",
          "The level follows your results automatically, so the game stays in the zone where you have to concentrate but can still win.",
        ],
      },
      {
        h2: "Tips to calculate faster in your head",
        paragraphs: [
          "Round and correct: 49 + 37 is easier as 50 + 37 − 1.",
          "Split numbers: 8 × 27 = 8 × 25 + 8 × 2 = 200 + 16.",
          "Estimate before you calculate. With answers to choose from, a quick estimate often rules out most options at once.",
          "Learn a few anchors by heart: squares up to 15, and multiples of 25 and 12. They make a surprising number of problems instant.",
        ],
      },
      {
        h2: "Why practise mental arithmetic",
        paragraphs: [
          "Mental math is a skill like any other: regular short practice makes it quicker and less effortful, which shows up when you split a bill, compare prices or check a number at work. Treat it as practising a useful skill rather than a general brain upgrade; studies of brain training find the clearest gains on the practised task.",
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

  quarters: {
    title: "Shikaku Puzzle Online: How to Play Quarters",
    description:
      "Quarters is Brainura's take on the shikaku puzzle: divide the grid into rectangles whose areas match the numbers. Rules, solving techniques and levels.",
    h1: "Quarters: the rectangle-dividing logic puzzle",
    cluster: "shikaku · shikaku puzzle · rectangles puzzle · divide by box",
    lead:
      "Cut the grid into rectangles so that each one holds exactly one number, and that number equals its area. No math beyond counting, all logic.",
    howToPlay: [
      "Drag across the grid to draw a rectangle.",
      "Each rectangle must contain exactly one number.",
      "The rectangle's area (number of cells) must equal that number: a 6 can be 1×6, 2×3, 3×2 or 6×1.",
      "Fill the whole grid with no gaps or overlaps. Tap a rectangle to remove it.",
    ],
    sections: [
      {
        h2: "Solving techniques",
        paragraphs: [
          "Start with the certain ones. A 1 is always a single cell. A number squeezed into a corner or between other numbers often has only one shape and position that fit, so draw it.",
          "Look at the empty cells, not just the numbers. If a cell can only be reached by one number's rectangle, it belongs to that number. This is often the move that breaks a hard puzzle open.",
          "Prime numbers are friendly. A 5 or a 7 can only be a straight line, which leaves at most two orientations to check.",
          "Each placement removes options for its neighbors. After every rectangle, scan the area around it for numbers that just became forced.",
        ],
      },
      {
        h2: "How the levels grow",
        paragraphs: [
          "Brainura starts with 5×5 grids and gives you several hints per puzzle. The grids grow to 6×6, 7×7 and 8×8, and the top levels use 9×9 and 10×10 boards with fewer hints. Every puzzle has exactly one solution that can be reached by logic alone, so you never need to guess.",
        ],
      },
      {
        h2: "About the puzzle",
        paragraphs: [
          "This type of puzzle comes from Japan, where it was popularized by puzzle magazines, and it is known in English under several names, including shikaku and \"divide by squares\". In Brainura it is called Quarters.",
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
        a: "Quarters is a Premium game. New players get all Premium games free for the first 7 days, no card needed.",
      },
    ],
    updated: U,
  },

  "word-groups": {
    title: "Word Association Game: Sort Words Into Groups",
    description:
      "Word Groups is a word association game: sort a board of words into hidden groups. Tricky words fit two groups at once. How to play and how to solve.",
    h1: "Word Groups: a word association game",
    cluster: "word association game · word groups game · categories game · group the words",
    lead:
      "Every word on the board belongs to a hidden group. Find the groups. The catch: some words look like they fit two of them.",
    howToPlay: [
      "Look over the board. Every word belongs to one hidden group.",
      "Tap the words of one group. The group locks in as soon as you pick its last word.",
      "A wrong pick flashes red and clears.",
      "Higher levels add spare words that belong to no group, closer categories and a timer.",
    ],
    sections: [
      {
        h2: "Where the difficulty comes from",
        paragraphs: [
          "Word Groups doesn't get harder by adding more words. It gets harder through decoys: words that plausibly belong to two categories on the same board, categories that sit close to each other, and spare words that belong nowhere.",
          "That is why the game rewards patience. The obvious group is often a trap, and the right move is to find the group that has no ambiguous members first.",
        ],
      },
      {
        h2: "How to solve a board",
        paragraphs: [
          "Find the odd words first. A word that can only mean one thing tells you a category for sure.",
          "Look for double meanings. Many words are both a noun and a verb, or belong to two topics. Those are the decoys.",
          "Count. If you think you see a group but have one word too many, one of them belongs elsewhere.",
          "Leave the hardest group for last. Once the others are locked in, it often solves itself.",
        ],
      },
      {
        h2: "Built for every language",
        paragraphs: [
          "The word banks are not translations. Each language has its own words and categories, written for that language, because good decoys only work inside a language: a pun or a double meaning rarely survives translation.",
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

  "mirror-drawing": {
    title: "Mirror Drawing Game: Draw the Mirrored Half",
    description:
      "Mirror Drawing is a spatial game: complete the mirror image of a picture across an axis, corner by corner on a grid. How it works and how to get it right.",
    h1: "Mirror Drawing: complete the mirror image",
    cluster: "mirror drawing · mirror drawing game · draw the other half · symmetry drawing",
    lead:
      "One half of a picture is drawn on a grid. Draw the other half as its exact mirror image across the dashed axis.",
    howToPlay: [
      "Touch the start dot on the axis.",
      "Drag to draw. The line stays straight behind your finger, and a corner locks in when you turn.",
      "Going back along your own line erases it, but every erased corner costs accuracy.",
      "On the first 10 levels the correct path is shown faintly. After that you draw blind and see the answer when you reach the finish ring.",
    ],
    sections: [
      {
        h2: "Why it is harder than it looks",
        paragraphs: [
          "Mirroring flips left and right while keeping up and down. Your hand naturally wants to copy the shape as it is, so every turn is a small decision: should this line go toward the axis or away from it?",
          "As the levels rise, pictures get more corners and can have several separate details, and from level 11 you no longer see the target path while you draw.",
        ],
      },
      {
        h2: "Tips",
        paragraphs: [
          "Count grid squares, don't eyeball. Each corner of the mirrored half sits at the same distance from the axis as its original.",
          "Work corner by corner. Find the next corner of the original, mirror its position, and only then draw.",
          "Trace with your eyes first. A quick look along the original path before you start saves erasing later.",
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
        a: "It is a Premium game. New players get all Premium games free for the first 7 days, no card needed.",
      },
    ],
    updated: U,
  },

  "math-cross": {
    title: "Math Crossword Puzzle: Place Every Number",
    description:
      "Math Cross is a math crossword puzzle: place every number from the bank so that all equations across and down are correct. Rules, levels and tips.",
    h1: "Math Cross: the math crossword puzzle",
    cluster: "math crossword · math crossword puzzle · number crossword · cross math",
    lead:
      "A crossword made of equations. Every row and column is a calculation, and each number from the bank goes into exactly one empty cell.",
    howToPlay: [
      "Every row and every column on the board is an equation.",
      "Tap a number in the bank, then tap an empty cell to place it.",
      "Each number is used exactly once. Tap a placed number to take it back.",
      "A wrong number is rejected right away and bounces back to the bank.",
      "Equations are read left to right and top to bottom, without operator precedence: 3 + 4 × 2 = 14.",
    ],
    sections: [
      {
        h2: "How the levels grow",
        paragraphs: [
          "The first levels use only addition. Subtraction joins from level 5, multiplication from level 13 and division from level 25. Boards grow from 7 equations to 14, with more empty cells, bigger numbers and longer chains of operations.",
        ],
      },
      {
        h2: "Solving tips",
        paragraphs: [
          "Start where a cell belongs to an equation with only one gap: it can be calculated directly.",
          "Use the bank as a constraint. Each number is used once, so if only one number in the bank fits a cell, it goes there, and it is gone for every other cell.",
          "Remember the reading order. There is no \"multiplication first\": the equation is simply evaluated left to right.",
          "Cells where two equations cross are the key. A number there must work both across and down.",
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
        a: "It is a Premium game. New players get all Premium games free for the first 7 days, no card needed.",
      },
    ],
    updated: U,
  },

  "read-the-face": {
    title: "Emotion Recognition Game: Read the Face",
    description:
      "Read the Face is an emotion recognition game: name the emotion on the face, from a broad smile to a flash of contempt, and learn to tell them apart.",
    h1: "Read the Face: an emotion recognition game",
    cluster: "emotion recognition game · facial expression game · guess the emotion · read faces",
    lead:
      "A face appears. Name the emotion it shows. At higher levels the expressions get subtler, flash for a split second, or show only the eyes.",
    howToPlay: [
      "Look at the face and tap the emotion it shows.",
      "The faster you answer, the more points the face is worth.",
      "Wrong answer? The face is shown at full strength and the right name lights up.",
      "As you level up, emotions get subtler and the choices look more alike. Later an expression only flashes briefly, and sometimes only the eyes are visible.",
    ],
    sections: [
      {
        h2: "How the faces are made",
        paragraphs: [
          "The faces in Brainura are drawn by the app from the muscle movements that make up each expression, following the Facial Action Coding System used by researchers to describe facial movement. That lets the game control exactly how strong an expression is, and show the same emotion on faces of different ages and looks.",
          "The set covers the classic basic emotions plus contempt, which is the only one that shows on just one side of the face.",
        ],
      },
      {
        h2: "How to tell similar emotions apart",
        paragraphs: [
          "A real smile involves the eyes: cheeks lift and the skin around the eyes crinkles. A polite smile often stays in the mouth.",
          "Fear and surprise both widen the eyes. In fear the brows are pulled together and the lips stretch sideways; in surprise the brows rise in an arch and the jaw drops.",
          "Disgust wrinkles the nose and raises the upper lip; anger lowers and draws the brows together and tightens the lips.",
          "Contempt is one-sided: one corner of the mouth tightens and lifts.",
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
        a: "It is a Premium game. New players get all Premium games free for the first 7 days, no card needed. Mood Swipe, a quicker game about pleasant and unpleasant expressions, is also Premium.",
      },
    ],
    sources: [
      {
        text: "Ekman, P., & Friesen, W. V. (1978). Facial Action Coding System: A technique for the measurement of facial movement. Consulting Psychologists Press.",
      },
    ],
    updated: U,
  },

  "line-tracing": {
    title: "Visual Tracing Game: Follow the Tangled Lines",
    description:
      "Line Tracing is a visual tracing game: follow a line through a tangle with your eyes only and find where it ends. Based on a classic visual tracing test.",
    h1: "Line Tracing: follow the line with your eyes",
    cluster: "line tracing game · visual tracing · follow the line puzzle · tangled lines",
    lead:
      "Numbers on the left, letters on the right, and a tangle of crossing lines between them. Follow one line with your eyes and tap the letter where it ends.",
    howToPlay: [
      "A number appears below the tangle. Find its line on the left.",
      "Follow the line with your eyes only, through every crossing.",
      "Tap the letter where the line ends.",
      "Higher levels add more lines, more crossings and loops.",
    ],
    sections: [
      {
        h2: "Where the idea comes from",
        paragraphs: [
          "The game is based on the Groffman Visual Tracing Test, a task used in vision and attention research where a person follows lines through a tangle without using a finger. It asks your eyes to stay on one path while dozens of others try to pull them away.",
        ],
      },
      {
        h2: "Tips",
        paragraphs: [
          "Slow down at crossings. Most mistakes happen where two lines meet at a shallow angle; check which way your line continues before moving on.",
          "Keep your hands still. Tracing with a finger is easier, which is exactly why the game is about the eyes.",
          "If you lose the line, go back to the start rather than guessing from the middle.",
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

  sudoku: {
    title: "Sudoku Without Ads: Classic, Diagonal and Odd-Even",
    description:
      "Play sudoku without ads in Brainura: classic 9×9 puzzles from easy to hard, then diagonal and odd-even variants. Notes, undo, and adaptive levels.",
    h1: "Sudoku in Brainura: classic and variants, no ads",
    cluster: "sudoku game · sudoku without ads · sudoku app · free sudoku",
    lead:
      "The classic 9×9 number puzzle, with a clean board, no ads between puzzles, and levels that move you from friendly grids to diagonal and odd-even variants.",
    howToPlay: [
      "Fill every row, column and 3×3 box with the digits 1 to 9.",
      "No digit may repeat in a row, a column or a box.",
      "Pick a cell and then a digit, or a digit and then cells. The digit pad sits right under the board.",
      "Use notes to mark candidates. Undo any move; a wrong digit is taken off the board.",
    ],
    sections: [
      {
        h2: "From easy to variant sudoku",
        paragraphs: [
          "The first levels give you 46 clues and no clock, so the puzzle can be solved with simple scanning. Clues get fewer as you climb, down to the low twenties, and a time limit appears after level 10.",
          "From level 31 the game switches to diagonal sudoku, where both long diagonals must also contain 1 to 9. From level 51 come odd-even puzzles, where every empty cell is marked as odd or even. The top levels mix the modes at random.",
        ],
      },
      {
        h2: "Solving techniques worth learning",
        paragraphs: [
          "Hidden singles: look at one digit at a time. If a 7 can only go in one cell of a box, it goes there, even if that cell has other candidates.",
          "Naked singles: if a cell has only one possible digit left, fill it.",
          "Pairs: when two cells in a row can only hold the same two digits, those digits can be removed from every other cell in that row.",
          "In diagonal sudoku, the diagonals are extra houses: check them like rows. In odd-even puzzles, the odd or even mark roughly halves the candidates of a cell before you start.",
        ],
      },
      {
        h2: "Why sudoku is a good daily puzzle",
        paragraphs: [
          "Sudoku needs no arithmetic, only logic: every digit placed is a small deduction. That makes it a calm, absorbing way to focus for a few minutes. Like any puzzle, it makes you better at sudoku; whether that spreads to other skills is not well established.",
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

  mathmoji: {
    title: "Emoji Math Puzzles: Solve the Equations",
    description:
      "Mathmoji is a game of emoji math puzzles: work out what number each icon stands for, then solve the final equation. How it works and how to crack them.",
    h1: "Mathmoji: emoji math puzzles",
    cluster: "emoji math · emoji math puzzles · emoji equations",
    lead:
      "A few equations made of icons instead of numbers. Work out what each icon is worth, then solve the last line.",
    howToPlay: [
      "Study the equations. Each icon stands for one specific number.",
      "Work out the values one by one, starting with the equation that has a single unknown.",
      "Solve the final equation and pick the correct answer from the options.",
    ],
    sections: [
      {
        h2: "How to crack an emoji equation",
        paragraphs: [
          "Find the line with only one kind of icon. Three apples making 30 means one apple is 10.",
          "Substitute and move on. Each value you find turns the next equation into an easier one.",
          "Distrust the answer that comes too easily. The wrong options are built from typical slips: a flipped sign, a forgotten multiplier, an answer off by one, or two values swapped.",
          "Some puzzles turn the question around and ask for the value of one icon, or for the operator missing from an equation. Read what is being asked before you calculate.",
        ],
      },
      {
        h2: "Why these puzzles went viral",
        paragraphs: [
          "Picture equations look like a joke and turn out to be real algebra: every icon is a variable, and solving them is the same substitution you learned at school. The mix of easy-looking pictures and a sneaky final line is what makes people share them, and argue about the answer.",
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
        a: "Mathmoji is a Premium game. New players get all Premium games free for the first 7 days, no card needed.",
      },
    ],
    updated: U,
  },

  "math-snake": {
    title: "Math Snake Game: Eat the Right Answer",
    description:
      "Math Snake is a snake game with math: steer the snake to the correct answer of the problem on screen. Wrong number ends the game. Rules and tips.",
    h1: "Math Snake: the snake game with math",
    cluster: "math snake game · snake math game",
    lead:
      "The classic snake, with a twist: a math problem floats above the board, and the snake has to eat the correct answer. Bite the wrong number and the game is over.",
    howToPlay: [
      "Solve the problem shown in the thought bubble.",
      "Steer the snake with the direction buttons toward the correct answer.",
      "Eating a wrong number ends the game immediately.",
      "Each correct answer brings a new problem and a longer snake. Walls let you through to the opposite side, but don't bite yourself.",
    ],
    sections: [
      {
        h2: "Two tasks at once",
        paragraphs: [
          "Math Snake makes you calculate while you plan a route. You can't stop to think: the snake keeps moving, so the answer has to come while you are already steering. Later stages bring harder problems and a faster, longer snake.",
        ],
      },
      {
        h2: "Tips",
        paragraphs: [
          "Solve first, then steer. A wrong turn can be fixed; a wrong number can't.",
          "Use the walls. Passing through one side and coming out the other is often the shortest way to the answer.",
          "Keep the body in mind. As the snake grows, plan a loop that leaves room for the next turn.",
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
        a: "It is a Premium game. New players get all Premium games free for the first 7 days, no card needed. Quick Math, the free mental math game, is a good place to start.",
      },
    ],
    updated: U,
  },

  "mirror-reading": {
    title: "Mirror Reading: Read Backwards and Upside Down",
    description:
      "Practice reading backwards text: Mirror Reading and Upside Down Reading in Brainura show a short text flipped, then ask questions about it. How to read faster.",
    h1: "Mirror Reading: read backwards and upside-down text",
    cluster: "backwards reading · mirror reading · reading upside down · upside down reading",
    lead:
      "A short text, flipped like in a mirror. Read it before time runs out, then answer questions about what it said. Its sibling, Upside Down Reading, turns the text on its head.",
    howToPlay: [
      "Read the mirrored text carefully. You have a limited time, set by your level.",
      "Answer the questions about the text you just read.",
      "At higher levels some words fade, letters move closer together and the text tilts, so decoding takes more effort.",
    ],
    sections: [
      {
        h2: "Why backwards text is hard",
        paragraphs: [
          "Skilled readers recognize whole words at a glance. Flip the text and that shortcut breaks: letters like b and d swap roles, familiar word shapes disappear, and your eyes have to work right to left. You slow down and read almost letter by letter, then gradually speed up as the flipped shapes become familiar.",
          "Because you have to answer questions afterwards, decoding is not enough: you also need to keep the meaning in mind while your attention is busy with the letters.",
        ],
      },
      {
        h2: "Mirror writing in history",
        paragraphs: [
          "The most famous mirror writer is Leonardo da Vinci, who filled his notebooks with right-to-left mirror script. Reading those pages comfortably usually takes a mirror, or some practice.",
        ],
      },
      {
        h2: "Tips",
        paragraphs: [
          "Find the start of the line on the right and read in chunks of two or three words.",
          "Use context. Once you get the topic of the text, you can predict many words from their first letters.",
          "Don't reread. Keep moving; questions are about the main points, not every word.",
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
        a: "Upside Down Reading is free. Mirror Reading is Premium; new players get all Premium games free for the first 7 days, no card needed.",
      },
    ],
    updated: U,
  },

  "bourdon-test": {
    title: "Bourdon Test Online: Attention and Cancellation Game",
    description:
      "Play the Bourdon test in Brainura: scan a grid, find and count target letters, numbers, dice dots or constellations. How it works and tips for accuracy.",
    h1: "Bourdon Test: a classic attention task as a game",
    cluster: "bourdon test · letter cancellation test · cancellation test · attention test",
    lead:
      "A grid full of symbols and a target. Scan carefully, count every occurrence of the target, and pick the right number before time runs out.",
    howToPlay: [
      "Look at the target shown above the grid: a letter, a number, a dice face or a constellation.",
      "Scan the grid and count every occurrence of the target.",
      "Pick the correct count from the answer options.",
      "Answer before the time runs out. Higher levels bring denser grids and look-alike symbols.",
    ],
    sections: [
      {
        h2: "About the Bourdon test",
        paragraphs: [
          "The task goes back to the French psychologist Benjamin Bourdon, who described a letter-crossing test at the end of the 19th century. Versions of it, often called cancellation tests, are still used in psychology to observe sustained and selective attention: how steadily someone can keep scanning without skipping targets or marking the wrong ones.",
          "In Brainura the test comes in four modes. Letters and numbers are the classic versions; dice dots and constellations replace the symbols with patterns you have to count, which makes look-alikes much harder to tell apart.",
        ],
      },
      {
        h2: "Tips for accuracy",
        paragraphs: [
          "Scan in a fixed pattern, row by row, the way you read. Jumping around is how targets get counted twice or missed.",
          "Keep a running count under your breath instead of trying to see the total at once.",
          "Watch for look-alikes: b and d, 6 and 9, five and six dots. A quick second look is cheaper than a wrong answer.",
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
        a: "It is a Premium game. New players get all Premium games free for the first 7 days, no card needed.",
      },
    ],
    tests: ["schulte-table", "stroop-test"],
    updated: U,
  },
};
