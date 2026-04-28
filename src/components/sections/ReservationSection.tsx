// src/components/sections/ReservationSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

type Flow = {
  code: string;
  label: string;
  name: string;
  steps: string[];
};

const flows: Flow[] = [
  {
    code: "P-01",
    label: "DROP-IN",
    name: "ドロップイン",
    steps: [
      "お問い合わせフォームから希望日時をご連絡ください(前日までを推奨)",
      "空席状況を確認のうえ、確定メールをお送りします",
      "当日、現地でお支払い(銀行振込・現金)",
    ],
  },
  {
    code: "P-02",
    label: "REGULAR",
    name: "月額レギュラー",
    steps: [
      "「月額レギュラー希望」とお問い合わせフォームへご連絡ください",
      "簡単な面談(オンライン可)のうえ、契約手続きへ",
      "毎月の利用料は銀行振込にて(初月日割り対応)",
    ],
  },
  {
    code: "P-03",
    label: "RESERVED",
    name: "貸切・法人",
    steps: [
      "利用日時・人数・用途を添えてお問い合わせください",
      "お見積もりとご利用条件をご連絡します",
      "ご契約・お支払い後、当日ご利用いただけます",
    ],
  },
];

const policies = [
  {
    label: "PAYMENT",
    title: "お支払い",
    body: "銀行振込・現金。オンライン決済は順次対応予定です。",
  },
  {
    label: "CANCELLATION",
    title: "キャンセルポリシー",
    body: "利用前日までは無料 / 当日キャンセルは料金の50% / 無断キャンセルは全額をお願いします。",
  },
  {
    label: "HOURS",
    title: "営業時間",
    body: "10:00 - 18:00 / 定休日: 不定休(SNS・お問い合わせにてご確認ください)。",
  },
];

export default function ReservationSection() {
  return (
    <section
      id="reservation"
      className="section-rhythm px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]"
    >
      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <SectionLabel>· RESERVATION</SectionLabel>
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
            ご予約・お申し込み
          </h2>
          <p
            className="mb-12 text-[14px] leading-[1.95] tracking-[0.05em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            NRT LOFTのご利用は、形態によって受付方法が異なります。
            <br />
            ご希望のプランを確認のうえ、お問い合わせフォームよりご連絡ください。
          </p>
        </Reveal>

        {/* Flow cards */}
        <div className="mb-16 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {flows.map((f, i) => (
            <Reveal key={f.code} delayMs={i * 100} className="flex">
              <div
                className="relative flex h-full w-full flex-col overflow-hidden rounded-sm px-6 py-7"
                style={{
                  border: "1px solid rgba(217,119,6,0.18)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-6 w-6 border-l border-t"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                />
                <div
                  className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                />

                <div
                  className="mb-2 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  {f.code}
                </div>
                <div
                  className="mb-1 text-[11px] tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  {f.label}
                </div>
                <div
                  className="mb-6 text-[20px] tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
                >
                  {f.name}
                </div>

                <ol className="space-y-3">
                  {f.steps.map((s, idx) => (
                    <li
                      key={s}
                      className="flex gap-3 text-[13px] leading-[1.85] tracking-[0.04em]"
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
              </div>
            </Reveal>
          ))}
        </div>

        {/* Policies */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {policies.map((p, i) => (
            <Reveal key={p.label} delayMs={i * 80}>
              <div
                className="border-t pt-5"
                style={{ borderColor: "rgba(217,119,6,0.2)" }}
              >
                <div
                  className="mb-2 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  — {p.label}
                </div>
                <div
                  className="mb-2 text-[16px] tracking-[0.06em]"
                  style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
                >
                  {p.title}
                </div>
                <p
                  className="text-[13px] leading-[1.95] tracking-[0.04em]"
                  style={{ color: "#7a6a4a" }}
                >
                  {p.body}
                </p>
              </div>
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
              href="/pricing"
              className="btn-ghost"
              style={{ padding: "14px 28px", fontSize: "11px" }}
            >
              料金プランを見る
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
