import Link from "next/link";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#use", label: "使い方" },
  { href: "/#rules", label: "運用方針" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        backgroundColor: "var(--color-steel-surface)",
        borderBottom: "1px solid var(--color-steel-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold tracking-tight"
            style={{
              border: "1px solid var(--color-steel-border)",
              backgroundColor: "var(--color-orbital-steel)",
              color: "var(--color-text-on-steel)",
            }}
          >
            N
          </span>
          <span
            className="text-sm font-semibold tracking-[0.14em]"
            style={{ color: "var(--color-orbital-steel)" }}
          >
            NRT-LOFT
          </span>
          <span className="text-xs" style={{ color: "var(--color-orbital-steel)" }}>
            a small base in Narita
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm transition"
              style={{ color: "var(--color-orbital-steel)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition"
            style={{
              border: "1px solid var(--color-steel-border)",
              backgroundColor: "var(--color-orbital-steel)",
              color: "var(--color-text-on-steel)",
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
