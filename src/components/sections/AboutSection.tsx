// src/components/sections/AboutSection.tsx
import Card from "@/components/ui/Card";

const aboutItems = [
  {
    title: "コンセプト",
    desc: "「お金を生む人間でい続ける場所」。生活リズムと集中を守るための拠点。",
  },
  {
    title: "サイズ感",
    desc: "小さな空間だからこそ、運用で「快適さ」を担保。混み合わない前提で設計します。",
  },
  {
    title: "コミュニティ",
    desc: "人はつながる。でも、つながりの質は落とさない。紹介制で静かに広げます。",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-5xl px-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {aboutItems.map((item) => (
          <Card key={item.title} title={item.title} description={item.desc} />
        ))}
      </div>
    </section>
  );
}
