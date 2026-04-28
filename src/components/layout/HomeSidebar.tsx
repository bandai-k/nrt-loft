// src/components/layout/HomeSidebar.tsx
"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "concept", label: "コンセプト", num: "01" },
  { id: "service", label: "できること", num: "02" },
  { id: "contact", label: "お問い合わせ", num: "03" },
];

export default function HomeSidebar() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="pointer-events-none fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 xl:block"
      aria-label="セクション目次"
    >
      <nav
        className="pointer-events-auto flex flex-col gap-5 border-l pl-4"
        style={{ borderColor: "rgba(217,119,6,0.2)" }}
      >
        {items.map(({ id, label, num }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className="group flex items-center gap-3 transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span
                className="inline-block h-px transition-all duration-300"
                style={{
                  width: isActive ? "22px" : "10px",
                  background: isActive ? "#f59e0b" : "rgba(217,119,6,0.4)",
                }}
                aria-hidden="true"
              />
              <span
                className="text-[9px] tracking-[0.3em] transition-colors"
                style={{ color: isActive ? "#d97706" : "#4a3a22" }}
              >
                {num}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] transition-colors group-hover:text-amber-500"
                style={{ color: isActive ? "#e8e2d4" : "#6b5a3a" }}
              >
                {label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
