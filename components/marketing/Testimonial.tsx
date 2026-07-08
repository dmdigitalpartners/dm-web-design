import type { CaseStudy } from "@/types/case-study";

/**
 * Renders only when a real, verified quote exists in the data, no
 * placeholder fallback that could ship as fabricated content.
 */
export function Testimonial({
  testimonial,
}: {
  testimonial: CaseStudy["testimonial"];
}) {
  if (!testimonial) return null;
  return (
    <figure className="border border-graphite bg-card p-8">
      <blockquote className="text-xl leading-relaxed">
        „{testimonial.quote}“
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        {testimonial.author} · {testimonial.role}
      </figcaption>
    </figure>
  );
}
