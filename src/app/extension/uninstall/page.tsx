import type { Metadata } from "next";
import { ExtensionFeedbackForm } from "@/components/extension-feedback-form";

export const metadata: Metadata = {
  title: "Sorry to see you go",
  description: "Tell us why you removed the Brainura extension for Chrome.",
  // Страница открывается только расширением после удаления: в поиске ей не место.
  robots: { index: false, follow: false },
};

const STORE_URL =
  "https://chromewebstore.google.com/detail/gkdlnpllacgajhhhicnhbgonemjjdcod";

export default function ExtensionUninstallPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Sorry to see you <span className="gradient-text">go</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          One question, and it helps us a lot. It takes ten seconds.
        </p>
      </div>

      <div className="mt-10">
        <ExtensionFeedbackForm
          source="uninstall"
          label="Why have you deleted the app?"
          placeholder="Tell us in a few words…"
          submitLabel="Send"
          thanksTitle="Thank you!"
          thanksBody="We read every answer and use it to make Brainura better."
        />
      </div>

      <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
        Removed it by mistake?{" "}
        <a
          className="font-semibold text-[var(--color-primary)] underline"
          href={STORE_URL}
        >
          Install it again
        </a>
        .
      </p>
    </div>
  );
}
