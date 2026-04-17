# SETUP

## Resend (お問い合わせフォームのメール送信)

お問い合わせフォーム (`/#contact`) は [Resend](https://resend.com/) 経由で `hello@nebulab.jp` にメール送信します。無料枠: 月3,000通 / 日100通。

### 1. APIキーを取得する

1. <https://resend.com/> でサインアップ（Nebulabアカウントで既に登録済みの場合はログイン）
2. ダッシュボードの **API Keys** → **Create API Key**
3. 権限は **Sending access** を選択（本番用）。開発用のキーは **Full access** でもOK
4. 発行された `re_xxxxxxxxxxxxxxxxxxxxxxxx` 形式のキーをコピー（**一度しか表示されません**）

### 2. ローカル環境に設定する

リポジトリルートの `.env.local` に以下を設定します（`.env.example` をコピーしてもOK）。

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_FORM_TO=hello@nebulab.jp
```

`.env.local` は `.gitignore` で除外されています（コミットされません）。

開発サーバーを再起動して反映:

```bash
npm run dev
```

`RESEND_API_KEY` 未設定の場合、フォーム送信時に500エラーと「RESEND_API_KEY が設定されていません…」というメッセージが返ります（本番環境では汎用メッセージにマスクされます）。

### 3. 本番環境 (Vercel) に設定する

Vercel ダッシュボード → Project → **Settings** → **Environment Variables** で同じ2つのキーを登録し、**Production / Preview / Development** のスコープを必要に応じて選択してください。

### 4. 送信元ドメインの設定（本番で nrt-loft.jp を使う場合）

デフォルトではテスト用の `onboarding@resend.dev` から送信しています（送信可能ですが、`nrt-loft.jp` の独自ドメインから送ると到達率・ブランディングが向上します）。

#### 4-1. Resend にドメインを登録

1. Resend ダッシュボード → **Domains** → **Add Domain**
2. `nrt-loft.jp` を入力して作成
3. 表示される DNS レコード（SPF / DKIM / DMARC）を控える

#### 4-2. DNS プロバイダー側でレコードを追加

`nrt-loft.jp` の DNS 管理画面（お名前.com / Cloudflare 等）で、Resend が指定する以下のレコードを追加します。値は Resend ダッシュボードの表示に従ってください。

| Type | Name | Value |
|------|------|-------|
| MX | `send` | `feedback-smtp.<region>.amazonses.com` (priority 10) |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |
| TXT | `resend._domainkey` | （Resend が生成する長いDKIM公開鍵） |
| TXT | `_dmarc` | `v=DMARC1; p=none;` （任意、推奨） |

反映には数分〜最大48時間かかります。Resend ダッシュボードで **Verified** になれば完了。

#### 4-3. コード側の from アドレスを差し替え

ドメイン検証が完了したら、`src/app/api/contact/route.ts` の `from:` を独自ドメイン宛に変更します。

```ts
from: "NRT-LOFT <no-reply@nrt-loft.jp>",
```

以降、フォーム送信メールが `no-reply@nrt-loft.jp` から届き、`Reply-To` は送信者本人のアドレスが入ります。

### トラブルシューティング

- **`RESEND_API_KEY is missing`** : `.env.local` を確認し、dev サーバーを再起動
- **`You can only send testing emails to your own email address`** : ドメイン未検証の場合、`onboarding@resend.dev` からの送信は Resend アカウントに登録したアドレスにしか届きません。本番運用の前に 4. のドメイン設定を済ませてください
- **届かない**: スパムフォルダ、`CONTACT_FORM_TO` の値、Resend ダッシュボードの **Logs** で配送状況を確認
