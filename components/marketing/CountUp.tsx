"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Restrained count-up on scroll-into-view (single ease-out, no bounce).
 * Renders the final value immediately for reduced-motion users and when
 * value is null (non-numeric stats like "↑").
 */
export function CountUp({
  value,
  suffix,
  className,
}: {
  value: number | null;
  suffix: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value === null ? "" : "0");
  const started = useRef(false);

  useEffect(() => {
    if (value === null) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(String(value));
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const duration = 1200;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(String(Math.round(eased * value)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
