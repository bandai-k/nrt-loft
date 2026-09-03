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
/** TOOLS のチップに添える小さな印 */
export function SparkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.4}>
      <path d="M12 4.2v15.6M4.2 12h15.6" />
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </svg>
  );
}

export function TerminalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={1.4}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.4 9.6 12 12l-2.6 2.4" />
      <path d="M13.4 14.6h2.4" />
    </svg>
  );
}

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

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.7 21h-6.07l-4.76-6.22L5.42 21H2.4l7.06-8.07L2 3h6.22l4.3 5.69L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49Z" />
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
