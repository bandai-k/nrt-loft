// src/lib/categories.ts
export const CATEGORIES = ["build", "learn", "toolkit", "journey"] as const;

export type Category = (typeof CATEGORIES)[number];

export type CategoryMeta = {
  slug: Category;
  /** ナビとカテゴリ名にだけ英字を使う。装飾目的の英字ラベルは増やさない。 */
  label: string;
  /** 一覧ページの見出し */
  heading: string;
  /** トップページのカテゴリ帯・一覧ページの導入で使う 1〜2 行 */
  description: string;
  /**
   * アイコンの背景色。デザイン仕様上、無彩色を外して差し色を置けるのは
   * こことマーカーだけ。
   */
  accent: string;
  /** カテゴリのアイコン画像（透過 PNG の線画） */
  icon: string;
};

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  build: {
    slug: "build",
    icon: "/images/icon-build.png",
    accent: "#f4e6c9",
    label: "BUILD",
    heading: "作ったもの",
    description: "実際に何かを作る記録。小さな仕組みをひとつずつ。",
  },
  learn: {
    slug: "learn",
    icon: "/images/icon-learn.png",
    accent: "#dde8db",
    label: "LEARN",
    heading: "作って分かったこと",
    description: "作って分かったことや失敗、AIとの付き合い方。",
  },
  toolkit: {
    slug: "toolkit",
    icon: "/images/icon-toolkit.png",
    accent: "#d9e3ee",
    label: "TOOLKIT",
    heading: "使っている道具",
    description: "使っている道具やプロンプト、AI料金プラン。",
  },
  journey: {
    slug: "journey",
    icon: "/images/icon-journey.png",
    accent: "#f2ddd4",
    label: "JOURNEY",
    heading: "活動の記録",
    description: "この活動自体の記録と、試行錯誤のプロセス。",
  },
};

export const CATEGORY_LIST: CategoryMeta[] = CATEGORIES.map(
  (c) => CATEGORY_META[c],
);

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}
