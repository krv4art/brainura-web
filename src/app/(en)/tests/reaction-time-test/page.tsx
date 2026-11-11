import type { Metadata } from "next";
import { TestView, testMetadata } from "@/components/seo/views";
import { testEn } from "@/content/tests";

// Текст страницы — src/content/tests.ts (блоками), вёрстка — TestView (общая с языками).
// Ядро — docs/growth/seo/pages/tests/reaction-time-test.md в репо приложения.
const T = testEn("reaction-time-test");

export const metadata: Metadata = testMetadata(T, "en");

export default function Page() {
  return <TestView t={T} lang="en" />;
}
