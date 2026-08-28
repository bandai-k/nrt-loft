// src/app/usage/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import SubPageLayout from "@/components/ui/SubPageLayout";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "ご利用方法",
  description: "NRT LOFTのご利用方法ページは現在準備中です。",
  alternates: { canonical: "https://www.nrt-loft.jp/usage" },
  openGraph: {
    title: "ご利用方法 | NRT LOFT",
    description: "ご利用方法ページは現在準備中です。",
    url: "https://www.nrt-loft.jp/usage",
  },
};

export default function UsagePage() {
  return (
    <SubPageLayout>
      <section className="relative mx-auto flex min-h-[70vh] max-w-[720px] flex-col justify-center px-5 py-[80px] md:px-12 md:py-[120px]">
        <SectionLabel>USAGE</SectionLabel>

        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 6vw, 56px)",
            letterSpacing: "0.08em",
            color: "#e8e2d4",
          }}
        >
          ご利用方法
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
          現在準備中です。
          <br />
          詳細はもうしばらくお待ちください。
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className="btn-ghost">
            お問い合わせ
          </Link>
          <Link href="/" className="btn-ghost">
            トップへ戻る
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
