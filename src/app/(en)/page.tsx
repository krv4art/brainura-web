import type { Metadata } from "next";
import { LandingView } from "@/components/landing";
import { LANDING } from "@/content/landing";
import { homeVersions } from "@/content/registry";
import { alternatesFor } from "@/lib/i18n";

// Главная — лендинг. Тексты — src/content/landing.ts, вёрстка — src/components/landing.tsx.
const L = LANDING.en!;

export const metadata: Metadata = {
  title: { absolute: L.meta.title },
  description: L.meta.description,
  alternates: alternatesFor("en", "/", homeVersions()),
};

export default function HomePage() {
  return <LandingView lang="en" />;
}
