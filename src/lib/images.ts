// src/lib/images.ts
// サイトで使う画像の差し替え口。ファイルを public/images/ に置き、
// ここのパスを差し替えるだけで反映される。
//
// undefined のあいだは、その画像を使う箇所が描画されない（もしくは
// プレースホルダのまま）ので、素材が揃う前でも壊れない。

/**
 * ヒーローの画像。NRT LOFT の作業部屋そのものを見せる。
 * 横長（16:9）なので、広い画面では上下が少し切れる前提で置いている。
 */
export const HERO_IMAGE = "/images/hero-home-office.webp";

/** ABOUT に置く写真。未設定なら写真の枠ごと出さない。 */
export const ABOUT_IMAGE: string | undefined = "/images/hero-home-office.webp";

export const ABOUT_IMAGE_ALT = "NRT LOFT の作業部屋。成田・花崎町の旧釣具屋2階";

/**
 * ロゴ画像。未設定のあいだは文字組みのロゴを使う。
 * この画像はシンボルとワードマークだけでタグラインを含まないので、
 * タグラインは Logo コンポーネント側で文字として添える。
 */
export const LOGO_IMAGE: string | undefined = "/images/nrt-loft-logo.png";
export const LOGO_IMAGE_INCLUDES_TAGLINE = false;

/** ロゴのシンボルだけを切り出したもの。節見出しの頭に添える。 */
export const MARK_IMAGE = "/images/nrt-loft-mark.png";

/**
 * サイト全体の背景に薄く敷く、金の等角線画。
 * body の ::before に固定配置して本文の下に置く（globals.css）。
 */
export const SITE_BACKGROUND_IMAGE = "/images/site-background.webp";
