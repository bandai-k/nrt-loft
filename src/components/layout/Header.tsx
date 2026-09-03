// src/components/layout/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { RssIcon, XIcon, YouTubeIcon } from "@/components/ui/Icons";
import { CATEGORY_LIST } from "@/lib/categories";
import { CTA_LABEL, RSS_PATH, SITE_NAME, X_URL, YOUTUBE_URL } from "@/lib/site";

const navLinks = [
  ...CATEGORY_LIST.map((c) => ({ href: `/${c.slug}`, label: c.label })),
  { href: "/about", label: "ABOUT" },
];

const iconLinkClass =
  "flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // メニューを開いているあいだは背面をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-paper-alt/95 backdrop-blur-sm">
      <div
        className="mx-auto flex max-w-[1200px] items-center gap-6 px-5 md:px-8"
        style={{ height: "var(--header-height)" }}
      >
        <Link href="/" aria-label={`${SITE_NAME} トップページ`} className="shrink-0">
          <Logo />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
          aria-label="メインナビゲーション"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-[12.5px] tracking-[0.14em] text-ink transition-colors hover:text-ink-muted"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden items-center gap-0.5 sm:flex">
            {YOUTUBE_URL && (
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube チャンネル"
                className={iconLinkClass}
              >
                <YouTubeIcon className="h-[19px] w-[19px]" />
              </a>
            )}
            {X_URL && (
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X アカウント"
                className={iconLinkClass}
              >
                <XIcon className="h-[15px] w-[15px]" />
              </a>
            )}
            <a href={RSS_PATH} aria-label="RSS フィード" className={iconLinkClass}>
              <RssIcon className="h-[17px] w-[17px]" />
            </a>
          </div>

          <Link href="/build" className="btn btn-primary btn-sm hidden md:inline-flex">
            {CTA_LABEL}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className="block h-[1.5px] w-5 bg-ink transition-transform duration-200"
              style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-[1.5px] w-5 bg-ink transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-[1.5px] w-5 bg-ink transition-transform duration-200"
              style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : undefined }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper-alt lg:hidden">
          <nav className="mx-auto max-w-[1200px] px-5 py-4 md:px-8" aria-label="メインナビゲーション">
            {CATEGORY_LIST.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-3 border-b border-line py-3"
              >
                <span className="w-[72px] shrink-0 text-[12px] tracking-[0.16em] text-ink">
                  {c.label}
                </span>
                <span className="text-[13px] text-ink-muted">{c.heading}</span>
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-3 border-b border-line py-3"
            >
              <span className="w-[72px] shrink-0 text-[12px] tracking-[0.16em] text-ink">
                ABOUT
              </span>
              <span className="text-[13px] text-ink-muted">NRT LOFT と運営者について</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/build"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary btn-sm"
              >
                {CTA_LABEL}
              </Link>
              {YOUTUBE_URL && (
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <YouTubeIcon className="h-4 w-4" />
                  YouTube
                </a>
              )}
              <a href={RSS_PATH} className="btn btn-secondary btn-sm">
                <RssIcon className="h-4 w-4" />
                RSS
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
