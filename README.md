# NRT LOFT

AIで自分のための道具をつくる活動を発信するサイト。Next.js (App Router) + Tailwind CSS v4。

## 開発

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## 記事を書く

記事は `content/<category>/<slug>.mdx` に置く。CMS は使わない。
`content/` 直下のディレクトリ名がそのままカテゴリ、ファイル名が URL の slug になる
（`content/build/foo.mdx` → `/build/foo`）。

カテゴリは `build` / `learn` / `toolkit` / `journey` の4つ。増やすときは
`src/lib/categories.ts` に定義を足す。

### frontmatter

```yaml
---
title: "学校のプリントが処理しきれないので、撮るだけで予定になるツールを作った"
description: "提出期限・持ち物・行事を自動で整理して、カレンダーにも登録する"
category: build          # 置き場所のディレクトリ名と一致させる
date: 2026-09-10
updated: 2026-09-12      # 任意
cover: /images/build-04.jpg
tags: ["OCR", "カレンダー連携", "Claude Code", "Next.js"]
tools: ["Claude Code"]   # 任意。使用したAI
youtube: "xxxxxxxxxxx"   # 任意。動画ID。あると本文の前に埋め込まれる
draft: false             # true は本番ビルドから除外される（開発中は表示）
---
```

`title` / `description` / `category` / `date` は必須。`category` が置き場所と
食い違っていると、ビルドが理由付きで落ちる。

本文の見出し（`##` / `###`）から目次が自動生成される。コードブロックには
コピーボタンが付くので、プロンプトはそのまま貼ってよい。

## 設定の置き場所

| やりたいこと | 触るファイル |
|---|---|
| サイト名・説明・YouTube の URL・CTA 文言 | `src/lib/site.ts` |
| カテゴリの追加と説明文 | `src/lib/categories.ts` |
| 配色・書体・本文の組版 | `src/app/globals.css` |
| リダイレクト | `next.config.ts` |

YouTube チャンネルの URL は未確定のため `YOUTUBE_URL` を `undefined` にしてある。
値を入れると、ヘッダー・フッター・ヒーローの YouTube 導線が現れる。

## 環境変数

お問い合わせフォームは [Resend](https://resend.com/) を使う。`.env.example` を
`.env.local` にコピーして `RESEND_API_KEY` を設定する。詳しい手順（API キー、
Vercel の環境変数、独自ドメインの DNS）は [docs/SETUP.md](./docs/SETUP.md) を参照。

## 配信

- `/rss.xml` — 全カテゴリの記事フィード
- `/sitemap.xml` — 記事から自動生成
- OGP 画像 — 記事ごとに `next/og` でビルド時に生成する。日本語フォントは
  Google Fonts から必要な文字だけ取得する（取得に失敗してもビルドは止まらない）

## 素材（写真・ロゴ）の差し替え

画像は `public/images/` に置き、`src/lib/images.ts` のパスを差し替える。
未設定のあいだはその箇所が描画されないので、素材が揃う前でも表示は壊れない。

| 用途 | 置き場所の例 | 触る定数 |
|---|---|---|
| ヒーロー画像 | `public/images/hero.jpg` | `HERO_IMAGE` |
| ABOUT の外観写真 | `public/images/about-storefront.jpg` | `ABOUT_IMAGE` / `ABOUT_IMAGE_ALT` |
| ロゴ | `public/images/nrt-loft-logo.svg` | `LOGO_IMAGE` |

ロゴ画像にタグライン（OPEN FLOOR, OPEN MIND）が含まれている場合は
`LOGO_IMAGE_INCLUDES_TAGLINE` を `true` のままにする。含まれていなければ
`false` にすると、ロゴの下にタグラインの文字が入る。

記事のカバー画像は frontmatter の `cover` で指定する（`cover: /images/xxx.webp`）。

写真は WebP（幅 1200〜1600px、quality 82）に変換して置いている。ロゴと
カテゴリのアイコンは透過 PNG の線画で、本文色 `#2C2C2A` に塗り直してある。

ヒーロー画像には**コードが映った画面を使わない**。非エンジニアが最初に見る
画面に黒いエディタがあると、伝えたいことと正反対の印象になる。プリントの束、
冷蔵庫のメモ、机の上の日用品など、生活側のものを使う。
