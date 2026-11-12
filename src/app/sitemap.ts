import type { MetadataRoute } from "next";
import { SECTIONS, homeVersions, hubVersions, pagesOf, versionsOf, type SectionKey } from "@/content/registry";
import { absoluteUrl, LOCALES, type LangVersion } from "@/lib/i18n";

// sitemap.xml основного домена (SEO_PLAN §2, шаг 0.2): только английские страницы.
// У поддоменов языков — свой /sitemap.xml (src/app/[lang]/sitemap.xml). Без /extension/*
// (noindex), без ссылок Арены и API. hreflang — через `alternates` по ключу страницы.

function alternates(versions: LangVersion[]) {
  const languages: Record<string, string> = {};
  for (const v of versions) languages[LOCALES[v.lang].hreflang] = absoluteUrl(v.lang, v.path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [
    { url: absoluteUrl("en", "/"), changeFrequency: "weekly", priority: 1, alternates: alternates(homeVersions()) },
    { url: absoluteUrl("en", "/support"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("en", "/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("en", "/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  for (const section of Object.keys(SECTIONS) as SectionKey[]) {
    const pages = pagesOf(section, "en");
    if (!pages.length) continue;
    const path = SECTIONS[section].path;
    out.push({
      url: absoluteUrl("en", path),
      lastModified: pages.map((p) => p.updated).sort().at(-1),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates(hubVersions(section)),
    });
    for (const p of pages) {
      out.push({
        url: absoluteUrl("en", `${path}/${p.slug}`),
        lastModified: p.updated,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates(versionsOf(section, p.key)),
      });
    }
  }
  return out;
}
