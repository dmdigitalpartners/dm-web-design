export const siteConfig = {
  name: "D&M Web Design",
  tagline: "Уеб, който продава",
  // No domain purchased yet — swap this single constant (and Vercel domain
  // settings) once the real domain is live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dm-web-design.vercel.app",
  email: "dmdigitalpartners@gmail.com",
  city: "Пловдив",
  country: "България",
  founders: ["Даниел Янчев", "Мартин Станкин"],
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  social: {
    instagram: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
