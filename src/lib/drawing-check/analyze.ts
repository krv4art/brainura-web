import Anthropic from "@anthropic-ai/sdk";
import { RULES, rulesAsPrompt } from "./rules";

// Провайдер: glm (по умолчанию, z.ai) или anthropic. Переключение — CHECKER_PROVIDER.
//  glm:       GLM_API_KEY, модель GLM_VISION_MODEL (по умолчанию glm-4.5v). 🔒 Текстовые glm-5.x
//             картинки НЕ видят (проверено 12.11: «не вижу изображения», токены картинки не
//             считаются) — зрячая только glm-4.5v; glm-5v-turbo не входит в тариф ключа.
//  anthropic: ANTHROPIC_API_KEY, модель CHECKER_MODEL (по умолчанию claude-opus-5-5).
type Provider = "glm" | "anthropic";
const PROVIDER: Provider = process.env.CHECKER_PROVIDER === "anthropic" ? "anthropic" : "glm";
const MODEL = process.env.CHECKER_MODEL || "claude-opus-5-5";
const GLM_MODEL = process.env.GLM_VISION_MODEL || "glm-4.5v";
const GLM_BASE_URL = "https://api.z.ai/api/anthropic";

export function providerConfigured(): boolean {
  return PROVIDER === "glm" ? !!process.env.GLM_API_KEY : !!process.env.ANTHROPIC_API_KEY;
}

export type Status = "ok" | "issue" | "unsure" | "na";

export interface Finding {
  rule_id: string;
  status: Status;
  severity: "high" | "medium" | "low";
  location: string;
  evidence: string;
  problem: string;
  suggestion: string;
}

export interface CheckResult {
  sheet: {
    title: string;
    scale: string;
    stage: string;
    sheet_no: string;
    sheets_total: string;
    code: string;
  };
  legibility: "good" | "partial" | "poor";
  legibility_note: string;
  findings: Finding[];
  summary: string;
}

const str = { type: "string" } as const;

// Структурный вывод: все поля обязательны, additionalProperties: false.
const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["sheet", "legibility", "legibility_note", "findings", "summary"],
  properties: {
    sheet: {
      type: "object",
      additionalProperties: false,
      required: ["title", "scale", "stage", "sheet_no", "sheets_total", "code"],
      properties: { title: str, scale: str, stage: str, sheet_no: str, sheets_total: str, code: str },
    },
    legibility: { type: "string", enum: ["good", "partial", "poor"] },
    legibility_note: str,
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["rule_id", "status", "severity", "location", "evidence", "problem", "suggestion"],
        properties: {
          rule_id: { type: "string", enum: RULES.map((r) => r.id) },
          status: { type: "string", enum: ["ok", "issue", "unsure", "na"] },
          severity: { type: "string", enum: ["high", "medium", "low"] },
          location: str,
          evidence: str,
          problem: str,
          suggestion: str,
        },
      },
    },
    summary: str,
  },
} as const;

const SYSTEM = `Ты — ассистент предварительной проверки листов рабочих чертежей (проектная документация, Украина). Ты помогаешь инженеру найти формальные и очевидные ошибки до сдачи на нормоконтроль. Ты НЕ заменяешь нормоконтроль и не подписываешь ничего.

Правила работы:
1. Сначала определи, читаем ли лист. Лист может быть сфотографирован под углом или повёрнут на 90° — мысленно поверни его. Если часть листа нечитаема, честно скажи об этом в legibility_note и ставь "unsure" там, где не смог прочитать. Не додумывай то, чего не видно.
2. Пройди по КАЖДОМУ правилу из списка ниже и верни по нему ровно одну запись в findings (rule_id из списка). Статусы: "ok" — проверено, нарушений нет; "issue" — нарушение найдено; "unsure" — не удалось прочитать или нужно решение специалиста; "na" — правило к этому листу не применимо.
3. Для "issue" в evidence обязательно дословно процитируй текст/значение с листа, на котором основано замечание, а в location укажи, где оно находится (например «штамп, правый нижний угол», «план, ось 3/Б»). Если подтвердить цитатой не можешь — это не "issue", а "unsure".
4. Не выдумывай номера пунктов и формулировки норм. В problem и suggestion опирайся только на то, что видишь на листе и на текст самого правила. Источник правила уже известен системе.
5. Не оценивай расстояния и размеры на плане «на глаз». Арифметику размеров считай только по прочитанным числам и показывай слагаемые.
6. Пиши по-русски; цитаты с листа оставляй на языке оригинала (украинский). Поля, где сказать нечего, заполняй пустой строкой.
7. В summary — 2–4 предложения: что за лист, общее впечатление, главные замечания. Если лист плохо читаем, начни с этого.

Правила проверки:
${rulesAsPrompt()}`;

const GLM_FORMAT = `

ФОРМАТ ОТВЕТА. Верни ТОЛЬКО один JSON-объект, без markdown, без пояснений до и после. Внутри строк не используй двойные кавычки (для цитат бери «ёлочки»), переносы строк заменяй пробелами. В findings ровно ${RULES.length} записей — по одной на каждое правило из списка. Структура:
{"sheet":{"title":"","scale":"","stage":"","sheet_no":"","sheets_total":"","code":""},"legibility":"good|partial|poor","legibility_note":"","findings":[{"rule_id":"STAMP-01","status":"ok|issue|unsure|na","severity":"high|medium|low","location":"","evidence":"","problem":"","suggestion":""}],"summary":""}`;

const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const pick = <T extends string>(v: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(v as T) ? (v as T) : fallback;

// Слабая модель может вернуть неполный JSON: достраиваем недостающее, чтобы страница не падала,
// и помечаем пропущенные правила как «проверить вручную» (молча «ok» не ставим никогда).
function normalize(raw: unknown): CheckResult {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, any>;
  const sh = (o.sheet && typeof o.sheet === "object" ? o.sheet : {}) as Record<string, unknown>;
  const given = new Map<string, Finding>();
  for (const f of Array.isArray(o.findings) ? o.findings : []) {
    const id = s(f?.rule_id);
    if (!RULES.some((r) => r.id === id) || given.has(id)) continue;
    const status = pick(f.status, ["ok", "issue", "unsure", "na"] as const, "unsure");
    const evidence = s(f.evidence);
    given.set(id, {
      rule_id: id,
      // «Замечание» без цитаты с листа не принимаем: это правило промпта, проверяем в коде.
      status: status === "issue" && !evidence.trim() ? "unsure" : status,
      severity: pick(f.severity, ["high", "medium", "low"] as const, "medium"),
      location: s(f.location),
      evidence,
      problem: s(f.problem),
      suggestion: s(f.suggestion),
    });
  }
  const findings = RULES.map(
    (r) =>
      given.get(r.id) ?? {
        rule_id: r.id,
        status: "unsure" as const,
        severity: r.severity,
        location: "",
        evidence: "",
        problem: "Модель не вернула результат по этому правилу.",
        suggestion: "Проверьте вручную.",
      },
  );
  return {
    sheet: {
      title: s(sh.title),
      scale: s(sh.scale),
      stage: s(sh.stage),
      sheet_no: s(sh.sheet_no),
      sheets_total: s(sh.sheets_total),
      code: s(sh.code),
    },
    legibility: pick(o.legibility, ["good", "partial", "poor"] as const, "partial"),
    legibility_note: s(o.legibility_note),
    findings,
    summary: s(o.summary),
  };
}

function extractJson(text: string): unknown {
  const a = text.indexOf("{");
  const b = text.lastIndexOf("}");
  if (a < 0 || b <= a) throw new Error("no json");
  return JSON.parse(text.slice(a, b + 1));
}

async function analyzeWithGlm(data: Buffer, mediaType: string, kind: InputKind): Promise<CheckResult> {
  if (kind === "pdf") throw new CheckError("bad_type", "GLM читает только изображения: сделайте фото или скриншот листа.");
  const client = new Anthropic({
    apiKey: process.env.GLM_API_KEY,
    baseURL: GLM_BASE_URL,
    timeout: 240_000,
    maxRetries: 0,
  });
  const content = [
    {
      type: "image" as const,
      source: { type: "base64" as const, media_type: mediaType as "image/jpeg" | "image/png" | "image/webp" | "image/gif", data: data.toString("base64") },
    },
    { type: "text" as const, text: "Проверь этот лист по всем правилам и верни результат в заданном формате." },
  ];

  let lastText = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    const message = await client.messages.create({
      model: GLM_MODEL,
      max_tokens: 8000,
      // z.ai принимает это поле; без него глм-модели с «мышлением» тратят минуты и токены.
      thinking: { type: "disabled" },
      system: SYSTEM + GLM_FORMAT,
      messages: [{ role: "user", content }],
    });
    lastText = message.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    try {
      return normalize(extractJson(lastText));
    } catch {
      // один повтор: слабая модель иногда ломает JSON кавычками или обрывает ответ
    }
  }
  console.error("drawing-check: glm returned unparsable output", lastText.slice(0, 300));
  throw new CheckError("bad_json", "Модель вернула ответ в неверном формате. Попробуйте ещё раз.");
}

export type InputKind = "image" | "pdf";

export async function analyzeSheet(data: Buffer, mediaType: string, kind: InputKind): Promise<CheckResult> {
  if (PROVIDER === "glm") return analyzeWithGlm(data, mediaType, kind);
  const client = new Anthropic(); // ключ — из ANTHROPIC_API_KEY
  const b64 = data.toString("base64");

  const fileBlock =
    kind === "pdf"
      ? ({
          type: "document" as const,
          source: { type: "base64" as const, media_type: "application/pdf" as const, data: b64 },
        })
      : ({
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: mediaType as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
            data: b64,
          },
        });

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    betas: ["server-side-fallback-2026-07-01"],
    // При отказе классификатора безопасности API сам повторит запрос на запасной модели.
    fallbacks: "default",
    thinking: { type: "adaptive" },
    output_config: { effort: "high", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: [fileBlock, { type: "text", text: "Проверь этот лист по всем правилам и верни результат в заданном формате." }],
      },
    ],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") throw new CheckError("refusal", "Модель отказалась анализировать этот файл.");
  if (message.stop_reason === "max_tokens") throw new CheckError("truncated", "Ответ обрезан. Попробуйте файл меньшего размера или один лист.");

  const text = message.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new CheckError("empty", "Пустой ответ модели.");

  let parsed: CheckResult;
  try {
    parsed = JSON.parse(text.text) as CheckResult;
  } catch {
    throw new CheckError("bad_json", "Не удалось разобрать ответ модели.");
  }
  return parsed;
}

export class CheckError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}
