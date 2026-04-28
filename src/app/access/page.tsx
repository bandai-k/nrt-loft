// src/app/access/page.tsx
import type { Metadata } from "next";
import SubPageLayout from "@/components/ui/SubPageLayout";
import AccessSection from "@/components/sections/AccessSection";

export const metadata: Metadata = {
  title: "アクセス",
  description:
    "NRT LOFTへのアクセス。千葉県成田市花崎町・旧山中釣具店2階。お問い合わせは hello@nebulab.jp まで。",
  alternates: { canonical: "https://www.nrt-loft.jp/access" },
  openGraph: {
    title: "アクセス | NRT LOFT",
    description: "成田市花崎町・旧山中釣具店2階。",
    url: "https://www.nrt-loft.jp/access",
  },
};

export default function AccessPage() {
  return (
    <SubPageLayout>
      <AccessSection />
    </SubPageLayout>
  );
}
