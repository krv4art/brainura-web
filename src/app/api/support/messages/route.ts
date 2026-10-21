import {
  UUID_RE,
  callFunction,
  clientIp,
  notConfigured,
  rateLimited,
} from "../_proxy";

type Upstream = {
  messages?: {
    id: string;
    sender: string;
    display_text: string;
    created_at: string;
  }[];
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const deviceId = typeof body.deviceId === "string" ? body.deviceId : "";
  if (!UUID_RE.test(deviceId)) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (rateLimited(`g:${clientIp(request)}`, 40, 60_000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const res = await callFunction("support-get-messages", {
    device_id: deviceId,
  });
  if (!res) return notConfigured();
  // 404 — беседы ещё нет (человек не писал): пустой список, не ошибка.
  if (res.status === 404) return Response.json({ messages: [] });
  if (!res.ok) return Response.json({ error: "upstream" }, { status: 502 });

  const data = (await res.json()) as Upstream;
  // Наружу — только то, что рисует виджет (без переводов, языков, id беседы).
  const messages = (data.messages ?? []).map((m) => ({
    id: m.id,
    from: m.sender === "user" ? "user" : "support",
    text: m.display_text,
    at: m.created_at,
  }));
  return Response.json({ messages });
}
