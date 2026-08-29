import { cardSurface } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    <figure className={cn(cardSurface, "p-8")}>
      <blockquote className="text-xl leading-relaxed">
        „{testimonial.quote}“
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        {testimonial.author} · {testimonial.role}
      </figcaption>
    </figure>
  );
}
