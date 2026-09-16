// 記事で触れた道具の一覧。本文にはこの id だけを書き、リンク先はここでまとめて持つ。
// url を空のままにしておくと、本文ではリンクにならず、ただの文字として出る
// （提携の審査が通る前や、紹介できる先がない道具はこの状態にしておく）。

export type GearItem = {
  /** 表示名。本文で <Gear id="..." /> と書いたときに出る文字 */
  name: string;
  /** もしもアフィリエイトのリンク。空ならリンクにしない */
  url?: string;
  /** 「使ったもの」で名前の下に添える一行。良いところだけを書かない */
  note?: string;
};

export const GEAR: Record<string, GearItem> = {
  // 例。提携が通ったら url を入れる。
  // "a4-laminator": {
  //   name: "A4のラミネーター",
  //   url: "",
  //   note: "温まるのに5分かかる。厚さは選べないが、家では使い分けなかった",
  // },
};

export function getGear(id: string): GearItem | undefined {
  return GEAR[id];
}
