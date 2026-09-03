// src/components/home/LatestAndAbout.tsx
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import { formatDate } from "@/lib/format";
import { getPostsExceptCategory } from "@/lib/posts";
import { OPERATOR, OPERATOR_REPRESENTATIVE } from "@/lib/site";

export default function LatestAndAbout() {
  // BUILD 以外のカテゴリの記事がここに入る。お知らせ機能ではない。
  const posts = getPostsExceptCategory("build").slice(0, 5);

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-[20px] md:text-[24px]">最新の記事</h2>

          {posts.length === 0 ? (
            <p className="mt-6 text-[14px] leading-[2] text-ink-muted">
              制作記録のほかにも、使っている道具や、うまくいかなかったことを
              書いていく予定です。
            </p>
          ) : (
            <ul className="mt-6">
              {posts.map((post) => (
                <li key={`${post.category}/${post.slug}`} className="border-b border-line">
                  <Link
                    href={`/${post.category}/${post.slug}`}
                    className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-5"
                  >
                    <span className="flex shrink-0 items-center gap-3 sm:w-[168px]">
                      <time
                        dateTime={post.date}
                        className="text-[12px] text-ink-faint"
                      >
                        {formatDate(post.date)}
                      </time>
                      <CategoryBadge category={post.category} />
                    </span>
                    <span className="text-[14px] leading-[1.75] transition-colors group-hover:text-ink-muted">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-line bg-paper-alt p-6 md:p-8">
          <h2 className="text-[18px]">NRT LOFT について</h2>
          <div className="mt-4 space-y-4 text-[14px] leading-[2] text-ink-muted">
            <p>
              NRT LOFT は、成田の旧釣具屋2階にある小さな場所の名前です。
              欲しい場所が無かったので、自分たちの手で作り直しました。
            </p>
            <p>ここでやっていることも、結局は同じです。</p>
          </div>
          <p className="mt-6 text-[13px] text-ink-faint">
            運営：{OPERATOR}（代表 {OPERATOR_REPRESENTATIVE}）
          </p>
          <Link href="/about" className="btn btn-secondary btn-sm mt-6">
            くわしく見る
          </Link>
        </div>
      </div>
    </section>
  );
}
