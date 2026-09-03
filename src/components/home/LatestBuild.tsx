// src/components/home/LatestBuild.tsx
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/format";
import { getPostsByCategory } from "@/lib/posts";
import { CTA_LABEL_ALL } from "@/lib/site";

export default function LatestBuild() {
  const posts = getPostsByCategory("build");
  const [lead, ...rest] = posts;
  const sidePosts = rest.slice(0, 3);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-18">
        <h2 className="text-[20px] md:text-[23px]">最近つくったもの</h2>

        {!lead ? (
          <div className="mt-6 max-w-[34em]">
            <p className="text-[14px] leading-[2] text-ink-muted">
              いま一本目を書いています。公開まで、もう少しお待ちください。
              どんなものを作っているかは ABOUT に書いてあります。
            </p>
            <Link href="/about" className="btn btn-secondary mt-6">
              NRT LOFT について
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.95fr)] lg:gap-10">
              {/* 最新1本のカバー */}
              <Link
                href={`/build/${lead.slug}`}
                className="block"
                aria-label={lead.title}
              >
                <CoverImage
                  src={lead.cover}
                  alt=""
                  className="aspect-[4/3] w-full rounded-xl"
                  sizes="(min-width: 1024px) 330px, 100vw"
                />
              </Link>

              {/* 最新1本の見出しと説明 */}
              <div className="lg:pt-1">
                <span className="text-[11px] font-medium tracking-[0.18em] text-ink-muted">
                  BUILD
                </span>
                <h3 className="mt-2 text-[19px] leading-[1.62] md:text-[21px]">
                  <Link
                    href={`/build/${lead.slug}`}
                    className="transition-colors hover:text-ink-muted"
                  >
                    {lead.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.95] text-ink-muted">
                  {lead.description}
                </p>
                {lead.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {lead.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line px-2.5 py-1 text-[11px] text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/build/${lead.slug}`}
                  className="link-underline mt-5 inline-flex items-center gap-1.5 text-[13px]"
                >
                  この記録を読む
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              {/* 過去3本。1本しか無いときはこの列ごと出さない */}
              {sidePosts.length > 0 && (
                <div className="lg:border-l lg:border-line lg:pl-10">
                  <ul className="space-y-5">
                    {sidePosts.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/build/${post.slug}`} className="group flex gap-4">
                          <CoverImage
                            src={post.cover}
                            alt=""
                            className="h-[62px] w-[86px] shrink-0 rounded-lg"
                            sizes="86px"
                          />
                          <div className="min-w-0">
                            <span className="text-[10.5px] font-medium tracking-[0.18em] text-ink-faint">
                              BUILD
                            </span>
                            <h3 className="mt-1 line-clamp-2 text-[13.5px] leading-[1.72] transition-colors group-hover:text-ink-muted">
                              {post.title}
                            </h3>
                            <time
                              dateTime={post.date}
                              className="mt-1 block text-[11px] text-ink-faint"
                            >
                              {formatDate(post.date)}
                            </time>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-end">
              <Link
                href="/build"
                className="link-underline inline-flex items-center gap-1.5 text-[13px]"
              >
                {CTA_LABEL_ALL}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
