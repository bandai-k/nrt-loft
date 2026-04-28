// src/app/commerce-law/page.tsx
import type { Metadata } from "next";
import LegalPageLayout from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "NRT LOFT(運営: Nebulab合同会社)の特定商取引法に基づく表記。販売事業者・所在地・連絡先・支払方法・キャンセル等を掲載予定。",
  alternates: { canonical: "https://www.nrt-loft.jp/commerce-law" },
  robots: { index: true, follow: true },
};

export default function CommerceLawPage() {
  return (
    <LegalPageLayout
      title="特定商取引法に基づく表記"
      lastUpdated="2026年5月オープン時に正式版を掲載予定"
    >
      <section>
        <p>
          現在、本ページは準備中です。NRT LOFT のオープン(2026年5月)に合わせて、
          以下の項目を含む正式版を掲載予定です。
        </p>
        <ul>
          <li>販売事業者(Nebulab合同会社)</li>
          <li>運営責任者</li>
          <li>所在地・連絡先</li>
          <li>販売価格</li>
          <li>商品代金以外の必要料金</li>
          <li>支払方法・支払時期</li>
          <li>商品の引渡時期</li>
          <li>返品・交換・キャンセルに関する事項</li>
        </ul>
        <p>
          ご不明点・お急ぎのご確認は{" "}
          <a href="mailto:hello@nebulab.jp">hello@nebulab.jp</a> までお問い合わせください。
        </p>
      </section>
    </LegalPageLayout>
  );
}
