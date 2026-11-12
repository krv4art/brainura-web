import { timingSafeEqual } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { analyzeSheet, CheckError, providerConfigured, type InputKind } from "@/lib/drawing-check/analyze";

// Один запрос = один лист. Анализ идёт 30–120 с, поэтому лимит времени поднят до
// максимума Hobby-плана (300 с, Fluid compute). Тело запроса Vercel режет на 4,5 МБ:
// страница заранее уменьшает фото, PDF принимаем до 4 МБ.
export const maxDuration = 300;

const MAX_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

// 🔒 Страница закрыта от индексации, но её адрес может утечь, а каждый вызов стоит денег:
// без кода доступа (DRAWING_CHECK_CODE) эндпоинт не работает вообще.
function codeOk(given: string): boolean {
  const expected = process.env.DRAWING_CHECK_CODE ?? "";
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Лимит по IP в памяти инстанса: не защита, а предохранитель от случайного цикла.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (recent.length >= 20) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });

export async function POST(request: Request) {
  if (!process.env.DRAWING_CHECK_CODE || !providerConfigured()) {
    return json({ error: "not_configured", message: "Сервис ещё не настроен." }, 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "bad_request", message: "Не удалось прочитать запрос." }, 400);
  }

  if (!codeOk(String(form.get("code") ?? ""))) {
    return json({ error: "forbidden", message: "Неверный код доступа." }, 403);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return json({ error: "rate_limited", message: "Слишком много проверок за час." }, 429);

  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "bad_request", message: "Файл не приложен." }, 400);
  if (file.size === 0 || file.size > MAX_BYTES) {
    return json({ error: "too_large", message: "Файл пустой или больше 4 МБ." }, 413);
  }

  const isPdf = file.type === "application/pdf";
  if (!isPdf && !IMAGE_TYPES.has(file.type)) {
    return json({ error: "bad_type", message: "Нужен JPEG, PNG, WebP или PDF." }, 415);
  }
  const kind: InputKind = isPdf ? "pdf" : "image";

  try {
    const result = await analyzeSheet(Buffer.from(await file.arrayBuffer()), file.type, kind);
    return json({ result });
  } catch (e) {
    if (e instanceof CheckError) return json({ error: e.code, message: e.message }, 422);
    if (e instanceof Anthropic.RateLimitError) {
      return json({ error: "busy", message: "Сервис модели перегружен, повторите через минуту." }, 429);
    }
    if (e instanceof Anthropic.APIError) {
      // Тело ошибки может содержать детали запроса — наружу не отдаём, только в лог.
      console.error("drawing-check: anthropic error", e.status, e.message);
      return json({ error: "upstream", message: "Ошибка сервиса модели." }, 502);
    }
    console.error("drawing-check: unexpected", e);
    return json({ error: "internal", message: "Внутренняя ошибка." }, 500);
  }
}
