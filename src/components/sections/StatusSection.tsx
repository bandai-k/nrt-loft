// src/components/sections/StatusSection.tsx
"use client";

import Reveal from "@/components/ui/Reveal";

const phases = [
  {
    phase: "Phase 1",
    period: "2月",
    label: "DIYリノベ",
    active: true,
  },
  {
    phase: "Phase 2",
    period: "3月",
    label: "拠点として稼働開始",
    active: false,
  },
  {
    phase: "Phase 3",
    period: "4月〜",
    label: "ワークショップ・時間貸し開始",
    active: false,
  },
];

export default function StatusSection() {
  return (
    <section id="status" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            className="mb-10 text-xl font-bold tracking-wide sm:text-2xl"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            現在のステータス
          </h2>
        </Reveal>

        <Reveal delayMs={150}>
          <div className="grid gap-4 sm:grid-cols-3">
            {phases.map((p) => (
              <div
                key={p.phase}
                className="relative rounded-2xl px-5 py-6 transition-all"
                style={{
                  backgroundColor: p.active
                    ? "var(--color-orbital-steel)"
                    : "var(--color-text-on-steel)",
                  color: p.active
                    ? "var(--color-text-on-steel)"
                    : "var(--color-text-primary)",
                  border: p.active
                    ? "none"
                    : "1px solid var(--color-steel-border)",
                  boxShadow: p.active
                    ? "0 8px 24px rgba(0,0,0,0.15)"
                    : "none",
                }}
              >
                {p.active && (
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold">
                    今ここ
                  </span>
                )}
                <div className="text-xs font-semibold opacity-70">
                  {p.phase}
                  <span className="ml-2">[{p.period}]</span>
                </div>
                <div className="mt-1 text-sm font-semibold sm:text-base">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
