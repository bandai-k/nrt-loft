// src/app/[category]/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import OgCard from "@/components/og/OgCard";
import { CATEGORIES, CATEGORY_META, isCategory } from "@/lib/categories";
import { loadOgFont, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getPost, getSlugsByCategory } from "@/lib/posts";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = "NRT LOFT の記事";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CATEGORIES.flatMap((category) =>
    getSlugsByCategory(category).map((slug) => ({ category, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = isCategory(category) ? getPost(category, slug) : undefined;

  const title = post?.title ?? SITE_NAME;
  const eyebrow = post ? CATEGORY_META[post.category].label : undefined;

  const font = await loadOgFont(
    `${title}${eyebrow ?? ""}${SITE_NAME}${SITE_TAGLINE}`,
    700,
  );

  return new ImageResponse(<OgCard title={title} eyebrow={eyebrow} />, {
    ...size,
    fonts: font
      ? [{ name: "Noto Sans JP", data: font, weight: 700, style: "normal" }]
      : undefined,
  });
}
