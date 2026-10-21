// Виджет чата показывается только когда на сервере задан ключ Supabase —
// иначе у посетителей была бы кнопка, которая ничего не отправляет.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ enabled: Boolean(process.env.SUPABASE_ANON_KEY) });
}
