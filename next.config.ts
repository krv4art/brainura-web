import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ссылки Арены из приложения Brainura: /d/<КОД> (дуэль) и /c/<номер> (вызов дня).
  // Страница-переходник public/arena.html открывает приложение через intent://
  // или уводит в Google Play. Подробности — docs/arena_web в репозитории приложения.
  async rewrites() {
    return [
      { source: "/d/:code", destination: "/arena.html" },
      { source: "/c/:no", destination: "/arena.html" },
    ];
  },
};

export default nextConfig;
