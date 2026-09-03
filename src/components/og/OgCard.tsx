// src/components/og/OgCard.tsx
// satori(next/og)で描画されるため、使えるのは flexbox とインラインスタイルだけ。
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function OgCard({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FFFFFF",
        padding: "72px 80px",
        borderBottom: "20px solid #FAEEDA",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              color: "#888780",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            lineHeight: 1.45,
            fontWeight: 700,
            color: "#2C2C2A",
            maxWidth: 1000,
            // 改行を入れた見出しをそのまま反映させる
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#2C2C2A",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: 3,
            color: "#888780",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    </div>
  );
}
