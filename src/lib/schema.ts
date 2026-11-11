// schema.org (JSON-LD) для SEO-страниц. Рендер — компонент <JsonLd>.

import { SITE_URL, playUrl, APP_STORE_URL } from "./site";

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: SITE_URL + (c.path === "/" ? "" : c.path),
    })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Тест, который проходят прямо на странице. */
export function webAppLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: SITE_URL + path,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Brainura", url: SITE_URL },
  };
}

/** Мобильное приложение — на страницах игр. Без рейтинга: оценок из сторов не выдумываем. */
export function mobileAppLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Brainura",
    operatingSystem: "Android, iOS",
    applicationCategory: "GameApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    installUrl: playUrl(),
    sameAs: [playUrl(), APP_STORE_URL],
  };
}

export function articleLd(opts: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: SITE_URL + opts.path,
    datePublished: opts.published,
    dateModified: opts.modified ?? opts.published,
    author: { "@type": "Organization", name: "Brainura", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Brainura",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-512.png` },
    },
  };
}
