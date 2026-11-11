// Статьи раздела /learn (SEO_PLAN §6, волна 3). Одна статья = один info-кластер
// (docs/growth/seo/clusters_en.csv). Правила: без медицинских обещаний, источник у
// каждого научного утверждения, ссылка на инструмент или игру.

import type { FaqItem, Source } from "@/components/seo/parts";

export interface Article {
  slug: string;
  name: string;
  blurb: string;
  title: string;
  description: string;
  h1: string;
  cluster: string;
  lead: string;
  sections: { h2: string; paragraphs: string[] }[];
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

export const ARTICLES_ALL: Article[] = [
  {
    slug: "average-reading-speed",
    name: "Average reading speed",
    blurb: "How many words per minute adults read, and what changes it.",
    title: "Average Reading Speed for Adults (Words per Minute)",
    description:
      "The average adult reads about 240 words per minute silently and about 180 aloud. What research says about reading speed, comprehension and getting faster.",
    h1: "Average reading speed: how fast do adults read?",
    cluster: "average reading speed · average reading speed for adults · average reading speed pages · words per minute reading",
    lead:
      "Most adults read English silently at around 240 words per minute and aloud at around 180. Here is where those numbers come from, what pushes them up or down, and what to make of claims of 1,000 words a minute.",
    sections: [
      {
        h2: "The numbers",
        paragraphs: [
          "The most thorough estimate comes from a 2019 meta-analysis that pooled reading-rate studies covering thousands of participants. For adults reading English silently, the average was about 238 words per minute for non-fiction and about 260 words per minute for fiction. Reading aloud averaged about 183 words per minute.",
          "Most adults fall somewhere between roughly 175 and 300 words per minute when reading silently for understanding. Earlier popular figures of 300 words per minute or more were higher than the research supports.",
          "In pages, that works out to something like one page a minute for a typical paperback, though page density varies a lot between books.",
        ],
      },
      {
        h2: "What changes your reading speed",
        paragraphs: [
          "The text matters most. Familiar topics, common words and short sentences read fast; technical material, long sentences and new vocabulary slow everyone down.",
          "Your goal matters too. Reading to learn or remember is slower than reading for gist, and skimming for a specific fact is faster still. None of these is wrong; they are different jobs.",
          "Experience and vocabulary are the big long-term levers. People who read a lot recognize more words instantly, and instant word recognition is what fast, comfortable reading is built on.",
          "Language and script matter as well, so figures for English don't transfer directly to other languages.",
        ],
      },
      {
        h2: "What about speed reading?",
        paragraphs: [
          "Speed-reading courses promise several times the average rate. A major review of reading research concluded that reading much faster than normal without losing comprehension is not supported by the evidence: beyond a point, going faster means understanding less. What looks like speed reading is usually skimming, which is a useful skill as long as you know you are trading detail for speed.",
          "We go through the claims and what actually helps in a separate article on speed reading.",
        ],
      },
      {
        h2: "How to measure yours",
        paragraphs: [
          "Pick a page of ordinary prose, count the words (or count the words on three lines, average them, and multiply by the number of lines), read it at your normal pace with a timer, and divide words by minutes. Then check yourself: could you summarize what you read? A speed without comprehension isn't a reading speed.",
        ],
      },
    ],
    faq: [
      {
        q: "What is a good reading speed?",
        a: "Around 240 words per minute is average for silent reading of English non-fiction, and anywhere from about 200 to 300 is normal. Faster is only better if you still understand and remember what you read.",
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
        a: "Reading more, building vocabulary and reading familiar material all make reading faster and easier. Techniques that promise to triple your speed mostly turn reading into skimming.",
      },
    ],
    sources: [BRYSBAERT_2019, RAYNER_2016],
    related: [
      { href: "/learn/speed-reading", title: "Does speed reading work?", body: "What eye movements tell us about reading faster." },
      { href: "/games/mirror-reading", title: "Mirror Reading", body: "Read flipped text, then answer questions about it." },
      { href: "/tests/schulte-table", title: "Schulte table online", body: "The grid drill speed-reading courses love." },
    ],
    published: "2026-11-11",
  },

  {
    slug: "speed-reading",
    name: "Does speed reading work?",
    blurb: "What speed reading is, what the research says, and what really helps.",
    title: "Speed Reading: Does It Work? What Research Says",
    description:
      "How speed reading is supposed to work, what eye-movement research says about it, and practical ways to read faster without losing comprehension.",
    h1: "Speed reading: how it works and whether it works",
    cluster: "how to speed read · what is speed reading · improve reading speed · speed reading tips",
    lead:
      "Speed-reading courses promise to multiply your reading rate. Reading research has a more modest answer: you can read somewhat faster with practice, and much faster only by understanding less.",
    sections: [
      {
        h2: "How reading actually works",
        paragraphs: [
          "Your eyes don't glide along a line. They jump in quick movements called saccades and stop in fixations, usually lasting about a quarter of a second, during which the actual reading happens. A typical jump in English covers around seven to nine letters.",
          "During each fixation you see letters clearly only in a small window, about 14 to 15 letters to the right of where you are looking and a few to the left. Beyond that, words are too blurry to identify. This limit of the eye is the main reason dramatic speed-reading claims run into trouble.",
          "Readers also look back now and then (regressions), mostly when something didn't make sense. Those look-backs are part of how comprehension works, not a bad habit.",
        ],
      },
      {
        h2: "What speed-reading courses teach",
        paragraphs: [
          "Common techniques include using a finger or pointer to pace the eyes, trying to take in whole lines or blocks at once, suppressing the inner voice (subvocalization), and apps that flash one word at a time in the same spot (rapid serial visual presentation).",
          "A 2016 review by leading reading researchers looked at these claims in detail. Its conclusion: there is a trade-off between speed and accuracy, and techniques that raise speed far above normal mainly reduce how much you understand. The inner voice appears to help comprehension rather than slow it needlessly, and one-word-at-a-time apps remove the ability to look back, which hurts understanding of anything complex.",
        ],
      },
      {
        h2: "What does make reading faster",
        paragraphs: [
          "Read more. Skilled readers are fast mainly because they recognize words instantly, and that comes from exposure.",
          "Build vocabulary and background knowledge. Familiar words and topics are read faster and understood better.",
          "Skim on purpose. For a lot of everyday reading, skimming headings, first sentences and key terms is exactly the right strategy. Just be honest that you are skimming.",
          "Reduce distractions. Much \"slow reading\" is really rereading after attention drifted.",
        ],
      },
      {
        h2: "Where drills like the Schulte table fit",
        paragraphs: [
          "Schulte tables and similar grid drills are a staple of speed-reading courses. They are a pleasant, measurable focus exercise, and you will get faster at them, but the evidence does not show that they raise reading speed with full comprehension. Enjoy them for what they are.",
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
    ],
    sources: [RAYNER_2016, RAYNER_1998, BRYSBAERT_2019],
    related: [
      { href: "/learn/average-reading-speed", title: "Average reading speed", body: "How many words per minute adults really read." },
      { href: "/tests/schulte-table", title: "Schulte table online", body: "Try the classic grid drill in your browser." },
      { href: "/games/mirror-reading", title: "Mirror Reading", body: "Flipped text that makes reading effortful again." },
    ],
    published: "2026-11-11",
  },

  {
    slug: "do-brain-games-improve-memory",
    name: "Do brain games improve memory?",
    blurb: "What large studies found, and what has better evidence.",
    title: "Do Memory Games Improve Memory? What Studies Show",
    description:
      "Do brain games and memory games improve memory? What large studies found, why gains rarely transfer, and which habits have better evidence.",
    h1: "Do memory games and brain games improve memory?",
    cluster: "memory games improve · brain games to improve memory · do memory games improve memory · games to improve memory and concentration",
    lead:
      "Short answer: you get better at the games you practise. Whether that makes your everyday memory better is far less certain, and the honest answer from research is \"mostly not much.\" Here is what the big studies found.",
    sections: [
      {
        h2: "Near transfer vs. far transfer",
        paragraphs: [
          "Researchers separate two kinds of improvement. Near transfer means getting better at the trained task and at very similar tasks. Far transfer means the gain spreads to different skills: remembering names, following a conversation, managing everyday life.",
          "Near transfer is reliable. Practise a memory game for a few weeks and your scores will almost certainly rise. Far transfer is where the evidence gets thin.",
        ],
      },
      {
        h2: "What the large studies found",
        paragraphs: [
          "In 2010, a study published in Nature had more than 11,000 adults train online for six weeks on tasks of memory, reasoning and attention. Participants improved on the tasks they trained, but showed little or no improvement on untrained tests, even ones close to the training.",
          "The ACTIVE trial followed nearly 3,000 older adults who received memory, reasoning or speed-of-processing training. Ten years later, the reasoning and speed groups still did better than controls on the abilities they had trained, while the memory group's advantage on memory tests had faded. All three groups reported somewhat less difficulty with everyday activities, which is encouraging, though it is a self-reported measure.",
          "In 2016, a team of psychologists reviewed the evidence cited by brain-training companies. They found extensive evidence that training improves performance on the trained tasks, less evidence for improvement on closely related tasks, and little evidence that training improves everyday cognitive performance. The same year the US Federal Trade Commission settled with a brain-training company over advertising claims it found unsupported.",
        ],
      },
      {
        h2: "So why play at all?",
        paragraphs: [
          "Because it can be a good habit for its own sake. A short daily puzzle is a few minutes of focused attention, a measurable streak, and often simply fun. Getting better at something you practise feels good, and it is real progress at that skill.",
          "What matters is honest expectations. Brainura is a training and entertainment app: we say the games train the tasks they are built on, and we don't claim they diagnose, treat or prevent anything.",
        ],
      },
      {
        h2: "What has better evidence for memory",
        paragraphs: [
          "Sleep. Memory consolidation depends on it, and short sleep reliably hurts attention and learning.",
          "Retrieval practice. Testing yourself on what you want to remember works better than rereading it, an effect shown repeatedly in learning research.",
          "Spacing. Reviewing over several days beats cramming into one session.",
          "Physical activity, social contact and learning genuinely new skills are also linked with better cognitive health over the years. If you have concerns about your memory, talk to a doctor rather than relying on games.",
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
    ],
    related: [
      { href: "/games/card-match", title: "Card Match", body: "The classic pairs game, up to 32 pairs." },
      { href: "/tests/reaction-time-test", title: "Reaction time test", body: "A one-minute test of raw speed." },
      { href: "/games", title: "All 26 brain games", body: "Memory, attention, speed, logic, words and emotions." },
    ],
    published: "2026-11-11",
  },
];

export function articleBySlug(slug: string) {
  return ARTICLES_ALL.find((a) => a.slug === slug);
}
