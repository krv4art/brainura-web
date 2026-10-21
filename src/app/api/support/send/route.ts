import {
  UUID_RE,
  callFunction,
  clientIp,
  notConfigured,
  rateLimited,
} from "../_proxy";

const MAX_TEXT = 2000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
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
    return Response.json({ ok: true });
  }
  if (!UUID_RE.test(deviceId) || text.length < 1 || text.length > MAX_TEXT) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const ip = clientIp(request);
  if (rateLimited(`m:${ip}`, 5, 60_000) || rateLimited(`h:${ip}`, 40, 3_600_000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
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
  if (!res) return notConfigured();
  if (!res.ok) {
    return Response.json({ error: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
