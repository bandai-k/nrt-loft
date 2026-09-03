// src/components/home/LatestAboutFollow.tsx
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import CategoryBadge from "@/components/CategoryBadge";
import { ArrowRightIcon, RssIcon, XIcon, YouTubeIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/format";
import { ABOUT_IMAGE, ABOUT_IMAGE_ALT } from "@/lib/images";
import { getPostsExceptCategory } from "@/lib/posts";
import {
  OPERATOR,
  RSS_PATH,
  X_URL,
  YOUTUBE_URL,
} from "@/lib/site";

const iconLinkClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink";

export default function LatestAboutFollow() {
  // BUILD 以外のカテゴリの記事がここに入る。お知らせ機能ではない。
  const posts = getPostsExceptCategory("build").slice(0, 4);

  return (
    <section className="bg-paper">
      {/* 3カラムにするのは xl から。1024〜1200px では列が細すぎて
          日付・カテゴリ・タイトルが窮屈になる。
          items-start にしないと、記事が少ないときに列が引き伸ばされて
          下に大きな空きができる。 */}
      <div className="mx-auto grid max-w-[1200px] items-start gap-10 border-t border-line px-5 py-14 md:grid-cols-2 md:px-8 md:py-18 xl:grid-cols-[1.15fr_1fr_0.85fr] xl:gap-12">
        <div>
          <h2 className="text-[17px]">最新の記事</h2>

          {posts.length === 0 ? (
            <p className="mt-5 text-[13.5px] leading-[2] text-ink-muted">
              制作記録のほかにも、使っている道具や、うまくいかなかったことを
              書いていく予定です。
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {posts.map((post) => (
                <li key={`${post.category}/${post.slug}`}>
                  <Link
                    href={`/${post.category}/${post.slug}`}
                    className="group flex flex-col gap-1 xl:flex-row xl:items-baseline xl:gap-4"
                  >
                    <span className="flex shrink-0 items-center gap-3">
                      <time
                        dateTime={post.date}
                        className="text-[12px] tabular-nums text-ink-faint"
                      >
                        {formatDate(post.date)}
                      </time>
                      <CategoryBadge category={post.category} />
                    </span>
                    <span className="text-[13.5px] leading-[1.75] transition-colors group-hover:text-ink-muted">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 2カラムのときは ABOUT を縦に跨がせ、左に 最新の記事 → 更新を受け取る を
            積む。そうしないと ABOUT の高さに引きずられて左下に大きな空きが出る。 */}
        <div className="md:row-span-2 xl:row-span-1 xl:border-l xl:border-line xl:pl-12">
          <h2 className="text-[17px]">NRT LOFT について</h2>
          <div className="mt-5 space-y-3 text-[13.5px] leading-[1.95] text-ink-muted">
            <p>
              NRT LOFT は、成田の旧釣具屋2階にある小さな場所の名前です。
              欲しい場所が無かったので、自分たちの手で作り直しました。
            </p>
            <p>ここでやっていることも、結局は同じです。</p>
          </div>

          {ABOUT_IMAGE && (
            <CoverImage
              src={ABOUT_IMAGE}
              alt={ABOUT_IMAGE_ALT}
              className="mt-5 aspect-[16/9] w-full rounded-lg"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          )}

          <p className="mt-5 text-[12.5px] text-ink-faint">
            運営：{OPERATOR}
          </p>
          <Link
            href="/about"
            className="link-underline mt-4 inline-flex items-center gap-1.5 text-[12.5px]"
          >
            詳しく見る
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="xl:border-l xl:border-line xl:pl-12">
          <h2 className="text-[17px]">更新を受け取る</h2>

          <div className="mt-5 flex items-center gap-2">
            {YOUTUBE_URL && (
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube チャンネル"
                className={iconLinkClass}
              >
                <YouTubeIcon className="h-[19px] w-[19px]" />
              </a>
            )}
            {X_URL && (
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X アカウント"
                className={iconLinkClass}
              >
                <XIcon className="h-[15px] w-[15px]" />
              </a>
            )}
            <a href={RSS_PATH} aria-label="RSS フィード" className={iconLinkClass}>
              <RssIcon className="h-[17px] w-[17px]" />
            </a>
          </div>

          <p className="mt-5 text-[13px] leading-[1.9] text-ink-muted">
            {YOUTUBE_URL
              ? "YouTube で制作の過程を公開しています。"
              : "更新は RSS でお届けしています。"}
          </p>

          {YOUTUBE_URL && (
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm mt-4"
            >
              チャンネルを見る
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
