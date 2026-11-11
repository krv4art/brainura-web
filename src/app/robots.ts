import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt (SEO_PLAN §2, шаг 0.2). Закрыто только служебное /api/.
// 🔒 Ссылки Арены (/d/, /c/, /f/ → arena.html) и /extension/* закрыты meta noindex,
// а НЕ здесь: запрет в robots.txt не даёт роботу увидеть noindex, а ботам превью
// (Twitterbot соблюдает robots.txt) — нарисовать карточку ссылки дуэли.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
