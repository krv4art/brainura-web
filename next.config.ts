import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ссылки Арены из приложения Brainura: /d/<КОД> (дуэль), /c/<номер> (вызов дня) и /f/<КОД> (приглашение в друзья).
  // Страница-переходник public/arena.html открывает приложение через intent://
  // или уводит в Google Play. Подробности — docs/arena_web в репозитории приложения.
  async rewrites() {
    return [
      { source: "/d/:code", destination: "/arena.html" },
      { source: "/c/:no", destination: "/arena.html" },
      { source: "/f/:code", destination: "/arena.html" },
    ];
  },
};

export default nextConfig;
