// src/components/hero/HeroBackground.tsx
type OrbPalette = { a: string; b: string; c: string };

type SlideLike = {
    palette: OrbPalette;
};

type Props = {
    slides: SlideLike[];
    activeIndex: number;
};

export default function HeroBackground({ slides, activeIndex }: Props) {
    return (
        <div className="pointer-events-none absolute inset-0">
            {slides.map((s, i) => {
                const isActive = i === activeIndex;

                return (
                    <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-700 ease-out"
                        style={{ opacity: isActive ? 1 : 0 }}
                        aria-hidden="true"
                    >
                        <div
                            className="absolute -top-24 left-[-120px] h-[420px] w-[420px] rounded-full blur-3xl"
                            style={{
                                background: `radial-gradient(circle at 30% 30%, ${s.palette.a}, rgba(0,0,0,0) 60%)`,
                                animation: "floatSlow 12s ease-in-out infinite",
                            }}
                        />
                        <div
                            className="absolute top-20 right-[-160px] h-[520px] w-[520px] rounded-full blur-3xl"
                            style={{
                                background: `radial-gradient(circle at 30% 30%, ${s.palette.b}, rgba(0,0,0,0) 60%)`,
                                animation: "floatSlow2 16s ease-in-out infinite",
                            }}
                        />
                        <div
                            className="absolute bottom-[-180px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
                            style={{
                                background: `radial-gradient(circle at 40% 40%, ${s.palette.c}, rgba(0,0,0,0) 60%)`,
                                animation: "floatSlow3 18s ease-in-out infinite",
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
