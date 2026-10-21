import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SupportChat } from "@/components/support-chat";
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
    "Train your brain in 5 minutes a day. 26 short games for memory, focus, processing speed and logic. Daily plan, streaks, no ads.",
  applicationName: "Brainura",
  keywords: [
    "brain training",
    "memory",
    "focus",
    "cognitive games",
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
      "26 short games for memory, focus, processing speed and logic. No ads.",
    siteName: "Brainura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainura — Brain Training in 5 Minutes a Day",
    description:
      "26 short games for memory, focus, processing speed and logic. No ads.",
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
        <SupportChat />
      </body>
    </html>
  );
}
