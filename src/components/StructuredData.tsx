// src/components/StructuredData.tsx
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.nrt-loft.jp",
    name: "NRT LOFT",
    alternateName: "NRTロフト",
    description:
      "成田の旧釣具屋2階、DIYでリノベーションした小さな工房。木と革の名入れ品・ノベルティ・記念品を、ひとつずつ手作業で仕上げています。",
    url: "https://www.nrt-loft.jp",
    telephone: "",
    email: "hello@nebulab.jp",
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: "千葉県",
      addressLocality: "成田市",
      streetAddress: "花崎町",
      postalCode: "286-0033",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.9806,
      longitude: 140.3069,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here: no user-controlled input and no </script> sequences.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
