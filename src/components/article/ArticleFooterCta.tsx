// src/components/article/ArticleFooterCta.tsx
import { OPERATOR_URL } from "@/lib/site";

export default function ArticleFooterCta() {
  return (
    <p className="mt-14 border-t border-line pt-6 text-[13px] leading-[1.95] text-ink-muted">
      本格的に開発したい方へ。システム・サービス開発のご相談は{" "}
      <a
        href={OPERATOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-ink"
      >
        NEBULAB
      </a>{" "}
      へどうぞ。
    </p>
  );
}
