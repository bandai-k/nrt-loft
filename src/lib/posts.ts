// src/lib/posts.ts
// content/<category>/<slug>.mdx を読み、frontmatter を型付きで返す。
// fs アクセスを伴うのでサーバー側からのみ呼ぶこと。

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { CATEGORIES, isCategory, type Category } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PostFrontmatter = {
  title: string;
  description: string;
  category: Category;
  /** YYYY-MM-DD に正規化済み */
  date: string;
  /** YYYY-MM-DD に正規化済み */
  updated?: string;
  cover?: string;
  tags: string[];
  tools: string[];
  /** YouTube の動画 ID */
  youtube?: string;
  draft: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  /** frontmatter を除いた MDX 本文 */
  body: string;
};

/** 一覧表示で使う、本文を含まない軽量版 */
export type PostSummary = Omit<Post, "body">;

/**
 * YAML は `date: 2026-09-10` を Date として解釈する。文字列で書かれる場合もあるため
 * 両方を受け、UTC 基準で YYYY-MM-DD に正規化する。ローカルタイムゾーンを経由すると
 * 日付が 1 日ずれるので、必ず UTC のまま扱う。
 */
function normalizeDate(value: unknown, context: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10);
  }
  throw new Error(
    `${context}: date は YYYY-MM-DD 形式で指定してください（受け取った値: ${String(value)}）`,
  );
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function requireString(value: unknown, field: string, context: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${context}: frontmatter の ${field} は必須です`);
  }
  return value.trim();
}

function readPostFile(category: Category, slug: string): Post {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const context = `content/${category}/${slug}.mdx`;

  const declaredCategory = requireString(data.category, "category", context);
  if (declaredCategory !== category) {
    throw new Error(
      `${context}: frontmatter の category (${declaredCategory}) が置き場所 (${category}) と一致しません`,
    );
  }

  return {
    slug,
    title: requireString(data.title, "title", context),
    description: requireString(data.description, "description", context),
    category,
    date: normalizeDate(data.date, context),
    updated:
      data.updated === undefined || data.updated === null
        ? undefined
        : normalizeDate(data.updated, context),
    cover: typeof data.cover === "string" ? data.cover : undefined,
    tags: toStringArray(data.tags),
    tools: toStringArray(data.tools),
    youtube: typeof data.youtube === "string" ? data.youtube : undefined,
    draft: data.draft === true,
    body: content,
  };
}

/** draft を本番ビルドから除外する。開発中は下書きも見えるようにしておく。 */
function isVisible(post: { draft: boolean }): boolean {
  return !post.draft || process.env.NODE_ENV !== "production";
}

/** 新しい順。同日なら slug で安定させる。 */
function byDateDesc(a: PostSummary, b: PostSummary): number {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.slug.localeCompare(b.slug);
}

function stripBody(post: Post): PostSummary {
  const { body, ...summary } = post;
  void body;
  return summary;
}

const loadAll = cache((): Post[] => {
  const posts: Post[] = [];

  for (const category of CATEGORIES) {
    const dir = path.join(CONTENT_DIR, category);
    if (!fs.existsSync(dir)) continue;

    for (const entry of fs.readdirSync(dir)) {
      if (!entry.endsWith(".mdx")) continue;
      posts.push(readPostFile(category, entry.replace(/\.mdx$/, "")));
    }
  }

  return posts.filter(isVisible);
});

export function getAllPosts(): PostSummary[] {
  return loadAll().map(stripBody).sort(byDateDesc);
}

export function getPostsByCategory(category: Category): PostSummary[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** BUILD 以外の最新記事。トップページの「最新の記事」欄で使う。 */
export function getPostsExceptCategory(category: Category): PostSummary[] {
  return getAllPosts().filter((p) => p.category !== category);
}

export function getPost(category: Category, slug: string): Post | undefined {
  return loadAll().find((p) => p.category === category && p.slug === slug);
}

/**
 * 同一カテゴリ内での前後。newer は日付が新しいほう、older は古いほう。
 * 一覧が新しい順なので、配列上は newer が手前に来る。
 */
export function getAdjacentPosts(
  category: Category,
  slug: string,
): { newer?: PostSummary; older?: PostSummary } {
  const posts = getPostsByCategory(category);
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { newer: posts[index - 1], older: posts[index + 1] };
}

/** generateStaticParams 用 */
export function getSlugsByCategory(category: Category): string[] {
  return getPostsByCategory(category).map((p) => p.slug);
}

export { isCategory };
export type { Category };
