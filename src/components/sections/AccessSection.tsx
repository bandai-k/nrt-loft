// src/components/sections/AccessSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const infoItems = [
  { label: "ADDRESS", value: "〒286-0033\n千葉県成田市花崎町" },
  { label: "BUILDING", value: "旧山中釣具店 2階" },
  { label: "CONTACT", value: "hello@nebulab.jp" },
];

export default function AccessSection() {
  return (
    <section id="access" className="px-5 py-[60px] md:px-12 md:py-[100px]" style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}>
      <div className="mx-auto max-w-[960px]">
        <Reveal><SectionLabel>06 · ACCESS</SectionLabel></Reveal>

        <div className="grid items-start gap-16 md:grid-cols-2">
          {/* Left: Info */}
          <Reveal>
            <h2
              className="mb-10"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 6vw, 48px)",
                letterSpacing: "0.08em",
                color: "#e8e2d4",
              }}
            >
              アクセス
            </h2>
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="mb-7 pb-7"
                style={{ borderBottom: "1px solid rgba(217,119,6,0.1)" }}
              >
                <div
                  className="mb-2 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  {item.label}
                </div>
                <div
                  className="whitespace-pre-line text-[15px] leading-[1.8] tracking-[0.06em]"
                  style={{ color: "#c8bfa8" }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </Reveal>

          {/* Right: Map placeholder */}
          <Reveal delayMs={150}>
            <div
              className="relative flex h-[300px] flex-col items-center justify-center gap-3 overflow-hidden rounded-sm"
              style={{
                border: "1px solid rgba(217,119,6,0.2)",
                background: "rgba(217,119,6,0.02)",
              }}
            >
              {/* Grid pattern */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(217,119,6,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(217,119,6,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Location pin icon */}
              <svg className="relative z-10 h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div
                className="relative z-10 text-[12px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
              >
                NARITA, CHIBA
              </div>
              <div
                className="relative z-10 text-[10px] tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)", color: "#4a3a22" }}
              >
                35.9806° N, 140.3069° E
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
