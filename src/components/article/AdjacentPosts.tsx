// src/components/article/AdjacentPosts.tsx
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import type { PostSummary } from "@/lib/posts";

function Item({
  post,
  direction,
}: {
  post: PostSummary;
  direction: "newer" | "older";
}) {
  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="group flex flex-1 items-center gap-4 rounded-lg border border-line p-4 transition-colors hover:border-line-strong"
    >
      <CoverImage
        src={post.cover}
        alt=""
        className="aspect-[16/10] w-24 shrink-0 rounded-md sm:w-28"
        sizes="112px"
      />
      <span className="min-w-0">
        <span className="text-[11px] text-ink-faint">
          {direction === "newer" ? "次の記事" : "前の記事"}
        </span>
        <span className="mt-1 block text-[14px] leading-[1.7] transition-colors group-hover:text-ink-muted">
          {post.title}
        </span>
      </span>
    </Link>
  );
}

export default function AdjacentPosts({
  newer,
  older,
}: {
  newer?: PostSummary;
  older?: PostSummary;
}) {
  if (!newer && !older) return null;

  return (
    <nav
      className="mt-14 flex flex-col gap-3 sm:flex-row"
      aria-label="前後の記事"
    >
      {older && <Item post={older} direction="older" />}
      {newer && <Item post={newer} direction="newer" />}
    </nav>
  );
}
