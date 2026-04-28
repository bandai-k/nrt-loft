// src/app/contact/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import SubPageLayout from "@/components/ui/SubPageLayout";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import LineContactCard from "@/components/LineContactCard";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "お問い合わせ・予約",
  description:
    "NRT LOFT のお問い合わせ・予約フォーム。ドロップイン・月額会員・貸切利用のお申込み、見積依頼、ご相談など。LINE 公式アカウントからもご連絡いただけます。",
  alternates: { canonical: "https://www.nrt-loft.jp/contact" },
  openGraph: {
    title: "お問い合わせ・予約 | NRT LOFT",
    description:
      "メール・LINE どちらでもご連絡いただけます。プラン別の申込フォームをご用意しています。",
    url: "https://www.nrt-loft.jp/contact",
  },
};

export default function ContactPage() {
  return (
    <SubPageLayout>
      <section
        id="contact"
        className="section-rhythm relative overflow-hidden px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]"
      >
        <div className="mx-auto max-w-[960px]">
          {/* Header */}
          <Reveal>
            <SectionLabel>· CONTACT</SectionLabel>
          </Reveal>
          <Reveal>
            <h1
              className="mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 6vw, 48px)",
                letterSpacing: "0.08em",
                color: "#e8e2d4",
              }}
            >
              お問い合わせ・予約
            </h1>
            <p
              className="mb-12 text-[14px] leading-[2] tracking-[0.05em]"
              style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
            >
              ご利用方法に応じて、お問い合わせ方法をお選びください。
            </p>
          </Reveal>

          {/* Top Section: 連絡方法の選択 */}
          <div className="mb-16 grid gap-4 md:grid-cols-2">
            {/* 左: フォーム説明 */}
            <Reveal>
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-sm px-6 py-7 md:px-7 md:py-9"
                style={{
                  border: "1px solid rgba(217,119,6,0.22)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-6 w-6 border-l border-t"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                  aria-hidden="true"
                />

                <div
                  className="mb-2 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  — FORM
                </div>
                <h2
                  className="mb-2 text-[20px] tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#e8e2d4",
                  }}
                >
                  フォームでのお問い合わせ
                </h2>
                <p
                  className="mb-6 text-[13px] leading-[1.95] tracking-[0.04em]"
                  style={{
                    color: "#7a6a4a",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  プラン別の予約・申込はこちらから。
                  <br className="hidden md:block" />
                  内容を確認のうえ、メールでご返信します。
                  法人向けの貸切・正式な見積依頼などにもご利用ください。
                </p>
                <a
                  href="#booking"
                  className="btn-ghost mt-auto self-start"
                  style={{ padding: "12px 22px", fontSize: "11px" }}
                >
                  ↓ フォームへ
                </a>
              </div>
            </Reveal>

            {/* 右: LINE導線 */}
            <Reveal delayMs={120}>
              <LineContactCard />
            </Reveal>
          </div>

          {/* Form Section */}
          <Reveal>
            <div
              id="booking"
              className="mb-6 text-[11px] tracking-[0.4em]"
              style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
            >
              — BOOKING FORM
            </div>
          </Reveal>
          <Reveal>
            <h2
              className="mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(24px, 4vw, 32px)",
                letterSpacing: "0.08em",
                color: "#e8e2d4",
              }}
            >
              予約・申込フォーム
            </h2>
            <p
              className="mb-12 text-[13px] leading-[1.95] tracking-[0.05em]"
              style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
            >
              ご希望のプランをお選びいただき、必要事項をご記入ください。
              <br className="hidden md:block" />
              通常 24 時間以内に運営者よりご返信いたします。
            </p>
          </Reveal>
          <Reveal>
            <Suspense fallback={null}>
              <BookingForm />
            </Suspense>
          </Reveal>

          {/* Footer Section: 決済・利用について */}
          <Reveal>
            <div
              className="mt-16 rounded-sm px-6 py-7 md:px-8 md:py-8"
              style={{
                border: "1px solid rgba(217,119,6,0.18)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <div
                className="mb-3 text-[10px] tracking-[0.35em]"
                style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
              >
                — AFTER YOUR REQUEST
              </div>
              <h3
                className="mb-4 text-[18px] tracking-[0.08em]"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#e8e2d4",
                }}
              >
                ご予約・お申込み後の流れ
              </h3>
              <ol className="mb-5 space-y-3">
                {[
                  "内容確認のため、運営者からメール / LINE でご連絡します(通常24時間以内)。",
                  "月額会員・貸切は Stripe Payment Link をお送りします。決済完了後にSESAME(電子錠)の暗証番号を発行します。",
                  "ドロップインは初回利用時に当地で決済(Square)も可能です。",
                ].map((s, idx) => (
                  <li
                    key={s}
                    className="flex gap-3 text-[13px] leading-[1.9] tracking-[0.04em]"
                    style={{ color: "#c8bfa8" }}
                  >
                    <span
                      className="shrink-0 text-[10px] tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "#d97706",
                        paddingTop: "4px",
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t" style={{ borderColor: "rgba(217,119,6,0.12)" }}>
                <a
                  href="/terms"
                  className="text-[11px] tracking-[0.2em] transition-colors hover:text-amber-500"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#d97706",
                    borderBottom: "1px solid rgba(217,119,6,0.3)",
                  }}
                >
                  利用規約
                </a>
                <a
                  href="/privacy"
                  className="text-[11px] tracking-[0.2em] transition-colors hover:text-amber-500"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#d97706",
                    borderBottom: "1px solid rgba(217,119,6,0.3)",
                  }}
                >
                  プライバシーポリシー
                </a>
                <a
                  href="/commerce-law"
                  className="text-[11px] tracking-[0.2em] transition-colors hover:text-amber-500"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#d97706",
                    borderBottom: "1px solid rgba(217,119,6,0.3)",
                  }}
                >
                  特定商取引法に基づく表記
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SubPageLayout>
  );
}
