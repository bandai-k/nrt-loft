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
    <section className="border-t border-line bg-paper-alt">
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-[20px] md:text-[24px]">最近つくったもの</h2>

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
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
              {/* 最新1本を大きく */}
              <article>
                <Link href={`/build/${lead.slug}`} className="group block">
                  <CoverImage
                    src={lead.cover}
                    alt=""
                    className="aspect-[16/10] w-full rounded-lg"
                    sizes="(min-width: 1024px) 620px, 100vw"
                  />
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-[11px] font-medium tracking-[0.18em] text-ink-muted">
                      BUILD
                    </span>
                    <time
                      dateTime={lead.date}
                      className="text-[12px] text-ink-faint"
                    >
                      {formatDate(lead.date)}
                    </time>
                  </div>
                  <h3 className="mt-2 max-w-[22em] text-[19px] leading-[1.6] transition-colors group-hover:text-ink-muted md:text-[22px]">
                    {lead.title}
                  </h3>
                  <p className="mt-2.5 max-w-[32em] text-[14px] leading-[1.95] text-ink-muted">
                    {lead.description}
                  </p>
                  {lead.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {lead.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line-strong px-2.5 py-1 text-[11px] text-ink-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="link-underline mt-5 inline-flex items-center gap-1.5 text-[13px]">
                    この記録を読む
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </article>

              {/* 過去3本。1本しか無いときはこの列ごと出さない */}
              {sidePosts.length > 0 && (
                <div className="lg:border-l lg:border-line lg:pl-12">
                  <ul>
                    {sidePosts.map((post) => (
                      <li
                        key={post.slug}
                        className="border-t border-line first:border-t-0 first:pt-0"
                      >
                        <Link
                          href={`/build/${post.slug}`}
                          className="group flex gap-4 py-5 first:pt-0"
                        >
                          <CoverImage
                            src={post.cover}
                            alt=""
                            className="h-[64px] w-[92px] shrink-0 rounded-md"
                            sizes="92px"
                          />
                          <div className="min-w-0">
                            <time
                              dateTime={post.date}
                              className="text-[11px] text-ink-faint"
                            >
                              {formatDate(post.date)}
                            </time>
                            <h3 className="mt-1 line-clamp-3 text-[14px] leading-[1.7] transition-colors group-hover:text-ink-muted">
                              {post.title}
                            </h3>
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
