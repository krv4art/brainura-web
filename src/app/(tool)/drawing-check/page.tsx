import type { Metadata } from "next";
import { Checker } from "./checker";

export const metadata: Metadata = {
  title: "Проверка чертежей",
  robots: { index: false, follow: false, nocache: true },
};

export default function DrawingCheckPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Предпроверка листа чертежа</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Загрузите фото или PDF одного листа. Ассистент пройдёт по чек-листу и покажет, что выглядит
        ошибкой, что не удалось прочитать и что в порядке.
      </p>
      <p className="mt-2 rounded-xl border border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 px-4 py-3 text-sm">
        Это черновая предпроверка, а не нормоконтроль. Чек-лист пока не утверждён экспертом, поэтому
        каждое замечание нужно перепроверить по листу и по нормам.
      </p>
      <Checker />
    </main>
  );
}
