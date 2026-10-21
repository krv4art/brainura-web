import {
  UUID_RE,
  callFunction,
  clientIp,
  rateLimited,
} from "../_proxy";

const MAX_TEXT = 2000;

// Форма «Что улучшить?» в расширении Chrome шлёт сюда со страницы
// chrome-extension://<id>: без CORS браузер откажет. Разрешаем только такие
// источники (id расширения в Web Store и у распакованной копии разные).
function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") ?? "";
  if (!/^chrome-extension:\/\/[a-p]{32}$/.test(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

function reply(request: Request, body: unknown, status = 200) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply(request, { error: "bad_request" }, 400);
  }

  const deviceId = typeof body.deviceId === "string" ? body.deviceId : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const locale =
    typeof body.locale === "string"
      ? body.locale.toLowerCase().split(/[-_]/)[0].slice(0, 5)
      : "en";
  const page = typeof body.page === "string" ? body.page.slice(0, 80) : "/";

  // Приманка для ботов: поле невидимо для людей.
  if (typeof body.website === "string" && body.website !== "") {
    return reply(request, { ok: true });
  }
  if (!UUID_RE.test(deviceId) || text.length < 1 || text.length > MAX_TEXT) {
    return reply(request, { error: "bad_request" }, 400);
  }
  const ip = clientIp(request);
  if (rateLimited(`m:${ip}`, 5, 60_000) || rateLimited(`h:${ip}`, 40, 3_600_000)) {
    return reply(request, { error: "rate_limited" }, 429);
  }

  const res = await callFunction("support-send-message", {
    device_id: deviceId,
    text,
    locale,
    device_info: {
      Platform: "Website",
      Source: "brainura.vercel.app",
      Page: page,
      Browser: (request.headers.get("user-agent") ?? "").slice(0, 160),
    },
  });
  if (!res) return reply(request, { error: "not_configured" }, 503);
  if (!res.ok) {
    return reply(request, { error: "upstream" }, 502);
  }
  return reply(request, { ok: true });
}
