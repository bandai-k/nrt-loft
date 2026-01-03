"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavItem = { id: string; label: string };

const NAV: NavItem[] = [
    { id: "top", label: "TOP" },
    { id: "about", label: "About" },
    { id: "use", label: "使い方" },
    { id: "rules", label: "運用方針" },
    { id: "contact", label: "Contact" },
];

export default function ScrollNavigation() {
    const ids = useMemo(() => NAV.map((n) => n.id), []);

    // ✅ SSR/CSRで必ず一致する初期値（ここでwindowを読まない）
    const [activeId, setActiveId] = useState<string>("top");

    // ✅ マウント後にhashを同期（hydration後なのでOK）
    useEffect(() => {
        const syncFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            const next = hash && ids.includes(hash) ? hash : "top";
            setActiveId((prev) => (prev === next ? prev : next));
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);
        return () => window.removeEventListener("hashchange", syncFromHash);
    }, [ids]);

    useEffect(() => {
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];
        if (elements.length === 0) return;

        const syncTop = () => {
            if (window.scrollY < 80) {
                setActiveId((prev) => (prev === "top" ? prev : "top"));
                return true;
            }
            return false;
        };

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                syncTop();
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                if (window.scrollY < 80) return;

                const visible = entries
                    .filter((e) => e.isIntersecting && (e.target as HTMLElement).id !== "top")
                    .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

                const next = (visible[0]?.target as HTMLElement | undefined)?.id;
                if (!next) return;

                setActiveId((prev) => (prev === next ? prev : next));
            },
            { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, [ids]);

    const LinkItem = ({ item }: { item: NavItem }) => {
        const isActive = item.id === activeId;

        return (
            <Link
                href={`/#${item.id}`}
                className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition"
                style={{
                    color: isActive ? "var(--color-text-on-steel)" : "var(--color-orbital-steel)",
                    backgroundColor: isActive ? "var(--color-orbital-steel)" : "transparent",
                    border: isActive ? "1px solid transparent" : "1px solid var(--color-steel-border)",
                }}
            >
                <span
                    className="h-2 w-2 rounded-full"
                    style={{
                        backgroundColor: isActive ? "var(--color-text-on-steel)" : "var(--color-orbital-steel)",
                        opacity: isActive ? 1 : 0.45,
                    }}
                />
                <span className="whitespace-nowrap">{item.label}</span>
            </Link>
        );
    };

    return (
        <>
            {/* PC */}
            <nav aria-label="ページ内ナビゲーション" className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
                <div
                    className="rounded-2xl p-2"
                    style={{
                        border: "1px solid var(--color-steel-border)",
                        backgroundColor: "var(--color-steel-surface)",
                    }}
                >
                    <ul className="flex flex-col gap-1">
                        {NAV.map((item) => {
                            const isActive = item.id === activeId;
                            return (
                                <li key={item.id}>
                                    <Link
                                        href={`/#${item.id}`}
                                        className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition"
                                        style={{
                                            color: isActive ? "var(--color-text-on-steel)" : "var(--color-orbital-steel)",
                                            backgroundColor: isActive ? "var(--color-orbital-steel)" : "transparent",
                                        }}
                                    >
                                        <span
                                            className="h-2 w-2 rounded-full"
                                            style={{
                                                backgroundColor: isActive
                                                    ? "var(--color-text-on-steel)"
                                                    : "var(--color-orbital-steel)",
                                                opacity: isActive ? 1 : 0.45,
                                            }}
                                        />
                                        <span className="whitespace-nowrap">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* Mobile */}
            <nav aria-label="ページ内ナビゲーション（モバイル）" className="lg:hidden fixed inset-x-0 bottom-0 z-40">
                <div
                    className="mx-auto max-w-5xl px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2"
                    style={{
                        backgroundColor: "color-mix(in srgb, var(--color-steel-surface) 92%, transparent)",
                        borderTop: "1px solid var(--color-steel-border)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className="flex gap-2 overflow-x-auto whitespace-nowrap [-webkit-overflow-scrolling:touch]">
                        {NAV.map((item) => (
                            <LinkItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}
