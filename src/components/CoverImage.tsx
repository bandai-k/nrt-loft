// src/components/CoverImage.tsx
import Image from "next/image";

/**
 * カバー画像。frontmatter に cover が無い記事もあるので、
 * その場合は面の色だけのプレースホルダを同じ比率で置く。
 */
export default function CoverImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const base = `relative overflow-hidden border border-line bg-surface ${className}`;

  if (!src) return <div className={base} aria-hidden="true" />;

  return (
    <div className={base}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
