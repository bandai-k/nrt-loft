// src/components/home/NebulabBand.tsx
import { OPERATOR_URL } from "@/lib/site";

export default function NebulabBand() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8 md:py-12">
        <div>
          <h2 className="text-[17px]">本格的に開発したい方へ</h2>
          <p className="mt-1.5 text-[14px] leading-[1.9] text-ink-muted">
            システム・サービス開発のご相談は NEBULAB へ
          </p>
        </div>
        <a
          href={OPERATOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary shrink-0 self-start md:self-auto"
        >
          NEBULAB を見る
        </a>
      </div>
    </section>
  );
}
