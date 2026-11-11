// Английские страницы тестов /tests/* — данными, блоками (src/components/seo/blocks.tsx).
// Вёрстка общая с языковыми версиями: TestView (src/components/seo/views.tsx).
// Ядра — docs/growth/seo/pages/tests/<slug>.md в репо приложения.
// Правила: без медицинских обещаний, источник у научных утверждений, разнообразная подача.

import type { TestPageContent } from "./l10n";

const U = "2026-11-12";

const SIMONS_2016 = {
  text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
  url: "https://doi.org/10.1177/1529100616661983",
};
const RAYNER_2016 = {
  text: "Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest, 17(1), 4–34.",
  url: "https://doi.org/10.1177/1529100615623267",
};

export const TESTS_EN: TestPageContent[] = [
  // ───────────────────────────── Memory test ─────────────────────────────
  {
    key: "memory-test",
    slug: "memory-test",
    name: "Memory Test",
    blurb: "Repeat digits forwards, backwards or a grid sequence. Find your memory span.",
    title: "Memory Test Online: Check Your Short-Term and Working Memory",
    description:
      "Free online memory test: remember digits forwards, backwards or as a grid sequence and find your memory span. Two minutes, no sign-up, best score saved.",
    h1: "Memory Test Online",
    lead:
      "How many digits can you hold in your head? Watch a sequence, repeat it, and the next one gets longer. Choose numbers in order, numbers backwards for a working memory test, or a sequence of cells on a grid.",
    sections: [
      {
        id: "what-it-measures",
        h2: "What this memory test measures",
        blocks: [
          {
            t: "p",
            text: "The test measures your **memory span**: the longest sequence you can repeat correctly right after seeing it. Span tasks are among the oldest tools in psychology; the digit span is part of many standard cognitive assessments, and the grid version follows the idea of the Corsi block-tapping task.",
          },
          {
            t: "table",
            head: ["Mode", "What it tests", "Typical adult span"],
            rows: [
              ["**Numbers**", "Short-term memory: hold the digits and repeat them", "about 6–8 digits"],
              ["**Numbers backwards**", "Working memory: hold the digits and rearrange them", "about 4–6 digits"],
              ["**Grid sequence**", "Visual memory for positions and their order", "about 5–7 positions"],
            ],
          },
        ],
      },
      {
        id: "how-it-works",
        h2: "How the test works",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Pick a mode", text: "Numbers, numbers backwards or grid sequence, then press Start." },
              { title: "Watch", text: "Digits appear one at a time; on the grid, cells light up one after another." },
              { title: "Repeat", text: "Type the digits (in reverse order for the backwards mode) or tap the cells in the same order." },
              { title: "Go longer", text: "Each correct answer adds one item. Miss, and you get a second try at the same length." },
              { title: "Get your span", text: "Two misses in a row end the test. Your score is the longest sequence you repeated correctly." },
            ],
          },
        ],
      },
      {
        id: "score",
        h2: "What your score means",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "7 ± 2", label: "Miller's classic estimate of digits in order" },
              { value: "3–5", label: "chunks held at once, by later research" },
              { value: "5–6", label: "blocks on the Corsi task in healthy adults" },
            ],
          },
          {
            t: "p",
            text: "For decades the reference point was George Miller's “seven, plus or minus two”, and most adults do repeat about 6 to 8 digits in order. Later research suggests the true limit is closer to **3 to 5 chunks**, and that we reach seven by rehearsing digits and grouping them, for example hearing 4-7-1-9 as “forty-seven, nineteen”.",
          },
          {
            t: "p",
            text: "Backwards spans are usually one to three items shorter, because reordering takes some of your capacity. Visual sequence spans sit a little below digit spans.",
          },
          {
            t: "callout",
            kind: "note",
            text: "Online results vary more than lab results: distractions, screen size and typing all play a part. Your score is most useful for spotting your own patterns, such as better runs in the morning or after a good night's sleep.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Tips for remembering longer sequences",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Chunk the digits", text: "Group them into pairs or triples as they appear. Six digits become three two-digit numbers." },
              { title: "Say them in your head", text: "Repeating the sequence silently in a rhythm keeps it fresh until you answer." },
              { title: "Trace a shape on the grid", text: "Instead of single cells, see the path they make: a line, a zigzag, a corner." },
              { title: "For backwards, build as you go", text: "Put each new digit in front of the ones you have, so the reversed order is ready at the end." },
            ],
          },
        ],
      },
      {
        id: "train",
        h2: "Can you train your memory span?",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "≈ 7 → 80", label: "digits: one student's span after 200+ hours of practice" },
              { value: "≈ 6", label: "letters: his span for letters stayed where it was" },
            ],
          },
          {
            t: "p",
            text: "In a well-known study, the student turned groups of digits into running times he already knew. His digit span soared; his letter span didn't move. That pattern shows up again and again in brain-training research: gains are real but mostly **specific to what you trained**.",
          },
          {
            t: "mythFact",
            items: [
              {
                myth: "There is a test for photographic memory.",
                fact: "There is little evidence that adults have truly photographic memory. People with exceptional memory almost always rely on practiced strategies.",
              },
            ],
          },
          {
            t: "p",
            text: "For another angle on attention, try the [Schulte table](/tests/schulte-table), or test how well you ignore distractions with the [Stroop test](/tests/stroop-test). Curious whether games help at all? Read [whether brain games improve memory](/learn/do-brain-games-improve-memory).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is a good score on a memory test like this?",
        a: "Most adults repeat about 6 to 8 digits in order and about 4 to 6 backwards. On the grid sequence, about 5 to 7 positions is typical. Your score moves with sleep, stress and attention, so take it a few times and look at your usual result rather than a single run.",
      },
      {
        q: "What is the difference between short-term memory and working memory?",
        a: "Short-term memory holds information for a few seconds, like a phone number you just heard. Working memory also lets you do something with it: reorder it, combine it or calculate with it. Repeating digits in order leans on short-term memory; repeating them backwards needs working memory.",
      },
      {
        q: "Is there a test for photographic memory?",
        a: "Not really, because there is little evidence that adults have truly photographic memory. Vivid, picture-like recall (eidetic imagery) has been reported in a small number of children and is rare to absent in adults. People with exceptional memory almost always rely on practiced strategies, not a mental camera.",
      },
      {
        q: "Can I improve my memory span?",
        a: "With practice and a strategy, yes, but mostly for the material you practiced. In a famous study, a student trained for over 200 hours and raised his digit span from about 7 to about 80 by grouping digits into running times he knew, yet his memory for letters stayed at the usual 6 or so.",
      },
      {
        q: "Can this test tell me if I have a memory problem?",
        a: "No. It is a quick exercise for curiosity and practice, not a medical test, and a low score on one day means very little. If you or someone close to you is worried about memory changes, talk to a doctor, who can use validated assessments.",
      },
      {
        q: "Why do I do better with numbers than with the grid?",
        a: "Digits are easy to say to yourself, so you can rehearse them in your head. Positions on a grid are harder to put into words and rely more on visual and spatial memory. Many people are noticeably better at one than the other.",
      },
    ],
    sources: [
      {
        text: "Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review, 63(2), 81–97.",
        url: "https://doi.org/10.1037/h0043158",
      },
      {
        text: "Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences, 24(1), 87–114.",
        url: "https://doi.org/10.1017/S0140525X01003922",
      },
      {
        text: "Kessels, R. P. C., van Zandvoort, M. J. E., Postma, A., Kappelle, L. J., & de Haan, E. H. F. (2000). The Corsi Block-Tapping Task: Standardization and normative data. Applied Neuropsychology, 7(4), 252–258.",
        url: "https://doi.org/10.1207/S15324826AN0704_8",
      },
      {
        text: "Ericsson, K. A., Chase, W. G., & Faloon, S. (1980). Acquisition of a memory skill. Science, 208(4448), 1181–1182.",
        url: "https://doi.org/10.1126/science.7375930",
      },
      SIMONS_2016,
    ],
    download: {
      title: "Train your memory a few minutes a day",
      body: "Brainura has memory games like Card Match and Mind Matrix that grow with you, level by level, alongside 24 more short games for attention, speed and logic. No ads.",
    },
    updated: U,
  },

  // ───────────────────────────── Reading speed test ─────────────────────────────
  {
    key: "reading-speed-test",
    slug: "reading-speed-test",
    name: "Reading Speed Test",
    blurb: "Read a short text, answer three questions, get your words per minute.",
    title: "Reading Speed Test: Check Your Words per Minute (Free)",
    description:
      "Free reading speed test: read a short text, answer three questions and get your words per minute with a comprehension check. Compare with the adult average.",
    h1: "Reading Speed Test",
    lead:
      "Check your reading speed in about two minutes. Pick a text, read it at your normal pace, then answer three short questions. You get your words per minute, how much you understood, and how you compare with the average adult reader.",
    sections: [
      {
        id: "how-it-works",
        h2: "How the reading speed test works",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Choose a text", text: "Three short non-fiction texts, each about 300 words long." },
              { title: "Start reading", text: "The text appears and a hidden timer starts." },
              { title: "Read normally", text: "Your usual pace, as if you wanted to tell someone about it afterwards." },
              { title: "Done", text: "The text disappears and three questions appear." },
              { title: "Answer", text: "Without looking back. You get words per minute and a comprehension score." },
            ],
          },
          {
            t: "callout",
            kind: "note",
            text: "The questions are not a trick: they check the main points. Miss two or more, or read faster than 700 words per minute, and the result says so, and your best score is not updated.",
          },
        ],
      },
      {
        id: "average",
        h2: "Average reading speed: what to compare with",
        blocks: [
          {
            t: "bars",
            title: "Average adult reading rate in English",
            unit: "wpm",
            items: [
              { label: "Reading aloud", value: 183 },
              { label: "Silent reading, non-fiction", value: 238, highlight: true },
              { label: "Silent reading, fiction", value: 260 },
            ],
            note: "Source: Brysbaert (2019), a review of nearly two hundred studies.",
          },
          {
            t: "p",
            text: "Most people fall roughly between **175 and 300** words per minute. Older popular figures of 300 or more were higher than the research supports. Your result depends on the text as much as on you, which is why all three test texts are plain non-fiction of similar difficulty. More in our article on [average reading speed for adults](/learn/average-reading-speed).",
          },
        ],
      },
      {
        id: "comprehension",
        h2: "Speed and comprehension go together",
        blocks: [
          {
            t: "p",
            text: "Reading is not just moving your eyes. You recognize each word, fit it into the sentence and connect it to what came before. Push past your comfortable pace and the eyes keep moving while understanding falls behind. A large review concluded there is a **trade-off**: reading much faster almost always means understanding less.",
          },
          {
            t: "table",
            head: ["Result", "What it says"],
            rows: [
              ["250 wpm, 3 of 3 right", "A solid, normal reading speed"],
              ["600 wpm, 1 of 3 right", "Skimming, not reading"],
              ["150 wpm, 3 of 3 right", "Careful reading: fine, and speed comes with practice"],
            ],
          },
        ],
      },
      {
        id: "faster",
        h2: "How to read faster without losing the meaning",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Read more", text: "The biggest long-term lever. Fast readers recognize most words instantly because they've seen them many times." },
              { title: "Build background knowledge", text: "The more you know about a topic, the less of the text is new, and the faster you read." },
              { title: "Match speed to the goal", text: "Skim to find a fact; slow down for what you need to learn. Both are legitimate." },
              { title: "Remove distractions", text: "Rereading a line after your attention drifted costs more than any eye technique can save." },
            ],
          },
          {
            t: "mythFact",
            items: [
              {
                myth: "Silencing your inner voice will make you read much faster.",
                fact: "Eye-movement research gives little support to this trick; inner speech seems to help comprehension.",
              },
            ],
          },
          {
            t: "p",
            text: "We look at speed-reading tricks in more detail in [does speed reading work?](/learn/speed-reading) For a reading challenge, [Mirror Reading](/games/mirror-reading) makes you read flipped text and then checks your understanding.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is a good reading speed?",
        a: "The average adult reads English non-fiction silently at about 238 words per minute, and most people fall somewhere between about 175 and 300. A good reading speed is one where you still understand and remember what you read; going faster than that is skimming.",
      },
      {
        q: "How is words per minute calculated?",
        a: "The number of words in the text divided by your reading time in minutes. A 400-word text read in 1 minute 40 seconds gives 400 ÷ 1.67, or about 240 words per minute.",
      },
      {
        q: "Why does the test ask questions?",
        a: "Because speed alone is easy to fake by skimming. Three quick questions check that you actually took in the text. Your best speed is only saved when you get at least two of them right at a realistic reading pace.",
      },
      {
        q: "Is 1,000 words per minute possible?",
        a: "Not with full understanding of ordinary text. Reading research finds that beyond a certain pace, comprehension drops: what looks like very fast reading is skimming. Skimming is useful, but it is a different skill.",
      },
      {
        q: "Is reading on a screen slower than on paper?",
        a: "The difference in speed is usually small. Studies more often find a small comprehension advantage for paper, especially for longer informational texts and when people are short on time.",
      },
      {
        q: "How can I read faster?",
        a: "Read more, especially in areas that interest you. A bigger vocabulary and more familiarity with a topic are what make reading feel fast and easy. Cutting distractions helps too. Techniques promising to triple your speed mostly trade understanding for speed.",
      },
    ],
    sources: [
      {
        text: "Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language, 109, 104047.",
        url: "https://doi.org/10.1016/j.jml.2019.104047",
      },
      RAYNER_2016,
      {
        text: "Delgado, P., Vargas, C., Ackerman, R., & Salmerón, L. (2018). Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension. Educational Research Review, 25, 23–38.",
        url: "https://doi.org/10.1016/j.edurev.2018.09.003",
      },
    ],
    download: {
      title: "Reading games that keep you sharp",
      body: "Brainura has four reading games, from Masked Text to Mirror Reading, with questions that check you understood, plus 22 more short games for memory, attention and logic. No ads.",
    },
    updated: U,
  },

  // ───────────────────────────── Reaction time test ─────────────────────────────
  {
    key: "reaction-time-test",
    slug: "reaction-time-test",
    name: "Reaction Time Test",
    blurb: "Click when the screen turns green. Five tries, average in milliseconds.",
    title: "Reaction Time Test: Check Your Reaction Speed Online",
    description:
      "Free reaction time test: click when the screen turns green and get your average in milliseconds. Plus what a normal reaction time is and what affects it.",
    h1: "Reaction Time Test",
    lead:
      "Wait for the box to turn green, then click (or tap, or press Space) as fast as you can. You get five attempts and your average in milliseconds. Free, no sign-up.",
    sections: [
      {
        id: "how-it-works",
        h2: "How the reaction time test works",
        blocks: [
          {
            t: "p",
            text: "This is a **simple reaction time** test: one signal, one response.",
          },
          {
            t: "steps",
            items: [
              { title: "Start", text: "Click the box. It turns red." },
              { title: "Wait", text: "A random 1.5 to 4.5 seconds, so you can't time it in advance." },
              { title: "Click on green", text: "The timer starts the moment the box turns green and stops when your click, tap or key press arrives." },
              { title: "Five times", text: "You see each time, your fastest and slowest, and the average." },
            ],
          },
          {
            t: "callout",
            kind: "tip",
            text: "Track the **average**, not single clicks. One lucky click says little; five in a row smooth out the noise. Your best average is saved in this browser.",
          },
        ],
      },
      {
        id: "normal",
        h2: "What is a normal reaction time?",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "≈ 190 ms", label: "to a light, in the lab" },
              { value: "≈ 160 ms", label: "to a sound, in the lab" },
              { value: "250–350 ms", label: "typical on browser tests" },
            ],
          },
          {
            t: "p",
            text: "Reaction time has been measured for more than 150 years. Reviews of laboratory work put college-age adults at roughly 190 ms to a light and 160 ms to a sound, with equipment built to add almost no delay.",
          },
          {
            t: "p",
            text: "A web test always reads higher. A 60 Hz monitor draws a new frame only every 16.7 ms, the browser needs time to paint the green box, and mice, keyboards and especially touchscreens add their own lag. The same person can score 30–60 ms apart on two devices.",
          },
          {
            t: "table",
            head: ["Average on this test", "What it usually means"],
            rows: [
              ["Under 200 ms", "Very fast, or a fast setup (wired mouse, high refresh-rate screen)"],
              ["200–250 ms", "Quick"],
              ["250–350 ms", "Common range for browser tests"],
              ["Over 350 ms", "Slower than typical: often a phone, fatigue or distraction"],
            ],
            note: "A rough guide, not norms. No substitute for a medical assessment: a single score says nothing about your health.",
          },
        ],
      },
      {
        id: "factors",
        h2: "What affects your reaction time",
        blocks: [
          {
            t: "table",
            head: ["Factor", "Effect"],
            rows: [
              ["**Sleep**", "Lack of sleep reliably slows responses, makes them more variable and adds lapses."],
              ["**Age**", "A survey of thousands of UK adults found reaction time slows gradually across adulthood, with bigger differences between people as they age."],
              ["**Attention**", "Mind wandering, a buzzing phone or a long session all add milliseconds."],
              ["**Warm-up**", "The first attempts of a session are usually the slowest."],
              ["**Device**", "Refresh rate, input lag and browser load all count."],
            ],
          },
        ],
      },
      {
        id: "choice",
        h2: "Simple vs. choice reaction time",
        blocks: [
          {
            t: "table",
            head: ["Task", "What the brain must do", "Example"],
            rows: [
              ["**Simple**", "Detect one signal and fire one response", "This test"],
              ["**Choice**", "Pick one of several responses: decision time grows with the number of options (Hick's law, 1952)", "Pressing a different key for each color"],
              ["**Interference**", "Also hold back an automatic wrong answer", "The [Stroop test](/tests/stroop-test)"],
            ],
          },
        ],
      },
      {
        id: "fair-score",
        h2: "How to get a fair score",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Get ready", text: "Rest your finger on the mouse button, trackpad or Space bar." },
              { title: "Clear the decks", text: "Close heavy tabs and turn off power-saving mode on laptops." },
              { title: "Warm up", text: "Do one run, then record the next two or three averages." },
              { title: "Compare fairly", text: "Only with your own earlier runs on the same device." },
            ],
          },
        ],
      },
      {
        id: "train",
        h2: "Can you train your reaction time?",
        blocks: [
          {
            t: "mythFact",
            items: [
              {
                myth: "Practising a reaction game makes you faster at everything.",
                fact: "You get faster at the task you practise. Evidence that the gain carries over to unrelated everyday skills is much weaker.",
              },
            ],
          },
          {
            t: "p",
            text: "Sleep, regular activity and fewer distractions are the dependable basics. If you enjoy the challenge, Brainura's **Reflex** game sits next to 25 other short games for memory, attention, speed and logic, with difficulty that adapts as you improve.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is a good reaction time?",
        a: "On a browser test like this one, an average under about 250 ms is quick, and many people land between 250 and 350 ms. Your device adds its own delay, so the number is most useful for comparing your own runs on the same screen and mouse.",
      },
      {
        q: "What is the average human reaction time?",
        a: "Laboratory studies with dedicated equipment usually put simple visual reaction time of young adults at around 190–250 ms, and reactions to a sound are typically somewhat faster than reactions to light. Browser tests read higher because of screen and input lag.",
      },
      {
        q: "Why is my reaction time slower on my phone?",
        a: "Touchscreens and phone displays add latency between the moment the screen changes and the moment your touch is registered. A wired mouse on a desktop with a high refresh-rate monitor usually gives the lowest numbers.",
      },
      {
        q: "Does reaction time get slower with age?",
        a: "On average, yes. Large population studies find that simple reaction time slows gradually through adulthood and more noticeably in later life, with wide differences between individuals.",
      },
      {
        q: "Can I improve my reaction time?",
        a: "Your score on a specific test usually improves with practice, sleep and a short warm-up. Whether practising one task makes you faster at unrelated everyday tasks is much less certain, so treat it as a fun skill to sharpen rather than a cure-all.",
      },
      {
        q: "What happens if I click too early?",
        a: "The attempt doesn't count and you get the same round again. The delay before green is random (1.5 to 4.5 seconds), so guessing the moment doesn't help.",
      },
      {
        q: "Why do sprinters get a false start below 0.1 seconds?",
        a: "Athletics rules treat a reaction to the starting gun of less than 0.100 s as a false start, on the reasoning that a genuine response to the sound can't be that fast; the athlete must have anticipated it.",
      },
    ],
    sources: [
      { text: "Kosinski, R. J. (2013). A Literature Review on Reaction Time. Clemson University." },
      {
        text: "Der, G., & Deary, I. J. (2006). Age and sex differences in reaction time in adulthood: results from the United Kingdom Health and Lifestyle Survey. Psychology and Aging, 21(1), 62–73.",
        url: "https://doi.org/10.1037/0882-7974.21.1.62",
      },
      {
        text: "Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11–26.",
        url: "https://doi.org/10.1080/17470215208416600",
      },
      {
        text: "Lim, J., & Dinges, D. F. (2008). Sleep deprivation and vigilant attention. Annals of the New York Academy of Sciences, 1129, 305–322.",
        url: "https://doi.org/10.1196/annals.1417.002",
      },
      SIMONS_2016,
    ],
    download: {
      title: "Train your reactions every day",
      body: "Brainura has a reaction game, Reflex, plus 25 more short brain games for memory, attention and logic. Five minutes a day, no ads.",
    },
    updated: U,
  },

  // ───────────────────────────── Schulte table ─────────────────────────────
  {
    key: "schulte-table",
    slug: "schulte-table",
    name: "Schulte Table",
    blurb: "Find the numbers 1 to 25 in order. A classic attention and visual search drill.",
    title: "Schulte Table Online: Free Attention and Focus Drill",
    description:
      "Play a Schulte table online: find the numbers 1 to 25 in order as fast as you can. Grids from 3×3 to 7×7, your best time saved, and how to practice.",
    h1: "Schulte Table Online",
    lead:
      "Find the numbers from 1 to 25 in order as fast as you can. Pick a grid size, press Start, and click each number in turn. Mistakes are counted but do not stop the clock.",
    sections: [
      {
        id: "what-is",
        h2: "What is a Schulte table?",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "5×5", label: "the classic grid, numbers 1 to 25" },
              { value: "3×3 – 7×7", label: "grid sizes on this page" },
              { value: "≈ 5 min", label: "a day is plenty" },
            ],
          },
          {
            t: "p",
            text: "A Schulte table is a grid of randomly placed numbers that you find in ascending order. It takes its name from the German psychiatrist Walter Schulte and was first used to observe attention: how quickly someone settles into a task, how steady their pace is, and when fatigue sets in.",
          },
          {
            t: "p",
            text: "Today it is better known as a drill. Speed-reading courses, especially in Eastern Europe, use it to practise a wider field of view, and many people like it as a quick, measurable focus warm-up.",
          },
        ],
      },
      {
        id: "how-to-play",
        h2: "How to play",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Choose a grid", text: "Start with 3×3 or 4×4 if you're new; 5×5 is the classic." },
              { title: "Press Start", text: "The numbers appear and the timer runs." },
              { title: "Click in order", text: "1, then 2, then 3, up to the last number. Found numbers fade out." },
              { title: "See your time", text: "The clock stops on the last number and shows your time and errors." },
            ],
          },
          {
            t: "callout",
            kind: "tip",
            title: "Eyes on the center",
            text: "On even grids a small red dot marks the center; on odd grids it's the middle cell. Keep your eyes there and spot the next number without looking straight at it.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Tips to get faster",
        blocks: [
          {
            t: "ul",
            items: [
              "**Relax your gaze.** Darting from cell to cell is slow; a soft focus on the center lets you notice numbers in the corners of your vision.",
              "**Sweep the grid once.** Before you hunt for 1, let your eyes run over the table. You'll often remember where the next few numbers are.",
              "**Keep a steady rhythm.** Rushing produces errors and searches for numbers you've already clicked.",
              "**Go bigger only when it feels easy.** When 5×5 is routine, move to 6×6 or 7×7.",
              "**Stop while you're still improving.** Three to five tables are enough; rising times are your signal to finish.",
            ],
          },
        ],
      },
      {
        id: "variants",
        h2: "Variants of the Schulte table",
        blocks: [
          {
            t: "table",
            head: ["Variant", "How it works", "What it adds"],
            rows: [
              ["**Letters**", "The alphabet instead of digits", "A new sequence to search"],
              ["**Backwards**", "From 25 down to 1", "Breaks the counting habit"],
              ["**Red and black** (Gorbov–Schulte)", "Two series in two colors, alternate between them", "Switching attention between two tasks"],
            ],
          },
        ],
      },
      {
        id: "evidence",
        h2: "What Schulte tables can and can't do",
        blocks: [
          {
            t: "compare",
            good: {
              title: "Can",
              items: ["Make you reliably faster at finding numbers in a grid", "Give a short, honest focus exercise", "Show how sleep and stress affect your attention"],
            },
            bad: {
              title: "Can't (on current evidence)",
              items: ["Make you read much faster with full comprehension", "Improve attention in everyday life beyond the drill"],
            },
          },
          {
            t: "p",
            text: "For a different kind of attention challenge, try the [Stroop test](/tests/stroop-test), where the difficulty is ignoring what you read, or check your raw speed with the [reaction time test](/tests/reaction-time-test).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is a Schulte table?",
        a: "A square grid filled with the numbers 1 to 25 (in the classic 5×5 version) in random order. You find and point to them in ascending order as fast as you can. It is used to practice attention, visual search and peripheral vision.",
      },
      {
        q: "What is a good time on a 5×5 Schulte table?",
        a: "There is no universal norm for online versions: times depend on the device, the grid size and how you click. Times usually drop quickly over the first few sessions as you learn the drill, so track your own best time rather than comparing with others.",
      },
      {
        q: "How long should I practice Schulte tables each day?",
        a: "A few tables a day, about 5 minutes, is plenty. Short regular sessions beat a single long one, and your times stop improving once you get tired.",
      },
      {
        q: "Do Schulte tables improve reading speed?",
        a: "Speed-reading courses use them to practice taking in more with each glance. Reading research is skeptical that this alone makes you read faster with full comprehension, so treat the table as an attention drill, not a reading shortcut.",
      },
      {
        q: "Should I move my eyes or look at the center?",
        a: "The classic advice is to keep your gaze near the center and find numbers with peripheral vision. Start by letting your eyes move freely, then try holding them at the center as you get faster.",
      },
      {
        q: "What is the red and black Schulte table?",
        a: "A harder variant, often called the Gorbov–Schulte table, mixes black and red numbers. You alternate between counting the black numbers up and the red numbers down, which trains switching attention between two tasks.",
      },
    ],
    sources: [RAYNER_2016, SIMONS_2016],
    download: {
      title: "Schulte tables every day, in your pocket",
      body: "Brainura's Schulte Tables game grows with you, level by level, alongside 25 more short games for memory, attention and logic. No ads.",
    },
    updated: U,
  },

  // ───────────────────────────── Stroop test ─────────────────────────────
  {
    key: "stroop-test",
    slug: "stroop-test",
    name: "Stroop Test",
    blurb: "Name the ink color, not the word. Measure your own Stroop effect.",
    title: "Stroop Test Online: Measure Your Stroop Effect",
    description:
      "Take a free online Stroop test: name the ink color, not the word. See your Stroop effect in milliseconds and learn why reading gets in the way.",
    h1: "Stroop Test",
    lead:
      "A color word appears in colored ink. Your job: click the color of the **ink**, not the word you read. It sounds easy until the word and the color disagree.",
    sections: [
      {
        id: "how-it-works",
        h2: "How this Stroop test works",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "24", label: "words, one at a time" },
              { value: "4", label: "colors: red, green, blue, yellow" },
              { value: "½", label: "of the words match their ink" },
            ],
          },
          {
            t: "p",
            text: "In half of the words the word and the ink match (**congruent**); in the other half they don't (**incongruent**). Click the button for the ink color, or press R, G, B or Y on a keyboard.",
          },
          {
            t: "table",
            caption: "Your result",
            head: ["Number", "What it is"],
            rows: [
              ["Matching", "Average time on congruent words"],
              ["Mismatched", "Average time on incongruent words"],
              ["**Stroop effect**", "Mismatched minus matching: the cost of interference"],
              ["Accuracy", "Share of correct answers; only correct answers count for the times"],
            ],
          },
        ],
      },
      {
        id: "explained",
        h2: "Why is it so hard? The Stroop effect explained",
        blocks: [
          {
            t: "p",
            text: "For a fluent reader, reading is automatic: you cannot look at a familiar word and not read it. Naming a color takes a deliberate step. When the two point to different answers, the word you've already read competes with the color you're supposed to say, and resolving that conflict costs time.",
          },
          {
            t: "table",
            head: ["Explanation", "The idea"],
            rows: [
              ["**Speed of processing**", "Words are processed faster than colors, so they arrive first"],
              ["**Automaticity**", "Reading needs less attention than color naming, so it happens whether you want it or not"],
              ["**Modern models**", "Combine the two: the stronger, more practised pathway interferes unless attention holds it back"],
            ],
          },
        ],
      },
      {
        id: "1935",
        h2: "The original 1935 experiment",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "100", label: "items per card in Stroop's experiment" },
              { value: "≈ 74%", label: "longer to name the ink of conflicting words than plain color patches" },
              { value: "≈ 400", label: "studies of the effect reviewed by 1991" },
            ],
          },
          {
            t: "p",
            text: "John Ridley Stroop compared naming the ink colors of conflicting color words with naming the colors of plain colored squares. Reading the words aloud, by contrast, was barely affected by the ink color. That **asymmetry** is the heart of the effect: the automatic process disrupts the controlled one, not the other way around.",
          },
        ],
      },
      {
        id: "uses",
        h2: "What the Stroop test is used for",
        blocks: [
          {
            t: "p",
            text: "Because it isolates the ability to suppress a strong habit, the Stroop task became a standard measure of **inhibitory control**, one of the core executive functions alongside working memory and mental flexibility. Researchers use versions of it to study:",
          },
          { t: "ul", items: ["attention", "aging", "fatigue", "bilingualism"] },
          {
            t: "callout",
            kind: "warning",
            text: "Clinicians include standardized versions in broader cognitive assessments. A single online run is not an assessment of anything, but it is a vivid way to feel your own attention at work.",
          },
        ],
      },
      {
        id: "variations",
        h2: "Variations on the Stroop task",
        blocks: [
          {
            t: "table",
            head: ["Variant", "The task"],
            rows: [
              ["**Emotional Stroop**", "Name the ink color of emotionally loaded words; delays can reveal what grabs attention"],
              ["**Numerical Stroop**", "Judge which of two digits is physically larger when the larger number is printed smaller"],
              ["**Spatial Stroop**", "Respond to an arrow's direction, or a word like LEFT shown on the wrong side of the screen"],
              ["**Reverse Stroop**", "Read the word and ignore the color: much easier, which is exactly the original asymmetry"],
            ],
          },
        ],
      },
      {
        id: "improve",
        h2: "How to improve your score",
        blocks: [
          {
            t: "p",
            text: "With practice, the gap between matching and mismatched words usually shrinks. Two approaches people find useful:",
          },
          {
            t: "ul",
            items: [
              "**Soften your focus** so you see a patch of color rather than a word.",
              "**Name the color first**, in your head, before the word “lands”.",
            ],
          },
          {
            t: "callout",
            kind: "tip",
            text: "Speed and accuracy trade off, so watch both numbers: a small effect with many errors is not a better result.",
          },
          {
            t: "p",
            text: "Try the [Schulte table](/tests/schulte-table) for visual search or the [reaction time test](/tests/reaction-time-test) for pure speed. In the Brainura app the Stroop Test is one of 26 short games, with levels that adapt as you improve.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What is the Stroop effect?",
        a: "The delay you experience when the meaning of a word conflicts with the color it is printed in. Naming the ink of the word RED printed in blue takes longer, and causes more mistakes, than naming the ink of a word that matches its color.",
      },
      {
        q: "What does the Stroop test measure?",
        a: "Mainly the ability to hold back an automatic response (reading) in favor of the one the task asks for (naming the color). Psychologists call this inhibitory control or interference control, one of the executive functions.",
      },
      {
        q: "What is a good Stroop test score?",
        a: "Almost everyone is slower on mismatched words, so a positive difference is normal. A smaller difference with high accuracy means you are handling the interference well. Scores vary a lot between attempts, so compare a few runs on the same device.",
      },
      {
        q: "Who discovered the Stroop effect?",
        a: "The American psychologist John Ridley Stroop published the classic experiments in 1935, in his doctoral work. Earlier researchers had noticed that naming colors is slower than reading words, but Stroop showed how much conflicting words slow color naming down.",
      },
      {
        q: "Can I take the Stroop test if I am color-blind?",
        a: "You can try, but if some of the four colors are hard to tell apart for you, your result will reflect color discrimination rather than the Stroop effect. The buttons show the color names to help.",
      },
      {
        q: "Is this a medical or diagnostic test?",
        a: "No. Clinicians use standardized versions of the Stroop task as one part of a wider assessment. This online version is for curiosity and practice, and its score says nothing about any condition.",
      },
    ],
    sources: [
      {
        text: "Stroop, J. R. (1935). Studies of interference in serial verbal reactions. Journal of Experimental Psychology, 18(6), 643–662.",
        url: "https://doi.org/10.1037/h0054651",
      },
      {
        text: "MacLeod, C. M. (1991). Half a century of research on the Stroop effect: An integrative review. Psychological Bulletin, 109(2), 163–203.",
        url: "https://doi.org/10.1037/0033-2909.109.2.163",
      },
      {
        text: "Diamond, A. (2013). Executive functions. Annual Review of Psychology, 64, 135–168.",
        url: "https://doi.org/10.1146/annurev-psych-113011-143750",
      },
    ],
    download: {
      title: "Play the Stroop game every day",
      body: "Brainura's Stroop Test game gets harder as you improve, and comes with 25 more short games for memory, attention and logic. No ads.",
    },
    updated: U,
  },
];

export function testEn(key: string): TestPageContent {
  const t = TESTS_EN.find((x) => x.key === key);
  if (!t) throw new Error(`Нет теста ${key} в src/content/tests.ts`);
  return t;
}
