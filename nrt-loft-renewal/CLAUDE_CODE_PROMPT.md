# NRT-LOFT LP リニューアル Claude Code 一括指示プロンプト

**目標**: 既存の NRT-LOFT LP を 2026年5月オープン仕様に最終仕上げする。
**完了目標**: 2026年5月5日(公庫融資申込前)
**現サイト**: https://www.nrt-loft.jp/(Next.js App Router、稼働中)

---

## 一括指示プロンプト(Claude Code に貼り付け)

```
NRT-LOFT LP の最終リニューアルを実施してください。
詳細仕様は ~/nrt-loft-renewal/SITE_DESIGN.md を参照しつつ、以下のタスクを順に実行してください。

【現状把握(最初に実施)】
1. 既存の src/app/page.tsx と src/components 配下を view で確認
2. src/data/pricing.ts および src/data/personas.ts (もし存在すれば) を確認
3. 現状の実装スタイル・命名規則を把握

---

【TASK 1: 料金プランの3プラン構成・中間価格帯への再設定】

src/data/pricing.ts を以下の内容に書き換えてください。

```ts
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
```

そして PricingCard.tsx と PricingSection.tsx を、上記の新しい型定義に対応するよう修正してください。

主な表示変更:
- カードの上部に code (P-01, P-02, P-03) を表示
- nameEn を英語ラベルとして表示
- name を大きな見出しとして表示
- tagline を中見出しとして表示
- price と unit を表示(キャンペーン価格があれば二重表示)
- features を箇条書きで表示
- ctaLabel をボタンに表示

featured: true (REGULAR) のカードは、背景色差・パディング大などで視覚的に強調してください。

---

【TASK 2: BETWEEN TIME ペルソナの追加】

src/data/personas.ts を以下の内容に書き換えてください(または新規作成)。

```ts
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
    description: "自宅では集中できない、カフェでは落ち着かない。3席だけの静かな空間で、深い作業時間を。",
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
    description: "成田に早く着いた。フライトまで時間がある。飲み会まで、まだ少し早い。そんな「間」の時間を、自分のための時間にする。",
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
    description: "IT・DXの相談、SNS運用、Googleマップ対策など。地域を知るエンジニアがお手伝いします。",
    scenarios: [
      "お店のIT化を少しずつ進めたい",
      "スタッフ向けの少人数ワークショップを開催したい",
      "地域のネットワーク作りの場として使いたい",
    ],
  },
];
```

そして、PersonasSection.tsx を以下の方針で更新してください:

1. 既存の3ペルソナを personas 配列で表示する形に変更
2. featured: true のペルソナ(BETWEEN TIME)は中央配置で強調
   - 背景色差(例: bg-neutral-50)
   - パディング大(p-8)
   - 枠線濃いめ(border-neutral-900)
3. セクション末尾に BETWEEN TIME 補足メッセージを追加:

```
— ABOUT "BETWEEN TIME"

到着した。でも、まだ早い。
そんな「間(あいだ)」の時間を、
ただの待ち時間ではなく、自分のための時間にする。

NRT LOFTは、成田で「間」を過ごすための場所でもあります。
```

補足メッセージはモノスペース系英語ラベル(— ABOUT "BETWEEN TIME")+詩的な日本語本文の構成。

---

【TASK 3: 年表記の修正(2025 → 2026)】

LP内の以下の箇所を修正してください:

1. Hero セクション
   - "2025.02.15 START" → "2026.05 OPEN"
   - "DIYでリノベーション中" → "DIYでリノベーションした、3席の小さなコワーキング"
   - "地域に開かれた拠点を作るプロジェクト" → "地域に開かれた拠点として、2026年5月オープン"

2. STATUS セクション (03 · STATUS)
   - "DIYリノベ 2月〜4月" → "DIYリノベ 2026年2月〜4月"
   - "拠点として稼働開始 4月〜" → "拠点として稼働開始 2026年4月〜"
   - "ワークショップ・時間貸し 5月〜" → "ワークショップ・時間貸し 2026年5月〜"

3. PRICING セクション
   - "オープン記念価格は2025年末までの新規ご契約が対象です" → "オープン記念価格は2026年7月末までの新規ご契約が対象です"
   - "OPENING CAMPAIGN · 2025" → "OPENING CAMPAIGN · 2026年5〜7月"

---

【TASK 4: SERVICE セクションのPRICING整合化】

src/components/ServiceSection.tsx (または該当ファイル)を以下の内容に書き換えてください。

```
05 · SERVICE
できること

NRT LOFTは、3つの利用シーンに対応します。

— FOCUSED WORK
集中作業の場として
3席限定の静かな空間で、深い集中時間を確保。
レギュラーメンバー・ドロップインで利用可能。

— IT CONSULTATION
お店のIT相談・コンサル
成田エリアの飲食店・小売店向けに、Googleマップ対策、
SNS運用、IT化のご相談を承ります。
レギュラーメンバーは回数無制限で対応。

— TEAM USE / WORKSHOP
チーム利用・ワークショップ
少人数のチーム作業、Googleマップやキャッシュレスの
使い方ワークショップなどに、半日単位で貸切利用可能。
法人登記オプションあり。

詳しくは [料金] [お問い合わせ] へ。
```

各シーンは枠線ベースのカードで横並び3カラム(モバイル1カラム縦積み)。
既存のミニマルデザイン・モノスペース系UIを踏襲してください。

末尾の「詳しくは [料金] [お問い合わせ] へ。」のリンクは、それぞれ #pricing と #contact のアンカーリンクにしてください。

(※ 既存の SERVICE セクションには「詳しくは NEBULAB のサイトを」というリンクがありますが、削除してください。)

---

【TASK 5: Footer の運営会社表記更新】

Footer コンポーネントを以下のように修正してください。

```
NRT-LOFT
OPEN FLOOR, OPEN MIND

LINKS
- NEBULAB合同会社 (https://www.nebulab.jp/)
- Instagram (https://www.instagram.com/nebulab_koki/)

LEGAL
- プライバシーポリシー
- 利用規約

© 2026 Nebulab合同会社. All Rights Reserved.
運営: Nebulab合同会社
```

現状の "© 2026 NEBULAB" の表記を "© 2026 Nebulab合同会社" に統一してください。
"運営: NEBULAB" を "運営: Nebulab合同会社" に修正してください。

---

【TASK 6: 動作確認】

1. `npm run dev` で起動し、以下を確認:
   - PRICING セクションで3プラン構成・中間価格帯が正しく表示される
   - REGULAR プランが featured 強調表示されている
   - キャンペーン価格(¥12,000)が打ち消し線付きで表示される
   - FOR WHO セクションで BETWEEN TIME が中央配置・強調されている
   - BETWEEN TIME 補足メッセージが末尾に表示される
   - 全ての年表記が 2026 になっている
   - Hero に "2026.05 OPEN" バッジが表示される
   - SERVICE セクションが3つの利用シーンに整理されている
   - Footer に "© 2026 Nebulab合同会社" と "運営: Nebulab合同会社" が表示される

2. `npm run build` が成功すること

3. `npx tsc --noEmit` で型エラーがないこと

4. レスポンシブ対応:
   - モバイルでカードが1カラム縦積みになる
   - PRICING のカード3つが横並び・モバイル縦積みになる
   - FOR WHO のカード3つが横並び・モバイル縦積みになる

---

【完了条件】

- 上記すべて完了
- ビルドエラーなし、型エラーなし
- レスポンシブ表示崩れなし
- Gitコミット: "feat: renew NRT-LOFT LP with 3-plan pricing and BETWEEN TIME concept"

---

【補足: 実装上の注意】

1. 既存のデザイントーン(ミニマル・モノスペース系・枠線ベースカード)は完全に踏襲
2. 既存の Contact フォームは触らない
3. 既存の SNS セクション・ABOUT セクション・ACCESS セクションも触らない
4. データ駆動を重視: 価格・ペルソナデータは src/data 配下のファイルから読み込む形にする
5. 将来の価格変更や追加プランに対応できるよう、汎用的な設計にする
```

---

## 実装後の確認チェックリスト

Claude Code 実行後、以下をブラウザで確認してください。

### コンテンツ確認

- [ ] Hero に「2026.05 OPEN」と表示される
- [ ] Hero テキストが「DIYでリノベーション中」ではなく「DIYでリノベーションした、3席の小さなコワーキング」になっている
- [ ] FOR WHO セクションに以下の3ペルソナが表示される
  - FOR FREELANCERS(左)
  - BETWEEN TIME(中央、強調表示)
  - FOR LOCAL SHOPS(右)
- [ ] FOR WHO セクション末尾に BETWEEN TIME の詩的補足メッセージが表示される
- [ ] STATUS セクションのすべての年表記が 2026 になっている
- [ ] SERVICE セクションが「FOCUSED WORK / IT CONSULTATION / TEAM USE」の3つに整理されている
- [ ] PRICING セクションに3プラン(P-01 / P-02 / P-03)が表示される
- [ ] レギュラー(P-02)が中央で強調表示されている
- [ ] レギュラーのキャンペーン価格 ¥12,000 が表示され、通常価格 ¥15,000 が打ち消し線で表示される
- [ ] ドロップインの「初回 ¥1,000 / 3時間」キャンペーン表示がある
- [ ] PRICING の最終注意書きが「2026年7月末まで」になっている
- [ ] Footer の著作権表記が「© 2026 Nebulab合同会社」になっている
- [ ] Footer の運営表記が「運営: Nebulab合同会社」になっている

### レスポンシブ確認

- [ ] モバイル(360px幅)でカードが1カラム縦積みになる
- [ ] タブレット(768px幅)で2-3カラムグリッドになる
- [ ] デスクトップ(1280px幅)で意図したレイアウトになる

### リンク確認

- [ ] 「料金」「お問い合わせ」のアンカーリンクが正常動作
- [ ] Footer の Nebulab合同会社リンクが nebulab.jp に飛ぶ
- [ ] Instagram リンクが正常
- [ ] 旧「詳しくは NEBULAB のサイトを」リンクが削除されている

---

**作成日**: 2026年4月27日
