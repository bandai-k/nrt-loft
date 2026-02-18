// src/components/ui/Logo.tsx
export default function Logo({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={180 * scale}
      height={56 * scale}
      viewBox="0 0 230 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="4,28 18,10 32,28" stroke="#d97706" strokeWidth="1.8" fill="none" strokeLinejoin="miter" />
      <rect x="4" y="28" width="28" height="30" stroke="#d97706" strokeWidth="1.4" fill="none" opacity="0.85" />
      <line x1="18" y1="28" x2="18" y2="58" stroke="#d97706" strokeWidth="0.7" opacity="0.5" />
      <line x1="4" y1="40" x2="32" y2="40" stroke="#d97706" strokeWidth="0.7" opacity="0.5" />
      <line x1="4" y1="49" x2="32" y2="49" stroke="#d97706" strokeWidth="0.7" opacity="0.5" />
      <rect x="24" y="14" width="4" height="8" stroke="#d97706" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="0" y1="58" x2="36" y2="58" stroke="#d97706" strokeWidth="1.4" opacity="0.4" />
      <text x="48" y="35" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="28" fill="#e8e2d4" letterSpacing="5">NRT-LOFT</text>
      <line x1="48" y1="42" x2="218" y2="42" stroke="rgba(217,119,6,0.45)" strokeWidth="0.8" />
      <text x="48" y="54" fontFamily="'Share Tech Mono', monospace" fontSize="8" fill="#d97706" letterSpacing="3" opacity="0.7">OPEN FLOOR, OPEN MIND</text>
    </svg>
  );
}
