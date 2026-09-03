// src/lib/images.ts
// サイトで使う画像の差し替え口。ファイルを public/images/ に置き、
// ここのパスを差し替えるだけで反映される。
//
// undefined のあいだは、その画像を使う箇所が描画されない（もしくは
// プレースホルダのまま）ので、素材が揃う前でも壊れない。

/** ヒーローの画像。コードが映った画面は使わない（生活側のものを使う）。 */
export const HERO_IMAGE = "/images/hero-placeholder.svg";

/** ABOUT ページに置く外観写真。未設定なら写真の枠ごと出さない。 */
export const ABOUT_IMAGE: string | undefined = undefined;

/** ABOUT 写真の説明。ABOUT_IMAGE を設定するときは一緒に書く。 */
export const ABOUT_IMAGE_ALT = "NRT LOFT の外観";

/**
 * ロゴ画像。未設定のあいだは文字組みのロゴを使う。
 * 画像にタグライン（OPEN FLOOR, OPEN MIND）が含まれている場合は
 * LOGO_IMAGE_INCLUDES_TAGLINE を true にして、文字の重複を避ける。
 */
export const LOGO_IMAGE: string | undefined = undefined;
export const LOGO_IMAGE_INCLUDES_TAGLINE = true;
