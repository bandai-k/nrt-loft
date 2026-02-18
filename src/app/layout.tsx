// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";

export const metadata: Metadata = {
  icons: {
    icon: "/nrt-loft-symbol-dark.svg",
  },
  title: "NRT LOFT | 成田の旧釣具屋2階をDIYリノベ中",
  description:
    "成田市の旧山中釣具店2階をDIYでリノベーション中。エンジニアの拠点として、地域のIT相談場所として、小さく始めます。",
  openGraph: {
    title: "NRT LOFT | 成田の旧釣具屋2階をDIYリノベ中",
    description:
      "成田市の旧山中釣具店2階をDIYでリノベーション中。エンジニアの拠点として、地域のIT相談場所として、小さく始めます。",
    url: "https://www.nrt-loft.jp",
    siteName: "NRT LOFT",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NRT LOFT | 成田の旧釣具屋2階をDIYリノベ中",
    description:
      "成田市の旧山中釣具店2階をDIYでリノベーション中。エンジニアの拠点として、地域のIT相談場所として、小さく始めます。",
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
