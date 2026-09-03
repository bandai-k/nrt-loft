// src/components/home/Categories.tsx
import Link from "next/link";
import {
  ArrowRightIcon,
  BuildIcon,
  JourneyIcon,
  LearnIcon,
  ToolkitIcon,
} from "@/components/ui/Icons";
import { CATEGORY_LIST, type Category } from "@/lib/categories";

const ICONS: Record<Category, (p: { className?: string }) => React.ReactElement> = {
  build: BuildIcon,
  learn: LearnIcon,
  toolkit: ToolkitIcon,
  journey: JourneyIcon,
};

export default function Categories() {
  return (
    <section className="bg-paper-alt">
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-18">
        <h2 className="text-[20px] md:text-[23px]">書いていること</h2>

        <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_LIST.map((c, index) => {
            const Icon = ICONS[c.slug];
            return (
              <div
                key={c.slug}
                className={
                  index > 0
                    ? "lg:border-l lg:border-line lg:pl-10"
                    : undefined
                }
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-ink"
                  style={{ background: c.accent }}
                >
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-4 text-[15px] tracking-[0.14em]">{c.label}</h3>
                <p className="mt-2 text-[13px] leading-[1.9] text-ink-muted">
                  {c.description}
                </p>
                <Link
                  href={`/${c.slug}`}
                  className="link-underline mt-4 inline-flex items-center gap-1.5 text-[12.5px]"
                >
                  {c.heading}を見る
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
