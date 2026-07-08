import { siteConfig } from "@/lib/site-config";
import type { CaseStudy } from "@/types/case-study";

/**
 * Per-case-study structured data: an Article describing the project plus a
 * BreadcrumbList for the Начало / Проекти / <client> path.
 */
export function CaseStudyJsonLd({ study }: { study: CaseStudy }) {
  const url = `${siteConfig.url}/work/${study.slug}`;
  const image = `${siteConfig.url}${study.images.desktop}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: study.seo.title,
        description: study.seo.description,
        image,
        url,
        inLanguage: "bg",
        about: study.client,
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Начало", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Проекти", item: `${siteConfig.url}/work` },
          { "@type": "ListItem", position: 3, name: study.client, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
