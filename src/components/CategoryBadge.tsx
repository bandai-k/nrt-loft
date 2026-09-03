// src/components/CategoryBadge.tsx
import { CATEGORY_META, type Category } from "@/lib/categories";

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="text-[11px] font-medium tracking-[0.18em] text-ink-muted">
      {CATEGORY_META[category].label}
    </span>
  );
}
