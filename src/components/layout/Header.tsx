// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import useIsMobile from "@/hooks/useIsMobile";

const navLinks = [
  { href: "#about", label: "NRT LOFTとは" },
  { href: "#status", label: "ステータス" },
  { href: "#sns", label: "SNS" },
  { href: "#service", label: "できること" },
  { href: "#access", label: "アクセス" },
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
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
          <a
            href="https://www.instagram.com/nebulab_koki/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: "9px" }}
          >
            Instagram →
          </a>
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
          <a
            href="https://www.instagram.com/nebulab_koki/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4"
            style={{ padding: "12px 28px", fontSize: "11px" }}
          >
            Instagram →
          </a>
        </div>
      )}
    </>
  );
}
