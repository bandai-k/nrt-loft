// src/app/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import PostCard from "@/components/PostCard";
import { CATEGORIES, CATEGORY_META, isCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

// 4カテゴリだけを生成し、それ以外のパスは 404 にする。
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const meta = CATEGORY_META[category];

  return {
    title: meta.heading,
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/${category}` },
    openGraph: {
      title: `${meta.heading}｜NRT LOFT`,
      description: meta.description,
      url: `${SITE_URL}/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const meta = CATEGORY_META[category];
  const posts = getPostsByCategory(category);

  return (
    <>
      <PageHeader title={meta.heading} lead={meta.description} />

      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        {posts.length === 0 ? (
          <p className="text-[14px] leading-[1.95] text-ink-muted">
            このカテゴリの記事はまだありません。準備ができ次第、ここに並びます。
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
