import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, DownloadBlock, JsonLd } from "@/components/seo/parts";
import { breadcrumbLd } from "@/lib/schema";
import { pageAlternates } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { TESTS } from "@/content/registry";

// Хаб тестов. Кластер: brain test / brain tests online / free brain test.
// «cognitive test» (33 100) сознательно не главный ключ: в выдаче — клинические
// скрининги деменции, интент не наш.
const PATH = "/tests";
const TITLE = "Free Brain Tests Online: Memory, Reaction, Attention, Reading";
const DESCRIPTION =
  "Free online brain tests you can take right now: memory span, reaction time, reading speed, Schulte table and the Stroop test. No sign-up, best score saved.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: pageAlternates(PATH, "en"),
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

export default function TestsHub() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tests", path: PATH },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: TESTS.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}${PATH}/${t.slug}`,
              name: t.name,
            })),
          },
        ]}
      />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
        Free brain tests online
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
        Quick tests based on classic tasks from cognitive psychology. Each one takes a minute or two, runs in your
        browser and keeps your best result on this device. No account, no email.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTS.map((t) => (
          <Link
            key={t.slug}
            href={`${PATH}/${t.slug}`}
            className="group flex flex-col rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-[var(--color-text)]">{t.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{t.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
              Take the test <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-16 max-w-3xl text-[var(--color-text-secondary)]">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">What these tests measure</h2>
        <p className="mt-4 leading-relaxed">
          The <strong className="text-[var(--color-text)]">reaction time test</strong> measures raw speed: how quickly
          you respond to a single signal. The <strong className="text-[var(--color-text)]">Schulte table</strong>{" "}
          measures visual search and sustained attention as you find numbers in order. The{" "}
          <strong className="text-[var(--color-text)]">Stroop test</strong> measures how well you suppress an
          automatic response, a core part of self-control in attention.
        </p>
        <p className="mt-4 leading-relaxed">
          The <strong className="text-[var(--color-text)]">memory test</strong> measures your span: how long a
          sequence of digits or grid positions you can repeat, forwards or backwards. The{" "}
          <strong className="text-[var(--color-text)]">reading speed test</strong> gives your words per minute
          together with a short comprehension check, because speed without understanding is just skimming.
        </p>
        <p className="mt-4 leading-relaxed">
          They are made for curiosity and practice. Scores depend on your device, sleep and mood, so compare your own
          results over time rather than with other people. None of these tests diagnoses anything; if you are worried
          about your memory or attention, talk to a doctor.
        </p>
      </section>

      <div className="max-w-3xl">
        <DownloadBlock
          campaign="tests-hub"
          title="26 brain games in one app"
          body="Brainura turns these tasks and many more into short daily games for memory, attention, speed and logic, with levels that adapt to you. No ads."
        />
      </div>
    </div>
  );
}
