"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Restrained scroll-reveal per BRAND_GUIDE: single easing, small distance,
 * no bounce.
 *
 * Progressive enhancement: the element renders fully visible on the server and
 * on first client paint. Only after mount, once JS has confirmed it can also
 * reveal the content, does it hide below-the-fold items to animate them in.
 * This guarantees content is never stuck invisible if JS is disabled, fails to
 * load, or a hydration error occurs, and it respects reduced-motion.
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
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setState("shown");
      return;
    }

    // Already in view at mount (e.g. above the fold): show without animating,
    // so there is never a flash.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setState("shown");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: React.CSSProperties | undefined =
    state === "idle"
      ? undefined
      : state === "hidden"
        ? { opacity: 0, transform: "translateY(16px)" }
        : {
            opacity: 1,
            transform: "none",
            transition: `opacity 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
          };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
