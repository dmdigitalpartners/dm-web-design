import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Уеб дизайн Пловдив | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Уеб студио в Пловдив. Изработваме сайтове, които водят клиенти — стратегия, дизайн и безплатно демо преди какъвто и да е ангажимент.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: siteConfig.name,
    images: [{ url: "/images/brand/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`dark ${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Към съдържанието
        </a>
        {children}
      </body>
    </html>
  );
}
