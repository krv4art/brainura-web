#!/usr/bin/env python3
"""Автоиндексация brainura.app через IndexNow (Bing, Яндекс, Seznam и др.).

Запускается GitHub Action'ом после продакшен-деплоя Vercel (.github/workflows/indexnow.yml):
берёт sitemap основного домена и каждого языкового поддомена (хосты — из LOCALES в
src/lib/i18n.ts, без `preview`) и отправляет адреса, у которых <lastmod> не старше
--days дней (или все, с --all). Ключ публичный — файл public/<KEY>.txt, он отдаётся на
всех хостах; на каждый хост — отдельный запрос (IndexNow требует один host на запрос).

Google IndexNow не поддерживает; для Google — sitemap с честным lastmod (Search Console
перечитывает его сам). Google Indexing API для обычных страниц не используем: он только
для вакансий и трансляций, иное Google считает злоупотреблением.
"""
import argparse
import datetime as dt
import json
import pathlib
import re
import sys
import urllib.error
import urllib.request

HOST = "brainura.app"
KEY = "c92dfb39eceb764753a5f8bb42f3ce4a"
I18N = pathlib.Path(__file__).resolve().parents[1] / "src/lib/i18n.ts"


def hosts() -> list[str]:
    """brainura.app + хосты языков из LOCALES (кроме preview)."""
    out = [HOST]
    for line in I18N.read_text(encoding="utf-8").splitlines():
        m = re.search(r'host:\s*"([^"]+)"', line)
        if m and "preview: true" not in line and m.group(1) not in out:
            out.append(m.group(1))
    return out


def submit(host: str, days: int, all_: bool) -> int:
    try:
        with urllib.request.urlopen(f"https://{host}/sitemap.xml", timeout=30) as f:
            xml = f.read().decode()
    except Exception as e:  # поддомен ещё не поднят — не валим остальные
        print(f"{host}: sitemap недоступен ({e})")
        return 1
    entries = re.findall(r"<url>\s*<loc>(.*?)</loc>(.*?)</url>", xml, re.S)
    cutoff = dt.date.today() - dt.timedelta(days=days)
    urls = []
    for loc, rest in entries:
        m = re.search(r"<lastmod>(\d{4}-\d{2}-\d{2})", rest)
        if all_ or (m and dt.date.fromisoformat(m.group(1)) >= cutoff):
            urls.append(loc)
    print(f"{host}: в sitemap {len(entries)}, к отправке {len(urls)}")
    if not urls:
        return 0
    body = json.dumps({"host": host, "key": KEY,
                       "keyLocation": f"https://{host}/{KEY}.txt", "urlList": urls}).encode()
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, method="POST",
                                 headers={"Content-Type": "application/json; charset=utf-8"})
    try:
        with urllib.request.urlopen(req, timeout=30) as f:
            print(f"{host}: IndexNow {f.status}")
            return 0
    except urllib.error.HTTPError as e:
        print(f"{host}: IndexNow {e.code} {e.read().decode()[:300]}")
        return 1


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--days", type=int, default=3)
    p.add_argument("--all", action="store_true")
    a = p.parse_args()
    rc = 0
    for h in hosts():
        rc |= submit(h, a.days, a.all)
    return rc

if __name__ == "__main__":
    sys.exit(main())
