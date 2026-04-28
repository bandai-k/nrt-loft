// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import useIsMobile from "@/hooks/useIsMobile";

const navLinks = [
  { href: "/pricing", label: "料金" },
  { href: "/usage", label: "利用方法" },
  { href: "/reservation", label: "予約" },
  { href: "/access", label: "アクセス" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-4 transition-all duration-300 md:px-12"
        style={{
          background: `rgba(14,11,6,${Math.min(0.95, scrollY / 150)})`,
          borderBottom: scrollY > 40 ? "1px solid rgba(217,119,6,0.12)" : "none",
          backdropFilter: "blur(8px)",
          height: "var(--header-height)",
          transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <Link href="/">
          <Logo scale={isMobile ? 0.8 : 1.1} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
          <button
            type="button"
            title="ログイン機能は準備中です"
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: "9px" }}
          >
            ログイン →
          </button>
        </div>

        {/* Hamburger button (mobile) */}
        {isMobile && (
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className="block h-[1.5px] w-5 transition-all duration-300"
              style={{
                background: "#d97706",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] w-5 transition-all duration-300"
              style={{
                background: "#d97706",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[1.5px] w-5 transition-all duration-300"
              style={{
                background: "#d97706",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 transition-all duration-300"
          style={{
            background: "rgba(14,11,6,0.97)",
            backdropFilter: "blur(12px)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[24px] tracking-[0.15em] transition-colors hover:text-amber-500"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#c8bfa8",
              }}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            title="ログイン機能は準備中です"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4"
            style={{ padding: "12px 28px", fontSize: "11px" }}
          >
            ログイン →
          </button>
        </div>
      )}
    </>
  );
}
