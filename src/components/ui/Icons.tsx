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

/** BUILD: 箱 */
export function BuildIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.4 21 7.4v9.2L12 21.6 3 16.6V7.4z" />
      <path d="M3 7.4 12 12.4l9-5" />
      <path d="M12 12.4v9.2" />
      <path d="m7.5 4.9 9 5" />
    </svg>
  );
}

/** LEARN: 開いた本 */
export function LearnIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 7.6c-1.9-1.8-4.4-2.7-7-2.6v12.6c2.6-.1 5.1.8 7 2.6" />
      <path d="M12 7.6c1.9-1.8 4.4-2.7 7-2.6v12.6c-2.6-.1-5.1.8-7 2.6" />
      <path d="M12 7.6v12.6" />
      <path d="M5 5.05 2.7 5.9v13.05c.65-.5 1.42-.78 2.3-.85" />
      <path d="M19 5.05l2.3.85v13.05c-.65-.5-1.42-.78-2.3-.85" />
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
