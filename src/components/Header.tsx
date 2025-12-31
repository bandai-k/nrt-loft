import Link from "next/link";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#use", label: "Use" },
  { href: "/#policy", label: "Policy" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-black text-sm font-semibold tracking-tight">
            N
          </span>
          <span className="text-sm font-semibold tracking-[0.14em]">
            NRT-LOFT
          </span>
          <span className="text-xs text-black/50">a small base in Narita</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-black/70 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-black px-4 text-sm font-medium text-white transition hover:bg-black/90"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
