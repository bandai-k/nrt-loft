// src/app/layout.tsx
// ルートレイアウトは html / body とフォント、サイト全体のメタデータだけを持つ。
// ヘッダーとフッターは (site) 側に置いてあるので、
// 管理画面 /keystatic はサイトの外枠に挟まれない。
import "./globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fontBody, fontHeading } from "@/lib/fonts";
import { RSS_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Nebulab合同会社" }],
  creator: "Nebulab合同会社",
  publisher: "Nebulab合同会社",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}${RSS_PATH}` },
  },
  verification: {
    google: "gM9GT0k3DIaLEwmLyaRDGOR2Aau2CGar-91jbYKxrEg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${fontHeading.variable} ${fontBody.variable}`}
    >
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
