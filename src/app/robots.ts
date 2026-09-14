// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI の学習目的の収集を拒否する（2026-09-14）。
// 検索エンジン（Googlebot、Bingbot など）の通常のクロールは許可のまま。
// Google-Extended と Applebot-Extended は各社の検索には影響しない
// （Gemini / Apple Intelligence の学習への利用だけを止めるためのトークン）。
// ユーザーの指示で都度ページを取りに来る ChatGPT-User / Claude-User / Perplexity-User は止めない。
const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
  "Bytespider",
  "Amazonbot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "Diffbot",
  "Omgilibot",
  "omgili",
  "ImagesiftBot",
  "Timpibot",
  "PanguBot",
  "img2dataset",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/keystatic"],
      },
      {
        userAgent: AI_TRAINING_BOTS,
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
