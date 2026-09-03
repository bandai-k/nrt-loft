// src/components/ui/Icons.tsx
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.4}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.6l5 2.4-5 2.4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RssIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 11a8.5 8.5 0 0 1 8.5 8.5" />
      <path d="M4.5 5.5A14 14 0 0 1 18.5 19.5" />
      <circle cx="5.2" cy="18.8" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** BUILD: 組み立てる */
export function BuildIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V9.5l8-5.5 8 5.5V20" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

/** LEARN: 気づく */
export function LearnIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 18h5" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 1 3.5 10.9V15h-7v-1.1A6 6 0 0 1 12 3z" />
    </svg>
  );
}

/** TOOLKIT: 道具 */
export function ToolkitIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

/** JOURNEY: 道のり */
export function JourneyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 20c0-4 12-4 12-8s-6-4-6-8" />
      <circle cx="6" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h13" />
      <path d="M13 6.5 18.5 12 13 17.5" />
    </svg>
  );
}
