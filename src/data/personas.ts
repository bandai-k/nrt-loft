// src/data/personas.ts
export type Persona = {
  id: string;
  label: string;       // 英語ラベル
  labelJa: string;     // 日本語補助ラベル
  title: string;       // 見出し
  description: string; // 説明文
  scenarios: string[]; // 利用シーン
  featured?: boolean;  // 中央強調
};

export const personas: Persona[] = [
  {
    id: "freelancer",
    label: "FOR FREELANCERS",
    labelJa: "働く人のために",
    title: "成田で集中して働きたい、フリーランス・リモートワーカーへ。",
    description:
      "自宅では集中できない、カフェでは落ち着かない。3席だけの静かな空間で、深い作業時間を。",
    scenarios: [
      "週2-3日、決まった場所で仕事をしたい",
      "オンライン会議を気兼ねなく行いたい",
      "月額で契約して、第二のオフィスとして使いたい",
    ],
  },
  {
    id: "between-time",
    label: "BETWEEN TIME",
    labelJa: "間(あいだ)の時間に",
    title: "到着と予定の、間を過ごす方へ。",
    description:
      "成田に早く着いた。フライトまで時間がある。飲み会まで、まだ少し早い。そんな「間」の時間を、自分のための時間にする。",
    scenarios: [
      "飲み会の前に、表参道の賑わいから少し離れて",
      "フライトの前に、静かに最終確認を",
      "商談の前に、集中して資料を整える",
    ],
    featured: true,
  },
  {
    id: "local",
    label: "FOR LOCAL SHOPS",
    labelJa: "地域の事業者のために",
    title: "成田エリアのお店・事業者の方へ。",
    description:
      "IT・DXの相談、SNS運用、Googleマップ対策など。地域を知るエンジニアがお手伝いします。",
    scenarios: [
      "お店のIT化を少しずつ進めたい",
      "スタッフ向けの少人数ワークショップを開催したい",
      "地域のネットワーク作りの場として使いたい",
    ],
  },
];
