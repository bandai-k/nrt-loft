// src/components/sections/HeroSection.tsx
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ScrollGuide from "@/components/ui/ScrollGuide";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-[80px] md:px-12 md:py-[120px]"
    >
      {/* Background photo */}
      <Image
        src="/nrt-loft.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
        style={{
          zIndex: 0,
          filter: "saturate(0.85) contrast(1.05) brightness(0.55)",
        }}
        aria-hidden="true"
      />
      {/* Dark gradient overlay for text legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,7,4,0.92) 0%, rgba(10,7,4,0.75) 45%, rgba(10,7,4,0.55) 75%, rgba(10,7,4,0.45) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,7,4,0.4) 0%, transparent 30%, transparent 70%, rgba(10,7,4,0.6) 100%)",
        }}
        aria-hidden="true"
      />
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
            成田の旧釣具屋2階を、DIYでリノベーションした小さな場所。<br />
            「間の時間」を、形にする工房として。
          </p>
        </Reveal>

        <Reveal delayMs={250}>
          <div className="flex flex-wrap gap-4">
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
            2026.X OPEN
          </div>
        </Reveal>
      </div>

      <ScrollGuide
        direction="down"
        targetId="concept"
        size="lg"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-12"
      />
    </section>
  );
}
