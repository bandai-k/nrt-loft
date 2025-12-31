import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#use", label: "Use" },
  { href: "/#policy", label: "Policy" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-[0.14em]">
              NEBULAB
            </div>
            <p className="max-w-md text-sm leading-relaxed text-black/60">
              必要なときに、ちょっとした集まりや学びの場にも変化する。<br />
              それがNRT-LOFTのコンセプトです。<br />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm md:grid-cols-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-black/70 transition hover:text-black"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-xs text-black/50 md:flex-row md:items-center md:justify-between">
          <div>© {year} NEBULAB</div>
          <div className="flex items-center gap-4">
            <Link className="hover:text-black" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-black" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
