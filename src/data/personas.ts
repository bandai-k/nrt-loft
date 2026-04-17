// src/data/personas.ts
export type Persona = {
  id: string;
  label: string;
  title: string;
  description: string;
  scenarios: string[];
};

export const personas: Persona[] = [
  {
    id: "freelancer",
    label: "FOR FREELANCERS",
    title: "成田で集中して働きたい、フリーランス・リモートワーカーへ",
    description:
      "自宅では集中できない、カフェでは落ち着かない。3席だけの静かな空間で、深い作業時間を。",
    scenarios: [
      "週2-3日、決まった場所で仕事をしたい",
      "オンライン会議を気兼ねなく行いたい",
      "月額で契約して、第二のオフィスとして使いたい",
    ],
  },
  {
    id: "traveler",
    label: "FOR TRAVELERS",
    title: "成田空港の近くで、数時間だけ作業したい方へ",
    description:
      "フライトまでの時間、乗り継ぎの合間に。カフェより静かで、Wi-Fiも確実。",
    scenarios: [
      "出発までの3-4時間、集中して資料を仕上げたい",
      "到着日、ホテルチェックインまでの作業場所が欲しい",
      "成田を訪問する際の定期的な作業拠点にしたい",
    ],
  },
  {
    id: "local",
    label: "FOR LOCAL SHOPS",
    title: "成田エリアのお店・事業者の方へ",
    description:
      "IT・DXの相談、SNS運用、Googleマップ対策など。お気軽にご相談ください。",
    scenarios: [
      "お店のIT化を少しずつ進めたい",
      "スタッフ向けの少人数ワークショップを開催したい",
      "地域のネットワーク作りの場として使いたい",
    ],
  },
];
