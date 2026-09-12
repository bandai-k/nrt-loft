// src/app/privacy/page.tsx
import { Metadata } from "next";
import LegalPageLayout from "@/components/ui/LegalPageLayout";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "NRT LOFT のプライバシーポリシーをご確認いただけます。",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="プライバシーポリシー" lastUpdated="2026年9月12日">
      <section>
        <p>
          Nebulab合同会社（以下「当社」といいます）は、当社が運営するメディア「NRT LOFT」（以下「当サイト」といいます）における、
          ご利用者様の個人情報の重要性を認識し、個人情報の保護に関する法律（以下「個人情報保護法」といいます）を
          遵守するとともに、以下のプライバシーポリシー（以下「本ポリシー」といいます）に従い、
          適切な取扱い及び保護に努めます。
        </p>
      </section>

      <section>
        <h2>1. 個人情報の定義</h2>
        <p>
          本ポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、
          すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、
          その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、
          それにより特定の個人を識別することができることとなるものを含みます）を指します。
        </p>
      </section>

      <section>
        <h2>2. 個人情報の収集方法</h2>
        <p>当サイトでは、以下の方法により個人情報を収集いたします：</p>
        <ul>
          <li>お問い合わせフォームからのご入力</li>
          <li>メールでのお問い合わせ</li>
        </ul>
      </section>

      <section>
        <h2>3. 収集する個人情報の項目</h2>
        <p>当サイトでは、お問い合わせいただく際に、以下の情報をご入力いただきます：</p>
        <ul>
          <li>お名前</li>
          <li>メールアドレス</li>
          <li>お問い合わせ内容（メッセージ本文）</li>
        </ul>
      </section>

      <section>
        <h2>4. 個人情報の利用目的</h2>
        <p>当社は、収集した個人情報を以下の目的で利用いたします：</p>
        <ul>
          <li>お問い合わせへの回答・対応</li>
          <li>取材・掲載のご相談への対応</li>
          <li>当サイトの運営・記事内容の改善</li>
        </ul>
      </section>

      <section>
        <h2>5. 個人情報の第三者提供</h2>
        <p>
          当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません：
        </p>
        <ul>
          <li>法令に基づく場合</li>
          <li>
            人の生命、身体または財産の保護のために必要がある場合であって、
            本人の同意を得ることが困難である場合
          </li>
          <li>
            公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、
            本人の同意を得ることが困難である場合
          </li>
          <li>
            国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を
            遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより
            当該事務の遂行に支障を及ぼすおそれがある場合
          </li>
        </ul>
      </section>

      <section>
        <h2>6. 個人情報の管理</h2>
        <p>
          当社は、個人情報の正確性を保ち、これを安全に管理いたします。
          個人情報への不正アクセス、紛失、破壊、改ざん及び漏洩などを防止するため、
          適切なセキュリティ対策を実施し、個人情報の厳重な管理を行います。
        </p>
      </section>

      <section>
        <h2>7. 個人情報の開示・訂正・削除</h2>
        <p>
          ご本人から個人情報の開示、訂正、削除等の要請があった場合は、
          ご本人確認の上、合理的な範囲内で速やかに対応いたします。
          個人情報に関するお問い合わせは、以下の連絡先までお願いいたします。
        </p>
      </section>

      <section>
        <h2>8. アクセス解析ツールについて</h2>
        <p>
          当サイトでは、サイトの利用状況を把握するために、Googleが提供するアクセス解析ツール
          「Google アナリティクス（Google Analytics）」を利用しています。
          Google アナリティクスは、Cookieを使用してトラフィックデータを収集しますが、
          この収集は匿名で行われており、個人を特定するものではありません。
        </p>
        <p>
          この機能はCookieを無効にすることで収集を拒否することができますので、
          お使いのブラウザの設定をご確認ください。
          この規約に関して、詳しくは
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google アナリティクス利用規約
          </a>
          や
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            Googleポリシーと規約
          </a>
          のページをご覧ください。
        </p>
      </section>

      <section>
        <h2>9. 広告配信について</h2>
        <p>
          当サイトは、第三者配信の広告サービス（Google
          AdSenseなど）を利用する場合があります。このような広告配信事業者は、
          ユーザーの興味に応じた商品やサービスの広告を表示するため、
          当サイトや他サイトへのアクセスに関する情報（氏名、住所、メールアドレス、電話番号は含まれません）
          を使用することがあります。
        </p>
        <p>
          Google 広告におけるCookieの取り扱いの詳細や、これらの情報が広告配信事業者に
          使用されないようにする設定については、
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            広告 – ポリシーと規約 – Google
          </a>
          をご覧ください。
        </p>
      </section>

      <section>
        <h2>10. プライバシーポリシーの変更</h2>
        <p>
          当社は、法令の変更や事業内容の変更等により、本ポリシーを変更することがあります。
          変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
        </p>
      </section>

      <section>
        <h2>11. お問い合わせ窓口</h2>
        <p>
          個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。
        </p>
        <div className="not-prose mt-4 rounded-lg p-4">
          <p className="text-sm font-semibold text-neutral-900">Nebulab合同会社</p>
          <p className="mt-1 text-sm text-neutral-700">
            〒286-0033 千葉県成田市花崎町
          </p>
          <p className="mt-1 text-sm text-neutral-700">
            Email: hello@nebulab.jp
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
