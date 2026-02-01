// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnderConstructionModal from "@/components/ui/UnderConstructionModal";

export const metadata: Metadata = {
  title: "NRT LOFT",
  description: "成田駅前の小さな拠点。平日は作業場、土日はイベント/レンタル。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        <UnderConstructionModal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
