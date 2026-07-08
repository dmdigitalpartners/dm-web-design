import { siteConfig } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description:
      "Уеб студио в Пловдив: уеб дизайн, разработка, поддръжка и SEO за малки и средни бизнеси.",
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    image: `${siteConfig.url}/images/brand/og.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Пловдив",
      addressCountry: "BG",
    },
    areaServed: ["Пловдив", "България"],
    founder: siteConfig.founders.map((name) => ({
      "@type": "Person",
      name,
    })),
    ...(sameAs.length ? { sameAs } : {}),
    priceRange: "€€",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
