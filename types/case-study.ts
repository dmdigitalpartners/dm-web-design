export interface CaseStudyResult {
  /**
   * The headline metric, e.g. "3×" or "15+". Omit when the outcome is real but
   * not quantified — Skat Print previously carried "↑" here, which rendered as
   * a bare arrow at text-6xl where a number should be. A result without a
   * figure is stated in words, not with a glyph standing in for one.
   */
  value?: string;
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
