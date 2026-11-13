import type { Metadata } from "next";
import { SupportView } from "@/components/support-view";
import { SUPPORT } from "@/content/support";
import { supportVersions } from "@/content/registry";
import { alternatesFor } from "@/lib/i18n";

// Поддержка. Тексты — src/content/support.ts, вёрстка — src/components/support-view.tsx.
const S = SUPPORT.en!;

export const metadata: Metadata = {
  title: S.meta.title,
  description: S.meta.description,
  alternates: alternatesFor("en", "/support", supportVersions()),
};

export default function SupportPage() {
  return <SupportView lang="en" />;
}
