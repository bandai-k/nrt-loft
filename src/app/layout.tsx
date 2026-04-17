// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nrt-loft.jp"),
  title: {
    default: "NRT LOFT | 成田の小さなコワーキングスペース",
    template: "%s | NRT LOFT",
  },
  description:
    "成田の旧釣具屋2階、3席だけの集中できるコワーキングスペース。ドロップイン¥700/時〜、月額¥15,000〜。成田駅エリアで静かに働きたいフリーランス・出張者・地域事業者のための場所。",
  keywords: [
    "成田 コワーキング",
    "成田 コワーキングスペース",
    "成田駅 作業スペース",
    "成田 ワーキングスペース",
    "千葉 コワーキング",
    "成田空港 作業",
    "NRT LOFT",
    "成田 ドロップイン",
    "成田 フリーランス",
  ],
  authors: [{ name: "NEBULAB" }],
  creator: "NEBULAB",
  publisher: "NEBULAB",
  icons: {
    icon: "/nrt-loft-symbol-dark.svg",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.nrt-loft.jp",
    siteName: "NRT LOFT",
    title: "NRT LOFT | 成田の小さなコワーキングスペース",
    description:
      "成田の旧釣具屋2階、3席だけの集中できるコワーキングスペース。使うほど、しっくりくる場所。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NRT LOFT - OPEN FLOOR, OPEN MIND",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRT LOFT | 成田の小さなコワーキングスペース",
    description:
      "成田の旧釣具屋2階、3席だけの集中できるコワーキングスペース。",
    images: ["/og-image.png"],
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
    canonical: "https://www.nrt-loft.jp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Noto+Sans+JP:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body>
        <GrainOverlay />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
