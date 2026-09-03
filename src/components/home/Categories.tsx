// src/components/home/Categories.tsx
import Link from "next/link";
import {
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
    <section className="border-t border-line bg-paper-alt">
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-[20px] md:text-[24px]">書いていること</h2>

        {/* BUILD が中心、他の3つが補助という関係を面積で見せる */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          {CATEGORY_LIST.filter((c) => c.slug === "build").map((c) => {
            const Icon = ICONS[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-line-strong bg-paper p-6 transition-colors hover:border-ink-faint md:p-8"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-marker text-ink">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-4 text-[17px] tracking-[0.14em]">{c.label}</h3>
                  <p className="mt-2 max-w-[24em] text-[14px] leading-[1.95] text-ink-muted">
                    {c.description}
                  </p>
                </div>
                <span className="link-underline mt-6 self-start text-[13px]">
                  {c.heading}を見る
                </span>
              </Link>
            );
          })}

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {CATEGORY_LIST.filter((c) => c.slug !== "build").map((c) => {
              const Icon = ICONS[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="flex gap-4 rounded-xl border border-line bg-paper p-5 transition-colors hover:border-line-strong"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-muted">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] tracking-[0.14em]">{c.label}</h3>
                    <p className="mt-1 text-[13px] leading-[1.85] text-ink-muted">
                      {c.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
