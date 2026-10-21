// Прокси к Edge Functions чата поддержки Brainura (проект Supabase приложения).
//
// Сайт не знает токенов Telegram: сообщение уходит в ту же функцию, что и из
// приложения (`support-send-message`), она создаёт топик в группе поддержки и
// переводит текст. Анон-ключ Supabase публичный по замыслу, но в репозитории
// (он публичный) его нет — берём из переменной окружения Vercel.

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://bmgnucrpdxqlxxomutwx.supabase.co";

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function notConfigured() {
  return Response.json({ error: "not_configured" }, { status: 503 });
}

export async function callFunction(
  name: "support-send-message" | "support-get-messages",
  body: Record<string, unknown>,
): Promise<Response | null> {
  const key = process.env.SUPABASE_ANON_KEY;
  if (!key) return null;
  return fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

// Лимит по IP «на лету»: serverless-инстансы не делят память, так что это
// защита от дурной руки, а не от ботнета. Жёсткий потолок — длина текста и
// проверка формата device_id.
const hits = new Map<string, number[]>();

export function rateLimited(ip: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
