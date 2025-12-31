// src/components/sections/HeroSection.tsx
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-6">
      <div className="flex flex-wrap gap-2">
        <Badge>紹介制</Badge>
        <Badge>静かな作業</Badge>
        <Badge>小さな拠点</Badge>
        <Badge>成田駅周辺</Badge>
      </div>

      <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: "var(--color-orbital-steel)" }}>
        静かに集中できて、
        <br className="hidden sm:block" />
        つながりの質も守れる場所。
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
        NRT-LOFTは、作業場としての"静けさ"を最優先にした小さな拠点です。
        平日は運営者の作業場として機能しつつ、紹介制でメンバーを少人数に保ちます。
        必要なときに、ちょっとした集まりや学びの場にも変化します。
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="#contact" variant="primary">
          利用について相談
        </Button>
        <Button href="https://nebulab.jp" variant="secondary">
          NEBULAB（運営）を見る
        </Button>
      </div>
    </section>
  );
}
