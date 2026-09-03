// src/components/layout/Footer.tsx
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { RssIcon, YouTubeIcon } from "@/components/ui/Icons";
import { CATEGORY_LIST } from "@/lib/categories";
import {
  OPERATOR,
  OPERATOR_REPRESENTATIVE,
  OPERATOR_URL,
  RSS_PATH,
  YOUTUBE_URL,
} from "@/lib/site";

// /commerce-law はナビゲーションに出さない。ページ自体は残す。
const siteLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
  { href: "/privacy", label: "PRIVACY" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-alt">
      <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-[26em] text-[13px] leading-[1.95] text-ink-muted">
              AIと一緒に、自分の困りごとを解決する小さな仕組みを作っています。
            </p>
            <div className="mt-4 flex items-center gap-1">
              {YOUTUBE_URL && (
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube チャンネル"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <YouTubeIcon className="h-[18px] w-[18px]" />
                </a>
              )}
              <a
                href={RSS_PATH}
                aria-label="RSS フィード"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <RssIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>

          <div className="flex gap-12">
            <nav aria-label="記事カテゴリ">
              <h2 className="mb-3 text-[10px] font-medium tracking-[0.24em] text-ink-faint">
                CONTENT
              </h2>
              {CATEGORY_LIST.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="mb-2 block text-[13px] text-ink-muted transition-colors hover:text-ink"
                >
                  {c.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="サイト情報">
              <h2 className="mb-3 text-[10px] font-medium tracking-[0.24em] text-ink-faint">
                SITE
              </h2>
              {siteLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mb-2 block text-[13px] text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={OPERATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 block text-[13px] text-ink-muted transition-colors hover:text-ink"
              >
                運営者情報
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[12px] text-ink-faint">
            運営：{OPERATOR}（代表 {OPERATOR_REPRESENTATIVE}）
          </p>
          <p className="mt-1 text-[12px] text-ink-faint">
            &copy; 2026 {OPERATOR}
          </p>
        </div>
      </div>
    </footer>
  );
}
