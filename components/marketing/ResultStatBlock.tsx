import type { CaseStudyResult } from "@/types/case-study";

/** Prominent verified-result block, sage is reserved for real metrics. */
export function ResultStatBlock({ result }: { result: CaseStudyResult }) {
  // No figure: the outcome carries the emphasis itself, rather than a glyph
  // sitting in the numeral slot pretending to be one.
  if (!result.value) {
    return (
      <div className="border-l-2 border-gold py-2 pl-6">
        <p className="font-heading text-title font-bold text-sage">
          {result.label}
        </p>
      </div>
    );
  }

  return (
    <div className="border-l-2 border-gold py-2 pl-6">
      <p className="font-heading text-5xl font-bold text-sage md:text-6xl">
        {result.value}
      </p>
      <p className="mt-2 text-lg text-muted-foreground">{result.label}</p>
    </div>
  );
}
