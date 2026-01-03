// src/components/sections/PolicySection.tsx
import Reveal from "@/components/ui/Reveal";

const policyItems = [
  "会議室としての提供は行いません（必要に応じて近隣サービスを案内します）。",
  "静けさと作業効率を守るため、利用人数は増やしすぎません。",
  "紹介制・小規模運用を前提に、場の空気を大切にします。",
];

export default function PolicySection() {
  return (
    <section
      id="rules"
      aria-labelledby="policy-heading"
      className="
        mx-auto w-full max-w-5xl px-6
        scroll-mt-28
        py-14 sm:py-16
      "
    >
      <Reveal y={14} durationMs={900}>
        <div className="mb-6 sm:mb-8">
          <h2
            id="use-heading"
            className="text-xl font-semibold tracking-wide"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            運用方針
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            NRT-LOFTは「集中できる場所」であり続けるため、以下の方針を大切にしています。
          </p>
        </div>
      </Reveal>

      <Reveal y={16} durationMs={900}>
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            border: "1px solid var(--color-steel-border)",
            backgroundColor: "var(--color-steel-surface)",
          }}
        >


          <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
            {policyItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--color-orbital-steel)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
