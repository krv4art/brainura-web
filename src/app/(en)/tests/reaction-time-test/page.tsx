import type { Metadata } from "next";
import { ToolPage } from "@/components/seo/templates";
import { ReactionTimeTest } from "@/components/tools/reaction-time-test";
import { alternatesFor } from "@/lib/i18n";
import { siblings, versionsOf } from "@/content/registry";

// Кластер: reaction time test / check reaction time / reaction tester / reaction speed
// test / reflex test / normal reaction time (docs/growth/seo/clusters_en.csv).
const PATH = "/tests/reaction-time-test";
const TITLE = "Reaction Time Test: Check Your Reaction Speed Online";
const DESCRIPTION =
  "Free reaction time test: click when the screen turns green and get your average in milliseconds. Plus what a normal reaction time is and what affects it.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor("en", PATH, versionsOf("tests", "reaction-time-test")),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const FAQ = [
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
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tests", path: "/tests" },
        { name: "Reaction Time Test", path: PATH },
      ]}
      h1="Reaction Time Test"
      toolName="Reaction Time Test"
      description={DESCRIPTION}
      lead={
        <p>
          Wait for the box to turn green, then click (or tap, or press Space) as fast as you can. You get five
          attempts and your average in milliseconds. Free, no sign-up.
        </p>
      }
      tool={<ReactionTimeTest />}
      faq={FAQ}
      campaign="reaction-time-test"
      download={{
        title: "Train your reactions every day",
        body: "Brainura has a reaction game, Reflex, plus 25 more short brain games for memory, attention and logic. Five minutes a day, no ads.",
      }}
      related={siblings("tests", "reaction-time-test")}
      sources={[
        {
          text: "Kosinski, R. J. (2013). A Literature Review on Reaction Time. Clemson University.",
        },
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
        {
          text: "Simons, D. J., et al. (2016). Do “brain-training” programs work? Psychological Science in the Public Interest, 17(3), 103–186.",
          url: "https://doi.org/10.1177/1529100616661983",
        },
      ]}
    >
      <h2>How the reaction time test works</h2>
      <p>
        This is a <strong>simple reaction time</strong> test: there is one signal and one response. After you start,
        the box turns red and waits for a random 1.5 to 4.5 seconds. The moment it turns green, the timer starts; it
        stops when your click, tap or key press arrives. Click before green and the round is repeated, so there is
        no benefit in guessing.
      </p>
      <p>
        After five attempts you see each time, your fastest and slowest, and the average. The average is the number
        worth tracking: a single lucky click says little, while five in a row smooth out the noise. Your best average
        is saved in this browser so you can see whether you are getting quicker.
      </p>

      <h2>What is a normal reaction time?</h2>
      <p>
        Reaction time has been measured for more than 150 years, and the classic figures are surprisingly stable.
        Reviews of laboratory work put the average simple reaction time of college-age adults at roughly{" "}
        <strong>190 ms to a light</strong> and <strong>160 ms to a sound</strong>. Those numbers come from equipment
        built to add almost no delay.
      </p>
      <p>
        A web test always reads higher. A 60 Hz monitor draws a new frame only every 16.7 ms, the browser needs time
        to paint the green box, and mice, keyboards and especially touchscreens add their own lag before your response
        reaches the page. That is why typical browser scores sit somewhere around 250–350 ms, and why the same person
        can score 30–60 ms apart on two different devices.
      </p>
      <table>
        <thead>
          <tr><th>Average on this test</th><th>What it usually means</th></tr>
        </thead>
        <tbody>
          <tr><td>Under 200 ms</td><td>Very fast, or a fast setup (wired mouse, high refresh-rate screen)</td></tr>
          <tr><td>200–250 ms</td><td>Quick</td></tr>
          <tr><td>250–350 ms</td><td>Common range for browser tests</td></tr>
          <tr><td>Over 350 ms</td><td>Slower than typical: often a phone, fatigue or distraction</td></tr>
        </tbody>
      </table>
      <p>
        These bands are a rough guide, not norms. They are no substitute for a medical assessment, and a single score
        tells you nothing about your health.
      </p>

      <h2>What affects your reaction time</h2>
      <ul>
        <li>
          <strong>Sleep.</strong> Lack of sleep is one of the most reliable ways to slow down: studies of sleep
          deprivation consistently find slower and more variable responses, plus more lapses.
        </li>
        <li>
          <strong>Age.</strong> A survey of thousands of UK adults found that simple reaction time slows gradually
          across adulthood, with bigger differences between people as they get older.
        </li>
        <li>
          <strong>Attention and expectation.</strong> Mind wandering, a phone buzzing next to you or a long session
          all add milliseconds. A random wait, like the one here, keeps you from timing the click in advance.
        </li>
        <li>
          <strong>Practice and warm-up.</strong> The first attempts of a session are usually the slowest. Scores
          improve with familiarity, which is why it is fair to compare yourself only after a couple of runs.
        </li>
        <li>
          <strong>Your device.</strong> Screen refresh rate, input lag and browser load all count. Use the same
          setup when you compare results.
        </li>
      </ul>

      <h2>Simple vs. choice reaction time</h2>
      <p>
        This test has one possible answer, so the brain only has to detect the signal and fire the response. Add
        choices and things slow down: when you must pick one of several responses, decision time grows with the
        number of options. That relationship is known as <strong>Hick&apos;s law</strong>, after the psychologist
        William Hick, who described it in 1952. The{" "}
        <a href="/tests/stroop-test">Stroop test</a> goes one step further: the right answer competes with an
        automatic wrong one, so you also measure how well you hold back an impulse.
      </p>

      <h2>How to get a fair score</h2>
      <ol>
        <li>Sit comfortably with your finger already resting on the mouse button, trackpad or Space bar.</li>
        <li>Close other heavy tabs and turn off power-saving mode on laptops.</li>
        <li>Do one warm-up run, then record the next two or three averages.</li>
        <li>Compare results only with your own earlier runs on the same device.</li>
      </ol>

      <h2>Can you train your reaction time?</h2>
      <p>
        Practice makes you faster at the task you practise, and short daily sessions are an easy way to see that
        progress. Research on brain training is more careful about the bigger promise: a 2016 review of the field
        found good evidence that people improve on the trained tasks, and much weaker evidence that the gains carry
        over to unrelated everyday skills. Sleep, regular activity and fewer distractions are the dependable basics.
      </p>
      <p>
        If you enjoy the challenge, Brainura turns it into a habit: the app&apos;s <strong>Reflex</strong> game
        sits next to 25 other short games for memory, attention, speed and logic, with difficulty that adapts as you
        improve.
      </p>
    </ToolPage>
  );
}
