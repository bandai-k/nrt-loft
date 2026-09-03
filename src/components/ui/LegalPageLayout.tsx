// src/components/ui/LegalPageLayout.tsx
import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <div className="border-b border-line">
        <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
          <h1 className="text-[26px] leading-[1.5] md:text-[34px]">{title}</h1>
          <p className="mt-3 text-[13px] text-ink-muted">
            最終更新日: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
        {/* 法定ページは条文が長いので、記事本文より行長を広く取る */}
        <div className="prose" style={{ maxWidth: "46em" }}>
          {children}
        </div>

        <Link href="/" className="link-underline mt-12 inline-block text-[13px]">
          ← トップページに戻る
        </Link>
      </div>
    </>
  );
}
