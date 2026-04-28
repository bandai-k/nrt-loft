// src/data/policies.ts
// 利用規約・キャンセル/解約ポリシーの表示テキスト
// 法務確定後の正式版は /terms ページに掲載。本ファイルは申込フォームでの
// インライン表示・概要表示用。

export type PolicySection = {
  heading: string;
  body: string;
};

export const policyDisplayTexts = {
  cancellation: {
    title: "キャンセル・解約ポリシー(概要)",
    intro:
      "ご予約・ご加入後のキャンセル・解約は、以下の条件にて承ります。詳細は利用規約をご確認ください。",
    sections: [
      {
        heading: "ドロップイン・貸切のキャンセル",
        body: "利用前日までのキャンセルは無料です。当日のキャンセルは料金の50%、無断キャンセル(ノーショー)は全額をご請求いたします。やむを得ない事情がある場合は、お早めにご連絡ください。",
      },
      {
        heading: "月額会員(ライト・レギュラー)の解約",
        body: "解約申請を毎月15日までにいただいた場合は当月末解約、16日以降の場合は翌月末解約となります。解約月の利用料は満額請求となり、日割り精算は行いません。",
      },
      {
        heading: "施設都合による中止",
        body: "天災・設備故障など施設都合により利用が中止となった場合は、別日への振替または料金の返金にて対応いたします。",
      },
      {
        heading: "決済について",
        body: "ドロップイン・貸切は事前決済(Stripe Payment Link)、月額会員は Stripe Subscription による自動課金とさせていただきます。決済確認後にSESAME(電子錠)の暗証番号を発行いたします。",
      },
    ] as PolicySection[],
    consentLabel:
      "利用規約とキャンセル・解約ポリシーに同意します",
  },
};

export type PolicyDisplayBlock = typeof policyDisplayTexts.cancellation;
