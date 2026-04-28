// src/app/usage/page.tsx
import type { Metadata } from "next";
import SubPageLayout from "@/components/ui/SubPageLayout";
import UsageSection from "@/components/sections/UsageSection";

export const metadata: Metadata = {
  title: "ご利用方法",
  description:
    "NRT LOFT のご利用方法。来店から退店までのフロー、施設の使い方(Wi-Fi・電源・ドリンク・ロッカー)、マナー、よくあるご質問をまとめています。",
  alternates: { canonical: "https://www.nrt-loft.jp/usage" },
  openGraph: {
    title: "ご利用方法 | NRT LOFT",
    description:
      "ご来店フロー、設備、マナー、FAQ。3席だけの小さなコワーキングを気持ちよくご利用いただくためのガイド。",
    url: "https://www.nrt-loft.jp/usage",
  },
};

export default function UsagePage() {
  return (
    <SubPageLayout>
      <UsageSection />
    </SubPageLayout>
  );
}
