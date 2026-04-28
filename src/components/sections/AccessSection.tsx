// src/components/sections/AccessSection.tsx
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const infoItems = [
  { label: "ADDRESS", value: "〒286-0033\n千葉県成田市花崎町" },
  { label: "BUILDING", value: "旧山中釣具店 2階" },
  { label: "CONTACT", value: "hello@nebulab.jp" },
];

export default function AccessSection() {
  return (
    <section id="access" className="section-rhythm relative overflow-hidden px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]">
      <Image
        src="/access-bg.png"
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
        <Reveal><SectionLabel>07 · ACCESS</SectionLabel></Reveal>

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

          {/* Right: Google Map */}
          <Reveal delayMs={150}>
            <div className="flex flex-col gap-3">
              <div
                className="relative h-[320px] overflow-hidden rounded-sm md:h-[380px]"
                style={{
                  border: "1px solid rgba(217,119,6,0.25)",
                  boxShadow:
                    "0 0 0 1px rgba(217,119,6,0.08), 0 16px 40px -16px rgba(0,0,0,0.6)",
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=%E5%8D%83%E8%91%89%E7%9C%8C%E6%88%90%E7%94%B0%E5%B8%82%E8%8A%B1%E5%B4%8E%E7%94%BA&z=16&output=embed"
                  title="NRT LOFT の所在地"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                  style={{ border: 0, filter: "grayscale(0.2) contrast(0.95)" }}
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[10px] tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#6b5a3a",
                  }}
                >
                  35.9806° N, 140.3069° E
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%E5%8D%83%E8%91%89%E7%9C%8C%E6%88%90%E7%94%B0%E5%B8%82%E8%8A%B1%E5%B4%8E%E7%94%BA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.2em] transition-colors hover:text-amber-500"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "#d97706",
                    borderBottom: "1px solid rgba(217,119,6,0.4)",
                  }}
                >
                  Google マップで開く →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
