// Какие игры и тесты сайта есть в расширении для Chrome — на их страницах промо-блок показывает
// кнопку «Добавить в Chrome» (решение владельца 14.11.2026).
//
// 🔒 Источник правды — `kExtensionGames` в репо приложения (lib/extension/extension_config.dart).
// Добавили игру в расширение — добавьте её ключ сюда (ключ = английский слаг страницы).

/** Страницы игр (`games.ts`, слаг). */
export const EXTENSION_GAMES = new Set([
  "schulte-tables", // schulteTables
  "quick-math", // quickMath
  "stroop", // stroopTest
  "mind-matrix", // memoryMatrix
  "reflex", // reactionTime
  "upside-down-reading", // upsideDownReading
]);

/** Страницы тестов (`key`) — та же игра, что в расширении. */
export const EXTENSION_TESTS = new Set([
  "schulte-table", // schulteTables
  "stroop-test", // stroopTest
  "reaction-time-test", // reactionTime
]);
