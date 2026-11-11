import type { Metadata } from "next";
import { ToolPage } from "@/components/seo/templates";
import { ReadingSpeedTest } from "@/components/tools/reading-speed-test";
import { alternatesFor } from "@/lib/i18n";
import { siblings, versionsOf } from "@/content/registry";

// Кластер: speed reading test = check reading speed (14 800) · free reading speed test 1 300 ·
// check my reading speed 480 · reading speed test online 390. «average reading speed» (6 600)
// закрыт статьёй /learn/average-reading-speed — здесь только ссылка, не дублировать.
const PATH = "/tests/reading-speed-test";
const TITLE = "Reading Speed Test: Check Your Words per Minute (Free)";
const DESCRIPTION =
  "Free reading speed test: read a short text, answer three questions and get your words per minute with a comprehension check. Compare with the adult average.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor("en", PATH, versionsOf("tests", "reading-speed-test")),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const FAQ = [
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
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tests", path: "/tests" },
        { name: "Reading Speed Test", path: PATH },
      ]}
      h1="Reading Speed Test"
      toolName="Reading Speed Test"
      description={DESCRIPTION}
      lead={
        <p>
          Check your reading speed in about two minutes. Pick a text, read it at your normal pace, then answer three
          short questions. You get your words per minute, how much you understood, and how you compare with the
          average adult reader.
        </p>
      }
      tool={<ReadingSpeedTest />}
      faq={FAQ}
      campaign="reading-speed-test"
      download={{
        title: "Reading games that keep you sharp",
        body: "Brainura has four reading games, from Masked Text to Mirror Reading, with questions that check you understood, plus 22 more short games for memory, attention and logic. No ads.",
      }}
      related={siblings("tests", "reading-speed-test")}
      sources={[
        {
          text: "Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language, 109, 104047.",
          url: "https://doi.org/10.1016/j.jml.2019.104047",
        },
        {
          text: "Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest, 17(1), 4–34.",
          url: "https://doi.org/10.1177/1529100615623267",
        },
        {
          text: "Delgado, P., Vargas, C., Ackerman, R., & Salmerón, L. (2018). Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension. Educational Research Review, 25, 23–38.",
          url: "https://doi.org/10.1016/j.edurev.2018.09.003",
        },
      ]}
    >
      <h2>How the reading speed test works</h2>
      <ol>
        <li>Choose one of three short non-fiction texts. Each is about 300 words long.</li>
        <li>Press Start reading. The text appears and a hidden timer starts.</li>
        <li>Read at your usual pace, as if you wanted to tell someone about it afterwards.</li>
        <li>Press I&apos;m done reading. The text disappears and three questions appear.</li>
        <li>Answer without looking back. You get your words per minute and your comprehension score.</li>
      </ol>
      <p>
        The questions are not a trick. They check the main points, so a normal careful reading gets them right. If you
        rush and miss two or more, the result tells you so, and your best score is not updated.
      </p>

      <h2>Average reading speed: what to compare with</h2>
      <p>
        The most thorough estimate comes from a 2019 review of nearly two hundred studies. Adults reading English
        non-fiction silently averaged about <strong>238 words per minute</strong>, fiction a little faster at about
        260, and reading aloud about 183. Most people fall roughly between 175 and 300 words per minute. Older
        popular figures of 300 or more were higher than the research supports.
      </p>
      <p>
        Your result depends on the text as much as on you. A familiar topic, short sentences and everyday words read
        fast; a technical text slows everyone down. That is why each test text is plain non-fiction of similar
        difficulty. More on where the numbers come from in our article on{" "}
        <a href="/learn/average-reading-speed">average reading speed for adults</a>.
      </p>

      <h2>Speed and comprehension go together</h2>
      <p>
        Reading is not just moving your eyes. You recognize each word, fit it into the sentence and connect the
        sentence to what came before. When you push past your comfortable pace, the eyes keep moving but the
        understanding falls behind. A large review of reading research concluded that there is a trade-off: reading
        much faster almost always means understanding less.
      </p>
      <p>
        That is why this test pairs your speed with a short comprehension check. A result of 250 words per minute
        with all three answers right says more about your reading than 600 words per minute with one.
      </p>

      <h2>How to read faster without losing the meaning</h2>
      <ul>
        <li>
          <strong>Read more.</strong> The biggest long-term lever is simply practice. Fast readers recognize most words
          instantly, and that comes from seeing them many times.
        </li>
        <li>
          <strong>Build background knowledge.</strong> The more you know about a topic, the faster you read about it,
          because less of the text is new to you.
        </li>
        <li>
          <strong>Match the speed to the goal.</strong> Skim to find a fact or decide whether a text is worth reading,
          slow down for what you need to learn. Both are legitimate; just know which one you are doing.
        </li>
        <li>
          <strong>Remove distractions.</strong> Rereading a line because your attention drifted costs more time than
          any eye technique can save.
        </li>
      </ul>
      <p>
        Popular tricks like suppressing your inner voice or taking in whole lines at a glance have little support in
        eye-movement research. We look at them in more detail in{" "}
        <a href="/learn/speed-reading">does speed reading work?</a> If you enjoy reading challenges, the{" "}
        <a href="/games/mirror-reading">Mirror Reading</a> game makes you read flipped text and then checks your
        understanding, and the <a href="/tests/schulte-table">Schulte table</a> is the grid drill many speed-reading
        courses use for focus.
      </p>
    </ToolPage>
  );
}
