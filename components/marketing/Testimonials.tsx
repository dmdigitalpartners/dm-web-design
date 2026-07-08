import { testimonials } from "@/lib/data/testimonials";
import { Reveal } from "./Reveal";

function initials(company: string) {
  return company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Testimonial grid. Copy is currently placeholder and clearly labelled as such;
 * clearing the `placeholder` flag in the data hides the label.
 */
export function Testimonials() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.company} delay={i * 0.08}>
          <figure className="flex h-full flex-col rounded-2xl border border-graphite bg-card p-6">
            <blockquote className="flex-1 text-[0.975rem] leading-relaxed text-foreground">
              <span aria-hidden className="font-heading text-3xl text-gold">
                “
              </span>
              <p className="-mt-2">{t.quote}</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-graphite pt-5">
              <span
                className="flex size-10 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold"
                aria-hidden
              >
                {initials(t.company)}
              </span>
              <span>
                <span className="block text-sm font-medium">{t.author}</span>
                <span className="block text-xs text-muted-foreground">
                  {t.company}
                  {t.placeholder ? " · примерен отзив" : ""}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
