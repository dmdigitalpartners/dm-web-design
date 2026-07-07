"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

/**
 * Restrained scroll-reveal per BRAND_GUIDE: single easing, small distance,
 * no bounce. Renders statically when the user prefers reduced motion.
 * LazyMotion keeps the animation runtime out of the critical bundle.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
