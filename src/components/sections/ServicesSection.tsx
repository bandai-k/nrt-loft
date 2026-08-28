// src/components/sections/ServicesSection.tsx
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollGuide from "@/components/ui/ScrollGuide";

type Service = {
  label: string;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    label: "SHOP",
    title: "完成品の小さなショップ",
    desc: "工房で作られた、木と革のもの。ひとつひとつ、丁寧に仕上げています。",
  },
  {
    label: "BETWEEN TIME",
    title: "間の時間に立ち寄る",
    desc: "フライト前に、待ち合わせ前に。旅の記念や、誰かへの贈り物を、その場で。",
  },
  {
    label: "LOCAL ORDERS",
    title: "地域からのご注文",
    desc: "お店の周年記念、開店祝い、ノベルティ。成田の事業者の方からのご依頼を承ります。",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="service"
      className="section-rhythm relative overflow-hidden px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]"
    >
      <Image
        src="/service-bg.png"
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
          <SectionLabel>02 · SERVICE</SectionLabel>
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
            できること
          </h2>
          <p
            className="mb-12 text-[14px] leading-[1.9] tracking-[0.05em]"
            style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
          >
            ささやかな工房から、3つの形でお届けします。
          </p>
        </Reveal>

        <div className="mb-10 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.label} delayMs={i * 100} className="flex">
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
                <div
                  className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
                  style={{ borderColor: "rgba(217,119,6,0.5)" }}
                />

                <div
                  className="mb-3 text-[10px] tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
                >
                  — {s.label}
                </div>

                <div
                  className="mb-3 text-[20px] tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
                >
                  {s.title}
                </div>

                <div
                  className="text-[13px] leading-[1.95] tracking-[0.04em]"
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
              href="/shop"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              SHOP
            </a>
            {" / "}
            <a
              href="/contact"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              お問い合わせ
            </a>{" "}
            へ。
          </p>
        </Reveal>
      </div>

      <ScrollGuide
        direction="up"
        targetId="concept"
        size="sm"
        className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:top-6"
      />
    </section>
  );
}
