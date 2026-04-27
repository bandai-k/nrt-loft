// src/data/pricing.ts
export type PricingCategory = "drop-in" | "monthly" | "reserved";

export type PricingPlan = {
  id: string;
  category: PricingCategory;
  code: string;          // "P-01", "P-02", "P-03"
  name: string;          // "ドロップイン" 等
  nameEn: string;        // "DROP-IN" 等
  tagline: string;       // 短いキャッチ
  price: number;         // 通常価格
  unit: string;          // "3時間" "月" "半日" 等
  campaignPrice?: number;       // キャンペーン価格(あれば)
  campaignNote?: string;        // "オープン記念 20% OFF" など
  features: string[];           // 含まれる内容
  ctaLabel: string;             // CTAラベル
  featured?: boolean;           // 中央強調
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "drop-in",
    category: "drop-in",
    code: "P-01",
    name: "ドロップイン",
    nameEn: "DROP-IN",
    tagline: "まずは試しに立ち寄る",
    price: 1200,
    unit: "3時間",
    campaignPrice: 1000,
    campaignNote: "初回利用 ¥1,000 / 3時間(オープン記念)",
    features: [
      "3時間まで自由に利用",
      "Wi-Fi・電源・コーヒー1杯付き",
      "IT相談 初回30分無料",
      "延長 ¥400/時間(最大1日 ¥2,400まで)",
    ],
    ctaLabel: "予約する",
  },
  {
    id: "regular",
    category: "monthly",
    code: "P-02",
    name: "月額レギュラー",
    nameEn: "REGULAR",
    tagline: "成田を拠点にする人へ",
    price: 15000,
    unit: "月",
    campaignPrice: 12000,
    campaignNote: "開業記念 20% OFF(2026年5〜7月の新規契約)",
    features: [
      "営業時間内 時間無制限",
      "席の優先予約権",
      "ロッカー利用",
      "コミュニティSlack招待",
      "IT相談 回数無制限",
    ],
    ctaLabel: "申し込む",
    featured: true,
  },
  {
    id: "reserved",
    category: "reserved",
    code: "P-03",
    name: "貸切・法人",
    nameEn: "RESERVED",
    tagline: "チームでの利用に",
    price: 16500,
    unit: "半日(4時間)",
    features: [
      "スペース全体を貸切",
      "〜12名まで対応",
      "プロジェクタ・ホワイトボード",
      "ワークショップ企画相談可",
      "法人登記オプション +¥5,500/月",
    ],
    ctaLabel: "問い合わせる",
  },
];

export const openingCampaign = {
  active: true,
  periodLabel: "2026年5〜7月",
  endNote: "オープン記念価格は2026年7月末までの新規ご契約が対象です。",
};

export const pricingNotes = [
  "表記は全て税込みです。",
  "個別プランのご相談は hello@nebulab.jp まで。",
];
