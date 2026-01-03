// src/components/sections/PolicySection.tsx
import Reveal from "@/components/ui/Reveal";

const policyItems = [
  "会議室としての提供はしません（近隣サービスを案内）。",
  "静けさと作業効率を守る設計（人数は増やしすぎない）。",
  "紹介制/小規模運用で、場の空気を維持する。",
];

export default function PolicySection() {
  return (
    <Reveal y={16} durationMs={900}>
      <section
        id="rules"
        className="mx-auto w-full max-w-5xl rounded-2xl px-6 py-6"
        style={{
          border: "1px solid var(--color-steel-border)",
          backgroundColor: "var(--color-steel-surface)",
        }}
      >
        <h2 className="text-lg font-semibold" style={{ color: "var(--color-orbital-steel)" }}>
          運用方針
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-6" style={{ color: "var(--color-text-secondary)" }}>
          {policyItems.map((item, index) => (
            <li key={index}>・{item}</li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
