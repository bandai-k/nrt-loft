// src/components/sections/ServicesSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

type Service = {
  label: string;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    label: "FOCUSED WORK",
    title: "集中作業の場として",
    desc: "3席限定の静かな空間で、深い集中時間を確保。レギュラーメンバー・ドロップインで利用可能。",
  },
  {
    label: "IT CONSULTATION",
    title: "お店のIT相談・コンサル",
    desc: "成田エリアの飲食店・小売店向けに、Googleマップ対策、SNS運用、IT化のご相談を承ります。レギュラーメンバーは回数無制限で対応。",
  },
  {
    label: "TEAM USE / WORKSHOP",
    title: "チーム利用・ワークショップ",
    desc: "少人数のチーム作業、Googleマップやキャッシュレスの使い方ワークショップなどに、半日単位で貸切利用可能。法人登記オプションあり。",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="service"
      className="px-5 py-[60px] md:px-12 md:py-[100px]"
      style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}
    >
      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <SectionLabel>05 · SERVICE</SectionLabel>
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
            できること
          </h2>
          <p
            className="mb-12 text-[14px] leading-[1.9] tracking-[0.05em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            NRT LOFTは、3つの利用シーンに対応します。
          </p>
        </Reveal>

        <div className="mb-10 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.label} delayMs={i * 100} className="flex">
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-sm px-6 py-7"
                style={{
                  border: "1px solid rgba(217,119,6,0.18)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                {/* Corner decoration */}
                <div
                  className="absolute left-0 top-0 h-6 w-6 border-l border-t"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                />
                <div
                  className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                />

                <div
                  className="mb-3 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  — {s.label}
                </div>

                <div
                  className="mb-3 text-[20px] tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
                >
                  {s.title}
                </div>

                <div
                  className="text-[13px] leading-[1.95] tracking-[0.04em]"
                  style={{ color: "#7a6a4a" }}
                >
                  {s.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="text-[14px] tracking-[0.05em]"
            style={{ color: "#4a3a22", fontFamily: "var(--font-body)" }}
          >
            詳しくは{" "}
            <a
              href="#pricing"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              料金
            </a>
            {" / "}
            <a
              href="#contact"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              お問い合わせ
            </a>{" "}
            へ。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
