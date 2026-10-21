import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Pin, Puzzle } from "lucide-react";

export const metadata: Metadata = {
  title: "Welcome to Brainura",
  description:
    "Pin the Brainura extension to your toolbar so your brain break is always one click away.",
  // Страницу открывает только расширение после установки: в поиске ей не место.
  robots: { index: false, follow: false },
};

// 🔒 Счётчик установок: страница открывается ровно один раз после установки
// расширения (chrome.runtime.onInstalled, reason=install), поэтому число её
// просмотров ≈ число установок. Vercel Web Analytics считает просмотры без
// cookie и без идентификаторов посетителя; включается в дашборде проекта
// (Analytics → Enable). Расширение само ничего сюда не отправляет.
export default function ExtensionWelcomePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Brainura is <span className="gradient-text">installed</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          One quick step so you can always find it: pin it to your toolbar.
        </p>
      </div>

      <ol className="mt-12 space-y-6">
        <li className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
              1
            </span>
            <div className="flex-1">
              <p className="font-semibold text-[var(--color-text)]">
                Click the puzzle icon next to the address bar
              </p>
              <div className="mt-4 flex h-12 items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4">
                <div className="h-6 flex-1 rounded-full border border-[var(--color-border)] bg-white" />
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)]">
                  <Puzzle className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </li>

        <li className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
              2
            </span>
            <div className="flex-1">
              <p className="font-semibold text-[var(--color-text)]">
                Click the pin next to Brainura
              </p>
              <div className="mt-4 flex h-12 items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
                <span className="flex-1 font-semibold text-[var(--color-text)]">
                  Brainura
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)]">
                  <Pin className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </li>

        <li className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
              3
            </span>
            <p className="flex-1 font-semibold text-[var(--color-text)]">
              Click the Brainura icon whenever you need a brain break. Pick 3,
              5 or 10 minutes, press Start, and play. You can also set
              reminders for your workday.
            </p>
          </div>
        </li>
      </ol>

      <p className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
        No account, no ads, no tracking in the extension. This page counts
        visits anonymously, without cookies. See the{" "}
        <a className="underline" href="/privacy">
          Privacy Policy
        </a>
        .
      </p>
      <Analytics />
    </div>
  );
}
