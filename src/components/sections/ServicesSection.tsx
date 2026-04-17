// src/components/sections/ServicesSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const services = [
  {
    title: "お店のIT相談",
    desc: "成田エリアの飲食店・小売店の方、気軽にお越しください。",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "少人数ワークショップ",
    desc: "Googleマップの使い方、SNS写真の撮り方など（4〜6名）。",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    title: "時間貸しスペース",
    desc: "作業場として使いたい方に開放予定。",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="service" className="px-5 py-[60px] md:px-12 md:py-[100px]" style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}>
      <div className="mx-auto max-w-[960px]">
        <Reveal><SectionLabel>05 · SERVICE</SectionLabel></Reveal>
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
          <div
            className="mb-12 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            2025年5月〜予定
          </div>
        </Reveal>

        <div className="mb-10 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delayMs={i * 100} className="flex">
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
                <div className="mb-4" style={{ color: "#d97706" }}>{s.icon}</div>
                <div
                  className="mb-2 text-[22px] tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
                >
                  {s.title}
                </div>
                <div
                  className="text-[14px] leading-[1.9] tracking-[0.04em]"
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
              href="https://www.nebulab.jp/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#d97706", borderBottom: "1px solid rgba(217,119,6,0.4)" }}
            >
              NEBULABのサイト
            </a>{" "}
            をご覧ください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
