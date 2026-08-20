"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { caseStudies } from "@/lib/data/case-studies";
import { cn } from "@/lib/utils";

const ROTATE_MS = 4500;

/**
 * Interactive hero visual: a browser mockup that cycles through the three real
 * client sites, with a subtle mouse-parallax tilt and a floating result badge.
 * Reinforces capability with real work rather than decoration.
 *
 * Fully progressive: auto-rotate and tilt are disabled under reduced motion and
 * on touch; the tabs always work as plain buttons. Renders identically on the
 * server (first study visible) so it is safe as an above-the-fold LCP element.
 */
export function HeroShowcase() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (reduced || interacted) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % caseStudies.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [reduced, interacted]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 7);
    rx.set(-py * 7);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }
  function select(i: number) {
    setActive(i);
    setInteracted(true);
  }

  const study = caseStudies[active];

  return (
    <div className="select-none">
      <div
        className="[perspective:1200px]"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          style={
            reduced
              ? undefined
              : { rotateX, rotateY, transformStyle: "preserve-3d" }
          }
          className="relative rounded-xl border border-graphite bg-card text-card-foreground shadow-surface"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-graphite px-4 py-3">
            <span className="size-2.5 rounded-full bg-graphite" aria-hidden />
            <span className="size-2.5 rounded-full bg-graphite" aria-hidden />
            <span className="size-2.5 rounded-full bg-graphite" aria-hidden />
            <span className="ml-3 inline-flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-sage" aria-hidden />
              Реален проект · {study.client}
            </span>
          </div>

          {/* Crossfading screenshots */}
          <div className="relative aspect-[8/5] overflow-hidden rounded-b-xl">
            {caseStudies.map((s, i) => (
              <Image
                key={s.slug}
                src={s.images.desktop}
                alt={`Сайтът на ${s.client}, изработен от D&M Web Design`}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : undefined}
                sizes="(max-width: 1024px) 100vw, 560px"
                className={cn(
                  "object-cover object-top transition-opacity duration-700",
                  i === active ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </div>

          {/* Floating result badge */}
          <motion.div
            key={study.slug}
            initial={reduced ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute -bottom-4 -right-3 max-w-[10rem] rounded-xl border border-gold/40 bg-background/95 p-3 shadow-surface backdrop-blur sm:-right-5"
          >
            <div className="font-heading text-2xl font-bold text-gold">
              {study.result.value}
            </div>
            <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {study.result.label}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {caseStudies.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => select(i)}
            aria-pressed={i === active}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm transition-colors",
              i === active
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-graphite text-muted-foreground hover:text-foreground"
            )}
          >
            {s.client}
          </button>
        ))}
      </div>
    </div>
  );
}
