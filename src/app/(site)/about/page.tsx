// src/app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import CoverImage from "@/components/CoverImage";
import { ABOUT_IMAGE, ABOUT_IMAGE_ALT } from "@/lib/images";
import {
  CTA_LABEL,
  OPERATOR,
  OPERATOR_REPRESENTATIVE,
  OPERATOR_URL,
  SITE_URL,
} from "@/lib/site";

const description =
  "NRT LOFT は、成田の旧釣具屋2階にある小さな場所の名前であり、そこで行われている活動の名前です。運営は Nebulab合同会社。";

export const metadata: Metadata = {
  title: { absolute: "NRT LOFT について｜AIで自分のための道具をつくる" },
  description,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "NRT LOFT について｜NRT LOFT",
    description,
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="NRT LOFT について"
        lead="場所の名前であり、そこで行われている活動の名前です。"
      />

      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        {ABOUT_IMAGE && (
          <CoverImage
            src={ABOUT_IMAGE}
            alt={ABOUT_IMAGE_ALT}
            className="mb-12 aspect-[4/3] w-full rounded-xl md:aspect-[16/9]"
            priority
            sizes="(min-width: 1120px) 1056px, 100vw"
          />
        )}

        <div className="prose">
          <p>
            NRT LOFT は、成田の旧釣具屋2階にある小さな場所の名前です。
            欲しい場所が無かったので、自分たちの手で作り直しました。
          </p>
          <p>
            ここでやっていることも、結局は同じです。
            欲しい道具が無ければ、自分で作る。その過程をそのまま公開しています。
          </p>

          <h2>このサイトで書いていること</h2>
          <p>
            コードが書けなくても、AIと一緒なら
            「自分の困りごとを解決する小さな仕組み」は作れます。
            うまくいったことも、うまくいかなかったことも、同じように残しています。
          </p>
          <p>
            読んでいるうちに「これなら自分にもできそうだ」と思えるところまで
            書くのが目標です。だから、専門用語はできるだけ使いません。
            困りごとのほうから書きます。
          </p>

          <h2>運営</h2>
          <p>
            運営：{OPERATOR}（代表 {OPERATOR_REPRESENTATIVE}）
          </p>
          <p>
            システム・サービス開発のご相談は{" "}
            <a href={OPERATOR_URL} target="_blank" rel="noopener noreferrer">
              NEBULAB
            </a>
            へどうぞ。
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/build" className="btn btn-primary">
            {CTA_LABEL}
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  );
}
