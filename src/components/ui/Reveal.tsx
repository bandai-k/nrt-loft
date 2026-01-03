// src/components/motion/Reveal.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    /** 表示開始のズレ（px）: ほんの少し下から上がる */
    y?: number;
    /** 透明度 */
    fromOpacity?: number;
    /** アニメ時間(ms) */
    durationMs?: number;
    /** 遅延(ms) */
    delayMs?: number;
    /** どれくらい入ったら発火するか */
    threshold?: number;
    /** 一度だけ発火 */
    once?: boolean;
};

export default function Reveal({
    children,
    className,
    y = 14,
    fromOpacity = 0,
    durationMs = 900,
    delayMs = 0,
    threshold = 0.18,
    once = true,
}: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [shown, setShown] = useState(false);

    const style = useMemo<React.CSSProperties>(
        () => ({
            transform: shown ? "translateY(0px)" : `translateY(${y}px)`,
            opacity: shown ? 1 : fromOpacity,
            transitionProperty: "transform, opacity",
            transitionDuration: `${durationMs}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // いい感じのイージング
            transitionDelay: `${delayMs}ms`,
            willChange: "transform, opacity",
        }),
        [shown, y, fromOpacity, durationMs, delayMs]
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                if (entry.isIntersecting) {
                    setShown(true);
                    if (once) io.disconnect();
                } else if (!once) {
                    setShown(false);
                }
            },
            { threshold }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [threshold, once]);

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}
