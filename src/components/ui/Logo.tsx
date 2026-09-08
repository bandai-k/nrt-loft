// src/components/ui/Logo.tsx
import {
  LOGO_IMAGE,
  LOGO_IMAGE_ASPECT,
  LOGO_IMAGE_INCLUDES_TAGLINE,
} from "@/lib/images";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * タグラインの出し方。
 * - none   : ロゴだけ。ヘッダーはこれ（ナビと高さを揃えたいので余計な行を足さない）
 * - beside : ロゴの右に2行で添える。フッターはこれ
 */
type Tagline = "none" | "beside";

// 「OPEN FLOOR, OPEN MIND」を2行に割って添える
const TAGLINE_LINES = SITE_TAGLINE.split(",").map((s, i, all) =>
  i < all.length - 1 ? `${s.trim()},` : `${s.trim()}.`,
);

export default function Logo({
  compact = false,
  tagline = "none",
}: {
  compact?: boolean;
  tagline?: Tagline;
}) {
  const showTagline = tagline === "beside" && !LOGO_IMAGE_INCLUDES_TAGLINE;

  if (LOGO_IMAGE) {
    return (
      <span className="flex items-center gap-3.5">
        {/* 高さだけ決めて幅は比率から取る。aspect-ratio を先に渡しておくと、
            画像が届く前から幅が確定するのでナビが横に飛ばない。 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_IMAGE}
          alt={SITE_NAME}
          className="w-auto max-w-full"
          style={{ height: compact ? 24 : 34, aspectRatio: LOGO_IMAGE_ASPECT }}
        />
        {showTagline && (
          <span className="hidden flex-col text-[8.5px] leading-[1.7] tracking-[0.24em] text-ink-faint sm:flex">
            {TAGLINE_LINES.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="flex flex-col items-start leading-none">
      <span
        className="font-heading font-bold tracking-[0.12em] text-ink"
        style={{ fontSize: compact ? "1rem" : "1.125rem" }}
      >
        {SITE_NAME}
      </span>
      <span className="mt-1 whitespace-nowrap text-[9px] tracking-[0.28em] text-ink-faint">
        {SITE_TAGLINE}
      </span>
    </span>
  );
}
