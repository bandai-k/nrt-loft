// src/app/reservation/page.tsx
import type { Metadata } from "next";
import SubPageLayout from "@/components/ui/SubPageLayout";
import AvailabilitySection from "@/components/sections/AvailabilitySection";
import ReservationSection from "@/components/sections/ReservationSection";

export const metadata: Metadata = {
  title: "ご予約・お申し込み",
  description:
    "NRT LOFTのご予約・お申し込み方法。今週の空き状況、ドロップイン・月額レギュラー・貸切利用の各フロー、お支払い、キャンセルポリシーをご案内します。",
  alternates: { canonical: "https://www.nrt-loft.jp/reservation" },
  openGraph: {
    title: "ご予約・お申し込み | NRT LOFT",
    description:
      "今週の空き状況と、ドロップイン・月額・貸切の予約フロー、お支払い・キャンセルポリシー。",
    url: "https://www.nrt-loft.jp/reservation",
  },
};

export default function ReservationPage() {
  return (
    <SubPageLayout>
      <AvailabilitySection />
      <ReservationSection />
    </SubPageLayout>
  );
}
