// src/components/ui/Button.tsx
import Link from "next/link";
import React from "react";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ href, variant = "primary", children }: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold " +
    "transition-transform duration-200 ease-out active:scale-[0.98] hover:-translate-y-[1px]";

  const style: React.CSSProperties =
    variant === "primary"
      ? {
        backgroundColor: "var(--color-orbital-steel)",
        color: "var(--color-text-on-steel)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
      }
      : {
        border: "1px solid var(--color-steel-border)",
        backgroundColor: "var(--color-steel-surface)",
        color: "var(--color-orbital-steel)",
      };

  return (
    <Link href={href} className={baseClasses} style={style}>
      {children}
    </Link>
  );
}
