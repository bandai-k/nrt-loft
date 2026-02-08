// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-orbital-steel-dark)",
        color: "var(--color-text-on-steel)",
        borderTop: "1px solid var(--color-steel-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold"
                style={{
                  border: "1px solid var(--color-steel-border)",
                  backgroundColor: "var(--color-steel-surface)",
                  color: "var(--color-orbital-steel)",
                }}
              >
                N
              </span>
              <span
                className="text-sm font-semibold tracking-[0.14em]"
                style={{ color: "var(--color-text-on-steel)" }}
              >
                NRT LOFT
              </span>
            </div>

            <p
              className="text-sm"
              style={{ color: "rgba(255, 255, 255, 0.72)" }}
            >
              運営:{" "}
              <Link
                href="https://www.nebulab.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-opacity hover:opacity-80"
                style={{ color: "var(--color-text-on-steel)" }}
              >
                NEBULAB
              </Link>
            </p>

            <p
              className="text-sm"
              style={{ color: "var(--color-text-on-steel)" }}
            >
              hello@nebulab.jp
            </p>

            <p
              className="text-xs"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              〒286-0033 千葉県成田市花崎町
            </p>
          </div>

          <div className="space-y-3">
            <div
              className="text-xs font-semibold"
              style={{ color: "var(--color-text-on-steel)" }}
            >
              リンク
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="https://www.nebulab.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "var(--color-text-on-steel)" }}
              >
                NEBULAB
              </Link>
              <Link
                href="https://www.instagram.com/nebulab_koki/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                style={{ color: "var(--color-text-on-steel)" }}
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 pt-6 text-xs md:flex-row md:items-center md:justify-between"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            color: "var(--color-text-on-steel)",
          }}
        >
          <div>&copy; {year} NEBULAB. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link
              className="transition-opacity hover:opacity-80"
              href="/privacy"
              style={{ color: "var(--color-text-on-steel)" }}
            >
              プライバシーポリシー
            </Link>
            <Link
              className="transition-opacity hover:opacity-80"
              href="/terms"
              style={{ color: "var(--color-text-on-steel)" }}
            >
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
