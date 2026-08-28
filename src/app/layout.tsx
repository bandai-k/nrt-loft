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
    default: "NRT LOFT | 成田の小さな工房・ショップ",
    template: "%s | NRT LOFT",
  },
  description:
    "成田の旧釣具屋2階、DIYでリノベーションした小さな工房。木と革の名入れ品・ノベルティ・記念品を、ひとつずつ手作業で仕上げています。",
  keywords: [
    "成田 工房",
    "成田 名入れ",
    "成田 ノベルティ",
    "成田 記念品",
    "成田 ハンドメイド",
    "成田 ギフト",
    "NRT LOFT",
    "成田 お土産",
    "漢字 木札",
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
    title: "NRT LOFT | 成田の小さな工房・ショップ",
    description:
      "成田の旧釣具屋2階、小さな工房。間の時間に、形に残るものを。",
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
    title: "NRT LOFT | 成田の小さな工房・ショップ",
    description:
      "成田の旧釣具屋2階、小さな工房。間の時間に、形に残るものを。",
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
