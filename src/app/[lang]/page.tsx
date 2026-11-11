import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LangHomeView } from "@/components/seo/views";
import { alternatesFor, isLocale } from "@/lib/i18n";
import { UI } from "@/lib/ui";

// Главная языка: <код>.brainura.app/ — разделы с карточками страниц.
// hreflang только на себя: английская главная — лендинг, не её перевод.

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = UI[lang].hub;
  return { title: { absolute: `${t.homeTitle} | Brainura` }, description: t.homeLead, alternates: alternatesFor(lang, "/") };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LangHomeView lang={lang} />;
}
