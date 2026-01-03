// src/components/layout/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--color-steel-surface)",
        borderBottom: "1px solid var(--color-steel-border)",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        {/* ブランド */}
        <Link href="/" className="inline-flex items-center gap-3">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold tracking-tight"
            style={{
              border: "1px solid var(--color-steel-border)",
              backgroundColor: "var(--color-orbital-steel)",
              color: "var(--color-text-on-steel)",
            }}
          >
            N
          </span>

          <div className="flex flex-col leading-tight">
            <span
              className="text-sm font-semibold tracking-[0.18em]"
              style={{ color: "var(--color-orbital-steel)" }}
            >
              NRT-LOFT
            </span>
            <span className="text-xs opacity-70">a small base in Narita</span>
          </div>
        </Link>

        {/* CTAだけ残す */}
        <Link
          href="/#contact"
          className="
            inline-flex items-center justify-center rounded-full
            px-5 py-2 text-sm font-medium
            transition-opacity hover:opacity-85
          "
          style={{
            border: "1px solid var(--color-steel-border)",
            backgroundColor: "var(--color-orbital-steel)",
            color: "var(--color-text-on-steel)",
          }}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
