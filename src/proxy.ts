// Маршрутизация языковых поддоменов (Next 16: proxy = бывший middleware).
//
//   de.brainura.app/tests/x      → внутри /de/tests/x   (src/app/[lang]/…)
//   de.brainura.app/sitemap.xml  → /de/sitemap.xml       (свой sitemap у поддомена)
//   brainura.app/de/tests/x      → 308 на de.brainura.app/tests/x (без дублей)
//   brainura.app/…               → как есть (английский, src/app/(en)/…)
//
// Локально язык открывается на `<код>.localhost:<порт>` (Chrome и curl резолвят *.localhost).
// Статика, картинки, /_next, /api и служебные файлы мимо прокси.

import { NextResponse, type NextRequest } from "next/server";
import { absoluteUrl, isLocale, localeFromHost, subdomainLocales } from "@/lib/i18n";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const lang = localeFromHost(req.headers.get("host"));

  if (lang) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Основной домен: внутренний путь языка снаружи не отдаём — уводим на поддомен.
  const first = pathname.split("/")[1] ?? "";
  if (first && first !== "en" && isLocale(first) && subdomainLocales().includes(first)) {
    const rest = pathname.slice(first.length + 1) || "/";
    const host = req.headers.get("host") ?? "";
    // Локально — на <код>.localhost того же порта, в проде — на <код>.brainura.app.
    const target = host.includes("localhost")
      ? `${req.nextUrl.protocol}//${first}.${host}${rest}${search}`
      : `${absoluteUrl(first, rest)}${search}`;
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|api/|\\.well-known/|icon|apple-icon|opengraph-image|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|html|js|css|txt|xml|json|map|woff2?|mp4|webm|pdf)$).*)",
    "/sitemap.xml",
    "/robots.txt",
  ],
};
