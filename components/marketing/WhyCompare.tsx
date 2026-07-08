"use client";

import { Check, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { home } from "@/lib/data/home";
import { cn } from "@/lib/utils";

/**
 * Interactive side-by-side comparison of the usual agency process vs. the D&M
 * "free demo first" process. Points stagger in on scroll; the D&M column is
 * emphasised and lifts on hover. Reduced-motion renders it static.
 */
export function WhyCompare() {
  const reduced = useReducedMotion();
  const { usual, dm } = home.whyCompare;

  const column = (
    label: string,
    points: readonly string[],
    highlight: boolean
  ) => (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "rounded-2xl border p-6 transition-transform md:p-8",
        highlight
          ? "border-gold/50 bg-gold/[0.04] md:-translate-y-1 md:hover:-translate-y-2"
          : "border-graphite bg-card"
      )}
    >
      <p
        className={cn(
          "text-sm font-medium uppercase tracking-[0.15em]",
          highlight ? "text-gold" : "text-muted-foreground"
        )}
      >
        {label}
      </p>
      <ul className="mt-6 space-y-4">
        {points.map((point, i) => (
          <motion.li
            key={point}
            initial={reduced ? false : { opacity: 0, x: highlight ? 12 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: reduced ? 0 : 0.1 + i * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-start gap-3"
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                highlight
                  ? "bg-gold/15 text-gold"
                  : "bg-destructive/10 text-destructive"
              )}
              aria-hidden
            >
              {highlight ? (
                <Check className="size-3.5" />
              ) : (
                <X className="size-3.5" />
              )}
            </span>
            <span
              className={cn(
                highlight ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {point}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {column(usual.label, usual.points, false)}
      {column(dm.label, dm.points, true)}
    </div>
  );
}
