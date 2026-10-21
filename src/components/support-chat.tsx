"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { id: string; from: "user" | "support"; text: string; at: string };

const ID_KEY = "brainura_support_device_id";
const SEEN_KEY = "brainura_support_seen";
const MAX_TEXT = 2000;

function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* приватный режим: чат работает, но история не переживёт перезагрузку */
  }
}

function deviceId(create: boolean): string | null {
  const saved = readStore(ID_KEY);
  if (saved) return saved;
  if (!create) return null;
  const fresh = crypto.randomUUID();
  writeStore(ID_KEY, fresh);
  return fresh;
}

export function SupportChat() {
  const [enabled, setEnabled] = useState(false);
  // Есть ли у посетителя беседа: от этого зависит, нужен ли опрос ответов.
  const [started, setStarted] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  // Сообщение, показанное сразу при отправке, живёт отдельно до ответа сервера.
  const [pending, setPending] = useState<Msg[]>([]);

  const load = useCallback(async () => {
    const id = deviceId(false);
    if (!id) return;
    try {
      const res = await fetch("/api/support/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: id }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { messages: Msg[] };
      setMsgs(data.messages);
      setPending((p) =>
        p.filter((m) => !data.messages.some((s) => s.from === "user" && s.text === m.text)),
      );
    } catch {
      /* сеть моргнула — попробуем на следующем тике */
    }
  }, []);

  useEffect(() => {
    setStarted(deviceId(false) !== null);
  }, []);

  useEffect(() => {
    fetch("/api/support/status")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled: boolean }) => setEnabled(d.enabled))
      .catch(() => setEnabled(false));
  }, []);

  // Опрос: часто, пока чат открыт; редко — чтобы показать точку «есть ответ».
  useEffect(() => {
    if (!started) return;
    load();
    const t = setInterval(load, open ? 5000 : 60000);
    return () => clearInterval(t);
  }, [started, open, load]);

  const lastSupport = [...msgs].reverse().find((m) => m.from === "support");
  useEffect(() => {
    if (!lastSupport) return;
    if (open) {
      writeStore(SEEN_KEY, lastSupport.id);
      setUnread(false);
    } else {
      setUnread(readStore(SEEN_KEY) !== lastSupport.id);
    }
  }, [lastSupport, open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs, pending, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value || sending) return;
    const id = deviceId(true)!;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/support/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: id,
          text: value,
          locale: navigator.language || "en",
          page: window.location.pathname,
          website: honey,
        }),
      });
      if (res.status === 429) {
        setError("Too many messages — please wait a minute.");
      } else if (!res.ok) {
        setError(
          "Couldn't send right now. Please try again, or email us from the Support page.",
        );
      } else {
        setPending((p) => [
          ...p,
          { id: `p-${Date.now()}`, from: "user", text: value, at: "" },
        ]);
        setText("");
        // Беседа началась: с этого момента опрашиваем ответы (иначе у нового
        // посетителя ответ был бы виден только после перезагрузки).
        setStarted(true);
      }
    } catch {
      setError("No connection. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const shown = [...msgs, ...pending];

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Brainura support"
          className="flex h-[28rem] max-h-[calc(100dvh-6rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl"
        >
          <div className="btn-gradient flex items-center justify-between px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Chat with us</p>
              <p className="text-xs text-white/80">
                We usually reply within one business day
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
            {shown.length === 0 && (
              <p className="rounded-xl bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-secondary)]">
                Hi! Ask us anything about Brainura, or tell us what to improve.
                Replies appear right here, so keep this browser to see them.
              </p>
            )}
            {shown.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
                    m.from === "user"
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text)]"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={send} className="border-t border-[var(--color-border)]/70 p-3">
            {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
            {/* Приманка для ботов: людям не видна и не фокусируется. */}
            <input
              type="text"
              name="website"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="flex items-end gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={2}
                placeholder="Write a message…"
                className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
              />
              <button
                type="submit"
                disabled={sending || !text.trim()}
                aria-label="Send message"
                className="btn-gradient inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with support"}
        className="btn-gradient relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {unread && !open && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
        )}
      </button>
    </div>
  );
}
