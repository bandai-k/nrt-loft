// src/components/hero/HeroClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import HeroBackground from "@/components/hero/HeroBackground";
import HeroSlider from "@/components/hero/HeroSlider";
import type { HeroSlideData } from "@/components/hero/HeroSlide";

type OrbPalette = { a: string; b: string; c: string };
export type HeroSlideFull = HeroSlideData & { palette: OrbPalette };

type Props = { slides: HeroSlideFull[] };

export default function HeroClient({ slides }: Props) {
  // ✅ internalIndex: 0..(n+1) で動く（0=最後のクローン, n+1=最初のクローン）
  const [internalIndex, setInternalIndex] = useState(1); // 初期は実スライド1枚目
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true); // translateのtransition有無

  const n = slides.length;

  // activeIndex（背景用）は常に実スライドに正規化
  const activeIndex = ((internalIndex - 1 + n) % n + n) % n;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // auto
  useEffect(() => {
    if (reducedMotion || isPaused || n <= 1) return;

    const id = window.setInterval(() => {
      setInternalIndex((prev) => prev + 1);
      setIsAnimating(true);
    }, 6500);

    return () => window.clearInterval(id);
  }, [isPaused, reducedMotion, n]);

  // swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
    setIsPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const sx = startX.current;
    const ex = e.changedTouches[0]?.clientX ?? null;
    startX.current = null;
    setIsPaused(false);

    if (sx == null || ex == null) return;
    const dx = ex - sx;
    if (Math.abs(dx) < 40) return;

    setIsAnimating(true);
    if (dx < 0) setInternalIndex((prev) => prev + 1);
    else setInternalIndex((prev) => prev - 1);
  };

  const onMouseEnter = () => setIsPaused(true);
  const onMouseLeave = () => setIsPaused(false);

  // ✅ 端（クローン）に到達したら、transitionなしで“本物”へ瞬間ジャンプ
  const handleAfterTransition = () => {
    if (n <= 1) return;

    // internalIndex: 0 は「最後クローン」→ 実最後へジャンプ（internalIndex = n）
    if (internalIndex === 0) {
      setIsAnimating(false);
      setInternalIndex(n);
      return;
    }

    // internalIndex: n+1 は「最初クローン」→ 実最初へジャンプ（internalIndex = 1）
    if (internalIndex === n + 1) {
      setIsAnimating(false);
      setInternalIndex(1);
      return;
    }

    // 通常時はアニメONのまま
    setIsAnimating(true);
  };

  // ✅ ジャンプ時（isAnimating=false）の直後に、次の操作に備えてONに戻す
  useEffect(() => {
    if (!isAnimating) {
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isAnimating]);

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <HeroBackground slides={slides} activeIndex={activeIndex} />

      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 sm:pb-28 sm:pt-16">
        <HeroSlider
          slides={slides}
          internalIndex={internalIndex}
          setInternalIndex={setInternalIndex}
          reducedMotion={reducedMotion}
          isAnimating={isAnimating}
          onAfterTransition={handleAfterTransition}
        />
      </div>

      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(24px,18px) scale(1.03)} }
        @keyframes floatSlow2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-26px,14px) scale(1.04)} }
        @keyframes floatSlow3 { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,-18px) scale(1.03)} }
        @keyframes nudgeDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
      `}</style>
    </section>
  );
}
