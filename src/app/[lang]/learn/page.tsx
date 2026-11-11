import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HubView, hubMetadata } from "@/components/seo/views";
import { isLocale } from "@/lib/i18n";
import { pagesOf } from "@/content/registry";

// Хаб раздела на языке поддомена. Нет страниц раздела на языке — 404.

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? hubMetadata("learn", lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || pagesOf("learn", lang).length === 0) notFound();
  return <HubView section="learn" lang={lang} />;
}
