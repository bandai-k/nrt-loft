// keystatic.config.ts
// 記事を書くための管理画面の定義。
// 記事の実体はこれまでどおり content/<category>/<slug>.mdx で、
// 保存するとリポジトリにコミットが積まれ、Vercel が再ビルドして公開される。
import { config, collection, fields } from "@keystatic/core";

const GITHUB_OWNER = "bandai-k";
const GITHUB_REPO = "nrt-loft";

/** カテゴリごとに同じ項目を使うので、雛形をひとつ作って使い回す */
function postCollection(category: string, label: string) {
  return collection({
    label,
    path: `content/${category}/*`,
    slugField: "title",
    format: { contentField: "content" },
    entryLayout: "content",
    columns: ["title", "date"],
    schema: {
      title: fields.slug({
        name: {
          label: "タイトル",
          description: "困りごとから書く。専門用語はできるだけ使わない",
          validation: { isRequired: true },
        },
        slug: {
          label: "URL（半角英数とハイフン）",
          description: `公開先は /${category}/ここに入れた文字 になります`,
        },
      }),
      description: fields.text({
        label: "説明",
        description: "一覧と検索結果、SNS のカードに出る1〜2行",
        multiline: true,
        validation: { isRequired: true },
      }),
      date: fields.date({
        label: "公開日",
        validation: { isRequired: true },
        defaultValue: { kind: "today" },
      }),
      updated: fields.date({
        label: "更新日",
        description: "書き直したときだけ入れる。空でよい",
      }),
      cover: fields.image({
        label: "カバー画像",
        description: "一覧のカードと記事の頭に出る。横長（16:9 前後）が収まりがよい",
        directory: "public/images",
        publicPath: "/images/",
      }),
      tags: fields.array(fields.text({ label: "タグ" }), {
        label: "タグ",
        itemLabel: (props) => props.value ?? "",
      }),
      tools: fields.array(fields.text({ label: "使ったAI" }), {
        label: "使ったAI",
        description: "Claude Code など。記事の頭にチップで出る",
        itemLabel: (props) => props.value ?? "",
      }),
      youtube: fields.text({
        label: "YouTube の動画ID",
        description:
          "URL ではなく ID だけ。https://youtu.be/xxxxxxxxxxx の xxxxxxxxxxx の部分",
      }),
      draft: fields.checkbox({
        label: "下書き",
        description: "入れておくと公開されない（自分の環境でだけ見える）",
        defaultValue: false,
      }),
      content: fields.mdx({
        label: "本文",
        options: {
          image: {
            directory: "public/images",
            publicPath: "/images/",
          },
        },
      }),
    },
  });
}

/**
 * 本番は GitHub モード、手元は local。NODE_ENV で自動的に切り替わるので、
 * ふだんは環境変数を足す必要がない。
 *
 * NEXT_PUBLIC_KEYSTATIC_STORAGE に "local" / "github" を入れると上書きできる。
 * 使うのは、GitHub App の値が揃っていなくて本番のビルドを通したいときだけ
 * （GitHub モードは KEYSTATIC_GITHUB_CLIENT_ID / _CLIENT_SECRET /
 * KEYSTATIC_SECRET が無いとビルドが落ちる）。
 *
 * NEXT_PUBLIC_ を使うのは、この設定を管理画面（ブラウザ側）と
 * API ルート（サーバー側）の両方が読むため。サーバー専用の変数だと
 * ブラウザ側で undefined になり、両者の認識がずれる。
 */
const storageOverride = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE;
const useGitHubStorage =
  storageOverride === "github"
    ? true
    : storageOverride === "local"
      ? false
      : process.env.NODE_ENV === "production";

export default config({
  storage: useGitHubStorage
    ? { kind: "github", repo: { owner: GITHUB_OWNER, name: GITHUB_REPO } }
    : { kind: "local" },
  ui: {
    brand: { name: "NRT LOFT" },
    navigation: {
      記事: ["build", "learn", "toolkit", "journey"],
    },
  },
  collections: {
    build: postCollection("build", "BUILD｜作ったもの"),
    learn: postCollection("learn", "LEARN｜作って分かったこと"),
    toolkit: postCollection("toolkit", "TOOLKIT｜使っている道具"),
    journey: postCollection("journey", "JOURNEY｜活動の記録"),
  },
});
