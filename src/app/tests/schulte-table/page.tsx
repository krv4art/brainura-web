import type { Metadata } from "next";
import { ToolPage } from "@/components/seo/templates";
import { SchulteTableTest } from "@/components/tools/schulte-table-test";
import { pageAlternates } from "@/lib/i18n";
import { siblings } from "@/content/registry";

// Кластер: schulte table / schulte table online / schulte grid / schulte table test.
const PATH = "/tests/schulte-table";
const TITLE = "Schulte Table Online: Free Attention and Focus Drill";
const DESCRIPTION =
  "Play a Schulte table online: find the numbers 1 to 25 in order as fast as you can. Grids from 3×3 to 7×7, your best time saved, and how to practice.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(PATH, "en"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const FAQ = [
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
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tests", path: "/tests" },
        { name: "Schulte Table", path: PATH },
      ]}
      h1="Schulte Table Online"
      toolName="Schulte Table"
      description={DESCRIPTION}
      lead={
        <p>
          Find the numbers from 1 to 25 in order as fast as you can. Pick a grid size, press Start, and click each
          number in turn. Mistakes are counted but do not stop the clock.
        </p>
      }
      tool={<SchulteTableTest />}
      faq={FAQ}
      campaign="schulte-table"
      download={{
        title: "Schulte tables every day, in your pocket",
        body: "Brainura's Schulte Tables game grows with you, level by level, alongside 25 more short games for memory, attention and logic. No ads.",
      }}
      related={siblings("tests", "schulte-table")}
      sources={[
        {
          text: "Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest, 17(1), 4–34.",
          url: "https://doi.org/10.1177/1529100615623267",
        },
        {
          text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
          url: "https://doi.org/10.1177/1529100616661983",
        },
      ]}
    >
      <h2>What is a Schulte table?</h2>
      <p>
        A Schulte table is a grid of randomly placed numbers that you find in ascending order. The classic version
        is 5×5 with the numbers 1 to 25. It takes its name from the German psychiatrist Walter Schulte, and it was
        first used in psychology as a simple way to observe attention: how quickly someone settles into a task, how
        steady their pace is, and when fatigue sets in.
      </p>
      <p>
        Today the table is better known as a training drill. Speed-reading courses, especially in Eastern Europe, use
        it to practice a wider field of view, and many people simply like it as a quick, measurable focus warm-up
        before work or study.
      </p>

      <h2>How to play</h2>
      <ol>
        <li>Choose a grid. Start with 3×3 or 4×4 if you are new; 5×5 is the classic.</li>
        <li>Press Start. The numbers appear and the timer runs.</li>
        <li>Click 1, then 2, then 3, and so on to the last number. Found numbers fade out.</li>
        <li>When you hit the last number, the clock stops and your time and errors are shown.</li>
      </ol>
      <p>
        On even grids (4×4, 6×6) a small red dot marks the center. On odd grids the center is the middle cell. Try to
        keep your eyes there and spot the next number without looking straight at it.
      </p>

      <h2>Tips to get faster</h2>
      <ul>
        <li>
          <strong>Relax your gaze.</strong> Darting from cell to cell is slow. A soft focus on the center lets you
          notice numbers in the corners of your vision.
        </li>
        <li>
          <strong>Read the grid once, quickly.</strong> Before you hunt for 1, let your eyes sweep the table. You will
          often remember roughly where the next few numbers are.
        </li>
        <li>
          <strong>Keep a steady rhythm.</strong> Rushing produces errors and searches for numbers you have already
          clicked. Accuracy first, speed follows.
        </li>
        <li>
          <strong>Go bigger only when it feels easy.</strong> When 5×5 becomes routine, move to 6×6 or 7×7: more
          numbers, more distractors, longer focus.
        </li>
        <li>
          <strong>Stop while you are still improving.</strong> Three to five tables are enough. Your times climb once
          you get tired, and that is a good signal to finish.
        </li>
      </ul>

      <h2>Variants of the Schulte table</h2>
      <p>
        Once the numbers feel easy, there are many ways to raise the bar. Letter tables use the alphabet instead of
        digits. Some versions run the sequence backwards, from 25 down to 1. The red and black variant, known as the
        Gorbov–Schulte table, mixes two series in two colors and asks you to alternate between them, which turns the
        drill into an exercise in switching attention.
      </p>

      <h2>What Schulte tables can and can&apos;t do</h2>
      <p>
        Practice reliably makes you faster at finding numbers in a grid, and watching that time drop is genuinely
        motivating. Bigger claims deserve caution. A major review of speed reading found no evidence that eye drills
        let people read much faster without losing comprehension, and a broad review of brain-training research found
        that improvements mostly stay with the trained task. Use the table as a short, honest focus exercise and a way
        to see how your attention changes with sleep, stress and time of day.
      </p>
      <p>
        For a different kind of attention challenge, try the <a href="/tests/stroop-test">Stroop test</a>, where the
        difficulty is ignoring what you read, or check your raw speed with the{" "}
        <a href="/tests/reaction-time-test">reaction time test</a>.
      </p>
    </ToolPage>
  );
}
