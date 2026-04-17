// src/components/sections/SNSSection.tsx
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const socials = [
  {
    name: "Instagram",
    handle: "@nebulab_koki",
    href: "https://www.instagram.com/nebulab_koki/",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@nebulab_nrt",
    href: "https://www.tiktok.com/@nebulab_nrt",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.83 4.83 0 01-1-.13z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@nebulab_koki",
    href: "https://www.youtube.com/@nebulab_koki",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function SNSSection() {
  return (
    <section id="sns" className="px-5 py-[60px] md:px-12 md:py-[100px]" style={{ borderTop: "1px solid rgba(217,119,6,0.1)" }}>
      <div className="mx-auto max-w-[960px]">
        <Reveal><SectionLabel>04 · SNS</SectionLabel></Reveal>
        <Reveal>
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 6vw, 48px)",
              letterSpacing: "0.08em",
              color: "#e8e2d4",
            }}
          >
            DIYリノベを発信中
          </h2>
          <p
            className="mb-12 text-[15px] tracking-[0.06em]"
            style={{ color: "#6b5a3a", fontFamily: "var(--font-body)" }}
          >
            リノベーションの過程をリアルタイムで発信しています。
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {socials.map((s, i) => (
            <Reveal key={s.name} delayMs={i * 100}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-sm p-6 transition-all duration-200 hover:border-amber-500/60 hover:bg-amber-600/[0.06]"
                style={{
                  border: "1px solid rgba(217,119,6,0.2)",
                  background: "transparent",
                }}
              >
                <div className="mb-3 opacity-70" style={{ color: "#d97706" }}>{s.icon}</div>
                <div
                  className="mb-1 text-[22px] tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
                >
                  {s.name}
                </div>
                <div
                  className="text-[12px] tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
                >
                  {s.handle}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
