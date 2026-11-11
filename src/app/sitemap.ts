import type { MetadataRoute } from "next";
import { SECTIONS, type PageEntry } from "@/content/registry";
import { absoluteUrl, LOCALES, type Locale } from "@/lib/i18n";

// sitemap.xml (SEO_PLAN §2, шаг 0.2). Только индексируемые страницы: без
// /extension/* (noindex), без ссылок Арены и API. hreflang — через `alternates`.

function alternates(path: string, locales: Locale[]) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[LOCALES[l].hreflang] = absoluteUrl(l, path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [
    { url: absoluteUrl("en", "/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("en", "/support"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("en", "/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("en", "/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  for (const section of Object.values(SECTIONS)) {
    const pages = section.pages as PageEntry[];
    if (!pages.length) continue;
    const latest = pages.map((p) => p.updated).sort().at(-1);
    out.push({
      url: absoluteUrl("en", section.path),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const p of pages) {
      const path = `${section.path}/${p.slug}`;
      for (const lang of p.locales) {
        out.push({
          url: absoluteUrl(lang, path),
          lastModified: p.updated,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: alternates(path, p.locales),
        });
      }
    }
  }
  return out;
}
