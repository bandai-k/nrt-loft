// src/components/ui/Logo.tsx
import { LOGO_IMAGE, LOGO_IMAGE_INCLUDES_TAGLINE } from "@/lib/images";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  if (LOGO_IMAGE) {
    return (
      <span className="flex flex-col leading-none">
        {/* 縦横比が素材によって変わるため、高さだけ指定して幅は自動にする */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_IMAGE}
          alt={SITE_NAME}
          className="w-auto"
          style={{ height: compact ? 22 : 34 }}
        />
        {!compact && !LOGO_IMAGE_INCLUDES_TAGLINE && (
          <span className="mt-1 whitespace-nowrap text-[9px] tracking-[0.28em] text-ink-faint">
            {SITE_TAGLINE}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="flex flex-col leading-none">
      <span
        className="font-heading font-bold tracking-[0.12em] text-ink"
        style={{ fontSize: compact ? "1rem" : "1.125rem" }}
      >
        {SITE_NAME}
      </span>
      {!compact && (
        <span className="mt-1 whitespace-nowrap text-[9px] tracking-[0.28em] text-ink-faint">
          {SITE_TAGLINE}
        </span>
      )}
    </span>
  );
}
