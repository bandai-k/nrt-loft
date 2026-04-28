// src/data/pricing.ts
// NRT-LOFT 料金プラン定義(最終確定版 2026.04 - 論理整合性チェック済み)
//
// 価格体系の設計原則:
// - 全プランの基準時間単価を ¥400/h に統一
// - 長時間利用ほどお得になる階段構造
//   * 0-19時間 → ドロップイン
//   * 20-37時間 → ライト
//   * 38時間〜 → レギュラー
// - 5人キャパの貸切は人時単価 ¥325-400/h で個人ドロップインよりお得
// - ドリンクはセルフサービス(無料)で運営コスト最適化

export type PricingCategory = "drop-in" | "monthly" | "reserved";
export type PricingTier = "main" | "sub";

export type PricingPlan = {
  id: string;
  category: PricingCategory;
  tier: PricingTier;
  code: string;
  name: string;
  nameEn: string;
  tagline: string;
  price: number;
  unit: string;
  campaignPrice?: number;
  campaignNote?: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  // === ドロップイン ===
  {
    id: "drop-in",
    category: "drop-in",
    tier: "main",
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
      "Wi-Fi・電源・セルフドリンク無料",
      "延長 ¥400/時間(1日上限 ¥2,400)",
    ],
    ctaLabel: "予約する",
  },

  // === 月額会員(ライト・レギュラー) ===
  {
    id: "light",
    category: "monthly",
    tier: "sub",
    code: "P-02L",
    name: "ライトメンバー",
    nameEn: "LIGHT",
    tagline: "週に数回、副業や勉強に",
    price: 7800,
    unit: "月",
    campaignPrice: 6200,
    campaignNote: "開業記念 20% OFF(2026年5〜7月の新規契約)",
    features: [
      "月20時間まで利用可",
      "超過分 ¥400/h",
      "ロッカー利用",
      "IT相談 月2回まで",
    ],
    ctaLabel: "申し込む",
  },
  {
    id: "regular",
    category: "monthly",
    tier: "main",
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
      "法人登記オプション +¥5,500/月で追加可能",
    ],
    ctaLabel: "申し込む",
    featured: true,
  },

  // === 貸切(時間制) ===
  {
    id: "reserved",
    category: "reserved",
    tier: "main",
    code: "P-03",
    name: "貸切",
    nameEn: "RESERVED",
    tagline: "チームでの利用に",
    price: 4000,
    unit: "2時間",
    features: [
      "スペース全体を貸切(〜5名まで快適)",
      "ワークショップ企画相談可",
      "1時間追加 +¥1,500",
      "1日定額(8時間) ¥13,000",
    ],
    ctaLabel: "問い合わせる",
  },
];

// 貸切の時間別価格表(LP内の詳細表示用)
// 設計: 6時間まで右肩下がり、8時間定額で kireinaキリ良く
export const reservedHourlyRates = [
  { duration: "2時間(基本)", price: 4000, hourlyRate: 2000, note: "ワークショップ・短時間会議に" },
  { duration: "3時間", price: 5500, hourlyRate: 1833, note: "" },
  { duration: "4時間", price: 7000, hourlyRate: 1750, note: "" },
  { duration: "6時間", price: 10000, hourlyRate: 1667, note: "" },
  { duration: "8時間(1日定額)", price: 13000, hourlyRate: 1625, note: "終日イベントに" },
];

// 月額会員のオプション
export const monthlyOptions = [
  {
    id: "registration",
    name: "法人登記オプション",
    price: 5500,
    unit: "月",
    description:
      "月額会員(ライト・レギュラー)に追加可能。法人登記利用・郵便物受取に対応。",
  },
];

// オープン記念キャンペーン情報
export const openingCampaign = {
  active: true,
  periodLabel: "2026年5〜7月",
  endNote: "オープン記念価格は2026年7月末までの新規ご契約が対象です。",
  targetCategories: ["drop-in", "monthly"] as PricingCategory[],
};

// 共通注記
export const pricingNotes = [
  "表記は全て税込みです。",
  "ドリンクはセルフサービス(インスタント・ドリップバッグ・ティーバッグ・ミネラルウォーター)で全プラン無料です。",
  "貸切は5名程度までを快適にご利用いただける広さです。",
  "個別プランのご相談は hello@nebulab.jp まで。",
];

// 利用パターン別おすすめプラン(LP表示用)
export const usagePatterns = [
  {
    pattern: "月19時間以下",
    description: "月数回のスポット利用",
    recommended: "drop-in",
    sample: "月3回×3時間 = ¥3,600",
  },
  {
    pattern: "月20-37時間",
    description: "週数回の定期利用",
    recommended: "light",
    sample: "月25時間 = ¥9,800(¥7,800 + 超過5h×¥400)",
  },
  {
    pattern: "月38時間以上",
    description: "ほぼ毎日の利用",
    recommended: "regular",
    sample: "月60時間でも ¥15,000(時間単価¥250)",
  },
];

// メインプラン(LP表示用、3つだけ)
export const mainPlans = pricingPlans.filter((p) => p.tier === "main");

// 全プラン
export const allPlans = pricingPlans;
