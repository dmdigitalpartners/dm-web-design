import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/lib/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/pricing",
    "/process",
    "/about",
    "/contact",
    "/book-a-call",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/work" ? 0.9 : 0.7,
  }));

  const workRoutes = caseStudies.map(({ slug }) => ({
    url: `${siteConfig.url}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
