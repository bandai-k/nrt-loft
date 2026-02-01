import Link from "next/link";

const links = [
  { href: "/#about", label: "コンセプト" },
  { href: "/#use", label: "使い方" },
  { href: "/#rules", label: "運用方針" },
  { href: "/#contact", label: "お問い合わせ" },
];

const externalLinks = [
  { href: "https://nebulab.jp", label: "NEBULAB（運営）" },
];

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
          <div className="space-y-3">
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
              <span className="text-sm font-semibold tracking-[0.14em]" style={{ color: "var(--color-text-on-steel)" }}>
                NRT-LOFT
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--color-text-on-steel)" }}>
              静かに集中できて、つながりの質も守れる場所。
              <br />
              成田駅周辺の小さなコワーキングスペース。
            </p>
            <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.72)" }}>
              Orbital Steel は、拠点という思想から NRT-LOFT が名付けた色。<br />
              創造が現実へと帰還する場所を表しています。
            </div>
            <div className="text-xs" style={{ color: "var(--color-text-on-steel)" }}>
              <p>〒286-0033 千葉県成田市花崎町</p>
            </div>
          </div>

          <div className="flex gap-16">
            <div className="space-y-3">
              <div className="text-xs font-semibold" style={{ color: "var(--color-text-on-steel)" }}>
                サイト内リンク
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="transition"
                    style={{ color: "var(--color-text-on-steel)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold" style={{ color: "var(--color-text-on-steel)" }}>
                関連リンク
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {externalLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition"
                    style={{ color: "var(--color-text-on-steel)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 pt-6 text-xs md:flex-row md:items-center md:justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.12)", color: "var(--color-text-on-steel)" }}>
          <div>© {year} NEBULAB. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link className="transition" href="/privacy" style={{ color: "var(--color-text-on-steel)" }}>
              プライバシーポリシー
            </Link>
            <Link className="transition" href="/terms" style={{ color: "var(--color-text-on-steel)" }}>
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
