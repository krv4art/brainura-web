import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Два корневых layout — (en) и [lang] (поддомены языков) — значит 404 общий, отдельным файлом.
  experimental: { globalNotFound: true },
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
  // Universal Links iOS: файл без расширения Next отдал бы как octet-stream,
  // а Apple ждёт JSON. Team ID и bundle ID — в docs/arena_web/README.md приложения.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
