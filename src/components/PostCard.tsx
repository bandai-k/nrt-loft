// src/components/PostCard.tsx
import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import CoverImage from "./CoverImage";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/posts";

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <article>
      <Link href={`/${post.category}/${post.slug}`} className="group block">
        <CoverImage
          src={post.cover}
          alt=""
          className="aspect-[16/10] w-full rounded-lg"
        />
        <div className="mt-3 flex items-center gap-3">
          <CategoryBadge category={post.category} />
          <time dateTime={post.date} className="text-[12px] text-ink-faint">
            {formatDate(post.date)}
          </time>
        </div>
        <h3 className="mt-1.5 text-[16px] leading-[1.65] transition-colors group-hover:text-ink-muted">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.85] text-ink-muted">
          {post.description}
        </p>
      </Link>
    </article>
  );
}
