// Статьи раздела /learn (SEO_PLAN §6, волна 3). Одна статья = один info-кластер; ядро —
// docs/growth/seo/pages/learn/<slug>.md в репо приложения.
//
// Правила: без медицинских обещаний, источник у каждого научного утверждения, ссылка на
// инструмент или игру. Подача — разнообразная (src/components/seo/blocks.tsx): в каждом
// разделе не только абзацы — таблица, список, шаги, врезка, цифры, «миф/факт»; абзацы
// по 2–4 предложения. Картинки — слоты `figure` с описанием; файл кладётся в
// public/learn/<slug>/<id>.webp и появляется сам.

import type { FaqItem, Source } from "@/components/seo/parts";
import type { BlockSection } from "@/components/seo/blocks";

export interface Article {
  /** Ключ языковых версий (= английский слаг); у английской можно не указывать. */
  key?: string;
  slug: string;
  name: string;
  blurb: string;
  title: string;
  description: string;
  h1: string;
  cluster: string;
  lead: string;
  /** «Коротко о главном»: 3–5 пунктов над оглавлением. */
  takeaways: string[];
  sections: BlockSection[];
  faq: FaqItem[];
  sources: Source[];
  related: { href: string; title: string; body: string }[];
  published: string;
  updated?: string;
}

const RAYNER_2016 = {
  text: "Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest, 17(1), 4–34.",
  url: "https://doi.org/10.1177/1529100615623267",
};
const BRYSBAERT_2019 = {
  text: "Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language, 109, 104047.",
  url: "https://doi.org/10.1016/j.jml.2019.104047",
};
const RAYNER_1998 = {
  text: "Rayner, K. (1998). Eye movements in reading and information processing: 20 years of research. Psychological Bulletin, 124(3), 372–422.",
  url: "https://doi.org/10.1037/0033-2909.124.3.372",
};
const DELGADO_2018 = {
  text: "Delgado, P., Vargas, C., Ackerman, R., & Salmerón, L. (2018). Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension. Educational Research Review, 25, 23–38.",
  url: "https://doi.org/10.1016/j.edurev.2018.09.003",
};

export const ARTICLES_ALL: Article[] = [
  // ───────────────────────────── average reading speed ─────────────────────────────
  {
    slug: "average-reading-speed",
    name: "Average reading speed",
    blurb: "How many words per minute adults read, and what changes it.",
    title: "Average Reading Speed for Adults (Words per Minute)",
    description:
      "The average adult reads about 240 words per minute silently and about 180 aloud. Charts, reading-time tables and what research says about getting faster.",
    h1: "Average reading speed: how fast do adults read?",
    cluster: "average reading speed · average reading speed for adults · average reading speed pages · words per minute reading",
    lead:
      "Most adults read English silently at around 240 words per minute and aloud at around 180. Here is where those numbers come from, how long common texts take to read, and what to make of claims of 1,000 words a minute.",
    takeaways: [
      "Silent reading of English non-fiction averages about **238 words per minute**; fiction is a little faster, at about **260**.",
      "Reading aloud is slower: about **183 words per minute**, because speech sets the pace.",
      "Most adults land somewhere between **175 and 300** words per minute. The popular figure of 300+ is too high.",
      "Reading far faster than that means skimming: you trade understanding for speed.",
      "Want your own number? The [reading speed test](/tests/reading-speed-test) takes about two minutes.",
    ],
    sections: [
      {
        id: "numbers",
        h2: "The numbers at a glance",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "238", label: "words per minute, silent non-fiction" },
              { value: "260", label: "words per minute, silent fiction" },
              { value: "183", label: "words per minute, reading aloud" },
              { value: "175–300", label: "where most adults fall" },
            ],
          },
          {
            t: "p",
            text: "These figures come from a 2019 meta-analysis by Marc Brysbaert that pooled **190 studies with 18,573 participants**. It is the most thorough estimate of adult reading rate to date, and it replaced older numbers that were often quoted without a clear source.",
          },
          {
            t: "bars",
            title: "Average adult reading rate in English",
            unit: "wpm",
            items: [
              { label: "Reading aloud", value: 183 },
              { label: "Silent reading, non-fiction", value: 238, highlight: true },
              { label: "Silent reading, fiction", value: 260 },
            ],
            note: "Source: Brysbaert (2019). Rates for other languages differ and do not transfer directly.",
          },
          {
            t: "callout",
            kind: "note",
            text: "You will often see “the average person reads 300 words per minute.” The research average is lower. If your result is around 240, you are right where most adult readers are.",
          },
        ],
      },
      {
        id: "reading-time",
        h2: "How long does it take to read…?",
        blocks: [
          {
            t: "p",
            text: "Words per minute is abstract. Here is what the average rate means for things people actually read. A typical paperback page holds roughly 250 to 300 words, though page density varies a lot between books.",
          },
          {
            t: "table",
            caption: "Reading time at average adult speed",
            head: ["Text", "Words", "At 238 wpm", "At 300 wpm"],
            rows: [
              ["A paperback page", "≈ 275", "≈ 1 min 10 s", "≈ 55 s"],
              ["A news article", "≈ 800", "≈ 3 min 20 s", "≈ 2 min 40 s"],
              ["A long-read magazine piece", "≈ 5,000", "≈ 21 min", "≈ 17 min"],
              ["A short novel", "≈ 60,000", "≈ 4 h 12 min", "≈ 3 h 20 min"],
              ["A full-length novel", "≈ 90,000", "≈ 6 h 18 min", "≈ 5 h"],
            ],
            note: "Simple arithmetic: words ÷ words per minute. Real reading includes breaks, rereading and harder passages.",
          },
          {
            t: "p",
            text: "So at an average pace you read roughly **50 to 60 pages an hour** of an ordinary paperback. A demanding textbook can easily halve that, and that is normal, not a sign of slow reading.",
          },
        ],
      },
      {
        id: "goal",
        h2: "Your speed depends on why you read",
        blocks: [
          {
            t: "p",
            text: "There isn't one reading speed. The same person reads at very different rates depending on the job the text has to do. None of these is wrong; they are different tools.",
          },
          {
            t: "table",
            head: ["Kind of reading", "Pace", "What you get"],
            rows: [
              ["**Studying**: reading to learn and remember", "Slower than your normal pace", "Detail, connections, long-term memory"],
              ["**Normal reading** for understanding", "Your typical rate (most adults 175–300 wpm)", "Full comprehension of the text"],
              ["**Skimming** headings, first sentences, key terms", "Much faster", "The gist; you miss details and nuance"],
              ["**Scanning** for one fact or name", "Fastest", "A single answer, little else"],
            ],
          },
          {
            t: "callout",
            kind: "tip",
            text: "Decide before you start: am I studying, reading or skimming? Choosing on purpose is the single easiest way to spend less time on reading without losing what matters.",
          },
        ],
      },
      {
        id: "factors",
        h2: "What makes reading faster or slower",
        blocks: [
          {
            t: "ul",
            items: [
              "**The text.** Familiar topics, common words and short sentences read fast; technical material, long sentences and new vocabulary slow everyone down.",
              "**Vocabulary and practice.** People who read a lot recognize more words instantly. Instant word recognition is what fluent, fast reading is built on.",
              "**Background knowledge.** The more you know about a topic, the less of the text is new to you, and the faster you move through it.",
              "**Attention.** A lot of “slow reading” is really rereading after your mind wandered.",
              "**Language and script.** Rates for English do not transfer to other languages; word length and writing systems differ.",
              "**Screen or paper.** The speed difference is usually small, but studies often find slightly better comprehension on paper for longer informational texts, especially under time pressure.",
            ],
          },
          {
            t: "figure",
            id: "what-changes-speed",
            alt: "Illustration of factors that change reading speed: text difficulty, vocabulary, attention",
            caption: "Most of what changes your reading speed is the text and your familiarity with it, not your eyes.",
            brief: "Иллюстрация 16:9: человек читает, вокруг иконки факторов — сложность текста, словарный запас, отвлечения (телефон), знакомая тема. Стиль сайта, светлый фон.",
          },
        ],
      },
      {
        id: "myths",
        h2: "Myths about reading speed",
        blocks: [
          {
            t: "mythFact",
            items: [
              {
                myth: "The average adult reads 300 words per minute or more.",
                fact: "The best current estimate for silent reading of non-fiction is about 238 words per minute.",
              },
              {
                myth: "With training, anyone can read 1,000 words per minute with full understanding.",
                fact: "Reading research finds a trade-off: far above normal rates, comprehension drops. Very high speeds are skimming.",
              },
              {
                myth: "Hearing the words in your head is a bad habit that slows you down.",
                fact: "Inner speech appears to support comprehension, especially of difficult text. Suppressing it tends to cost understanding.",
              },
            ],
          },
          {
            t: "p",
            text: "We go through speed-reading techniques one by one in [Does speed reading work?](/learn/speed-reading)",
          },
        ],
      },
      {
        id: "measure",
        h2: "How to measure your reading speed",
        blocks: [
          {
            t: "cta",
            href: "/tests/reading-speed-test",
            title: "The quick way: our reading speed test",
            text: "A 300-word text, a hidden timer and three questions, so speed only counts with understanding.",
            button: "Take the test",
          },
          { t: "h3", text: "Or do it by hand with any book" },
          {
            t: "steps",
            items: [
              { title: "Pick ordinary prose", text: "A page of a novel or a non-fiction book you haven't read yet. Avoid textbooks and poetry." },
              { title: "Count the words", text: "Count the words on three full lines, average them, and multiply by the number of lines on the page." },
              { title: "Read for one minute", text: "Set a timer and read at your normal pace, as if you wanted to remember it." },
              { title: "Do the maths", text: "Words read ÷ minutes = your words per minute." },
              { title: "Check yourself", text: "Summarize what you read in two sentences. A speed without comprehension isn't a reading speed." },
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is a good reading speed?",
        a: "Around 240 words per minute is average for silent reading of English non-fiction, and anywhere from about 175 to 300 is normal. Faster is only better if you still understand and remember what you read.",
      },
      {
        q: "How many pages can you read in an hour?",
        a: "At an average pace, roughly 50 to 60 pages of a typical paperback, depending on how dense the pages are and how demanding the text is.",
      },
      {
        q: "Is reading aloud slower than reading silently?",
        a: "Yes. Reading aloud averages around 180 words per minute, because speech sets the pace.",
      },
      {
        q: "Can you increase your reading speed?",
        a: "Reading more, building vocabulary and reading about familiar topics all make reading faster and easier. Techniques that promise to triple your speed mostly turn reading into skimming.",
      },
    ],
    sources: [BRYSBAERT_2019, RAYNER_2016, DELGADO_2018],
    related: [
      { href: "/tests/reading-speed-test", title: "Reading speed test", body: "Your words per minute, with a comprehension check." },
      { href: "/learn/speed-reading", title: "Does speed reading work?", body: "What eye movements tell us about reading faster." },
      { href: "/games/mirror-reading", title: "Mirror Reading", body: "Read flipped text, then answer questions about it." },
    ],
    published: "2026-11-11",
    updated: "2026-11-12",
  },

  // ───────────────────────────── speed reading ─────────────────────────────
  {
    slug: "speed-reading",
    name: "Does speed reading work?",
    blurb: "What speed reading is, what the research says, and what really helps.",
    title: "Speed Reading: Does It Work? What Research Says",
    description:
      "How speed reading is supposed to work, what eye-movement research says about each technique, and practical ways to read faster without losing comprehension.",
    h1: "Speed reading: how it works and whether it works",
    cluster: "how to speed read · what is speed reading · improve reading speed · speed reading tips",
    lead:
      "Speed-reading courses promise to multiply your reading rate. Reading research has a more modest answer: you can read somewhat faster with practice, and much faster only by understanding less. Here is why, technique by technique.",
    takeaways: [
      "Your eyes don't glide: they **jump and stop**, and you read during the stops, each about a quarter of a second.",
      "You see letters sharply only in a small window, about **14–15 letters** to the right of where you look. No drill widens it much.",
      "Far above normal speed, **comprehension drops**. That is the core finding of a major 2016 review.",
      "What works is unglamorous: read more, build vocabulary and background knowledge, skim on purpose, cut distractions.",
    ],
    sections: [
      {
        id: "how-reading-works",
        h2: "How reading actually works",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "≈ ¼ s", label: "a typical fixation, when the reading happens" },
              { value: "7–9", label: "letters covered by a typical jump in English" },
              { value: "14–15", label: "letters to the right you can see sharply" },
            ],
          },
          {
            t: "p",
            text: "Your eyes move along a line in quick jumps called **saccades** and pause in **fixations**. Almost nothing is taken in during a jump; the reading happens in the pauses. A skilled reader makes several fixations per second.",
          },
          {
            t: "figure",
            id: "saccades-fixations",
            alt: "Diagram of eye movements along a line of text: fixations as dots, saccades as arrows, one regression back",
            caption: "Fixations (dots) and saccades (arrows) on a line of text. Every so often the eyes jump back: a regression.",
            brief: "Схема 16:9: строка английского текста, над ней точки-фиксации разного размера и дуги-саккады между ними; одна дуга назад (регрессия) другим цветом. Подписи: fixation, saccade, regression.",
          },
          {
            t: "p",
            text: "During each fixation, only a small window is sharp: about 14 to 15 letters to the right of where you look and a few to the left. Beyond that, words are too blurry to identify. This limit of the eye is the main reason dramatic speed-reading claims run into trouble.",
          },
          {
            t: "callout",
            kind: "note",
            text: "About 10–15% of eye movements in reading go **backwards**. These regressions mostly happen when something didn't make sense. They are part of how understanding works, not a bad habit to train away.",
          },
        ],
      },
      {
        id: "techniques",
        h2: "Speed-reading techniques, checked against research",
        blocks: [
          {
            t: "p",
            text: "In 2016 a team of leading reading scientists reviewed speed-reading claims in detail. Here is how the popular techniques hold up.",
          },
          {
            t: "table",
            head: ["Technique", "The promise", "What research says"],
            rows: [
              ["**Finger or pointer pacing**", "Keeps your eyes moving forward", "Can help hold a steady pace and attention. No evidence it lets you read several times faster with full understanding."],
              ["**Reading whole lines at a glance**", "Use peripheral vision to take in more", "The sharp window is about 15 letters. Words further out can't be identified, so “seeing” them isn't reading them."],
              ["**Silencing your inner voice**", "Subvocalization slows you down", "Inner speech appears to support comprehension, especially for difficult text."],
              ["**One-word-at-a-time apps** (RSVP)", "No wasted eye movements", "They remove the ability to look back, and understanding of complex text drops."],
              ["**Skimming**", "Read only the key parts", "A legitimate strategy, as long as you know you are trading detail for speed."],
            ],
          },
          {
            t: "compare",
            good: {
              title: "Holds up",
              items: ["Skimming when you only need the gist", "Pacing to keep attention on the page", "Previewing headings before reading"],
            },
            bad: {
              title: "Doesn't hold up",
              items: ["Triple speed with the same understanding", "Training your eyes to “see” whole pages", "Switching off your inner voice"],
            },
          },
        ],
      },
      {
        id: "what-works",
        h2: "What does make reading faster",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Read more, and more widely", text: "Skilled readers are fast mainly because they recognize words instantly. That comes from seeing them many times." },
              { title: "Grow your vocabulary", text: "Every unfamiliar word is a small stop. Fewer stops, faster reading." },
              { title: "Build background knowledge", text: "Familiar topics are read faster and understood better, because less of the text is new to you." },
              { title: "Preview before you read", text: "Glance at headings, the first paragraph and any summary. Knowing where a text is going makes the rest easier to follow." },
              { title: "Skim on purpose", text: "For much everyday reading, skimming is exactly right. Just be honest that you are skimming." },
              { title: "Cut distractions", text: "Rereading after your attention drifted costs more time than any eye technique can save." },
            ],
          },
          {
            t: "callout",
            kind: "tip",
            text: "Measure before and after. Take the [reading speed test](/tests/reading-speed-test) today and again in a month of regular reading, and look at speed **and** comprehension together.",
          },
        ],
      },
      {
        id: "drills",
        h2: "Where drills like the Schulte table fit",
        blocks: [
          {
            t: "p",
            text: "Schulte tables and similar grid drills are a staple of speed-reading courses. They are a pleasant, measurable focus exercise, and you will get faster at them. The evidence does not show that they raise reading speed with full comprehension. Enjoy them for what they are: a short attention workout.",
          },
          {
            t: "cta",
            href: "/tests/schulte-table",
            title: "Try a Schulte table in your browser",
            text: "Find the numbers 1 to 25 in order, as fast as you can. Grids from 3×3 to 7×7.",
            button: "Play",
          },
        ],
      },
      {
        id: "myths",
        h2: "Myth or fact?",
        blocks: [
          {
            t: "mythFact",
            items: [
              {
                myth: "Speed readers understand just as much at 1,000 words per minute.",
                fact: "Comprehension falls as speed climbs far above normal. Very high rates are skimming.",
              },
              {
                myth: "Going back over a line is a bad habit.",
                fact: "Regressions are a normal part of reading and help you fix misunderstandings.",
              },
              {
                myth: "Speed-reading apps are the fastest way to read better.",
                fact: "Apps that flash single words remove look-backs; understanding of complex text suffers.",
              },
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is speed reading real?",
        a: "Reading a bit faster with practice is real. Reading several times faster than normal with the same understanding is not supported by research; at very high speeds people are skimming.",
      },
      {
        q: "Should I stop subvocalizing?",
        a: "Research suggests the inner voice supports comprehension, especially for difficult text. Trying to suppress it tends to cost understanding.",
      },
      {
        q: "Do speed-reading apps work?",
        a: "Apps that flash one word at a time can push your rate up, but they prevent looking back, and comprehension of complex text drops.",
      },
      {
        q: "What is a realistic goal for reading faster?",
        a: "Reading comfortably at the upper end of the normal range, around 250 to 300 words per minute for everyday prose, with full understanding. Regular reading and a bigger vocabulary get most people there over time.",
      },
    ],
    sources: [RAYNER_2016, RAYNER_1998, BRYSBAERT_2019],
    related: [
      { href: "/learn/average-reading-speed", title: "Average reading speed", body: "How many words per minute adults really read." },
      { href: "/tests/reading-speed-test", title: "Reading speed test", body: "Measure your speed and comprehension in two minutes." },
      { href: "/games/mirror-reading", title: "Mirror Reading", body: "Flipped text that makes reading effortful again." },
    ],
    published: "2026-11-11",
    updated: "2026-11-12",
  },

  // ───────────────────────────── brain games and memory ─────────────────────────────
  {
    slug: "do-brain-games-improve-memory",
    name: "Do brain games improve memory?",
    blurb: "What large studies found, and what has better evidence.",
    title: "Do Memory Games Improve Memory? What Studies Show",
    description:
      "Do brain games and memory games improve memory? What three large studies found, why gains rarely transfer, and which habits have better evidence.",
    h1: "Do memory games and brain games improve memory?",
    cluster: "memory games improve · brain games to improve memory · do memory games improve memory · games to improve memory and concentration",
    lead:
      "Short answer: you get better at the games you practise. Whether that makes your everyday memory better is far less certain, and the honest answer from research is “mostly not much.” Here is what the big studies found, and what works better.",
    takeaways: [
      "Practice **reliably improves the game you practise** and very similar tasks.",
      "Evidence that it improves **everyday memory** (names, appointments, conversations) is weak.",
      "Three landmark sources agree: an online study of 11,430 people, a 10-year trial of 2,832 older adults, and a major 2016 review.",
      "Sleep, self-testing, spaced review and exercise have **stronger evidence** for memory.",
      "Games are still worth it as a short daily focus habit, with honest expectations.",
    ],
    sections: [
      {
        id: "transfer",
        h2: "Near transfer vs. far transfer",
        blocks: [
          {
            t: "p",
            text: "Researchers separate two kinds of improvement. The difference between them is the whole story of brain training.",
          },
          {
            t: "compare",
            good: {
              title: "Near transfer: reliable",
              items: [
                "Higher scores on the game you practise",
                "Better results on very similar tasks",
                "Visible within days or weeks",
              ],
            },
            bad: {
              title: "Far transfer: thin evidence",
              items: [
                "Remembering names and appointments",
                "Following a long conversation",
                "General intelligence or everyday life",
              ],
            },
          },
          {
            t: "p",
            text: "So when an app shows your memory score climbing, that progress is real at that task. The open question is whether it spreads to anything else.",
          },
        ],
      },
      {
        id: "studies",
        h2: "What the large studies found",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "11,430", label: "adults trained online for 6 weeks (2010)" },
              { value: "2,832", label: "older adults followed for 10 years (ACTIVE)" },
              { value: "2016", label: "major review of brain-training evidence" },
            ],
          },
          {
            t: "table",
            head: ["Study", "What they did", "What they found"],
            rows: [
              [
                "**Owen et al., 2010** (Nature)",
                "11,430 adults trained online for six weeks on memory, reasoning and attention tasks",
                "Clear gains on the trained tasks; little or no improvement on untrained tests, even closely related ones",
              ],
              [
                "**ACTIVE trial**, 10-year follow-up (2014)",
                "2,832 adults aged 65+ received memory, reasoning or speed-of-processing training",
                "Reasoning and speed gains on the trained abilities lasted; the memory group's advantage on memory tests faded. All groups reported somewhat less difficulty with daily activities (self-reported)",
              ],
              [
                "**Simons et al., 2016** (review)",
                "Psychologists examined the studies cited by brain-training companies",
                "Extensive evidence for gains on trained tasks, less for related tasks, little that training improves everyday cognition",
              ],
            ],
          },
          {
            t: "callout",
            kind: "note",
            text: "In 2016 the US Federal Trade Commission also settled with a brain-training company over advertising claims it found unsupported. Bold promises about memory, school grades or preventing decline should make you skeptical.",
          },
        ],
      },
      {
        id: "why-play",
        h2: "So why play at all?",
        blocks: [
          {
            t: "p",
            text: "Because a short daily game can be a good habit for its own sake. Just pick it for the right reasons.",
          },
          {
            t: "ul",
            items: [
              "**Five minutes of real focus.** No notifications, one task, full attention.",
              "**Visible progress.** Getting better at something you practise feels good, and it is genuine progress at that skill.",
              "**A daily check-in.** Your scores move with sleep, stress and time of day, which tells you something about yourself.",
              "**Fun.** A puzzle you enjoy beats scrolling.",
            ],
          },
          {
            t: "callout",
            kind: "warning",
            title: "Our position",
            text: "Brainura is a training and entertainment app. We say the games train the tasks they are built on, and we don't claim they diagnose, treat or prevent anything. If you are worried about your memory, talk to a doctor.",
          },
          {
            t: "figure",
            id: "near-far-transfer",
            alt: "Illustration: a game score rising, with an arrow to everyday tasks marked with a question mark",
            caption: "Gains on the game are reliable; whether they reach daily life is the open question.",
            brief: "Иллюстрация 16:9: слева телефон с игрой и растущим графиком очков; стрелка вправо к бытовым сценам (ключи, календарь, разговор) со знаком вопроса. Стиль сайта, светлые тона.",
          },
        ],
      },
      {
        id: "better-evidence",
        h2: "What has better evidence for memory",
        blocks: [
          {
            t: "table",
            head: ["Habit", "Why it helps", "Easy way to start"],
            rows: [
              ["**Sleep**", "Memory consolidation happens largely during sleep; short sleep hurts attention and learning", "Keep a regular bedtime, especially before a day of learning"],
              ["**Testing yourself**", "Recalling information strengthens memory more than rereading it", "After reading, close the book and write down what you remember"],
              ["**Spacing reviews**", "Reviewing over several days beats cramming into one session", "Review new material after a day, a few days and a week"],
              ["**Physical activity**", "Aerobic exercise is linked with better memory and a larger hippocampus in older adults", "A brisk walk most days of the week"],
            ],
          },
          {
            t: "p",
            text: "Staying socially active and learning genuinely new skills, like a language or an instrument, are also linked with better cognitive health over the years.",
          },
        ],
      },
      {
        id: "routine",
        h2: "A balanced five-minute routine",
        blocks: [
          {
            t: "p",
            text: "If you enjoy brain games, combine them with what has evidence behind it. Here is a simple daily routine.",
          },
          {
            t: "steps",
            items: [
              { title: "Warm up with one game (2 min)", text: "Pick something you enjoy: a [memory test](/tests/memory-test), a matching game or a Schulte table." },
              { title: "Recall something real (2 min)", text: "Without notes, write down three things you learned yesterday. That is retrieval practice." },
              { title: "Plan one review (1 min)", text: "Note what to revisit in a few days: spacing does the rest." },
            ],
          },
          {
            t: "cta",
            href: "/tests/memory-test",
            title: "How long is your memory span?",
            text: "Repeat digits forwards, backwards or a grid sequence. Two minutes, no sign-up.",
            button: "Take the memory test",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do memory games improve memory?",
        a: "They reliably improve your performance on the games themselves and on very similar tasks. Evidence that they improve memory in everyday life is weak.",
      },
      {
        q: "Are brain games a waste of time?",
        a: "Not if you enjoy them and keep expectations realistic. They are a pleasant way to focus for a few minutes. They are not a proven way to boost general intelligence or prevent decline.",
      },
      {
        q: "What is the best way to improve memory?",
        a: "Good sleep, testing yourself instead of rereading, spacing out reviews, and staying physically and socially active have stronger support than games alone.",
      },
      {
        q: "How long should I play brain games each day?",
        a: "A few minutes is plenty. Short, regular sessions are easier to keep up, and long sessions mostly add fatigue rather than benefit.",
      },
    ],
    sources: [
      {
        text: "Owen, A. M., et al. (2010). Putting brain training to the test. Nature, 465(7299), 775–778.",
        url: "https://doi.org/10.1038/nature09042",
      },
      {
        text: "Rebok, G. W., et al. (2014). Ten-year effects of the Advanced Cognitive Training for Independent and Vital Elderly cognitive training trial on cognition and everyday functioning in older adults. Journal of the American Geriatrics Society, 62(1), 16–24.",
        url: "https://doi.org/10.1111/jgs.12607",
      },
      {
        text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
        url: "https://doi.org/10.1177/1529100616661983",
      },
      {
        text: "Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255.",
        url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      },
      {
        text: "Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380.",
        url: "https://doi.org/10.1037/0033-2909.132.3.354",
      },
      {
        text: "Diekelmann, S., & Born, J. (2010). The memory function of sleep. Nature Reviews Neuroscience, 11(2), 114–126.",
        url: "https://doi.org/10.1038/nrn2762",
      },
      {
        text: "Erickson, K. I., et al. (2011). Exercise training increases size of hippocampus and improves memory. Proceedings of the National Academy of Sciences, 108(7), 3017–3022.",
        url: "https://doi.org/10.1073/pnas.1015950108",
      },
    ],
    related: [
      { href: "/tests/memory-test", title: "Memory test", body: "Find your digit and visual memory span." },
      { href: "/games/card-match", title: "Card Match", body: "The classic pairs game, up to 32 pairs." },
      { href: "/games", title: "All 26 brain games", body: "Memory, attention, speed, logic, words and emotions." },
    ],
    published: "2026-11-11",
    updated: "2026-11-12",
  },
];

export function articleBySlug(slug: string) {
  return ARTICLES_ALL.find((a) => a.slug === slug);
}
