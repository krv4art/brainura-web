// Личный рекорд в localStorage. Хранилище может быть недоступно (приватное окно,
// запрет сайта, превью) — тогда просто без рекорда.

export function loadBest(key: string): number | null {
  try {
    const v = window.localStorage.getItem(`brainura.best.${key}`);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}

/** Сохраняет результат, если он лучше; возвращает текущий рекорд. */
export function saveBest(key: string, value: number, better: "min" | "max"): number {
  const prev = loadBest(key);
  const isBetter = prev === null || (better === "min" ? value < prev : value > prev);
  if (isBetter) {
    try {
      window.localStorage.setItem(`brainura.best.${key}`, String(value));
    } catch {
      /* без хранилища — рекорд живёт до перезагрузки */
    }
    return value;
  }
  return prev;
}
