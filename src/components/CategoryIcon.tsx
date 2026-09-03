// src/components/CategoryIcon.tsx
import Image from "next/image";
import { CATEGORY_META, type Category } from "@/lib/categories";

/**
 * カテゴリのアイコン。線画の透過 PNG を、差し色の丸の上に載せる。
 * デザイン仕様上、無彩色を外して差し色を置けるのはこことマーカーだけ。
 */
export default function CategoryIcon({
  category,
  size = 56,
}: {
  category: Category;
  size?: number;
}) {
  const meta = CATEGORY_META[category];
  const glyph = Math.round(size * 0.5);

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: meta.accent }}
    >
      <Image
        src={meta.icon}
        alt=""
        width={glyph}
        height={glyph}
        aria-hidden="true"
        className="h-auto w-auto"
        style={{ maxWidth: glyph, maxHeight: glyph }}
      />
    </span>
  );
}
