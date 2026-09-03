// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { loadOgFont, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = "NRT LOFT｜AIで自分のための道具をつくる";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const TITLE = "欲しいものが無かったので、\n自分で作ることにした。";

export default async function Image() {
  const font = await loadOgFont(
    `${TITLE}${SITE_NAME}${SITE_TAGLINE}`,
    700,
  );

  return new ImageResponse(<OgCard title={TITLE} />, {
    ...size,
    fonts: font
      ? [{ name: "Noto Sans JP", data: font, weight: 700, style: "normal" }]
      : undefined,
  });
}
