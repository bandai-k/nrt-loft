// src/components/article/AdjacentPosts.tsx
import Link from "next/link";
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
      className="group flex-1 rounded-lg border border-line p-5 transition-colors hover:border-line-strong"
    >
      <span className="text-[11px] text-ink-faint">
        {direction === "newer" ? "次の記事" : "前の記事"}
      </span>
      <span className="mt-1.5 block text-[14px] leading-[1.7] transition-colors group-hover:text-ink-muted">
        {post.title}
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
