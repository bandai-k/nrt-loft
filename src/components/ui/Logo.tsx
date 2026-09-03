// src/components/ui/Logo.tsx
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className="font-heading font-bold tracking-[0.12em] text-ink"
        style={{ fontSize: compact ? "1rem" : "1.125rem" }}
      >
        {SITE_NAME}
      </span>
      {!compact && (
        <span className="mt-1 text-[9px] tracking-[0.28em] text-ink-faint">
          {SITE_TAGLINE}
        </span>
      )}
    </span>
  );
}
