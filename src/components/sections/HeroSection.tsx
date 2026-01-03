// src/components/sections/HeroSection.tsx
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景（ゆっくり動くオーブ） */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 left-[-120px] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(88, 120, 160, 0.45), rgba(88, 120, 160, 0.0) 60%)",
            animation: "floatSlow 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-20 right-[-160px] h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(60, 90, 120, 0.35), rgba(60, 90, 120, 0.0) 60%)",
            animation: "floatSlow2 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-180px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(160, 180, 200, 0.22), rgba(160, 180, 200, 0.0) 60%)",
            animation: "floatSlow3 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* 中身 */}
      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 sm:pb-28 sm:pt-16">
        {/* Heroを大きく：min-h */}
        <div className="flex min-h-[72dvh] flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <Badge>紹介制</Badge>
            <Badge>静かな作業</Badge>
            <Badge>小さな拠点</Badge>
            <Badge>成田駅周辺</Badge>
          </div>

          <h1
            className="mt-7 text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            静かに集中できて、
            <br className="hidden sm:block" />
            つながりの質も守れる場所。
          </h1>

          <p
            className="mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            NRT-LOFTは、作業場としての&quot;静けさ&quot;を最優先にした小さな拠点です。
            平日は運営者の作業場として機能しつつ、紹介制でメンバーを少人数に保ちます。
            必要なときに、ちょっとした集まりや学びの場にも変化します。
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" variant="primary">
              利用について相談
            </Button>
            <Button href="https://nebulab.jp" variant="secondary">
              NEBULAB（運営）を見る
            </Button>
          </div>

          {/* 下にスクロール誘導（ふわっと） */}
          <div className="mt-10 flex items-center gap-2 text-xs opacity-70">
            <span style={{ color: "var(--color-text-secondary)" }}>Scroll</span>
            <span className="inline-block" style={{ animation: "nudgeDown 1.4s ease-in-out infinite" }}>
              ↓
            </span>
          </div>
        </div>
      </div>

      {/* keyframes（Tailwind設定いじらず、ここで定義） */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(24px, 18px) scale(1.03); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-26px, 14px) scale(1.04); }
        }
        @keyframes floatSlow3 {
          0%, 100% { transform: translate(-50%, 0px) scale(1); }
          50% { transform: translate(-50%, -18px) scale(1.03); }
        }
        @keyframes nudgeDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
