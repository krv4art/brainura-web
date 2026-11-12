import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingView } from "@/components/landing";
import { LangCatalog, LangHomeView } from "@/components/seo/views";
import { homeVersions } from "@/content/registry";
import { landingFor } from "@/content/landing";
import { alternatesFor, isLocale } from "@/lib/i18n";
import { UI } from "@/lib/ui";

// Главная языка: <код>.brainura.app/. Если у языка есть лендинг — это он (перевод главной
// brainura.app, hreflang в обе стороны) и ниже каталог разделов; иначе — только каталог.

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const landing = landingFor(lang);
  if (landing) {
    return {
      title: { absolute: landing.meta.title },
      description: landing.meta.description,
      alternates: alternatesFor(lang, "/", homeVersions()),
    };
  }
  const t = UI[lang].hub;
  return { title: { absolute: `${t.homeTitle} | Brainura` }, description: t.homeLead, alternates: alternatesFor(lang, "/") };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const landing = landingFor(lang);
  if (!landing) return <LangHomeView lang={lang} />;
  return (
    <>
      <LandingView lang={lang} />
      <LangCatalog lang={lang} title={landing.catalog.title} lead={landing.catalog.lead} />
    </>
  );
}
