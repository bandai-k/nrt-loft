// src/components/LineContactCard.tsx
import Image from "next/image";

type Props = {
  variant?: "card" | "compact";
};

const FALLBACK_LINE_URL = "https://line.me/R/ti/p/@nrt-loft"; // 環境変数未設定時のフォールバック

export default function LineContactCard({ variant = "card" }: Props) {
  const lineUrl =
    process.env.NEXT_PUBLIC_LINE_FRIEND_URL || FALLBACK_LINE_URL;
  const displayId = process.env.NEXT_PUBLIC_LINE_DISPLAY_ID || "@nrt-loft";

  if (variant === "compact") {
    return (
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 transition-colors hover:text-amber-500"
        style={{ color: "#d97706" }}
      >
        <span
          aria-hidden
          className="flex h-5 w-5 items-center justify-center rounded-sm text-[10px]"
          style={{
            background: "#06c755",
            color: "#0e0b06",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
          }}
        >
          L
        </span>
        <span
          className="text-[11px] tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {displayId}
        </span>
      </a>
    );
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-sm px-6 py-7 md:px-7 md:py-9"
      style={{
        border: "1px solid rgba(217,119,6,0.22)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div
        className="absolute left-0 top-0 h-6 w-6 border-l border-t"
        style={{ borderColor: "rgba(217,119,6,0.5)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 h-6 w-6 border-b border-r"
        style={{ borderColor: "rgba(217,119,6,0.5)" }}
        aria-hidden="true"
      />

      <div
        className="mb-2 text-[10px] tracking-[0.35em]"
        style={{ fontFamily: "var(--font-mono)", color: "#92400e" }}
      >
        — LINE
      </div>
      <h3
        className="mb-2 text-[20px] tracking-[0.08em]"
        style={{ fontFamily: "var(--font-heading)", color: "#e8e2d4" }}
      >
        LINEで気軽に相談
      </h3>
      <p
        className="mb-6 text-[13px] leading-[1.95] tracking-[0.04em]"
        style={{ color: "#7a6a4a", fontFamily: "var(--font-body)" }}
      >
        ちょっとした質問や急ぎの確認はLINEからどうぞ。
        <br className="hidden md:block" />
        QRコードを読み取り、または下のボタンから友だち追加してください。
      </p>

      <div className="mb-5 flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-5">
        <div
          className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-sm md:h-[140px] md:w-[140px]"
          style={{
            background: "#f5f1e8",
            border: "1px solid rgba(217,119,6,0.25)",
          }}
        >
          <Image
            src="/line-qr.png"
            alt={`LINE 公式アカウント ${displayId} のQRコード`}
            fill
            sizes="140px"
            className="object-contain"
            // 画像未配置でも壊れにくいように onError で代替テキストを表示
          />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 md:items-start">
          <div
            className="text-[12px] tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "#c8bfa8" }}
          >
            {displayId}
          </div>
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "12px 22px", fontSize: "11px" }}
          >
            LINEで友だち追加 →
          </a>
        </div>
      </div>

      <p
        className="mt-auto text-[11px] leading-[1.7] tracking-[0.04em]"
        style={{ color: "#6b5a3a", fontFamily: "var(--font-mono)" }}
      >
        — 営業時間外でもメッセージはお受けします(返信は翌営業日)
      </p>
    </div>
  );
}
