"use client";

import { CreditCard, Eye } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { home } from "@/lib/data/home";
import { cn } from "@/lib/utils";

/**
 * The two processes as parallel tracks on a shared axis.
 *
 * This replaces WhyCompare, which said the same thing as two lists of bullets.
 * The differentiator is a *sequence*, and a sequence written as claims makes the
 * reader rebuild the timeline in their head. Here both tracks carry the same two
 * markers — where you pay, and where you first see real work — and the markers
 * swap places between them. That inversion is the argument.
 *
 * Horizontal from md up; stacked below, where five Bulgarian labels across
 * 390px would be unreadable. The markers stay labelled in both layouts, since
 * their relative order is the whole point.
 */

const EASE = [0.25, 0.1, 0.25, 1] as const;

type Step = {
  label: string;
  mark?: "payment" | "reveal";
  free?: boolean;
};

function Track({
  label,
  steps,
  highlight,
  delay,
  reduced,
  markLabels,
  footnote,
}: {
  label: string;
  steps: readonly Step[];
  highlight: boolean;
  delay: number;
  reduced: boolean | null;
  markLabels: Record<"payment" | "reveal", string>;
  footnote?: string;
}) {
  return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: reduced ? 0 : delay, ease: EASE }}
        className={cn(
          "rounded-2xl border p-6 md:p-8",
          highlight ? "border-gold/50 bg-gold/[0.04]" : "border-graphite bg-card",
        )}
      >
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-eyebrow",
            highlight ? "text-gold" : "text-muted-foreground",
          )}
        >
          {label}
        </p>

        <ol className="relative mt-8 grid gap-6 md:grid-cols-5 md:gap-3">
          {/*
            The axis. Sits behind the nodes on desktop and runs vertically on
            mobile, so the track reads as one continuous line either way.
          */}
          <span
            aria-hidden
            className={cn(
              "absolute left-[11px] top-2 bottom-2 w-px md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto",
              highlight ? "bg-gold/25" : "bg-graphite",
            )}
          />

          {steps.map((step, i) => {
            const marked = step.mark !== undefined;
            const isPayment = step.mark === "payment";

            return (
              <motion.li
                key={step.label}
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.35,
                  delay: reduced ? 0 : delay + 0.15 + i * 0.07,
                  ease: EASE,
                }}
                className="relative flex items-start gap-3 md:block"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
                    marked
                      ? isPayment
                        ? highlight
                          ? "border-gold bg-gold text-primary-foreground"
                          : "border-destructive bg-destructive text-background"
                        : // Same eye marker on both tracks so they read as the
                          // same event, but filled only where it lands early.
                          highlight
                          ? "border-sage bg-sage text-background"
                          : "border-sage/50 bg-card text-sage"
                      : highlight
                        ? "border-gold/40 bg-card text-gold"
                        : "border-graphite bg-card text-muted-foreground",
                  )}
                >
                  {step.mark === "payment" ? (
                    <CreditCard className="size-3.5" />
                  ) : step.mark === "reveal" ? (
                    <Eye className="size-3.5" />
                  ) : (
                    i + 1
                  )}
                </span>

                <div className="md:mt-3 md:pr-3">
                  <p
                    className={cn(
                      "text-sm leading-snug",
                      marked ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>

                  {marked ? (
                    <p
                      className={cn(
                        "mt-1 text-xs font-medium uppercase tracking-wider",
                        isPayment
                          ? highlight
                            ? "text-gold"
                            : "text-destructive"
                          : "text-sage",
                      )}
                    >
                      {markLabels[step.mark!]}
                    </p>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </ol>

      {footnote ? (
        // Sentence case: this is a sentence now, and 12px letterspaced uppercase
        // Cyrillic was flagged as being at the limit of readability.
        <p className="mt-6 border-t border-gold/20 pt-4 text-sm text-gold">
          {footnote}
        </p>
      ) : null}
    </motion.div>
  );
}

export function ProcessCompare() {
  const reduced = useReducedMotion();
  const { usual, dm, markLabels, freeNote } = home.processCompare;

  /*
    Stacked, not side by side. The tracks have to share one horizontal axis for
    the marker positions to be comparable at a glance — placed in two columns
    each track gets its own private axis, and the comparison stops working (it
    also crushes five Bulgarian labels into ~100px columns).
  */
  return (
    <div className="mt-12 space-y-4">
      <Track
        label={usual.label}
        steps={usual.steps}
        highlight={false}
        delay={0}
        reduced={reduced}
        markLabels={markLabels}
      />
      <Track
        label={dm.label}
        steps={dm.steps}
        highlight
        delay={0.12}
        reduced={reduced}
        markLabels={markLabels}
        footnote={freeNote}
      />
    </div>
  );
}
