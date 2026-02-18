// src/components/sections/HeroSection.tsx
import Reveal from "@/components/ui/Reveal";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-[80px] md:px-12 md:py-[120px]"
    >
      {/* Cross-hatch grid background — layered breathing animation */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,119,6,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,6,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          animation: "grid-breathe 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,119,6,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,6,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          animation: "grid-drift 12s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      {/* Amber radial glow */}
      <div
        className="pointer-events-none absolute -bottom-[100px] -right-[100px] h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[800px]">
        <Reveal>
          <div
            className="mb-4 text-[9px] tracking-[0.3em] md:mb-6 md:text-[11px] md:tracking-[0.5em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            — NARITA, CHIBA · DIY RENOVATION PROJECT
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <h1
            className="mb-2 leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 10vw, 110px)",
              letterSpacing: "0.06em",
              color: "#e8e2d4",
            }}
          >
            NRT LOFT
          </h1>
        </Reveal>

        <Reveal delayMs={150}>
          <div
            className="mb-10 opacity-70"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(14px, 3vw, 28px)",
              letterSpacing: "0.15em",
              color: "#d97706",
            }}
          >
            OPEN FLOOR, OPEN MIND
          </div>
        </Reveal>

        <Reveal delayMs={200}>
          <p
            className="mb-8 max-w-[520px] text-[14px] font-light leading-[2.1] tracking-[0.06em] md:mb-12 md:text-[17px]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            成田の旧釣具屋2階を<br />
            DIYでリノベーション中。<br />
            地域に開かれた拠点を作るプロジェクト。
          </p>
        </Reveal>

        <Reveal delayMs={250}>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.instagram.com/nebulab_koki/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Instagramで過程を見る →
            </a>
            <a
              href="https://www.nebulab.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              NEBULABについて
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={300}>
          <div
            className="mt-12 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#4a3a22" }}
          >
            2025.02.15 START
          </div>
        </Reveal>
      </div>
    </section>
  );
}
