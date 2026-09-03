// src/components/home/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BuildIcon, YouTubeIcon } from "@/components/ui/Icons";
import { HERO_IMAGE } from "@/lib/images";
import { CTA_LABEL_HERO, YOUTUBE_URL } from "@/lib/site";

export default function Hero() {
  return (
    /* 広い画面では画像を右端まで抜く。左カラムの内側余白は --hero-gutter で
       中央寄せコンテナの左端に合わせ、他セクションと文字の頭を揃える。 */
    <section className="bg-paper-alt">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div
          className="px-5 pt-12 pb-10 md:px-8 md:pt-16 lg:py-20 lg:pr-14"
          style={{ paddingInlineStart: `var(--hero-gutter)` }}
        >
          {/* アイキャッチ上の英字ラベルは置かない。見出しから始める。 */}
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

        <div className="px-5 pb-12 md:px-8 lg:h-full lg:p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-surface lg:aspect-auto lg:h-[clamp(400px,44vw,540px)] lg:rounded-none lg:border-0">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              unoptimized={HERO_IMAGE.endsWith(".svg")}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
