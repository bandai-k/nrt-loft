// src/components/sections/StatusSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const phases = [
  { label: "DIYリノベ", period: "2月〜4月", active: true },
  { label: "拠点として稼働開始", period: "4月〜", active: false },
  { label: "ワークショップ・時間貸し", period: "5月〜", active: false },
];

function Arrow({ active, isLast }: { active: boolean; isLast: boolean }) {
  const fill = active ? "rgba(217,119,6,0.15)" : "rgba(217,119,6,0.05)";
  const stroke = active ? "rgba(217,119,6,0.6)" : "rgba(217,119,6,0.2)";
  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={isLast
          ? "M6 2 L174 2 L198 30 L174 58 L6 58 L24 30 Z"
          : "M6 2 L174 2 L198 30 L174 58 L6 58 L24 30 Z"
        }
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatusSection() {
  return (
    <section id="status" className="px-5 py-[60px] md:px-12 md:py-[100px]" style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}>
      <div className="mx-auto max-w-[960px]">
        <Reveal><SectionLabel>03 · STATUS</SectionLabel></Reveal>
        <Reveal>
          <h2
            className="mb-12"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 6vw, 48px)",
              letterSpacing: "0.08em",
              color: "#e8e2d4",
            }}
          >
            現在のステータス
          </h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
            {phases.map((p, i) => (
              <div
                key={p.label}
                className="relative flex-1"
                style={{ minHeight: "80px" }}
              >
                <Arrow active={p.active} isLast={i === phases.length - 1} />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-4 text-center">
                  <div className="flex items-center gap-2">
                    {p.active && (
                      <div
                        className="h-[6px] w-[6px] shrink-0 rounded-full"
                        style={{
                          background: "#f59e0b",
                          boxShadow: "0 0 6px #f59e0b",
                          animation: "pulse-now 1.5s infinite",
                        }}
                      />
                    )}
                    <span
                      className="text-[18px] tracking-[0.08em]"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: p.active ? "#f59e0b" : "#6b5a3a",
                      }}
                    >
                      {p.label}
                    </span>
                  </div>
                  <span
                    className="mt-1 text-[10px] tracking-[0.2em]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: p.active ? "#92400e" : "#4a3a22",
                    }}
                  >
                    {p.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
