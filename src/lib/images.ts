// src/lib/images.ts
// サイトで使う画像の差し替え口。ファイルを public/images/ に置き、
// ここのパスを差し替えるだけで反映される。
//
// undefined のあいだは、その画像を使う箇所が描画されない（もしくは
// プレースホルダのまま）ので、素材が揃う前でも壊れない。

/**
 * ヒーローの画像。コードが映った画面は使わない（生活側のものを使う）。
 * 手書きの買い物メモと、自分で作ったアプリが並んでいる写真。
 */
export const HERO_IMAGE = "/images/hero.webp";

/** ABOUT に置く外観写真。未設定なら写真の枠ごと出さない。 */
export const ABOUT_IMAGE: string | undefined = "/images/about-storefront.webp";

export const ABOUT_IMAGE_ALT = "NRT LOFT の外観。成田・花崎町の旧釣具屋2階";

/**
 * ロゴ画像。未設定のあいだは文字組みのロゴを使う。
 * この画像はタグライン（OPEN FLOOR, OPEN MIND）を含むので、
 * 文字のタグラインは重ねて出さない。
 */
export const LOGO_IMAGE: string | undefined = "/images/nrt-loft-logo.png";
export const LOGO_IMAGE_INCLUDES_TAGLINE = true;
