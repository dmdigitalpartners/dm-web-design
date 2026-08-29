import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { home } from "@/lib/data/home";

/**
 * The three real clients, stated as things a visitor can go and verify.
 *
 * Deliberately a hairline-divided band rather than a fourth card grid: the
 * comparison diagram, the featured work and the pricing teaser all land within
 * the next three screenfuls, and this section's job in the page rhythm is to be
 * the quiet beat between the hero and the argument. It carries real substance
 * (credential, what changed, a route into the case study) without competing.
 */
export function ProofBand() {
  const { label, clients, linkLabel } = home.proofBand;

  return (
    <Reveal>
      <Eyebrow className="text-muted-foreground">{label}</Eyebrow>

      <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
        {clients.map((c, i) => (
          <li
            key={c.slug}
            className={
              // Hairline rules between columns on desktop, between rows on mobile.
              i > 0
                ? "border-t border-graphite pt-10 md:border-l md:border-t-0 md:pl-8 md:pt-0"
                : "md:pr-8"
            }
          >
            <h3 className="font-heading text-xl font-bold">{c.client}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.industry}</p>

            <p className="mt-5 text-sm leading-relaxed text-foreground">
              {c.credential}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {c.outcome}
            </p>

            <Link
              href={`/work/${c.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold transition-colors hover:text-gold-bright"
            >
              {linkLabel}
              <span className="sr-only"> за {c.client}</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
