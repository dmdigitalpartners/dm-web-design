export interface PricingPackage {
  id: "foundation" | "growth" | "authority";
  name: string;
  positioning: string;
  audience: string;
  /** Displayed as "обикновено €X–€Y според обхвата" */
  priceRange: string;
  features: string[];
  recommended: boolean;
  cta: string;
}
