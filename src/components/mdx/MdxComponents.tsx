// src/components/mdx/MdxComponents.tsx
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import CopyButton from "./CopyButton";

/** rehype-pretty-code は pre を figure[data-rehype-pretty-code-figure] で包む。 */
function Figure(props: ComponentPropsWithoutRef<"figure">) {
  const isCodeFigure = "data-rehype-pretty-code-figure" in props;
  if (!isCodeFigure) return <figure {...props} />;

  const { className, children, ...rest } = props;
  return (
    <figure {...rest} className={["code-figure", className].filter(Boolean).join(" ")}>
      <CopyButton />
      {children}
    </figure>
  );
}

function Anchor({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) return <Link href={href} {...rest} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;
}

function Img({ alt = "", ...rest }: ComponentPropsWithoutRef<"img">) {
  // 記事内の画像は寸法が既知でないため next/image は使わず、
  // ブラウザの遅延読み込みに任せる。
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} loading="lazy" decoding="async" {...rest} />;
}

export const mdxComponents = {
  figure: Figure,
  a: Anchor,
  img: Img,
};
