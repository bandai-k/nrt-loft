// src/lib/site.ts
// サイト全体で共有する定数。URL やナビ文言はここだけを直す。

export const SITE_URL = "https://www.nrt-loft.jp";

export const SITE_NAME = "NRT LOFT";
export const SITE_TAGLINE = "OPEN FLOOR, OPEN MIND";
export const SITE_TITLE = "NRT LOFT｜AIで自分のための道具をつくる";
export const SITE_DESCRIPTION =
  "コードが書けなくても、AIと一緒なら「自分の困りごとを解決する小さな仕組み」は作れます。その過程を、そのまま公開しています。";

export const OPERATOR = "Nebulab合同会社";
export const OPERATOR_REPRESENTATIVE = "萬代晃生";
export const OPERATOR_URL = "https://www.nebulab.jp/";
export const CONTACT_EMAIL = "hello@nebulab.jp";

// TODO: チャンネル開設後に実 URL へ差し替える。
// 未確定のあいだは undefined のままにしておくと、YouTube への導線は描画されない。
export const YOUTUBE_URL: string | undefined = undefined;

// TODO: アカウントが決まったら URL を入れる。undefined のあいだは導線を出さない。
export const X_URL: string | undefined = undefined;

export const RSS_PATH = "/rss.xml";

/** サイト全体で統一する CTA 文言。「記事を見る」とは混在させない。 */
export const CTA_LABEL = "制作記録を見る";
export const CTA_LABEL_HERO = "最新の制作記録を見る";
export const CTA_LABEL_ALL = "すべての制作記録を見る";
