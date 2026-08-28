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
    id: "between-time",
    label: "BETWEEN TIME",
    labelJa: "間(あいだ)の時間に",
    title: "到着と予定の、間を過ごす方へ。",
    description:
      "成田に早く着いた。フライトまで時間がある。飲み会まで、まだ少し早い。そんな「間」の時間を、自分のための時間に、そして形に残るものに、変える。旅の途中で、何かを作って帰る。それが、NRT LOFTの過ごし方。",
    scenarios: [
      "飲み会の前に、表参道の賑わいから少し離れて",
      "フライトの前に、自分への小さな記念を",
      "旅の途中で、ものを作って持ち帰る",
    ],
    featured: true,
  },
  {
    id: "travelers",
    label: "FOR TRAVELERS",
    labelJa: "旅する人のために",
    title: "成田を通り過ぎる、すべての人へ。",
    description:
      "ここは、日本との最初の出会いか、最後の別れの場所。その記憶を、木と革に刻んで、持ち帰ってもらう工房です。漢字の名前、訪れた街の名前、旅で出会った言葉。あなたの旅を、形にします。",
    scenarios: [
      "漢字の名前を、ヒノキの木札に",
      "訪れた空港のコードを、本革のタグに",
      "旅の言葉を、小さな品に",
    ],
  },
  {
    id: "local",
    label: "FOR LOCAL",
    labelJa: "地域の人のために",
    title: "成田で暮らす人、商う人へ。",
    description:
      "お店の周年記念に、新店舗オープンの祝いに、大切な人への贈り物に。成田で作られた、あなたのための記念品を。",
    scenarios: [
      "名入れノベルティ・周年記念品",
      "出産・結婚・退職などのギフト",
      "IT・Web相談(Nebulab連携)",
    ],
  },
];
