import type { NextConfig } from "next";
import { TDM_POLICY_URL } from "./src/lib/site";

const nextConfig: NextConfig = {
  async headers() {
    // AI の学習目的の利用を拒否する（2026-09-14）。画像や静的ファイルも含めた全ルートに付ける。
    // noindex は付けない（検索エンジンへの掲載はこれまでどおり）。
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noai, noimageai" },
          { key: "tdm-reservation", value: "1" },
          { key: "tdm-policy", value: TDM_POLICY_URL },
        ],
      },
    ];
  },
  async redirects() {
    // 場所としての機能（工房・ショップ・受注・来訪）の停止に伴う恒久リダイレクト。
    // permanent: true は 308 になるため、301 を明示する。
    return [
      { source: "/shop", destination: "/", statusCode: 301 },
      { source: "/access", destination: "/about", statusCode: 301 },
      { source: "/pricing", destination: "/", statusCode: 301 },
      { source: "/usage", destination: "/", statusCode: 301 },
      { source: "/reservation", destination: "/contact", statusCode: 301 },
    ];
  },
};

export default nextConfig;
