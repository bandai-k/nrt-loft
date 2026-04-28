// src/components/ui/ScrollGuide.tsx
"use client";

type Props = {
  direction: "up" | "down";
  targetId: string;
  size?: "sm" | "lg";
  className?: string;
};

function getHeaderHeight(): number {
  if (typeof window === "undefined") return 96;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim();
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : 96;
}

export default function ScrollGuide({
  direction,
  targetId,
  size = "sm",
  className = "",
}: Props) {
  const isLg = size === "lg";
  const isUp = direction === "up";

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const headerHeight = getHeaderHeight();
    // Overshoot by header height: header auto-hides on scroll-down,
    // so the section's content lands at viewport top instead of being
    // pushed down by the now-hidden header's worth of space.
    const top =
      el.getBoundingClientRect().top +
      window.scrollY +
      (isUp ? -headerHeight : headerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Compact variant: just a small chevron with subtle bounce animation.
  if (!isLg) {
    return (
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        aria-label={`${isUp ? "前" : "次"}のセクションへスクロール`}
        className={`inline-flex items-center justify-center transition-opacity hover:opacity-100 ${className}`}
      >
        <svg
          className="h-4 w-4 md:h-5 md:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d97706"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            animation: `${isUp ? "bounce-up" : "bounce-down"} 1.8s ease-in-out infinite`,
          }}
        >
          <path d={isUp ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
        </svg>
      </a>
    );
  }

  // Prominent variant: SCROLL label + animated track line + arrow (Hero).
  const arrow = (
    <svg
      className="h-4 w-4 md:h-5 md:w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d97706"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={isUp ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
    </svg>
  );

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label={`${isUp ? "前" : "次"}のセクションへスクロール`}
      className={`flex flex-col items-center gap-4 transition-opacity hover:opacity-70 ${className}`}
    >
      {isUp && arrow}
      <span
        className="text-[11px] tracking-[0.5em] md:text-[13px]"
        style={{ fontFamily: "var(--font-mono)", color: "#d97706" }}
      >
        SCROLL
      </span>
      <span
        className="relative block h-20 w-px overflow-hidden md:h-28"
        style={{ background: "rgba(217,119,6,0.25)" }}
        aria-hidden="true"
      >
        <span
          className="absolute left-0 top-0 block h-6 w-px md:h-7"
          style={{
            background: "#f59e0b",
            boxShadow: "0 0 8px rgba(245,158,11,0.6)",
            animation: `${isUp ? "scroll-up" : "scroll-down"} 1.8s ease-in-out infinite`,
          }}
        />
      </span>
      {!isUp && arrow}
    </a>
  );
}
