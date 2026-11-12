"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RULES } from "@/lib/drawing-check/rules";
import type { CheckResult, Finding } from "@/lib/drawing-check/analyze";

const MAX_BYTES = 4 * 1024 * 1024; // у Vercel лимит тела запроса 4,5 МБ
const MAX_SIDE = 2400;

const RULE_BY_ID = new Map(RULES.map((r) => [r.id, r]));

function storeGet(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function storeSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* приватный режим — просто не запоминаем */
  }
}

// Фото с телефона весит 3–10 МБ: уменьшаем и сразу применяем поворот, чтобы модель
// получила лист «головой вверх».
async function prepareImage(file: File, rotation: number): Promise<Blob> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const turn = rotation % 180 !== 0;
  const w = turn ? bmp.height : bmp.width;
  const h = turn ? bmp.width : bmp.height;
  const k = Math.min(1, MAX_SIDE / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * k);
  canvas.height = Math.round(h * k);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(bmp, (-bmp.width * k) / 2, (-bmp.height * k) / 2, bmp.width * k, bmp.height * k);
  for (const q of [0.9, 0.8, 0.7, 0.55]) {
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", q));
    if (blob && blob.size <= MAX_BYTES) return blob;
  }
  throw new Error("too_large");
}

const STATUS_LABEL: Record<Finding["status"], string> = {
  issue: "Замечание",
  unsure: "Проверить вручную",
  ok: "В порядке",
  na: "Не применимо",
};
const STATUS_STYLE: Record<Finding["status"], string> = {
  issue: "bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/30",
  unsure: "bg-[var(--color-warning)]/10 text-[#9a6200] border-[var(--color-warning)]/40",
  ok: "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30",
  na: "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
};
const SEV_ORDER = { high: 0, medium: 1, low: 2 } as const;

function FindingCard({ f }: { f: Finding }) {
  const rule = RULE_BY_ID.get(f.rule_id);
  return (
    <li className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${STATUS_STYLE[f.status]}`}>
          {STATUS_LABEL[f.status]}
        </span>
        <span className="font-semibold">{rule?.title ?? f.rule_id}</span>
        <span className="text-xs text-[var(--color-muted)]">
          {f.rule_id}
          {f.status === "issue" ? ` · важность: ${f.severity}` : ""}
        </span>
      </div>
      {f.problem && <p className="mt-2 text-sm">{f.problem}</p>}
      {f.evidence && (
        <p className="mt-2 border-l-2 border-[var(--color-border)] pl-3 text-sm text-[var(--color-text-secondary)]">
          «{f.evidence}»{f.location ? ` — ${f.location}` : ""}
        </p>
      )}
      {f.suggestion && <p className="mt-2 text-sm">→ {f.suggestion}</p>}
      {rule && <p className="mt-2 text-xs text-[var(--color-muted)]">Источник правила: {rule.source}</p>}
    </li>
  );
}

function Results({ r }: { r: CheckResult }) {
  const groups = useMemo(() => {
    const by = (s: Finding["status"]) =>
      r.findings.filter((f) => f.status === s).sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]);
    return { issue: by("issue"), unsure: by("unsure"), ok: by("ok"), na: by("na") };
  }, [r]);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-extrabold">Результат</h2>
      <p className="mt-2">{r.summary}</p>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 rounded-xl bg-[var(--color-surface)] p-4 text-sm sm:grid-cols-3">
        {(
          [
            ["Название", r.sheet.title],
            ["Шифр", r.sheet.code],
            ["Масштаб", r.sheet.scale],
            ["Стадия", r.sheet.stage],
            ["Лист", r.sheet.sheet_no && `${r.sheet.sheet_no} из ${r.sheet.sheets_total || "?"}`],
          ] as const
        ).map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-[var(--color-muted)]">{k}</dt>
            <dd className="font-medium">{v || "не прочитано"}</dd>
          </div>
        ))}
      </dl>

      {r.legibility !== "good" && (
        <p className="mt-3 rounded-xl border border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 px-4 py-3 text-sm">
          <b>{r.legibility === "poor" ? "Лист плохо читается." : "Часть листа не читается."}</b>{" "}
          {r.legibility_note} Переснимите лист сверху, при ровном свете, чтобы он занимал весь кадр.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <span className={`rounded-full border px-3 py-1 ${STATUS_STYLE.issue}`}>Замечаний: {groups.issue.length}</span>
        <span className={`rounded-full border px-3 py-1 ${STATUS_STYLE.unsure}`}>Проверить вручную: {groups.unsure.length}</span>
        <span className={`rounded-full border px-3 py-1 ${STATUS_STYLE.ok}`}>В порядке: {groups.ok.length}</span>
      </div>

      <ul className="mt-4 space-y-3">
        {[...groups.issue, ...groups.unsure].map((f) => (
          <FindingCard key={f.rule_id} f={f} />
        ))}
      </ul>

      {(groups.ok.length > 0 || groups.na.length > 0) && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--color-primary)]">
            В порядке и не применимо ({groups.ok.length + groups.na.length})
          </summary>
          <ul className="mt-3 space-y-3">
            {[...groups.ok, ...groups.na].map((f) => (
              <FindingCard key={f.rule_id} f={f} />
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

export function Checker() {
  const [code, setCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [busy, setBusy] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => setCode(storeGet("dc_code")), []);

  useEffect(() => {
    if (!busy) return;
    setElapsed(0);
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [busy]);

  const isPdf = file?.type === "application/pdf";

  function onPick(f: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setRotation(0);
    setResult(null);
    setError("");
    setPreview(f && f.type !== "application/pdf" ? URL.createObjectURL(f) : null);
  }

  async function run() {
    if (!file || busy) return;
    setBusy(true);
    setError("");
    setResult(null);
    storeSet("dc_code", code);
    try {
      let upload: Blob = file;
      let name = file.name;
      if (!isPdf) {
        upload = await prepareImage(file, rotation);
        name = "sheet.jpg";
      } else if (file.size > MAX_BYTES) {
        throw new Error("pdf_large");
      }
      const body = new FormData();
      body.set("code", code);
      body.set("file", upload, name);
      const res = await fetch("/api/drawing-check", { method: "POST", body });
      let data: { result?: CheckResult; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* не JSON — например 504 от платформы */
      }
      if (!res.ok || !data.result) {
        throw new Error(
          data.message ?? (res.status === 504 ? "Проверка заняла слишком долго. Попробуйте ещё раз." : `Ошибка ${res.status}`),
        );
      }
      setResult(data.result);
    } catch (e) {
      const m = e instanceof Error ? e.message : "";
      setError(
        m === "pdf_large"
          ? "PDF больше 4 МБ. Сделайте фото листа или сожмите PDF."
          : m === "too_large"
            ? "Не удалось уменьшить фото до 4 МБ."
            : m || "Что-то пошло не так.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold">
        Код доступа
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          className="mt-1 block w-full max-w-xs rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 font-normal"
        />
      </label>

      <div
        className="mt-5 cursor-pointer rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-white p-6 text-center"
        onClick={() => input.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onPick(e.dataTransfer.files?.[0] ?? null);
        }}
      >
        <input
          ref={input}
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <p className="font-semibold">{file.name}</p>
        ) : (
          <p className="text-[var(--color-text-secondary)]">Нажмите, чтобы выбрать фото или PDF, или перетащите файл сюда</p>
        )}
        <p className="mt-1 text-xs text-[var(--color-muted)]">Один лист. Снимайте строго сверху, лист целиком, при ровном свете.</p>
      </div>

      {preview && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 270) % 360)}
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-semibold"
            >
              ↺ Повернуть влево
            </button>
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-semibold"
            >
              ↻ Повернуть вправо
            </button>
            <span className="text-xs text-[var(--color-muted)]">Лист должен читаться «головой вверх»</span>
          </div>
          <div className="mt-3 flex h-80 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Предпросмотр листа"
              className="max-h-full max-w-full object-contain transition-transform"
              style={{ transform: `rotate(${rotation}deg) scale(${rotation % 180 ? 0.7 : 1})` }}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={run}
        disabled={!file || !code || busy}
        className="mt-5 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-bold text-white disabled:opacity-50"
      >
        {busy ? `Проверяю… ${elapsed} с` : "Проверить лист"}
      </button>
      {busy && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Обычно занимает 30–120 секунд. Не закрывайте страницу.</p>}
      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-4 py-3 text-sm text-[var(--color-danger)]">
          {error}
        </p>
      )}

      {result && <Results r={result} />}
    </div>
  );
}
