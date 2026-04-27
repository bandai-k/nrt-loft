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
                  {/* Corner decoration */}
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

                  <h3
                    className="mb-3 text-[18px] leading-[1.55] tracking-[0.04em]"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: titleColor,
                      fontWeight: 500,
                    }}
                  >
                    {p.title}
                  </h3>

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

        {/* — ABOUT "BETWEEN TIME" 補足メッセージ */}
        <Reveal delayMs={150}>
          <div className="mt-16 border-t pt-10" style={{ borderColor: "rgba(217,119,6,0.15)" }}>
            <div
              className="mb-6 text-[11px] tracking-[0.35em]"
              style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
            >
              — ABOUT &quot;BETWEEN TIME&quot;
            </div>
            <p
              className="text-[15px] leading-[2.1] tracking-[0.06em] md:text-[16px]"
              style={{
                fontFamily: "var(--font-body)",
                color: "#c8bfa8",
                fontWeight: 300,
              }}
            >
              到着した。でも、まだ早い。
              <br />
              そんな「間(あいだ)」の時間を、
              <br />
              ただの待ち時間ではなく、自分のための時間にする。
            </p>
            <p
              className="mt-6 text-[13px] leading-[2] tracking-[0.05em]"
              style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
            >
              NRT LOFTは、成田で「間」を過ごすための場所でもあります。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
