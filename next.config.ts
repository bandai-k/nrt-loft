import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
