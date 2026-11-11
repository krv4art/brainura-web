import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, JsonLd } from "@/components/seo/parts";
import { breadcrumbLd } from "@/lib/schema";
import { alternatesFor } from "@/lib/i18n";
import { hubVersions } from "@/content/registry";
import { ARTICLES_ALL } from "@/content/articles";

const PATH = "/learn";
const TITLE = "Learn: Memory, Attention and Reading, Explained";
const DESCRIPTION =
  "Plain-language articles on memory, attention, reading speed and brain training, with the research behind every claim.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor("en", PATH, hubVersions("learn")),
};

export default function LearnHub() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Learn", path: PATH },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">Learn</h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">{DESCRIPTION}</p>
      <div className="mt-10 space-y-4">
        {ARTICLES_ALL.map((a) => (
          <Link
            key={a.slug}
            href={`${PATH}/${a.slug}`}
            className="group block rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-[var(--color-text)]">{a.h1}</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{a.blurb}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
              Read <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
