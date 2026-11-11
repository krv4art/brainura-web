// Общие константы сайта и ссылки в сторы с метками кампании.

export const SITE_URL = "https://brainura.app";

/** Число языков интерфейса приложения. Источник — список локалей в репо приложения. */
export const APP_LANGUAGES = 41;
/** Игр в приложении у всех (не DevMode-пилоты). */
export const APP_GAMES = 26;

const PLAY_BASE = "https://play.google.com/store/apps/details?id=com.brainura.app";
export const APP_STORE_URL =
  "https://apps.apple.com/app/brain-training-games-brainura/id6793506406";
export const CHROME_URL =
  "https://chromewebstore.google.com/detail/gkdlnpllacgajhhhicnhbgonemjjdcod";

/**
 * Ссылка в Google Play с метками. `utm_*` в самом URL видит Play Console
 * (Статистика → Источники установок), `referrer` уходит в Install Referrer API
 * (Firebase / GA4 приложения). Без меток — главная страница (историческое поведение).
 */
export function playUrl(campaign?: string, medium = "seo"): string {
  if (!campaign) return PLAY_BASE;
  const utm = `utm_source=brainura.app&utm_medium=${medium}&utm_campaign=${campaign}`;
  return `${PLAY_BASE}&${utm}&referrer=${encodeURIComponent(utm)}`;
}
