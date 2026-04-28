// src/components/ui/SubPageLayout.tsx
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function SubPageLayout({ children }: Props) {
  return (
    <div style={{ paddingTop: "var(--header-height)" }}>
      <div className="px-5 pt-10 md:px-12 md:pt-14">
        <div className="mx-auto max-w-[960px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] transition-colors hover:text-amber-500"
            style={{ fontFamily: "var(--font-mono)", color: "#6b5a3a" }}
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            HOME
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
