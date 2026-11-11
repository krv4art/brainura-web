import type { Metadata } from "next";
import { ToolPage } from "@/components/seo/templates";
import { MemoryTest } from "@/components/tools/memory-test";
import { alternatesFor } from "@/lib/i18n";
import { siblings, versionsOf } from "@/content/registry";

// Кластер: memory test / memory tester 14 800 · online memory test 1 600 · short term memory
// test 1 300 · working memory test 1 900 · number memory test 1 000 · visual memory test 1 000 ·
// photographic memory test 3 600 (FAQ). «memory test windows / pc» — проверка ОЗУ, не наш интент.
// «memory test for seniors» — без обещаний скрининга (правило §1 SEO_PLAN).
const PATH = "/tests/memory-test";
const TITLE = "Memory Test Online: Check Your Short-Term and Working Memory";
const DESCRIPTION =
  "Free online memory test: remember digits forwards, backwards or as a grid sequence and find your memory span. Two minutes, no sign-up, best score saved.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor("en", PATH, versionsOf("tests", "memory-test")),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const FAQ = [
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
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tests", path: "/tests" },
        { name: "Memory Test", path: PATH },
      ]}
      h1="Memory Test Online"
      toolName="Memory Test"
      description={DESCRIPTION}
      lead={
        <p>
          How many digits can you hold in your head? Watch a sequence, repeat it, and the next one gets longer. Choose
          numbers in order, numbers backwards for a working memory test, or a sequence of cells on a grid.
        </p>
      }
      tool={<MemoryTest />}
      faq={FAQ}
      campaign="memory-test"
      download={{
        title: "Train your memory a few minutes a day",
        body: "Brainura has memory games like Card Match and Mind Matrix that grow with you, level by level, alongside 24 more short games for attention, speed and logic. No ads.",
      }}
      related={siblings("tests", "memory-test")}
      sources={[
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
        {
          text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
          url: "https://doi.org/10.1177/1529100616661983",
        },
      ]}
    >
      <h2>What this memory test measures</h2>
      <p>
        The test measures your <strong>memory span</strong>: the longest sequence you can repeat correctly right after
        seeing it. Span tasks are among the oldest tools in psychology. The digit span is part of many standard
        cognitive assessments, and the grid version follows the idea of the Corsi block-tapping task, where an
        examiner taps blocks in a sequence and you tap them back.
      </p>
      <p>
        The three modes look at slightly different things. <strong>Numbers</strong> is a classic short-term memory
        test: you hold the digits and repeat them. <strong>Numbers backwards</strong> is a simple working memory test,
        because you have to hold the digits and rearrange them at the same time. <strong>Grid sequence</strong> is a
        visual memory test for positions and order, which is harder to rehearse in words.
      </p>

      <h2>How the test works</h2>
      <ol>
        <li>Pick a mode and press Start.</li>
        <li>Watch the sequence. Digits appear one at a time; on the grid, cells light up one after another.</li>
        <li>Type the digits (in reverse order for the backwards mode) or tap the cells in the same order.</li>
        <li>Get it right and the next sequence is one item longer. Miss it and you get a second try at the same length.</li>
        <li>Two misses in a row end the test. Your score is the longest sequence you repeated correctly.</li>
      </ol>

      <h2>What your score means</h2>
      <p>
        For decades the reference point was George Miller&apos;s &ldquo;seven, plus or minus two&rdquo;, and most
        adults do repeat about 6 to 8 digits in order. Later research suggests the true limit of what we hold at once
        is closer to 3 to 5 chunks, and that we reach seven by rehearsing digits in our head and grouping them, for
        example hearing 4-7-1-9 as &ldquo;forty-seven, nineteen&rdquo;.
      </p>
      <p>
        Backwards spans are usually one to three items shorter than forward spans, because the reordering takes some
        of your capacity. Visual sequence spans tend to sit a little below digit spans; in normative studies of the
        Corsi task, healthy adults typically manage about 5 to 6 blocks.
      </p>
      <p>
        Online results vary more than lab results. Distractions, screen size and how carefully you type all play a
        part, so treat your score as a snapshot. It is most useful for spotting your own patterns: whether you do
        better in the morning, after a good night&apos;s sleep, or without your phone buzzing next to you.
      </p>

      <h2>Tips for remembering longer sequences</h2>
      <ul>
        <li>
          <strong>Chunk the digits.</strong> Group them into pairs or triples as they appear. Six digits become three
          two-digit numbers, which is much easier to hold.
        </li>
        <li>
          <strong>Say them in your head.</strong> Repeating the sequence silently in a rhythm keeps it fresh until you
          answer.
        </li>
        <li>
          <strong>Trace a shape on the grid.</strong> Instead of remembering single cells, see the path they make: a
          line, a zigzag, a corner.
        </li>
        <li>
          <strong>For backwards, build it as you go.</strong> Put each new digit in front of the ones you already have,
          so the reversed order is ready when the sequence ends.
        </li>
      </ul>

      <h2>Can you train your memory span?</h2>
      <p>
        You can get much better at the task you practice. In a well-known study, a student who trained for more than
        200 hours pushed his digit span from about 7 to about 80, by turning groups of digits into running times he
        already knew. His span for letters, though, stayed where it was. That pattern shows up again and again in
        brain-training research: gains are real but mostly specific to what you trained.
      </p>
      <p>
        The practical takeaway: practice memory tasks because they are engaging and help you notice how focus,
        sleep and stress affect you, and use strategies like chunking for the things you actually need to remember.
        For another angle on attention, try the <a href="/tests/schulte-table">Schulte table</a>, or test how well
        you can ignore distractions with the <a href="/tests/stroop-test">Stroop test</a>. Curious whether games help
        at all? Read our look at <a href="/learn/do-brain-games-improve-memory">whether brain games improve memory</a>.
      </p>
    </ToolPage>
  );
}
