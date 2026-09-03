// src/lib/fonts.ts
import { Zen_Maru_Gothic, Noto_Sans_JP } from "next/font/google";

/**
 * 見出し: 丸みのある手書き寄りの日本語フォント。
 * 本文: 可読性重視。書体はこの2つだけに絞る。
 *
 * subsets に "japanese" は存在しないが、Google が返す @font-face には
 * CJK を含む全 unicode-range が含まれる（ビルド出力で確認済み）。
 * ただし日本語は約120ファイルに分割されるため preload は切り、
 * ブラウザに必要な範囲だけ取りに行かせる。
 */
export const fontHeading = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-heading-src",
  fallback: ["Hiragino Maru Gothic ProN", "Hiragino Sans", "Meiryo", "sans-serif"],
});

export const fontBody = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-body-src",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "Meiryo", "sans-serif"],
});
