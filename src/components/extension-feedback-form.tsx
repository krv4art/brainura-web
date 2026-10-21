"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

// Тот же ключ, что у чата поддержки: ответ разработчика придёт в виджет чата
// на этом сайте, если человек вернётся в этот браузер.
const ID_KEY = "brainura_support_device_id";
const MAX_TEXT = 1800;

type Source = "uninstall" | "feedback";

const TAG: Record<Source, string> = {
  uninstall: "[Chrome extension · uninstall]",
  feedback: "[Chrome extension · feedback]",
};

function deviceId(): string {
  try {
    const saved = window.localStorage.getItem(ID_KEY);
    if (saved) return saved;
    const fresh = crypto.randomUUID();
    window.localStorage.setItem(ID_KEY, fresh);
    return fresh;
  } catch {
    // Приватный режим: отправить можно, но ответ в чате не появится.
    return crypto.randomUUID();
  }
}

interface Props {
  source: Source;
  /** Оценка 1–5, если человек пришёл из просьбы об оценке в расширении. */
  stars?: number;
  label: string;
  placeholder: string;
  submitLabel: string;
  thanksTitle: string;
  thanksBody: string;
}

export function ExtensionFeedbackForm({
  source,
  stars,
  label,
  placeholder,
  submitLabel,
  thanksTitle,
  thanksBody,
}: Props) {
  const [text, setText] = useState("");
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    setError(null);
    const head = stars ? `${TAG[source]} ${stars}/5` : TAG[source];
    try {
      const res = await fetch("/api/support/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: deviceId(),
          text: `${head}\n${value}`,
          locale: navigator.language || "en",
          page: window.location.pathname,
          website: honey,
        }),
      });
      if (res.status === 429) {
        setError("Too many messages — please wait a minute and try again.");
      } else if (!res.ok) {
        setError(
          "Couldn't send right now. Please try again, or email krv4art.dev@gmail.com.",
        );
      } else {
        setDone(true);
      }
    } catch {
      setError("No connection. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-8 text-center shadow-sm"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--color-primary)]" />
        <h2 className="mt-4 text-xl font-bold text-[var(--color-text)]">
          {thanksTitle}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {thanksBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[var(--color-border)]/70 bg-white p-6 shadow-sm"
    >
      <label
        htmlFor="ext-feedback"
        className="block text-lg font-bold text-[var(--color-text)]"
      >
        {label}
      </label>
      <textarea
        id="ext-feedback"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={MAX_TEXT}
        rows={5}
        required
        placeholder={placeholder}
        className="mt-3 w-full rounded-xl border border-[var(--color-border)] p-3 text-base text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
      />
      {/* Приманка для ботов: человек поле не видит. */}
      <input
        type="text"
        name="website"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending || text.trim().length === 0}
        className="btn-gradient mt-4 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50"
      >
        {sending ? "Sending…" : submitLabel}
      </button>
      <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
        Anonymous: we don&apos;t ask for your name or email. Your message and a
        random ID stored in this browser are sent to our support inbox, as
        described in the{" "}
        <a className="underline" href="/privacy">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
