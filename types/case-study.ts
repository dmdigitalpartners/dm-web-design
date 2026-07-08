export interface CaseStudyResult {
  /** The headline metric, e.g. "3×" or "15+" */
  value: string;
  /** What the metric measures, e.g. "повече покупки от сайта" */
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  projectType: "redesign" | "new-build";
  /** One-line result headline used on cards */
  resultHeadline: string;
  result: CaseStudyResult;
  challenge: string;
  approach: string[];
  liveUrl: string;
  images: {
    desktop: string;
    mobile: string;
    hero: string;
  };
  /**
   * Real client quote only. Leave undefined until a verified testimonial is
   * collected, the testimonial block renders nothing when absent.
   */
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  seo: {
    title: string;
    description: string;
  };
}
