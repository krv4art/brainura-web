import type { Metadata } from "next";
import { ToolPage } from "@/components/seo/templates";
import { StroopTest } from "@/components/tools/stroop-test";
import { alternatesFor } from "@/lib/i18n";
import { siblings, versionsOf } from "@/content/registry";

// Кластер: stroop test / stroop effect / stroop test online / stroop task / stroop experiment.
const PATH = "/tests/stroop-test";
const TITLE = "Stroop Test Online: Measure Your Stroop Effect";
const DESCRIPTION =
  "Take a free online Stroop test: name the ink color, not the word. See your Stroop effect in milliseconds and learn why reading gets in the way.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor("en", PATH, versionsOf("tests", "stroop-test")),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const FAQ = [
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
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tests", path: "/tests" },
        { name: "Stroop Test", path: PATH },
      ]}
      h1="Stroop Test"
      toolName="Stroop Test"
      description={DESCRIPTION}
      lead={
        <p>
          A color word appears in colored ink. Your job: click the color of the <strong>ink</strong>, not the word
          you read. It sounds easy until the word and the color disagree.
        </p>
      }
      tool={<StroopTest />}
      faq={FAQ}
      campaign="stroop-test"
      download={{
        title: "Play the Stroop game every day",
        body: "Brainura's Stroop Test game gets harder as you improve, and comes with 25 more short games for memory, attention and logic. No ads.",
      }}
      related={siblings("tests", "stroop-test")}
      sources={[
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
      ]}
    >
      <h2>How this Stroop test works</h2>
      <p>
        You see 24 words, one at a time: RED, GREEN, BLUE or YELLOW. Each is printed in one of the same four colors.
        In half of them the word and the ink match (<strong>congruent</strong>); in the other half they don&apos;t
        (<strong>incongruent</strong>). Click the button for the ink color, or press R, G, B or Y on a keyboard.
      </p>
      <p>
        At the end you get three numbers: your average time on matching words, your average time on mismatched words,
        and your accuracy. The difference between the two times is your <strong>Stroop effect</strong>, also called
        interference. Only correct answers are used for the times.
      </p>

      <h2>Why is it so hard? The Stroop effect explained</h2>
      <p>
        For a fluent reader, reading is automatic. You cannot look at a familiar word and not read it. Naming a
        color, on the other hand, takes a deliberate step. When the two point to different answers, the word you have
        already read competes with the color you are supposed to say, and resolving that conflict costs time.
      </p>
      <p>
        Psychologists have debated the exact mechanism for decades. One account says words are simply processed
        faster than colors, so they arrive first. Another says reading needs less attention than color naming, so it
        happens whether you want it or not. Most modern models combine the two: the stronger, more practiced pathway
        interferes with the weaker one unless attention actively holds it back.
      </p>

      <h2>The original 1935 experiment</h2>
      <p>
        John Ridley Stroop asked students to work through cards of 100 items. In the key comparison, naming the ink
        colors of conflicting color words took far longer than naming the colors of plain colored squares: on
        average about 74% longer. Reading the words aloud, by contrast, was barely affected by the ink color. The
        asymmetry is the heart of the effect: the automatic process (reading) disrupts the controlled one (color
        naming), not the other way around.
      </p>
      <p>
        By 1991, a review of the field covered some 400 studies of the effect, and it remains one of the most
        replicated findings in psychology.
      </p>

      <h2>What the Stroop test is used for</h2>
      <p>
        Because it isolates the ability to suppress a strong habit, the Stroop task became a standard measure of{" "}
        <strong>inhibitory control</strong>, one of the core executive functions alongside working memory and mental
        flexibility. Researchers use versions of it to study attention, aging, fatigue and bilingualism, and
        clinicians include standardized versions in broader cognitive assessments. A single online run is not an
        assessment of anything, but it is a vivid way to feel your own attention at work.
      </p>

      <h2>Variations on the Stroop task</h2>
      <ul>
        <li><strong>Emotional Stroop:</strong> name the ink color of emotionally loaded words; delays can reveal what grabs attention.</li>
        <li><strong>Numerical Stroop:</strong> judge which of two digits is physically larger when the larger number is printed smaller.</li>
        <li><strong>Spatial Stroop:</strong> respond to an arrow&apos;s direction or a word like LEFT shown on the wrong side of the screen.</li>
        <li><strong>Reverse Stroop:</strong> read the word and ignore the color. Much easier, which is exactly the original asymmetry.</li>
      </ul>

      <h2>How to improve your score</h2>
      <p>
        With practice, the gap between matching and mismatched words usually shrinks. Some people find it helps to
        soften their focus so they see a patch of color rather than a word; others mentally name the color before the
        word &quot;lands.&quot; Speed and accuracy trade off, so watch both numbers: a small effect with many errors
        is not a better result.
      </p>
      <p>
        If you like this kind of challenge, try the <a href="/tests/schulte-table">Schulte table</a> for visual search
        or the <a href="/tests/reaction-time-test">reaction time test</a> for pure speed. In the Brainura app the
        Stroop Test is one of 26 short games, with levels that adapt as you improve.
      </p>
    </ToolPage>
  );
}
