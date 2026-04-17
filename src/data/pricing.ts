// src/data/pricing.ts
export type PricingPlan = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  price: string;
  priceUnit: string;
  originalPrice?: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "drop-in",
    code: "P-01",
    name: "ドロップイン",
    tagline: "まずは試しに立ち寄る",
    price: "¥1,100",
    priceUnit: "/ 3時間",
    features: [
      "時間貸しスペース利用",
      "Wi-Fi・電源完備",
      "コーヒー1杯付き",
      "IT相談 初回30分無料",
    ],
    cta: "予約する",
    ctaHref: "/#contact",
  },
  {
    id: "regular",
    code: "P-02",
    name: "月額レギュラー",
    tagline: "成田を拠点にする人へ",
    price: "¥5,500",
    priceUnit: "/ 月",
    originalPrice: "¥8,800",
    features: [
      "平日終日の自由利用",
      "ワークショップ月1回無料参加",
      "IT相談 回数無制限",
      "ロッカー利用",
      "コミュニティSlack招待",
    ],
    cta: "申し込む",
    ctaHref: "/#contact",
    featured: true,
    badge: "オープン記念 37% OFF",
  },
  {
    id: "workshop",
    code: "P-03",
    name: "貸切・法人",
    tagline: "チームでの利用に",
    price: "¥16,500",
    priceUnit: "/ 半日",
    features: [
      "スペース全体を貸切",
      "〜12名まで対応",
      "プロジェクタ・ホワイトボード",
      "ワークショップ企画相談可",
    ],
    cta: "問い合わせる",
    ctaHref: "/#contact",
  },
];
