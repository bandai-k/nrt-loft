// src/components/ui/Button.tsx
import Link from "next/link";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  href,
  variant = "primary",
  children,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold";

  const variantClasses = {
    primary: "",
    secondary: "",
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          backgroundColor: "var(--color-orbital-steel)",
          color: "var(--color-text-on-steel)",
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
