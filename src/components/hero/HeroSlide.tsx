// src/components/hero/HeroSlide.tsx
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export type HeroSlideData = {
    badges: string[];
    title: React.ReactNode;
    desc: React.ReactNode;
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
};

type Props = {
    slide: HeroSlideData;
    isActive: boolean;
    reducedMotion: boolean;
};

export default function HeroSlide({ slide, isActive, reducedMotion }: Props) {
    // パララックス：active のときだけ遅れて入る
    const enterStyle = (delayMs: number, fromX: number) => {
        if (reducedMotion) return {};
        return {
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0px)" : `translateX(${fromX}px)`,
            transitionProperty: "transform, opacity",
            transitionDuration: "700ms",
            transitionTimingFunction: "ease-out",
            transitionDelay: isActive ? `${delayMs}ms` : "0ms",
            willChange: "transform, opacity",
        } as const;
    };

    return (
        <div className="w-full flex-shrink-0">
            <div className="flex flex-wrap gap-2" style={enterStyle(80, 10)}>
                {slide.badges.map((b) => (
                    <Badge key={b}>{b}</Badge>
                ))}
            </div>

            <h1
                className="mt-7 text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
                style={{
                    color: "var(--color-orbital-steel)",
                    ...enterStyle(180, 16), // タイトルは少し遅れて入る
                }}
            >
                {slide.title}
            </h1>

            <p
                className="mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg text-secondary"
                style={enterStyle(280, 12)}
            >
                {slide.desc}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row" style={enterStyle(380, 10)}>
                <Button href={slide.primary.href} variant="primary">
                    {slide.primary.label}
                </Button>

                {slide.secondary && (
                    <Button href={slide.secondary.href} variant="secondary">
                        {slide.secondary.label}
                    </Button>
                )}
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs opacity-70" style={enterStyle(520, 8)}>
                <span className="text-secondary">Scroll</span>
                <span className="inline-block" style={{ animation: "nudgeDown 1.4s ease-in-out infinite" }}>
                    ↓
                </span>
            </div>
        </div>
    );
}
