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
date: 2026-09-10
updated: 2026-09-12      # 任意
cover: /images/<slug>/cover.webp
tags: ["OCR", "カレンダー連携", "Claude Code", "Next.js"]
tools: ["Claude Code"]   # 任意。使用したAI
youtube: "xxxxxxxxxxx"   # 任意。動画ID。あると本文の前に埋め込まれる
draft: false             # true は本番ビルドから除外される（開発中は表示）
---
```

`title` / `description` / `date` は必須。カテゴリは置き場所のディレクトリで決まる
ので frontmatter には書かない。

カバー画像は記事ごとのフォルダに `public/images/<slug>/cover.<拡張子>` として置く。
管理画面から画像を入れると自動でこの形になる。

本文の見出し（`##` / `###`）から目次が自動生成される。コードブロックには
コピーボタンが付くので、プロンプトはそのまま貼ってよい。

## 記事の管理画面

`/keystatic` にブラウザから記事を書く画面がある。保存するとリポジトリに
コミットが積まれ、Vercel が再ビルドして 30 秒〜1 分で公開される。
記事の実体はこれまでどおり `content/` の MDX なので、
エディタで直接書いても管理画面から書いても結果は同じ。

### 手元で使う

```bash
npm run dev
# http://localhost:3000/keystatic
```

手元のファイルを直接読み書きするモードで動く。GitHub App の設定は要らない。

### 本番（www.nrt-loft.jp/keystatic）で使う

GitHub App が要る。手順は一度だけ。

1. `.env.local` を作り、`NEXT_PUBLIC_KEYSTATIC_STORAGE=github` の 1 行を書く
   （セットアップ画面に入るためだけの一時的な指定。あとで消す）
2. `npm run dev` して **`http://localhost:3000/keystatic/setup`** を開く
   （`/keystatic` はログイン画面になるだけ。セットアップはこの URL）
3. 「Deployed App URL」に `https://www.nrt-loft.jp` を入れる。
   組織の欄は空のままでよい（個人アカウントに作られる）
4. 「Create GitHub App」を押す。GitHub 側で作成すると戻ってきて、
   `.env` に **4 つ**の値が書き込まれる
5. その 4 つをそのまま Vercel の環境変数に登録する（Environments は Production だけ）
6. 再デプロイすると `/keystatic` で GitHub ログインが通る
7. 手元の `.env.local` を消す（手元はローカルモードに戻る）

Vercel に登録するのは、`.env` に書き込まれたこの 4 つ。**名前と値をそのまま写す。**

| 変数 | 中身 |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub App のクライアント ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub App のシークレット |
| `KEYSTATIC_SECRET` | セッションの署名鍵 |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | GitHub App の slug（`github` という文字列ではない） |

`NEXT_PUBLIC_KEYSTATIC_STORAGE` は Vercel に登録しなくてよい。
本番かどうかは `NODE_ENV` で自動的に判定される。

GitHub モードは上の 3 つ（slug 以外）が揃っていないとビルドが落ちる。
値が揃うまで本番のビルドを通したい場合だけ、逃げ道として Vercel に
`NEXT_PUBLIC_KEYSTATIC_STORAGE=local` を登録するとローカルモードでビルドできる
（その状態では管理画面から保存はできない）。

`.env` と `.env.local` は git 管理外なので、値がリポジトリに入ることはない。

管理画面は `robots.txt` で検索避けしてある。

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

| 用途 | ファイル | 触る定数 |
|---|---|---|
| ヒーロー画像 | `public/images/hero.webp` | `HERO_IMAGE` |
| ABOUT の外観写真 | `public/images/about-storefront.webp` | `ABOUT_IMAGE` / `ABOUT_IMAGE_ALT` |
| ロゴ | `public/images/nrt-loft-logo.png` | `LOGO_IMAGE` |
| カテゴリのアイコン | `public/images/icon-<category>.png` | `src/lib/categories.ts` の `icon` |

ロゴ画像にタグライン（OPEN FLOOR, OPEN MIND）が含まれている場合は
`LOGO_IMAGE_INCLUDES_TAGLINE` を `true` のままにする。含まれていなければ
`false` にすると、ロゴの下にタグラインの文字が入る。

記事のカバー画像は frontmatter の `cover` で指定する（`cover: /images/<slug>/cover.webp`）。

写真は WebP（幅 1200〜1600px、quality 82）に変換して置いている。ロゴと
カテゴリのアイコンは透過 PNG の線画で、本文色 `#2C2C2A` に塗り直してある。

ヒーロー画像には**コードが映った画面を使わない**。非エンジニアが最初に見る
画面に黒いエディタがあると、伝えたいことと正反対の印象になる。プリントの束、
冷蔵庫のメモ、机の上の日用品など、生活側のものを使う。
