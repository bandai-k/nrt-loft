// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { href: "#about", label: "NRT LOFTとは" },
  { href: "#status", label: "ステータス" },
  { href: "#sns", label: "SNS" },
  { href: "#service", label: "できること" },
  { href: "#access", label: "アクセス" },
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12"
      style={{
        background: `rgba(14,11,6,${Math.min(0.95, scrollY / 150)})`,
        borderBottom: scrollY > 40 ? "1px solid rgba(217,119,6,0.12)" : "none",
        backdropFilter: "blur(8px)",
        height: "var(--header-height)",
      }}
    >
      <Link href="/">
        <Logo scale={1.1} />
      </Link>

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
    </nav>
  );
}
