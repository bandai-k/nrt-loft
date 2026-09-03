// src/app/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdjacentPosts from "@/components/article/AdjacentPosts";
import ArticleFooterCta from "@/components/article/ArticleFooterCta";
import TableOfContents from "@/components/article/TableOfContents";
import YouTubeEmbed from "@/components/article/YouTubeEmbed";
import CoverImage from "@/components/CoverImage";
import { ArticleStructuredData } from "@/components/StructuredData";
import MdxContent from "@/components/mdx/MdxContent";
import { CATEGORIES, CATEGORY_META, isCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getAdjacentPosts, getPost, getSlugsByCategory } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { buildToc } from "@/lib/toc";

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
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  if (!isCategory(category)) notFound();

  const post = getPost(category, slug);
  if (!post) notFound();

  const toc = buildToc(post.body);
  const { newer, older } = getAdjacentPosts(category, slug);
  const categoryMeta = CATEGORY_META[category];
  // 同じ語が tools と tags の両方にあるとチップが二重に出るので、tools を優先する
  const tags = post.tags.filter((tag) => !post.tools.includes(tag));

  const url = `${SITE_URL}/${category}/${slug}`;

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14">
      <ArticleStructuredData
        title={post.title}
        description={post.description}
        url={url}
        datePublished={post.date}
        dateModified={post.updated ?? post.date}
        imageUrl={`${url}/opengraph-image`}
        keywords={[...post.tags, ...post.tools]}
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_224px] lg:gap-14">
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link
                href={`/${category}`}
                className="link-underline text-[11px] font-medium tracking-[0.18em] text-ink-muted"
              >
                {categoryMeta.label}
              </Link>
              <time dateTime={post.date} className="text-[12px] text-ink-faint">
                {formatDate(post.date)}
              </time>
              {post.updated && post.updated !== post.date && (
                <span className="text-[12px] text-ink-faint">
                  （{formatDate(post.updated)} 更新）
                </span>
              )}
            </div>

            <h1 className="mt-2 max-w-[24em] text-[24px] leading-[1.55] md:text-[32px]">
              {post.title}
            </h1>

            <p className="mt-3 max-w-[36em] text-[14px] leading-[1.95] text-ink-muted md:text-[15px]">
              {post.description}
            </p>

            {(tags.length > 0 || post.tools.length > 0) && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tools.map((tool) => (
                  <li
                    key={`tool-${tool}`}
                    className="rounded-full bg-marker px-2.5 py-1 text-[11px] text-ink"
                  >
                    {tool}
                  </li>
                ))}
                {tags.map((tag) => (
                  <li
                    key={`tag-${tag}`}
                    className="rounded-full border border-line-strong px-2.5 py-1 text-[11px] text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <CoverImage
            src={post.cover}
            alt=""
            className="mb-10 aspect-[16/9] w-full rounded-lg"
            priority
            sizes="(min-width: 1024px) 700px, 100vw"
          />

          {/* 広い画面では右の追従目次を使うので、こちらはモバイルでだけ出す */}
          <div className="lg:hidden">
            <TableOfContents entries={toc} variant="inline" />
          </div>

          {post.youtube && <YouTubeEmbed id={post.youtube} title={post.title} />}

          <div className="prose">
            <MdxContent source={post.body} />
          </div>

          <ArticleFooterCta />
          <AdjacentPosts newer={newer} older={older} />
        </article>

        <aside className="hidden lg:block">
          <TableOfContents entries={toc} variant="aside" />
        </aside>
      </div>
    </div>
  );
}
