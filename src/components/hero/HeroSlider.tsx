// src/components/hero/HeroSlider.tsx
import HeroSlide, { HeroSlideData } from "@/components/hero/HeroSlide";

type Props<T extends HeroSlideData> = {
    slides: T[];
    internalIndex: number;
    setInternalIndex: React.Dispatch<React.SetStateAction<number>>;
    reducedMotion: boolean;
    isAnimating: boolean;
    onAfterTransition: () => void;
};

export default function HeroSlider<T extends HeroSlideData>({
    slides,
    internalIndex,
    setInternalIndex,
    reducedMotion,
    isAnimating,
    onAfterTransition,
}: Props<T>) {
    const n = slides.length;
    const goTo = (realIndex: number) => {
        // realIndex: 0..n-1 → internalIndex: 1..n
        setInternalIndex(realIndex + 1);
    };
    const next = () => setInternalIndex((prev) => prev + 1);
    const prev = () => setInternalIndex((prev) => prev - 1);

    // ✅ 前後クローンを付けた配列
    const looped = n <= 1 ? slides : [slides[n - 1], ...slides, slides[0]];

    // 背景用で使う real index（スライド内の isActive 判定用）
    const realIndex = ((internalIndex - 1 + n) % n + n) % n;

    return (
        <div className="flex min-h-[72dvh] flex-col justify-center">
            <div className="relative">
                <div
                    className="flex"
                    onTransitionEnd={() => {
                        if (!reducedMotion) onAfterTransition();
                    }}
                    style={{
                        transform: `translateX(-${internalIndex * 100}%)`,
                        transition:
                            reducedMotion || !isAnimating ? "none" : "transform 700ms ease-out",
                        willChange: "transform",
                    }}
                >
                    {looped.map((s, i) => {
                        // i は looped の index（0..n+1）
                        // 実スライド(i=1..n)のときだけ active を当てたい
                        const loopedIsReal = i >= 1 && i <= n;
                        const loopedRealIndex = loopedIsReal ? i - 1 : i === 0 ? n - 1 : 0;
                        const isActive = loopedRealIndex === realIndex;

                        return (
                            <HeroSlide
                                key={i}
                                slide={s}
                                isActive={isActive}
                                reducedMotion={reducedMotion}
                            />
                        );
                    })}
                </div>

                {/* 操作UI */}
                <div className="mt-8 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={prev}
                        className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                        style={{
                            border: "1px solid var(--color-steel-border)",
                            backgroundColor: "var(--color-steel-surface)",
                            color: "var(--color-orbital-steel)",
                        }}
                        aria-label="前のスライド"
                    >
                        ←
                    </button>

                    <div className="flex items-center gap-2">
                        {slides.map((_, i) => {
                            const active = i === realIndex;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    className="h-2.5 w-2.5 rounded-full transition-transform"
                                    aria-label={`スライド ${i + 1} に移動`}
                                    style={{
                                        backgroundColor: active ? "var(--color-orbital-steel)" : "var(--color-steel-border)",
                                        transform: active ? "scale(1.15)" : "scale(1)",
                                    }}
                                />
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={next}
                        className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                        style={{
                            border: "1px solid var(--color-steel-border)",
                            backgroundColor: "var(--color-steel-surface)",
                            color: "var(--color-orbital-steel)",
                        }}
                        aria-label="次のスライド"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}
