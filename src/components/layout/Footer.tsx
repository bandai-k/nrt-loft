// src/components/layout/Footer.tsx
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import LineContactCard from "@/components/LineContactCard";

const linkGroups = [
  {
    heading: "MENU",
    items: [
      { label: "SHOP", href: "/shop", external: false },
      { label: "LOCAL ORDERS", href: "/contact", external: false },
      { label: "ACCESS", href: "/access", external: false },
      { label: "CONTACT", href: "/contact", external: false },
    ],
  },
  {
    heading: "LINKS",
    items: [
      { label: "NEBULAB合同会社", href: "https://www.nebulab.jp/", external: true },
      { label: "Instagram", href: "https://www.instagram.com/nrt_loft/", external: true },
    ],
  },
  {
    heading: "LEGAL",
    items: [
      { label: "プライバシーポリシー", href: "/privacy", external: false },
      { label: "利用規約", href: "/terms", external: false },
      { label: "特定商取引法に基づく表記", href: "/commerce-law", external: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="px-5 pb-8 pt-12 md:px-12"
      style={{ borderTop: "1px solid rgba(217,119,6,0.15)" }}
    >
      <div className="mx-auto max-w-[960px]">
        {/* Top: Logo + Links */}
        <div className="mb-10 flex flex-col items-start gap-8 md:flex-row md:flex-wrap md:justify-between">
          <Logo scale={0.7} />
          <div className="flex flex-wrap gap-8 md:gap-12">
            {linkGroups.map((group) => (
              <div key={group.heading}>
                <div
                  className="mb-3 text-[8px] tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: "#4a3a22" }}
                >
                  {group.heading}
                </div>
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mb-2 block text-[9px] tracking-[0.15em] transition-colors hover:text-amber-600"
                    style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contact prompt — メール・LINE */}
        <div
          className="mb-6 flex flex-col items-start gap-2 pt-5 md:flex-row md:items-center md:gap-4"
          style={{ borderTop: "1px solid rgba(217,119,6,0.08)" }}
        >
          <span
            className="text-[10px] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
          >
            お問い合わせ: メール・LINE どちらでも
          </span>
          <Link
            href="/contact"
            className="text-[10px] tracking-[0.2em] transition-colors hover:text-amber-500"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#d97706",
              borderBottom: "1px solid rgba(217,119,6,0.3)",
            }}
          >
            フォーム →
          </Link>
          <LineContactCard variant="compact" />
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-2 pt-5 md:flex-row"
          style={{ borderTop: "1px solid rgba(217,119,6,0.08)" }}
        >
          <span
            className="text-[8px] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "#2a1e0e" }}
          >
            &copy; 2026 Nebulab合同会社. ALL RIGHTS RESERVED.
          </span>
          <span
            className="text-[8px] tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "#2a1e0e" }}
          >
            運営: Nebulab合同会社
          </span>
        </div>
      </div>
    </footer>
  );
}
