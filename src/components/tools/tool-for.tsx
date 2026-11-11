// Инструмент по ключу страницы теста — для языковых версий (src/app/[lang]/tests/[slug]).
// Английские страницы подключают компоненты напрямую.

import type { Locale } from "@/lib/i18n";
import type { ToolKey } from "@/content/l10n";
import { MemoryTest } from "./memory-test";
import { ReadingSpeedTest } from "./reading-speed-test";
import { ReactionTimeTest } from "./reaction-time-test";
import { SchulteTableTest } from "./schulte-table-test";
import { StroopTest } from "./stroop-test";

export function ToolFor({ tool, lang }: { tool: ToolKey; lang: Locale }) {
  switch (tool) {
    case "memory-test":
      return <MemoryTest lang={lang} />;
    case "reading-speed-test":
      return <ReadingSpeedTest lang={lang} />;
    case "reaction-time-test":
      return <ReactionTimeTest lang={lang} />;
    case "schulte-table":
      return <SchulteTableTest lang={lang} />;
    case "stroop-test":
      return <StroopTest lang={lang} />;
  }
}
