// src/components/sections/HeroSection.tsx
import HeroClient, { type HeroSlideFull } from "@/components/hero/HeroClient";

export default function HeroSection() {
  const slides: HeroSlideFull[] = [
    {
      badges: ["紹介制", "静かな作業", "小さな拠点", "成田駅周辺"],
      title: (
        <>
          静かに集中できて、
          <br className="hidden sm:block" />
          つながりの質も守れる場所。
        </>
      ),
      desc: (
        <>
          NRT-LOFTは、作業場としての&quot;静けさ&quot;を最優先にした小さな拠点です。
          平日は運営者の作業場として機能しつつ、紹介制でメンバーを少人数に保ちます。
          必要なときに、ちょっとした集まりや学びの場にも変化します。
        </>
      ),
      primary: { href: "/#contact", label: "利用について相談" },
      secondary: { href: "https://nebulab.jp", label: "NEBULAB（運営）を見る" },
      palette: {
        a: "rgba(88, 120, 160, 0.45)",
        b: "rgba(60, 90, 120, 0.35)",
        c: "rgba(160, 180, 200, 0.22)",
      },
    },
    {
      badges: ["平日運用", "少人数", "集中優先"],
      title: (
        <>
          「混まない」前提で
          <br className="hidden sm:block" />
          快適さを運用で担保する。
        </>
      ),
      desc: (
        <>
          広さではなく、集中できる状態を守ることに投資します。人数を増やしすぎず、
          静けさが維持できる範囲で小さく回します。
        </>
      ),
      primary: { href: "/#use", label: "使い方を見る" },
      secondary: { href: "/#rules", label: "運用方針を見る" },
      palette: {
        a: "rgba(110, 120, 110, 0.35)",
        b: "rgba(70, 90, 80, 0.28)",
        c: "rgba(190, 200, 190, 0.20)",
      },
    },
    {
      badges: ["週末イベント", "勉強会", "ミニ講座"],
      title: (
        <>
          必要なときだけ
          <br className="hidden sm:block" />
          学びと出会いの場になる。
        </>
      ),
      desc: (
        <>
          教室・勉強会・小さなイベントなど、空間を活かした使い方も可能です（応相談）。
          &quot;うるさくならない&quot;形で、ちょうどいい集まりをつくります。
        </>
      ),
      primary: { href: "/#contact", label: "イベント相談する" },
      palette: {
        a: "rgba(150, 120, 95, 0.33)",
        b: "rgba(120, 95, 80, 0.26)",
        c: "rgba(220, 205, 190, 0.22)",
      },
    },
  ];

  return <HeroClient slides={slides} />;
}
