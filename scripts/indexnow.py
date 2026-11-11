#!/usr/bin/env python3
"""Автоиндексация brainura.app через IndexNow (Bing, Яндекс, Seznam и др.).

Запускается GitHub Action'ом после продакшен-деплоя Vercel (.github/workflows/indexnow.yml):
берёт https://brainura.app/sitemap.xml и отправляет адреса, у которых <lastmod> не старше
--days дней (или все, с --all). Ключ публичный — файл public/<KEY>.txt.

Google IndexNow не поддерживает; для Google — sitemap с честным lastmod (Search Console
перечитывает его сам). Google Indexing API для обычных страниц не используем: он только
для вакансий и трансляций, иное Google считает злоупотреблением.
"""
import argparse
import datetime as dt
import json
import re
import sys
import urllib.request

HOST = "brainura.app"
KEY = "c92dfb39eceb764753a5f8bb42f3ce4a"


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--days", type=int, default=3)
    p.add_argument("--all", action="store_true")
    a = p.parse_args()

    with urllib.request.urlopen(f"https://{HOST}/sitemap.xml", timeout=30) as f:
        xml = f.read().decode()
    entries = re.findall(r"<url>\s*<loc>(.*?)</loc>(.*?)</url>", xml, re.S)
    cutoff = dt.date.today() - dt.timedelta(days=a.days)
    urls = []
    for loc, rest in entries:
        m = re.search(r"<lastmod>(\d{4}-\d{2}-\d{2})", rest)
        if a.all or (m and dt.date.fromisoformat(m.group(1)) >= cutoff):
            urls.append(loc)
    print(f"в sitemap {len(entries)}, к отправке {len(urls)}")
    if not urls:
        return 0
    body = json.dumps({"host": HOST, "key": KEY,
                       "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode()
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, method="POST",
                                 headers={"Content-Type": "application/json; charset=utf-8"})
    try:
        with urllib.request.urlopen(req, timeout=30) as f:
            print("IndexNow:", f.status)
            return 0
    except urllib.error.HTTPError as e:
        print("IndexNow:", e.code, e.read().decode()[:300])
        return 1


if __name__ == "__main__":
    sys.exit(main())
