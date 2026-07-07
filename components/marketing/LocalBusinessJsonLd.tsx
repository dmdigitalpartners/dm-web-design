import { siteConfig } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description:
      "Уеб студио в Пловдив: уеб дизайн, разработка, поддръжка и SEO за малки и средни бизнеси.",
    url: siteConfig.url,
    email: siteConfig.email,
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
    priceRange: "€500–€1500",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
