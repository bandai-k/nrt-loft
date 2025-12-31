// src/app/page.tsx
import Link from "next/link";

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
    {children}
  </span>
);

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-neutral-50 text-neutral-900">
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-6">
        <div className="flex flex-wrap gap-2">
          <Badge>紹介制</Badge>
          <Badge>静かな作業</Badge>
          <Badge>小さな拠点</Badge>
          <Badge>成田駅周辺</Badge>
        </div>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          静かに集中できて、
          <br className="hidden sm:block" />
          つながりの質も守れる場所。
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-neutral-700 sm:text-lg">
          NRT-LOFTは、作業場としての“静けさ”を最優先にした小さな拠点です。
          平日は運営者の作業場として機能しつつ、紹介制でメンバーを少人数に保ちます。
          必要なときに、ちょっとした集まりや学びの場にも変化します。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            利用について相談
          </a>
          <Link
            href="https://nebulab.jp"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            NEBULAB（運営）を見る
          </Link>
        </div>

        <div id="about" className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "コンセプト",
              desc: "“お金を生む人間でい続ける場所”。生活リズムと集中を守るための拠点。",
            },
            {
              title: "サイズ感",
              desc: "小さな空間だからこそ、運用で“快適さ”を担保。混み合わない前提で設計します。",
            },
            {
              title: "コミュニティ",
              desc: "人はつながる。でも、つながりの質は落とさない。紹介制で静かに広げます。",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <div className="text-sm font-semibold">{c.title}</div>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <div id="use" className="mt-14">
          <h2 className="text-lg font-semibold">使い方</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "平日：作業拠点 + 紹介制メンバー利用",
                desc: "基本は9:00–19:00想定。少人数で静かに作業できる状態を優先します。",
              },
              {
                title: "週末：イベント / 小規模な集まり（応相談）",
                desc: "教室・勉強会・ミニイベントなど、空間を活かした使い方を検討できます。",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <div className="text-sm font-semibold">{c.title}</div>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="rules" className="mt-14 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">運用方針</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-700">
            <li>・会議室としての提供はしません（近隣サービスを案内）。</li>
            <li>・静けさと作業効率を守る設計（人数は増やしすぎない）。</li>
            <li>・紹介制/小規模運用で、場の空気を維持する。</li>
          </ul>
        </div>

        <div id="contact" className="mt-14 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            利用希望やイベント相談は、まずメールで。詳細は個別にすり合わせします。
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              href="mailto:hello@nrt-loft.jp"
            >
              hello@nrt-loft.jp にメール
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
              href="#"
            >
              （準備中）利用案内PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
