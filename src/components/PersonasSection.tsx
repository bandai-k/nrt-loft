// src/components/PersonasSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { personas } from "@/data/personas";

export default function PersonasSection() {
  return (
    <section
      id="for-who"
      className="px-5 py-[60px] md:px-12 md:py-[100px]"
      style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}
    >
      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <SectionLabel>02 · FOR WHO</SectionLabel>
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
            こんな方のための場所です
          </h2>
          <div
            className="mb-12 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            TARGET PERSONAS
          </div>
        </Reveal>

        <div className="grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {personas.map((p, i) => (
            <Reveal key={p.id} delayMs={i * 100} className="flex">
              <article
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-sm border border-[rgba(217,119,6,0.18)] bg-[rgba(255,255,255,0.01)] px-6 py-7 transition-colors duration-200 hover:border-neutral-900"
              >
                {/* Corner decoration */}
                <div
                  className="absolute left-0 top-0 h-6 w-6 border-l border-t"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                />

                <div
                  className="mb-4 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  {p.label}
                </div>

                <h3
                  className="mb-3 text-[18px] leading-[1.55] tracking-[0.04em]"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#e8e2d4",
                    fontWeight: 500,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  className="mb-6 text-[13px] leading-[1.9] tracking-[0.04em]"
                  style={{ color: "#7a6a4a" }}
                >
                  {p.description}
                </p>

                <ul className="mt-auto space-y-2">
                  {p.scenarios.map((s) => (
                    <li
                      key={s}
                      className="flex gap-2 text-[12px] leading-[1.7] tracking-[0.04em]"
                      style={{ fontFamily: "var(--font-mono)", color: "#c8bfa8" }}
                    >
                      <span aria-hidden style={{ color: "#92400e" }}>—</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
