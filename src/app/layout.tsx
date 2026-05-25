import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://brainura.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brainura — Brain Training in 5 Minutes a Day",
    template: "%s | Brainura",
  },
  description:
    "Train your brain in 5 minutes a day. 15 science-backed exercises for memory, focus, processing speed, and logic. Track your Brain Age and beat your personal best.",
  applicationName: "Brainura",
  keywords: [
    "brain training",
    "memory",
    "focus",
    "cognitive games",
    "brain age",
    "mental exercises",
    "stroop test",
    "anagrams",
  ],
  authors: [{ name: "Brainura" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Brainura — Brain Training in 5 Minutes a Day",
    description:
      "15 science-backed exercises for memory, focus, processing speed, and logic.",
    siteName: "Brainura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainura — Brain Training in 5 Minutes a Day",
    description:
      "15 science-backed exercises for memory, focus, processing speed, and logic.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
