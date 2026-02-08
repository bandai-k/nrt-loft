// src/components/sections/ServicesSection.tsx
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

const services = [
  {
    emoji: "\u{1F91D}",
    title: "お店のIT相談",
    description:
      "成田エリアの飲食店・小売店の方、気軽にお越しください",
  },
  {
    emoji: "\u{1F4DA}",
    title: "少人数ワークショップ",
    description:
      "Googleマップの使い方、SNS写真の撮り方など（4〜6名）",
  },
  {
    emoji: "\u{1F4BB}",
    title: "時間貸しスペース",
    description: "作業場として使いたい方に開放予定",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2
            className="mb-3 text-xl font-bold tracking-wide sm:text-2xl"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            できること
          </h2>
          <p
            className="mb-10 text-sm sm:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            2025年4月〜予定
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <p
            className="mb-8 text-sm sm:text-base"
            style={{ color: "var(--color-text-primary)" }}
          >
            NRT LOFTでは、こんなことを予定しています。
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delayMs={150 + i * 100}>
              <div
                className="rounded-2xl px-5 py-6"
                style={{
                  backgroundColor: "var(--color-text-on-steel)",
                  border: "1px solid var(--color-steel-border)",
                }}
              >
                <span className="text-2xl">{s.emoji}</span>
                <h3
                  className="mt-3 text-sm font-semibold sm:text-base"
                  style={{ color: "var(--color-orbital-steel)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-xs leading-relaxed sm:text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={500}>
          <p
            className="mt-10 text-sm sm:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            詳しくは
            <Link
              href="https://www.nebulab.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-orbital-steel)" }}
            >
              NEBULABのサイト
            </Link>
            をご覧ください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
