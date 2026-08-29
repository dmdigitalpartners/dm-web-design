import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { pricingPage } from "@/lib/data/pricing-page";

/**
 * Maps the visitor's situation onto one package, before the three cards.
 *
 * A row of hairline-divided statements rather than a fourth card grid — the
 * page already ends in three package cards and a comparison table, and the job
 * here is to narrow the choice, not to add another thing to compare.
 */
export function PackageChooser() {
  const { eyebrow, title, options, note } = pricingPage.chooser;

  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-heading text-title font-bold tracking-tight">
        {title}
      </h2>

      <ul className="mt-8">
        {options.map((o) => (
          <li key={o.packageId} className="border-t border-graphite last:border-b">
            <a
              href={`#${o.packageId}`}
              className="group flex flex-col gap-2 py-5 transition-colors hover:text-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                {o.when}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-heading font-bold text-gold transition-colors group-hover:text-gold-bright">
                {o.packageName}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted-foreground">{note}</p>
    </Reveal>
  );
}
