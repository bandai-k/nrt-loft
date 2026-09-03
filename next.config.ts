import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 場所としての機能（工房・ショップ・受注・来訪）の停止に伴う恒久リダイレクト
      { source: "/shop", destination: "/", permanent: true },
      { source: "/access", destination: "/about", permanent: true },
      { source: "/pricing", destination: "/", permanent: true },
      { source: "/usage", destination: "/", permanent: true },
      { source: "/reservation", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
