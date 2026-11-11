import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// 404 для адресов, не совпавших ни с одним маршрутом. Нужен, потому что корневых
// layout два — (en) и [lang] — и общего, из которого собрать 404, нет.

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Page not found | Brainura",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-6xl font-extrabold text-[var(--color-text)]">404</p>
        <p className="text-lg text-[var(--color-text-secondary)]">This page does not exist or has moved.</p>
        <a href="/" className="btn-gradient rounded-full px-6 py-3 font-semibold text-white">
          Go to the home page
        </a>
      </body>
    </html>
  );
}
