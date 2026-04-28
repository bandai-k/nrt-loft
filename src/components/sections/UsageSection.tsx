// src/components/sections/UsageSection.tsx
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

type Step = {
  num: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    num: "01",
    title: "ご予約",
    body: "お問い合わせフォームから希望日時をご連絡ください(前日までを推奨)。月額会員は事前のご連絡不要です。",
  },
  {
    num: "02",
    title: "ご来店",
    body: "営業時間 10:00 - 18:00 内にお越しください。入口の階段から2Fへ。",
  },
  {
    num: "03",
    title: "受付",
    body: "ドロップイン・貸切のご利用はスタッフがご案内します。月額会員は簡単な確認のみ。",
  },
  {
    num: "04",
    title: "ご利用",
    body: "お好きな席で集中作業を。Wi-Fi・電源・セルフドリンクをご自由にお使いください。",
  },
  {
    num: "05",
    title: "ご退店",
    body: "お席を整え、ゴミは分別してご退出ください。",
  },
];

type Facility = {
  label: string;
  title: string;
  body: string;
};

const facilities: Facility[] = [
  {
    label: "WI-FI",
    title: "Wi-Fi",
    body: "全席対応・高速回線。パスワードは現地に掲示しています。",
  },
  {
    label: "POWER",
    title: "電源",
    body: "各席に1口。延長コードもご用意しています。",
  },
  {
    label: "DRINK",
    title: "ドリンク",
    body: "インスタント・ドリップバッグ・ティーバッグ・ミネラルウォーター。全プラン無料・セルフサービス。",
  },
  {
    label: "LOCKER",
    title: "ロッカー",
    body: "月額会員専用の小型ロッカー。常設物の保管にご利用ください。",
  },
];

const rules: string[] = [
  "通話・オンライン会議は声量にご配慮ください(個別ブースは未設置です)。",
  "食事は軽食まで。においの強いものはお控えください。",
  "持込ドリンクは可能ですが、コップは共用品をご利用ください。",
  "写真撮影は他のご利用者が映らないようにご配慮ください。",
  "ペット同伴は基本不可です。",
];

type Faq = {
  q: string;
  a: string;
};

const faqs: Faq[] = [
  {
    q: "当日予約は可能ですか?",
    a: "ドロップインプランは空席状況により可能です。お問い合わせフォームよりご連絡ください。",
  },
  {
    q: "駐車場はありますか?",
    a: "専用駐車場はございません。近隣のコインパーキングをご利用ください。",
  },
  {
    q: "月額会員の家族・友人の同伴は?",
    a: "月1回までゲスト同伴可(無料、要事前連絡)。詳細はお問い合わせください。",
  },
  {
    q: "営業時間外の利用は?",
    a: "月額会員のみ要相談です。プロジェクトの状況によりご対応します。",
  },
  {
    q: "支払い方法は?",
    a: "銀行振込・現金。オンライン決済は順次対応予定です。",
  },
];

export default function UsageSection() {
  return (
    <section
      id="usage"
      className="section-rhythm relative overflow-hidden px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]"
    >
      <Image
        src="/usage-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
        style={{
          zIndex: 0,
          filter: "saturate(0.8) contrast(1.05) brightness(0.45)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,7,4,0.95) 0%, rgba(10,7,4,0.78) 45%, rgba(10,7,4,0.6) 75%, rgba(10,7,4,0.5) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,7,4,0.5) 0%, transparent 25%, transparent 75%, rgba(10,7,4,0.65) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-[960px]">
        <Reveal>
          <SectionLabel>· USAGE</SectionLabel>
        </Reveal>
        <Reveal>
          <h2
            className="mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 6vw, 48px)",
              letterSpacing: "0.08em",
              color: "#e8e2d4",
            }}
          >
            ご利用方法
          </h2>
          <div
            className="mb-6 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            USAGE GUIDE
          </div>
          <p
            className="mb-16 max-w-[680px] text-[14px] leading-[2] tracking-[0.05em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            3席だけの小さなコワーキング。気軽に、しかし丁寧に使っていただくための、
            <br className="hidden md:block" />
            基本のフロー・施設・ルールをまとめています。
          </p>
        </Reveal>

        {/* STEPS */}
        <Reveal>
          <div
            className="mb-6 text-[11px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — STEPS / ご利用の流れ
          </div>
        </Reveal>
        <div className="mb-16 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.num} delayMs={i * 80} className="flex">
              <div
                className="relative flex h-full w-full flex-col rounded-sm px-4 py-5"
                style={{
                  border: "1px solid rgba(217,119,6,0.18)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-4 w-4 border-l border-t"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                  aria-hidden="true"
                />
                <span
                  className="mb-3 text-[10px] tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
                >
                  {s.num}
                </span>
                <h3
                  className="mb-2 text-[15px] tracking-[0.06em]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#e8e2d4",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[12px] leading-[1.85] tracking-[0.04em]"
                  style={{ color: "#7a6a4a" }}
                >
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FACILITIES */}
        <Reveal>
          <div
            className="mb-6 text-[11px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — FACILITIES / 設備
          </div>
        </Reveal>
        <div className="mb-16 grid gap-4 md:grid-cols-2">
          {facilities.map((f, i) => (
            <Reveal key={f.label} delayMs={i * 80}>
              <div
                className="rounded-sm px-5 py-5"
                style={{
                  border: "1px solid rgba(217,119,6,0.18)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  className="mb-2 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  {f.label}
                </div>
                <h3
                  className="mb-2 text-[18px] tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#e8e2d4",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.95] tracking-[0.04em]"
                  style={{ color: "#7a6a4a" }}
                >
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* RULES */}
        <Reveal>
          <div
            className="mb-6 text-[11px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — RULES / お願い
          </div>
        </Reveal>
        <Reveal>
          <ul
            className="mb-16 space-y-3 border-y py-6"
            style={{ borderColor: "rgba(217,119,6,0.15)" }}
          >
            {rules.map((r, i) => (
              <li
                key={i}
                className="flex gap-3 text-[13px] leading-[1.95] tracking-[0.04em]"
                style={{ color: "#c8bfa8" }}
              >
                <span
                  aria-hidden
                  className="shrink-0 text-[12px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#d97706",
                  }}
                >
                  ─
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <div
            className="mb-6 text-[11px] tracking-[0.4em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — FAQ / よくあるご質問
          </div>
        </Reveal>
        <div className="mb-12 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={i} delayMs={i * 60}>
              <details
                className="group rounded-sm px-5 py-4 transition-colors"
                style={{
                  border: "1px solid rgba(217,119,6,0.18)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <summary
                  className="flex cursor-pointer items-start justify-between gap-3 text-[14px] leading-[1.7] tracking-[0.04em]"
                  style={{ color: "#e8e2d4" }}
                >
                  <span>
                    <span
                      className="mr-3 text-[11px] tracking-[0.3em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "#d97706",
                      }}
                    >
                      Q.
                    </span>
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[14px] transition-transform group-open:rotate-45"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "#d97706",
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  className="mt-3 pl-9 text-[13px] leading-[1.95] tracking-[0.04em]"
                  style={{ color: "#7a6a4a" }}
                >
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <a
              href="/contact"
              className="btn-primary"
              style={{ padding: "14px 28px", fontSize: "11px" }}
            >
              お問い合わせフォームへ →
            </a>
            <a
              href="/reservation"
              className="btn-ghost"
              style={{ padding: "14px 28px", fontSize: "11px" }}
            >
              ご予約・お申し込み
            </a>
          </div>
          <p
            className="mt-6 text-[12px] leading-[1.85] tracking-[0.04em]"
            style={{ color: "#6b5a3a", fontFamily: "var(--font-body)" }}
          >
            記載のないご質問は、お気軽に hello@nebulab.jp までお問い合わせください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
