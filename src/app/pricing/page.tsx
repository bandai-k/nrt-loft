// src/app/pricing/page.tsx
import type { Metadata } from "next";
import SubPageLayout from "@/components/ui/SubPageLayout";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "NRT LOFTの料金プラン。ドロップイン¥1,200/3時間、月額レギュラー¥15,000/月、貸切・法人¥16,500/半日。2026年5〜7月オープン記念キャンペーン実施中。",
  alternates: { canonical: "https://www.nrt-loft.jp/pricing" },
  openGraph: {
    title: "料金プラン | NRT LOFT",
    description:
      "ドロップイン・月額レギュラー・貸切の3プラン。2026年オープン記念キャンペーンを実施中。",
    url: "https://www.nrt-loft.jp/pricing",
  },
};

export default function PricingPage() {
  return (
    <SubPageLayout>
      <PricingSection />
    </SubPageLayout>
  );
}
