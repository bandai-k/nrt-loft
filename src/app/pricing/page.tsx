// src/app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import SubPageLayout from "@/components/ui/SubPageLayout";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "価格について",
  description:
    "NRT LOFTショップの価格は商品ページをご覧ください。商品ページは現在準備中です。",
  alternates: { canonical: "https://www.nrt-loft.jp/pricing" },
  openGraph: {
    title: "価格について | NRT LOFT",
    description: "ショップの価格は商品ページをご覧ください。",
    url: "https://www.nrt-loft.jp/pricing",
  },
};

export default function PricingPage() {
  return (
    <SubPageLayout>
      <section className="relative mx-auto flex min-h-[70vh] max-w-[720px] flex-col justify-center px-5 py-[80px] md:px-12 md:py-[120px]">
        <SectionLabel>PRICING</SectionLabel>

        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 6vw, 56px)",
            letterSpacing: "0.08em",
            color: "#e8e2d4",
          }}
        >
          価格について
        </h1>

        <div
          className="mb-8 text-[11px] tracking-[0.4em]"
          style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
        >
          COMING SOON
        </div>

        <p
          className="mb-10 max-w-[520px] text-[14px] leading-[2] tracking-[0.05em] md:text-[15px]"
          style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
        >
          ショップの価格は、商品ページをご覧ください。
          <br />
          商品ページは現在準備中です。
          <br />
          ノベルティ・記念品など個別のご相談は、お問い合わせください。
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/shop" className="btn-ghost">
            SHOPを見る
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
