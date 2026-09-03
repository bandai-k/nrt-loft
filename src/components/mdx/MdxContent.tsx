// src/components/mdx/MdxContent.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./MdxComponents";

/**
 * 紙に近いライトテーマに合わせたコードブロック配色。
 * ダークテーマは実装しないので、明るいテーマ 1 つだけを読み込む。
 */
const prettyCodeOptions = {
  theme: "github-light",
  keepBackground: false,
} as const;

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          // rehype-slug の id は src/lib/toc.ts の採番と一致する（どちらも github-slugger）
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
