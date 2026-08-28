# NRT-LOFT LP 予約フォーム拡張 Claude Code 指示プロンプト

**目的**: 既存の Contact フォームを「予約・申込」フォームに拡張し、メール + LINE + Stripe(後送信)の運用構成に対応する。

**前提**:
- 既存の `/contact` または相当する Contact フォームが Resend で実装済み
- `src/data/pricing.ts` および `src/data/policies.ts` が最新版で配置済み
- LINE 公式アカウントは別途作成・運営者側で連携設定する想定(URL/QR を用意)
- 5月オープンまでに完成させる

---

## 一括指示プロンプト(Claude Code に貼り付け)

```
NRT-LOFT LP の Contact フォームを「予約・申込」フォームに拡張してください。
予約・問合せはフォーム経由でメールに、LINE公式アカウントへの導線も併設します。
決済は別途運営者から Stripe Payment Link を送信する運用構成です。

【前提条件】
- 既存の Contact フォーム実装(Resend連携済み)を流用・拡張
- src/data/pricing.ts と src/data/policies.ts が最新版で配置済み
- LINE公式アカウントの友だち追加URL・QRコード画像は事前に用意される想定
  (環境変数 NEXT_PUBLIC_LINE_FRIEND_URL でURLを管理、QRはpublic/line-qr.pngに配置)

【実行内容】

== TASK 1: 環境変数の準備 ==

.env.example に以下を追加(値は空欄でOK):

```
# LINE
NEXT_PUBLIC_LINE_FRIEND_URL=https://lin.ee/xxxxxxxx
NEXT_PUBLIC_LINE_DISPLAY_ID=@xxx-xxxx
```

== TASK 2: Contact ページの構造変更 ==

src/app/contact/page.tsx (または該当ファイル)を以下の構造に変更:

```
[Page Header]
  CONTACT — お問い合わせ・予約

[Top Section: 連絡方法の選択]
  ご利用方法に応じて、お問い合わせ方法をお選びください。
  
  [2カラム表示(モバイルは縦積み)]
  
  - 左: フォームでのお問い合わせ
    フォームから送信、メールでご返信します。
    法人向けの貸切・正式な見積依頼などに。
    [↓ フォームへ]
  
  - 右: LINEでのお問い合わせ
    気軽に相談したい方はLINEでどうぞ。
    QRコードを読み取り or 友だち追加ボタンから。
    [LINE QRコード画像]
    [友だち追加ボタン]

[Form Section: 予約・申込フォーム]
  詳細な予約・申込フォーム(下記 TASK 3 を参照)

[Footer Section: 決済・利用について]
  予約後の流れ:
  1. 内容確認のため、運営者からメール/LINEでご連絡します(通常24時間以内)
  2. 月額会員・貸切は Stripe決済リンクをお送りします
  3. ドロップインは初回利用時に当地で決済(Square)も可能です
  
  [キャンセルポリシーへのリンク]
  [利用規約へのリンク]
```

== TASK 3: BookingForm コンポーネントの実装 ==

src/components/BookingForm.tsx を新規作成。
既存のContactフォーム実装をベースに、以下のフィールドを持つ予約フォームに拡張。

### フォームフィールド定義

```ts
type BookingFormData = {
  // === 基本情報 ===
  name: string;                       // お名前(必須)
  email: string;                      // メールアドレス(必須)
  phone?: string;                     // 電話番号(任意)
  
  // === 利用希望プラン ===
  planType: "drop-in" | "light" | "regular" | "reserved" | "consultation";
    // ドロップイン / ライト / レギュラー / 貸切 / その他相談
  
  // === プラン別の追加項目 ===
  // ドロップインの場合
  dropInDate?: string;                // 利用希望日
  dropInTimeSlot?: string;            // 希望時間帯(8-11, 11-14, 14-17, 17-20, 19-22)
  
  // ライト/レギュラーの場合
  membershipStartDate?: string;       // 利用開始希望日
  registrationOption?: boolean;       // 法人登記オプション希望
  
  // 貸切の場合
  reservedDate?: string;              // 利用希望日
  reservedDuration?: "2h" | "3h" | "4h" | "6h" | "8h"; // 利用時間
  reservedAttendees?: number;         // 利用人数(1-5)
  reservedPurpose?: string;           // 利用目的
  
  // === 全プラン共通 ===
  message?: string;                   // ご質問・備考
  preferredContact: "email" | "phone"; // 希望連絡方法
  agreesToPolicy: boolean;            // 利用規約・キャンセルポリシーに同意
};
```

### UI実装の方針

1. **プラン選択をRadioではなくCardベースに**
   - 4つのプラン + その他 を大きめのカードで選択
   - 選択中のカードは枠線濃く・featured風に
   - 各カードに価格と簡易説明
   
2. **プラン選択に応じて追加項目を出し分け**
   - useState で planType を管理
   - 条件分岐で追加項目を表示
   
3. **既存LPのデザイン踏襲**
   - モノスペース系英語ラベル(— PLAN, — DATE, — DETAILS など)
   - 枠線ベースの入力フィールド
   - レスポンシブ対応(モバイル1カラム)

4. **キャンセルポリシー同意**
   - 送信ボタンの直前に表示
   - チェックボックス必須
   - クリックで policies.ts の policyDisplayTexts.cancellation を表示するモーダル or 折りたたみ表示

### 動的フィールド表示の例

```
[planType === "drop-in" の場合]
- 利用希望日(date input)
- 希望時間帯(select、5つのスロット)

[planType === "light" || "regular" の場合]
- 利用開始希望日(date input)
- 法人登記オプション希望(checkbox)

[planType === "reserved" の場合]
- 利用希望日(date input)
- 利用時間(select: 2h/3h/4h/6h/8h)
- 利用人数(number input, 1-5)
- 利用目的(textarea)

[planType === "consultation" の場合]
- 追加項目なし、message のみ重視
```

== TASK 4: API Route の拡張 ==

src/app/api/contact/route.ts (または相当するエンドポイント)を拡張。

1. バリデーション
   - name, email, planType, agreesToPolicy は必須
   - planType に応じた条件付きバリデーション
   - agreesToPolicy が false なら400エラー

2. メール本文の生成
   - planType に応じたメールテンプレート
   - 件名: "[NRT-LOFT 予約・申込] {planType_label} - {name}様"
   - 本文に全フォーム内容を整形して掲載
   - 運営者の次のアクションを明記
     例: "Stripe Payment Link を送信してください"
     例: "貸切の詳細を確認の上、見積を送信してください"

3. メール送信
   - 既存の Resend クライアントを使用
   - 送信先: koki.bandai@nebulab.jp(運営者)
   - 利用者には自動返信メールも送る(申込受付確認)

### メールテンプレートの例(運営者宛)

```
件名: [NRT-LOFT 予約・申込] ドロップイン - 山田太郎様

NRT-LOFT 予約・申込フォームから新規申込がありました。

== 基本情報 ==
お名前: 山田太郎
メール: yamada@example.com
電話: 090-xxxx-xxxx
希望連絡方法: メール

== 利用希望プラン ==
ドロップイン(¥1,200 / 3時間)

== 利用詳細 ==
利用希望日: 2026-05-20
希望時間帯: 14:00-17:00

== ご質問・備考 ==
初めての利用です。よろしくお願いします。

== 次のアクション ==
✅ Stripe Payment Link を送信して決済を依頼してください
✅ 決済確認後、SESAME暗証番号を発行・送信してください

== 利用規約への同意 ==
✅ 同意済み(2026-04-28 14:32:11)
```

### 自動返信メール(利用者宛)

```
件名: 【NRT-LOFT】お申込みを受け付けました

山田太郎 様

NRT-LOFTへのお申込みありがとうございます。
以下の内容で受け付けました。

(申込内容のサマリ)

通常24時間以内に運営者からご返信いたします。
決済方法・利用方法の詳細は、ご返信メールにてお伝えします。

お急ぎの場合は、LINE公式アカウントからもご連絡いただけます。
[LINE友だち追加リンク]

NRT-LOFT
運営: Nebulab合同会社
hello@nebulab.jp
```

== TASK 5: LINE導線の実装 ==

1. src/components/LineContactCard.tsx を新規作成
   - QRコード画像表示(public/line-qr.png)
   - 友だち追加ボタン(NEXT_PUBLIC_LINE_FRIEND_URL に遷移)
   - "気軽に相談したい方はLINEで" の説明文

2. Contact ページ Top Section に配置
   - フォームと並列の2カラム表示

3. LP のフッターにも LINE リンクを追加
   - "お問い合わせ: メール・LINE どちらでも" の文言
   - LINE アイコン + 友だち追加リンク

== TASK 6: キャンセルポリシー表示 ==

1. src/components/CancellationPolicyDisplay.tsx を新規作成
   - policies.ts の policyDisplayTexts.cancellation を読み込み
   - Disclosure コンポーネント(開閉式)で表示
   - フォーム内では送信ボタン直前に配置

2. 同意チェックボックスのラベル
   "[利用規約とキャンセル・解約ポリシー]に同意します"
   - [...] 部分はクリックで policies.ts の内容を表示
   - "/terms" へのリンクも併設(別途作成予定の利用規約ページへ)

== TASK 7: 既存料金セクションへのCTA調整 ==

src/components/PricingSection.tsx の各プランカードのCTAを以下に調整:

- ドロップイン: "予約する" → /contact?plan=drop-in
- ライト: "申し込む" → /contact?plan=light  
- レギュラー: "申し込む" → /contact?plan=regular
- 貸切: "問い合わせる" → /contact?plan=reserved

Contact ページで URL パラメータ ?plan=xxx を読み取り、
フォームの planType を初期値として設定する。

== TASK 8: 利用規約・特商法へのリンク準備 ==

利用規約・プライバシーポリシー・特定商取引法表記のページは別途作成予定だが、
今回のフォーム実装ではリンク先のみ準備:

- /terms (利用規約) → 仮ページ作成、"準備中" 表示
- /privacy (プライバシーポリシー) → 仮ページ作成、"準備中" 表示  
- /commerce-law (特定商取引法に基づく表記) → 仮ページ作成、"準備中" 表示

これらは TASK 5 の同意チェックボックスとフッターからリンク。

== TASK 9: 動作確認 ==

以下の動作を確認:

1. フォームが各プランで正しく表示・切替される
2. プランごとの追加項目が条件分岐で表示
3. キャンセルポリシーが折りたたみで表示できる
4. 同意チェックなしでは送信できない
5. 送信後、運営者・利用者の両方にメールが届く
6. URLパラメータでプラン初期選択が動作
   例: /contact?plan=light でライト選択状態で表示
7. LINE導線が表示・動作
8. レスポンシブ表示崩れなし
9. ビルドエラー・型エラーなし

【完了条件】
- 上記すべて完了
- ビルドエラー・型エラーなし
- レスポンシブ対応確認(モバイル1カラム)
- Gitコミット: "feat: expand contact form to booking form with LINE integration"
```

---

## 補足: 実装後の運営フロー

予約フォーム拡張後、Koki-san が日々行う運営作業:

### ドロップイン予約問合せ受信時

1. メール通知を確認
2. カレンダーで空き状況確認
3. Stripe管理画面で Payment Link を発行(Drop-In Price)
4. 利用者にメール返信:
   - 空きがあること
   - Stripe Payment Link
   - 決済後にSESAME暗証番号を送信する旨
5. 決済完了通知後、SESAME 暗証番号を発行・メール送信

### レギュラー会員加入問合せ受信時

1. メール通知を確認
2. Stripe Subscription Link を発行(Regular Monthly Price)
3. 利用者にメール返信:
   - 加入手続きについて
   - Stripe Subscription Link
   - 利用開始日について
   - 永続的な暗証番号は決済確認後に送信
4. 決済確認後、暗証番号と利用ガイド送信

### 貸切問合せ受信時

1. メール通知を確認
2. 詳細確認(利用人数、時間、目的)
3. 必要に応じて見積メール返信
4. 決定後、Stripe Payment Link 発行(時間別カスタム価格)
5. 決済確認後、当日の暗証番号送信

### 月額会員の解約申請受信時

1. メール通知を確認
2. 解約タイミングを確認(15日まで→月末解約 / 16日以降→翌月末解約)
3. Stripe管理画面でサブスクをキャンセル予約
4. 利用者に確認メール送信

---

## Phase 1(自作Booking System)への移行検討タイミング

今回の手動運用構成で運営し、以下の状況になった場合に自作着手を検討:

- 月50件以上の予約問合せが安定的に入る(運営工数オーバー)
- ドロップインのリピート率が高く、毎回の手動対応が非効率
- 決済→暗証番号発行までの時間短縮が顧客満足度向上に明確に寄与
- 法人会員の継続利用が複数件あり、自動化価値が出てくる

これらが見えるのは、おそらく**オープン後3-6ヶ月**。
それまでは今回の構成で運営し、利用者の実態を観察するのが投資効率的に正解。

---

**作成日**: 2026年4月28日