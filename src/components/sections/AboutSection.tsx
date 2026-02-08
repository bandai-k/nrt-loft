// src/components/sections/AboutSection.tsx
import Reveal from "@/components/ui/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2
            className="mb-10 text-xl font-bold tracking-wide sm:text-2xl"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            NRT LOFTとは
          </h2>
        </Reveal>

        <div className="space-y-6">
          <Reveal delayMs={100}>
            <p
              className="text-sm leading-[1.9] sm:text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              NRT LOFTは、成田市の旧山中釣具店2階にある
              <br className="hidden sm:inline" />
              約10畳の小さなスペースです。
            </p>
          </Reveal>

          <Reveal delayMs={200}>
            <p
              className="text-sm leading-[1.9] sm:text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              2025年2月15日から、
              <br className="sm:hidden" />
              DIYでリノベーションを開始します。
            </p>
          </Reveal>

          <Reveal delayMs={300}>
            <p
              className="text-sm leading-[1.9] sm:text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              エンジニアの作業場として、
              <br className="sm:hidden" />
              成田エリアのお店の相談場所として、
              <br className="sm:hidden" />
              少人数のワークショップ会場として。
            </p>
          </Reveal>

          <Reveal delayMs={400}>
            <p
              className="text-sm leading-[1.9] sm:text-base"
              style={{ color: "var(--color-text-primary)" }}
            >
              小さく始めて、ゆくゆくは地域に開かれた拠点にしていきます。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
