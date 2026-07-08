import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} · Уеб дизайн Пловдив`,
    short_name: siteConfig.name,
    description:
      "Уеб студио в Пловдив. Сайтове, които водят клиенти, с безплатно демо преди какъвто и да е ангажимент.",
    start_url: "/",
    display: "standalone",
    lang: "bg",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      {
        src: "/images/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
