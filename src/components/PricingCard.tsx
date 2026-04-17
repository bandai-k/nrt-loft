// src/components/PricingCard.tsx
import type { PricingPlan } from "@/data/pricing";

type Props = {
  plan: PricingPlan;
};

export default function PricingCard({ plan }: Props) {
  const featured = plan.featured ?? false;

  const cardStyle: React.CSSProperties = featured
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

  const nameColor = "#e8e2d4";
  const taglineColor = featured ? "#d97706" : "#7a6a4a";
  const priceColor = featured ? "#f59e0b" : "#e8e2d4";
  const unitColor = featured ? "#d97706" : "#7a6a4a";
  const originalColor = "#6b5a3a";
  const featureColor = featured ? "#c8bfa8" : "#7a6a4a";
  const dividerColor = featured
    ? "rgba(217,119,6,0.25)"
    : "rgba(217,119,6,0.12)";

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-sm px-6 py-8 md:px-7 md:py-9"
      style={cardStyle}
    >
      {/* Corner decoration */}
      <div
        className="absolute left-0 top-0 h-6 w-6 border-l border-t"
        style={{
          borderColor: featured ? "rgba(245,158,11,0.7)" : "rgba(217,119,6,0.5)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
        style={{
          borderColor: featured ? "rgba(245,158,11,0.7)" : "rgba(217,119,6,0.5)",
        }}
      />

      {/* Badge */}
      {plan.badge && (
        <div
          className="absolute right-4 top-4 px-3 py-1 text-[10px] tracking-[0.25em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#0e0b06",
            background: "#f59e0b",
            borderRadius: "1px",
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Code */}
      <div
        className="mb-3 text-[10px] tracking-[0.35em]"
        style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
      >
        {plan.code}
      </div>

      {/* Name */}
      <div
        className="mb-1 text-[24px] tracking-[0.1em]"
        style={{ fontFamily: "var(--font-heading)", color: nameColor }}
      >
        {plan.name}
      </div>

      {/* Tagline */}
      <div
        className="mb-6 text-[12px] tracking-[0.12em]"
        style={{ fontFamily: "var(--font-mono)", color: taglineColor }}
      >
        {plan.tagline}
      </div>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-2">
        <span
          className="text-[36px] leading-none tracking-[0.02em]"
          style={{ fontFamily: "var(--font-heading)", color: priceColor }}
        >
          {plan.price}
        </span>
        <span
          className="text-[11px] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: unitColor }}
        >
          {plan.priceUnit}
        </span>
      </div>

      {plan.originalPrice && (
        <div
          className="-mt-4 mb-6 text-[11px] tracking-[0.2em] line-through"
          style={{ fontFamily: "var(--font-mono)", color: originalColor }}
        >
          通常 {plan.originalPrice}
        </div>
      )}

      {/* Divider */}
      <div
        className="mb-6 h-px w-full"
        style={{ background: dividerColor }}
      />

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[13px] leading-[1.7] tracking-[0.04em]"
            style={{ color: featureColor }}
          >
            <span
              aria-hidden
              className="mt-[9px] inline-block h-px w-3 shrink-0"
              style={{
                background: featured ? "#d97706" : "rgba(217,119,6,0.5)",
              }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={plan.ctaHref}
        className={featured ? "btn-primary" : "btn-ghost"}
        style={{
          textAlign: "center",
          padding: "12px 24px",
          fontSize: "11px",
        }}
      >
        {plan.cta} →
      </a>
    </div>
  );
}
