// src/components/home/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { CTA_LABEL_HERO, YOUTUBE_URL } from "@/lib/site";
import { YouTubeIcon } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
        <div>
          {/* アイキャッチ上の英字ラベルは置かない。見出しから始める。 */}
          <h1
            className="rise-in leading-[1.62] tracking-[0.01em]"
            // 指定した位置以外で折り返さないよう、桁数に合わせて字送りを可変にする
            style={{ fontSize: "clamp(22px, 3.4vw, 38px)" }}
          >
            欲しいものが無かったので、
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
              {CTA_LABEL_HERO}
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

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-surface">
          <Image
            src="/images/hero-placeholder.svg"
            alt=""
            fill
            priority
            unoptimized
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
