// src/app/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdjacentPosts from "@/components/article/AdjacentPosts";
import ArticleFooterCta from "@/components/article/ArticleFooterCta";
import TableOfContents from "@/components/article/TableOfContents";
import YouTubeEmbed from "@/components/article/YouTubeEmbed";
import CoverImage from "@/components/CoverImage";
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { hasGearLinks } from "@/components/mdx/Gear";
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
    <div className="mx-auto max-w-[var(--container)] px-5 py-10 md:px-8 md:py-14">
      <ArticleStructuredData
        title={post.title}
        description={post.description}
        url={url}
        datePublished={post.date}
        dateModified={post.updated ?? post.date}
        imageUrl={post.cover ? `${SITE_URL}${post.cover}` : undefined}
        keywords={[...post.tags, ...post.tools]}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "ホーム", url: SITE_URL },
          { name: categoryMeta.label, url: `${SITE_URL}/${category}` },
          { name: post.title, url },
        ]}
      />
      {/* ヘッダー・カバー画像・関連記事は一覧ページと同じ幅の枠（このdivのmax-w-[var(--container)]いっぱい）に置く。
          見出しやリード文自体はmax-w-[24em]/[36em]で読みやすい行長のまま。
          本文は下のgridで880px（xl 1000px、2xl 1080px）に絞る（2026-09-20 に 760/840 から広げた。運営者の指摘: 1600px の枠では細すぎる）。
          （以前は本文列を含めた全体をこのgridに入れていたため、広い画面ではヘッダー画像や関連記事まで
          760/840pxに縮み、一覧ページより記事ページだけ極端に狭く見えていた） */}
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

      {!post.hideCoverInArticle && (
        <CoverImage
          src={post.cover}
          alt={post.title}
          className="mb-10 aspect-[16/9] w-full rounded-lg"
          priority
          sizes="(min-width: 1536px) 1600px, 100vw"
        />
      )}

      {/* 本文列を880px（xl 1000px、2xl 1080px）に固定し、目次と一組で中央に置く。
          以前は列が1fr・本文が40em左寄せで、広い画面だと本文の右に大きな空白ができていた */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,880px)_224px] lg:justify-center lg:gap-14 xl:grid-cols-[minmax(0,1000px)_224px] xl:gap-16 2xl:grid-cols-[minmax(0,1080px)_224px]">
        <article>
          {/* 広い画面では右の追従目次を使うので、こちらはモバイルでだけ出す */}
          <div className="lg:hidden">
            <TableOfContents entries={toc} variant="inline" />
          </div>

          {post.youtube && <YouTubeEmbed id={post.youtube} title={post.title} />}

          {/* 道具を紹介した記事にだけ、広告であることを一行で示す（景表法のステマ規制） */}
          {hasGearLinks(post.body) && (
            <p className="mb-6 text-[12px] leading-[1.9] text-ink-faint">
              この記事の道具へのリンクには、アフィリエイトリンクを含みます。
            </p>
          )}

          {/* 行長は本文列の幅で決める（xl以上は文字も18pxにして1行45字前後を保つ） */}
          <div className="prose max-w-none xl:text-[1.125rem]">
            <MdxContent source={post.body} />
          </div>

          <ArticleFooterCta />
        </article>

        <aside className="hidden lg:block">
          <TableOfContents entries={toc} variant="aside" />
        </aside>
      </div>

      <AdjacentPosts newer={newer} older={older} />
    </div>
  );
}
