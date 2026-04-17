// src/components/PricingSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import PricingCard from "@/components/PricingCard";
import { pricingPlans } from "@/data/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="px-5 py-[60px] md:px-12 md:py-[100px]"
      style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}
    >
      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <SectionLabel>05 · PRICING</SectionLabel>
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
            OPENING CAMPAIGN · 2025
          </div>
        </Reveal>

        <div className="mb-10 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delayMs={i * 100} className="flex">
              <div className="flex w-full">
                <PricingCard plan={plan} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="text-[13px] leading-[1.9] tracking-[0.05em]"
            style={{ color: "#4a3a22", fontFamily: "var(--font-body)" }}
          >
            表記は全て税込み。オープン記念価格は2025年末までの新規ご契約が対象です。
            個別プランのご相談は{" "}
            <a
              href="mailto:hello@nebulab.jp"
              style={{
                color: "#d97706",
                borderBottom: "1px solid rgba(217,119,6,0.4)",
              }}
            >
              hello@nebulab.jp
            </a>{" "}
            まで。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
