// src/components/sections/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-5 text-center"
      style={{ backgroundColor: "var(--color-orbital-steel-dark)" }}
    >
      {/* Background subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, var(--color-steel-surface) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl space-y-8">
        <h1
          className="text-4xl font-bold tracking-[0.12em] sm:text-5xl md:text-6xl"
          style={{ color: "var(--color-text-on-steel)" }}
        >
          NRT LOFT
        </h1>

        <p
          className="text-lg leading-relaxed sm:text-xl"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          成田の旧釣具屋2階を
          <br />
          DIYでリノベーション中。
        </p>

        <p
          className="mx-auto max-w-md text-sm leading-relaxed sm:text-base"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          フリーランスエンジニアKokiが、
          <br className="sm:hidden" />
          旧山中釣具店の2階をDIYでリノベして
          <br className="sm:hidden" />
          自分の拠点を作るプロジェクト。
          <br />
          過程を全部オープンに発信しています。
        </p>

        {/* Placeholder image area */}
        <div
          className="mx-auto flex h-48 max-w-lg items-center justify-center rounded-2xl sm:h-56"
          style={{
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <span
            className="text-lg font-semibold tracking-[0.2em] sm:text-xl"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            2025.02.15 START
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="https://www.instagram.com/nebulab_koki/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-transform duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98]"
            style={{
              backgroundColor: "var(--color-text-on-steel)",
              color: "var(--color-orbital-steel-dark)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagramで過程を見る
          </Link>
          <Link
            href="https://www.nebulab.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-transform duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98]"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "var(--color-text-on-steel)",
            }}
          >
            NEBULABについて
          </Link>
        </div>
      </div>
    </section>
  );
}
