// src/components/layout/Footer.tsx
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { OPERATOR, OPERATOR_URL } from "@/lib/site";

// /commerce-law はナビゲーションに出さない。ページ自体は残す。
const links = [
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
  { href: "/privacy", label: "PRIVACY POLICY" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-alt">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <Link href="/" aria-label="トップページ" className="shrink-0">
          <Logo />
        </Link>

        <nav
          className="flex flex-wrap items-center gap-x-7 gap-y-2"
          aria-label="フッターナビゲーション"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={OPERATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
          >
            運営者情報
          </a>
        </nav>

        {/* 運営主体は法人。© NRT LOFT とは書かない。 */}
        <p className="shrink-0 text-[11.5px] text-ink-faint">
          &copy; 2026 {OPERATOR}
        </p>
      </div>
    </footer>
  );
}
