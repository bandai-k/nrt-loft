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
    <section id="use" className="mx-auto w-full max-w-5xl px-6">
      <Reveal>
        <h2 className="text-lg font-semibold" style={{ color: "var(--color-orbital-steel)" }}>
          使い方
        </h2>
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {usageItems.map((item, index) => (
          <Reveal key={item.title} delayMs={index * 140} durationMs={900} y={14}>
            <Card title={item.title} description={item.desc} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
