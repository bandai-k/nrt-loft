// src/components/PricingSection.tsx
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import PricingCard from "@/components/PricingCard";
import { mainPlans, openingCampaign, pricingNotes } from "@/data/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="section-rhythm relative overflow-hidden px-5 pt-[40px] pb-[80px] md:px-12 md:pt-[64px] md:pb-[140px]"
    >
      <Image
        src="/pricing-bg.png"
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
          <SectionLabel>06 · PRICING</SectionLabel>
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
            料金
          </h2>
          <div
            className="mb-12 text-[11px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
          >
            OPENING CAMPAIGN · {openingCampaign.periodLabel}
          </div>
        </Reveal>

        <div className="mb-10 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {mainPlans.map((plan, i) => (
            <Reveal key={plan.id} delayMs={i * 100} className="flex">
              <div className="flex w-full">
                <PricingCard plan={plan} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="space-y-2 text-[13px] leading-[1.9] tracking-[0.05em]"
            style={{ color: "#4a3a22", fontFamily: "var(--font-body)" }}
          >
            <p>{openingCampaign.endNote}</p>
            {pricingNotes.map((note, i) => {
              const mailMatch = note.match(/(.*?)(hello@nebulab\.jp)(.*)/);
              if (mailMatch) {
                const [, before, mail, after] = mailMatch;
                return (
                  <p key={i}>
                    {before}
                    <a
                      href={`mailto:${mail}`}
                      style={{
                        color: "#d97706",
                        borderBottom: "1px solid rgba(217,119,6,0.4)",
                      }}
                    >
                      {mail}
                    </a>
                    {after}
                  </p>
                );
              }
              return <p key={i}>{note}</p>;
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
