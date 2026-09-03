// src/components/StructuredData.tsx
import {
  OPERATOR,
  OPERATOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify で組んだ静的な値のみ。ユーザー入力は入らない。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** トップページ用。場所(LocalBusiness)ではなくサイトとして記述する。 */
export function WebSiteStructuredData() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        name: SITE_TITLE,
        alternateName: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        inLanguage: "ja",
        publisher: {
          "@type": "Organization",
          name: OPERATOR,
          url: OPERATOR_URL,
        },
      }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  /** 記事のカバー画像の絶対 URL。無い記事もあるので任意。 */
  imageUrl?: string;
  keywords: string[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        datePublished,
        dateModified,
        ...(imageUrl ? { image: [imageUrl] } : {}),
        inLanguage: "ja",
        ...(keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
        author: { "@type": "Organization", name: OPERATOR, url: OPERATOR_URL },
        publisher: {
          "@type": "Organization",
          name: OPERATOR,
          url: OPERATOR_URL,
        },
      }}
    />
  );
}
