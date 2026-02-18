// src/components/sections/AboutSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function AboutSection() {
  return (
    <section id="about" className="px-5 py-[60px] md:px-12 md:py-[100px]" style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}>
      <div className="mx-auto max-w-[960px]">
        <Reveal><SectionLabel>01 · ABOUT</SectionLabel></Reveal>

        <div className="grid items-start gap-16 md:grid-cols-2">
          {/* Left: Text */}
          <Reveal>
            <h2
              className="mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 5vw, 52px)",
                letterSpacing: "0.08em",
                color: "#e8e2d4",
              }}
            >
              NRT LOFT<br />
              <span style={{ color: "#d97706", fontSize: "0.55em", letterSpacing: "0.2em" }}>とは</span>
            </h2>
            <p
              className="text-[15px] font-light leading-[2.3] tracking-[0.06em]"
              style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
            >
              NRT LOFTは、成田市の旧山中釣具店2階にある約10畳の小さなスペースです。
            </p>
            <p
              className="mt-4 text-[15px] font-light leading-[2.3] tracking-[0.06em]"
              style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
            >
              エンジニアの作業場として、成田エリアのお店の相談場所として、少人数のワークショップ会場として。小さく始めて、ゆくゆくは地域に開かれた拠点にしていきます。
            </p>
          </Reveal>

          {/* Right: Floor plan */}
          <Reveal delayMs={150}>
            <div
              className="relative rounded-sm p-8"
              style={{
                border: "1px solid rgba(217,119,6,0.25)",
                background: "rgba(217,119,6,0.02)",
              }}
            >
              <div
                className="absolute left-4 top-3 text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#4a3a22" }}
              >
                FLOOR PLAN · 2F
              </div>
              <svg width="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="170" y="12" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="6" fill="rgba(217,119,6,0.5)">旧山中釣具店 2F</text>

                {/* Outer walls */}
                <rect x="10" y="20" width="320" height="270" stroke="rgba(217,119,6,0.5)" strokeWidth="2" fill="none" />

                {/* === Left half === */}
                {/* Top-left: WORKSPACE (highlighted) */}
                <rect x="10" y="20" width="145" height="125" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5" fill="rgba(217,119,6,0.06)" />
                <text x="82" y="78" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill="rgba(217,119,6,0.7)" fontWeight="bold">WORK SPACE</text>
                <text x="82" y="92" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="6" fill="rgba(217,119,6,0.5)">10帖</text>
                {/* NOW indicator dot */}
                <circle cx="143" cy="28" r="3" fill="#f59e0b" opacity="0.8" />
                <circle cx="143" cy="28" r="6" stroke="#f59e0b" strokeWidth="0.5" fill="none" opacity="0.3" />

                {/* Bottom-left */}
                <rect x="10" y="155" width="145" height="135" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="rgba(217,119,6,0.02)" />
                {/* 収納 (bottom-left room) */}
                <rect x="110" y="200" width="45" height="45" stroke="rgba(217,119,6,0.2)" strokeWidth="0.6" fill="none" strokeDasharray="3,2" />
                <text x="132" y="226" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="5" fill="rgba(217,119,6,0.25)">収納</text>

                {/* === Center: Stairs / WC === */}
                {/* Staircase */}
                <rect x="155" y="55" width="40" height="90" stroke="rgba(217,119,6,0.3)" strokeWidth="0.8" fill="none" />
                <line x1="155" y1="67" x2="195" y2="67" stroke="rgba(217,119,6,0.15)" strokeWidth="0.5" />
                <line x1="155" y1="79" x2="195" y2="79" stroke="rgba(217,119,6,0.15)" strokeWidth="0.5" />
                <line x1="155" y1="91" x2="195" y2="91" stroke="rgba(217,119,6,0.15)" strokeWidth="0.5" />
                <line x1="155" y1="103" x2="195" y2="103" stroke="rgba(217,119,6,0.15)" strokeWidth="0.5" />
                <line x1="155" y1="115" x2="195" y2="115" stroke="rgba(217,119,6,0.15)" strokeWidth="0.5" />
                <line x1="155" y1="127" x2="195" y2="127" stroke="rgba(217,119,6,0.15)" strokeWidth="0.5" />
                {/* Arrow on stairs (pointing down) */}
                <line x1="175" y1="58" x2="175" y2="140" stroke="rgba(217,119,6,0.3)" strokeWidth="0.6" />
                <polyline points="171,134 175,142 179,134" stroke="rgba(217,119,6,0.3)" strokeWidth="0.6" fill="none" />
                <text x="175" y="152" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="5" fill="rgba(217,119,6,0.3)">STAIRS</text>

                {/* Toilet / 手洗い場 */}
                <rect x="155" y="20" width="40" height="35" stroke="rgba(217,119,6,0.25)" strokeWidth="0.6" fill="none" />
                <text x="175" y="40" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="4.5" fill="rgba(217,119,6,0.3)">WC</text>

                {/* === Right half (merged upper area) === */}
                {/* Top-right + Middle-right: single area with storage */}
                <rect x="195" y="20" width="135" height="170" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="rgba(217,119,6,0.02)" />
                {/* 収納 (right side) */}
                <rect x="290" y="95" width="40" height="95" stroke="rgba(217,119,6,0.2)" strokeWidth="0.6" fill="none" strokeDasharray="3,2" />
                <text x="310" y="146" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="5" fill="rgba(217,119,6,0.25)">収納</text>
                {/* 小屋裏収納 X pattern */}
                <line x1="250" y1="20" x2="330" y2="70" stroke="rgba(217,119,6,0.12)" strokeWidth="0.5" />
                <line x1="330" y1="20" x2="250" y2="70" stroke="rgba(217,119,6,0.12)" strokeWidth="0.5" />
                <text x="290" y="50" textAnchor="middle" fontFamily="'Share Tech Mono', monospace" fontSize="5" fill="rgba(217,119,6,0.3)">小屋裏収納</text>

                {/* Bottom-right */}
                <rect x="195" y="190" width="135" height="100" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="rgba(217,119,6,0.02)" />
              </svg>
              <div
                className="mt-4 text-right text-[10px] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "#4a3a22" }}
              >
                〒286-0033 成田市花崎町
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
