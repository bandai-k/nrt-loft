// src/app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const description =
  "記事への感想・質問、取材のご連絡はこちらから。内容を確認のうえ、必要に応じてご返信します。";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "お問い合わせ｜NRT LOFT",
    description,
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="お問い合わせ"
        lead="記事への感想・質問、取材のご連絡はこちらからどうぞ。内容を確認のうえ、必要に応じてご返信します。"
      />
      <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        <ContactForm />
        <p className="mt-10 max-w-[34em] text-[13px] leading-[1.95] text-ink-muted">
          フォームがうまく動かない場合は{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline">
            {CONTACT_EMAIL}
          </a>{" "}
          宛にメールをお送りください。
        </p>
      </section>
    </>
  );
}
