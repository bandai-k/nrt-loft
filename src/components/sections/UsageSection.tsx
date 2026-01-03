// src/components/sections/UsageSection.tsx
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const usageItems = [
  {
    title: "平日：作業拠点 + 紹介制メンバー利用",
    desc: "基本は9:00–19:00想定。少人数で静かに作業できる状態を優先します。",
  },
  {
    title: "週末：イベント / 小規模な集まり（応相談）",
    desc: "教室・勉強会・ミニイベントなど、空間を活かした使い方を検討できます。",
  },
];

export default function UsageSection() {
  return (
    <section
      id="use"
      aria-labelledby="use-heading"
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
            使い方
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            平日と週末で、想定している運用のかたちが少し異なります。
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {usageItems.map((item, index) => (
          <Reveal key={item.title} delayMs={index * 140} durationMs={900} y={14}>
            <Card title={item.title} description={item.desc} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
