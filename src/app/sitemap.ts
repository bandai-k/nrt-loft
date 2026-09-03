// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  // 記事の更新日のうち最も新しいもの。無ければビルド時刻。
  const newestPostDate = posts[0]
    ? new Date(posts[0].updated ?? posts[0].date)
    : now;

  return [
    {
      url: SITE_URL,
      lastModified: newestPostDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...CATEGORIES.map((category) => ({
      url: `${SITE_URL}/${category}`,
      lastModified: newestPostDate,
      changeFrequency: "weekly" as const,
      priority: category === "build" ? 0.9 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.category}/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/commerce-law`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
