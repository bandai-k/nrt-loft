// src/components/home/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BuildIcon, YouTubeIcon } from "@/components/ui/Icons";
import { HERO_IMAGE } from "@/lib/images";
import { CTA_LABEL_HERO, SITE_TAGLINE, YOUTUBE_URL } from "@/lib/site";

// 「OPEN FLOOR, OPEN MIND」を2行に割って見出しの上に置く
const TAGLINE_LINES = SITE_TAGLINE.split(",").map((line, i, all) =>
  i < all.length - 1 ? `${line.trim()},` : `${line.trim()}.`,
);

// 文字を読ませるために写真の上に敷く紙色のかぶせ。
// 狭い画面は全体を薄く覆い、広い画面では左から右へ抜いて写真を見せる。
const SCRIM_SM =
  "linear-gradient(to bottom, rgba(247,246,241,0.95) 0%, rgba(247,246,241,0.9) 100%)";
const SCRIM_LG =
  "linear-gradient(to right, rgba(247,246,241,0.96) 0%, rgba(247,246,241,0.93) 28%, rgba(247,246,241,0.60) 50%, rgba(247,246,241,0.18) 70%, rgba(247,246,241,0) 88%)";

export default function Hero() {
  return (
    /* 写真はヒーロー全幅。縦に収まらない分は上側（天井）を切る。
       文字の頭は --hero-gutter で中央寄せコンテナの左端に揃える。 */
    <section className="relative overflow-hidden bg-paper-alt">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        unoptimized={HERO_IMAGE.endsWith(".svg")}
        sizes="100vw"
        /* 上側（天井）は切れてよい。机とソファが残る高さに寄せる。 */
        className="object-cover object-[center_62%]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{ backgroundImage: SCRIM_SM }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ backgroundImage: SCRIM_LG }}
        aria-hidden="true"
      />

      <div className="relative flex min-h-[480px] items-center py-14 md:min-h-[540px] md:py-16 lg:min-h-[clamp(480px,44vw,620px)] lg:py-20">
        <div
          className="px-5 md:px-8"
          style={{ paddingInlineStart: `var(--hero-gutter)` }}
        >
          <div className="max-w-[34em] lg:max-w-[36em]">
            {/* サイトのタグライン。ロゴからは外したので、ここで一度だけ見せる。 */}
            <p
              className="mb-9 flex flex-col text-[10.5px] leading-[1.85] tracking-[0.26em] md:text-[11px]"
              style={{ color: "var(--color-gold)" }}
            >
              {TAGLINE_LINES.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>

            {/* 折り返し位置は <br> で固定する（自動折り返しは keep-all で止めている）。
                狭い画面では break-narrow が現れて3行になる。 */}
            <h1 className="hero-title rise-in tracking-[0.01em]">
              欲しいものが
              <br className="break-narrow" />
              無かったので、
              <br />
              <span className="marker">自分で作ることにした。</span>
            </h1>

            <p className="mt-6 max-w-[30em] text-[14px] leading-[2.05] text-ink-muted md:text-[15px]">
              コードが書けなくても、AIと一緒なら
              <br className="hidden md:block" />
              「自分の困りごとを解決する小さな仕組み」は作れます。
              <br className="hidden md:block" />
              その過程を、そのまま公開しています。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/build" className="btn btn-primary">
                <BuildIcon className="h-[17px] w-[17px]" />
                {CTA_LABEL_HERO}
                <ArrowRightIcon className="h-[17px] w-[17px]" />
              </Link>
              {YOUTUBE_URL && (
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <YouTubeIcon className="h-[18px] w-[18px]" />
                  YouTubeで見る
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
