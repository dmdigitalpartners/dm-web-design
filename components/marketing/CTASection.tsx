import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { BookCta } from "@/components/marketing/BookCta";
import { processSteps } from "@/lib/data/process-steps";

/**
 * The closing call to action, on seven pages.
 *
 * Passing `steps` switches it to a split layout that answers "what actually
 * happens if I click this" beside the button — the free steps from
 * /process, which are already the answer. Without the prop it renders exactly
 * as before, so the other six pages are untouched.
 */
export function CTASection({
  title,
  body,
  cta,
  note,
  location = "cta-section",
  steps = false,
  stepsLabel,
}: {
  title: string;
  /** ReactNode so a page can link a phrase inside it; plain strings still work. */
  body: React.ReactNode;
  cta: string;
  note?: string;
  location?: string;
  steps?: boolean;
  stepsLabel?: string;
}) {
  const freeSteps = steps ? processSteps.filter((s) => s.free) : [];

  if (!steps || freeSteps.length === 0) {
    return (
      <Section bordered>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{body}</p>
            <div className="mt-8 flex justify-center">
              <BookCta location={location} label={cta} attract />
            </div>
            {note ? (
              <p className="mt-3 text-sm text-muted-foreground">{note}</p>
            ) : null}
          </div>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section bordered>
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-title-lg font-bold tracking-tight">{title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{body}</p>
            <div className="mt-8">
              <BookCta location={location} label={cta} attract />
            </div>
            {note ? (
              <p className="mt-3 text-sm text-muted-foreground">{note}</p>
            ) : null}
          </div>

          {stepsLabel ? (
            <div className="lg:pt-2">
              <p className="text-sm font-medium uppercase tracking-eyebrow text-gold">
                {stepsLabel}
              </p>
              <ol className="mt-6">
                {freeSteps.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-4 border-t border-graphite py-4 first:border-t-0 first:pt-0"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-[10px] font-bold text-gold"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-heading font-bold">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.commitment}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
