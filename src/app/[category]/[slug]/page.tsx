// src/app/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryBadge from "@/components/CategoryBadge";
import CoverImage from "@/components/CoverImage";
import MdxContent from "@/components/mdx/MdxContent";
import { CATEGORIES, isCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getPost, getSlugsByCategory } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.flatMap((category) =>
    getSlugsByCategory(category).map((slug) => ({ category, slug })),
  );
}

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategory(category)) return {};
  const post = getPost(category, slug);
  if (!post) return {};

  const url = `${SITE_URL}/${category}/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  if (!isCategory(category)) notFound();

  const post = getPost(category, slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[1120px] px-5 py-10 md:px-8 md:py-14">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <CategoryBadge category={post.category} />
          <time dateTime={post.date} className="text-[12px] text-ink-faint">
            {formatDate(post.date)}
          </time>
        </div>
        <h1 className="mt-2 max-w-[24em] text-[24px] leading-[1.55] md:text-[32px]">
          {post.title}
        </h1>
        <p className="mt-3 max-w-[36em] text-[14px] leading-[1.95] text-ink-muted md:text-[15px]">
          {post.description}
        </p>
      </header>

      <CoverImage
        src={post.cover}
        alt=""
        className="mb-10 aspect-[16/9] w-full rounded-lg"
        priority
        sizes="(min-width: 1120px) 1056px, 100vw"
      />

      <div className="prose">
        <MdxContent source={post.body} />
      </div>
    </article>
  );
}
