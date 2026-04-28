// src/components/sections/ConceptSection.tsx
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollGuide from "@/components/ui/ScrollGuide";
import { personas } from "@/data/personas";

export default function ConceptSection() {
  return (
    <section
      id="concept"
      className="section-rhythm relative overflow-hidden px-5 py-[80px] md:px-12 md:py-[140px]"
    >
      <Image
        src="/concept-bg.png"
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
          <SectionLabel>01 · CONCEPT</SectionLabel>
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
            コンセプト
          </h2>
          <div
            className="mb-12 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            FOR WHO
          </div>
        </Reveal>

        <Reveal>
          <h3
            className="mb-12"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 4vw, 36px)",
              letterSpacing: "0.08em",
              color: "#e8e2d4",
            }}
          >
            こんな方のために
          </h3>
        </Reveal>

        {/* Block 2: Personas */}
        <div className="grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {personas.map((p, i) => {
            const featured = p.featured ?? false;

            const articleStyle: React.CSSProperties = featured
              ? {
                  background: "#0a0704",
                  border: "1px solid rgba(217,119,6,0.55)",
                  boxShadow:
                    "0 0 0 1px rgba(217,119,6,0.08), 0 24px 60px -30px rgba(217,119,6,0.45)",
                }
              : {
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(217,119,6,0.18)",
                };

            const labelColor = featured ? "#f59e0b" : "#92400e";
            const labelJaColor = featured ? "#d97706" : "#7a6a4a";
            const titleColor = "#e8e2d4";
            const descColor = featured ? "#c8bfa8" : "#7a6a4a";
            const scenarioColor = featured ? "#e8e2d4" : "#c8bfa8";
            const dashColor = featured ? "#f59e0b" : "#92400e";
            const cornerColor = featured
              ? "rgba(245,158,11,0.7)"
              : "rgba(217,119,6,0.5)";
            const padding = featured ? "px-7 py-9 md:px-8 md:py-10" : "px-6 py-7";

            return (
              <Reveal key={p.id} delayMs={i * 100} className="flex">
                <article
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-sm ${padding}`}
                  style={articleStyle}
                >
                  <div
                    className="absolute left-0 top-0 h-6 w-6 border-l border-t"
                    style={{ borderColor: cornerColor }}
                  />
                  <div
                    className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
                    style={{ borderColor: cornerColor }}
                  />

                  <div
                    className="mb-1 text-[10px] tracking-[0.35em]"
                    style={{ fontFamily: "var(--font-mono)", color: labelColor }}
                  >
                    {p.label}
                  </div>

                  <div
                    className="mb-4 text-[10px] tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-mono)", color: labelJaColor }}
                  >
                    {p.labelJa}
                  </div>

                  <h4
                    className="mb-3 text-[18px] leading-[1.55] tracking-[0.04em]"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: titleColor,
                      fontWeight: 500,
                    }}
                  >
                    {p.title}
                  </h4>

                  <p
                    className="mb-6 text-[13px] leading-[1.9] tracking-[0.04em]"
                    style={{ color: descColor }}
                  >
                    {p.description}
                  </p>

                  <ul className="mt-auto space-y-2">
                    {p.scenarios.map((s) => (
                      <li
                        key={s}
                        className="flex gap-2 text-[12px] leading-[1.7] tracking-[0.04em]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: scenarioColor,
                        }}
                      >
                        <span aria-hidden style={{ color: dashColor }}>—</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>

      <ScrollGuide
        direction="up"
        targetId="top"
        size="sm"
        className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:top-6"
      />
      <ScrollGuide
        direction="down"
        targetId="service"
        size="sm"
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 md:bottom-6"
      />
    </section>
  );
}
