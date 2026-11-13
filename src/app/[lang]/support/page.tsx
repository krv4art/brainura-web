import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportView } from "@/components/support-view";
import { supportFor } from "@/content/support";
import { supportVersions } from "@/content/registry";
import { alternatesFor, isLocale, supportPath } from "@/lib/i18n";

// Поддержка на языке поддомена: снаружи <код>.brainura.app/<SUPPORT_SLUGS[код]> (src/proxy.ts).
// Нет текста поддержки на языке — 404 (ссылки тогда ведут на английскую, см. registry.supportHref).

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const s = supportFor(lang);
  if (!s) return {};
  return {
    title: s.meta.title,
    description: s.meta.description,
    alternates: alternatesFor(lang, supportPath(lang), supportVersions()),
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !supportFor(lang)) notFound();
  return <SupportView lang={lang} />;
}
