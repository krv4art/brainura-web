import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

// 🔒 Закрытые служебные страницы (не часть сайта): без шапки, подвала, чата поддержки и
// аналитики, в поиск не попадают. К meta noindex добавлен заголовок X-Robots-Tag
// (next.config.ts), в sitemap страницы нет, в robots.txt адрес НЕ записан намеренно —
// иначе robots.txt сам показал бы адрес всем.
export const metadata: Metadata = {
  title: "Проверка чертежей",
  robots: { index: false, follow: false, nocache: true },
};

export default function ToolLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-background)]">{children}</body>
    </html>
  );
}
