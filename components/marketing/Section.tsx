import { cn } from "@/lib/utils";

/**
 * The site's layout primitive. Every section of every page goes through it.
 *
 * It used to expose exactly one composition — max-w-6xl, py-20 md:py-28, one
 * background — which is why the pages read as the same band repeated: there was
 * no mechanism to make one section look different from another.
 *
 * The three axes below are that mechanism. Every default reproduces the previous
 * output byte for byte, so a call site that passes nothing is unchanged.
 */

const widths = {
  /** 72rem. The house measure. */
  default: "max-w-6xl",
  /** 80rem. For work grids and anything with a dominant image. */
  wide: "max-w-7xl",
  /** 48rem. Long-form prose — legal pages, dense explanation. */
  prose: "max-w-3xl",
  /** No measure and no gutter: the child owns the full viewport width. */
  full: null,
} as const;

const tones = {
  base: null,
  /** Lifted above the page ground. */
  raised: "bg-secondary",
  /** Recessed below it. Reserved for full-bleed statement bands. */
  well: "bg-surface-well",
} as const;

const pads = {
  /** Bands that punctuate rather than contain — proof rows, indexes. */
  compact: "py-12 md:py-16",
  default: "py-20 md:py-28",
  /** A section given room to be a moment. */
  expansive: "py-28 md:py-40",
} as const;

export function Section({
  children,
  className,
  bordered = false,
  width = "default",
  tone = "base",
  pad = "default",
  ...props
}: React.ComponentProps<"section"> & {
  bordered?: boolean;
  width?: keyof typeof widths;
  tone?: keyof typeof tones;
  pad?: keyof typeof pads;
}) {
  const measure = widths[width];

  return (
    <section
      className={cn(
        pads[pad],
        tones[tone],
        bordered && "border-t border-graphite",
        className,
      )}
      {...props}
    >
      {measure ? (
        <div className={cn("mx-auto px-6", measure)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

const headingSizes = {
  default: "text-3xl md:text-4xl",
  lg: "text-title-lg",
  /** Reserved: the hero h1 and the statement band. Nothing else. */
  display: "text-display",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  as = "h2",
  center = false,
  size = "default",
  variant = "stacked",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  /** Heading level. Sub-pages should pass "h1" so each page has a real title. */
  as?: "h1" | "h2";
  center?: boolean;
  size?: keyof typeof headingSizes;
  /**
   * stacked   — eyebrow / title / lead in a column. The house style.
   * split     — title left, lead right. Breaks the column rhythm on wide rows.
   * statement — title only, no eyebrow and no lead, at display scale.
   */
  variant?: "stacked" | "split" | "statement";
}) {
  const Heading = as;

  const heading = (
    <Heading
      className={cn(
        "font-bold tracking-tight",
        headingSizes[size],
        // The statement variant is the whole section, so it carries no top margin.
        variant !== "statement" && eyebrow && "mt-3",
      )}
    >
      {title}
    </Heading>
  );

  if (variant === "statement") {
    return (
      <div className={cn("max-w-4xl text-balance", center && "mx-auto text-center", className)}>
        {heading}
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div
        className={cn(
          "grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12",
          className,
        )}
      >
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {heading}
        </div>
        {lead ? <p className="text-lg text-muted-foreground">{lead}</p> : null}
      </div>
    );
  }

  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading}
      {lead ? <p className="mt-4 text-lg text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

/** The gold uppercase label. Was hand-typed as tracking-[0.2em] in ~8 places. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-eyebrow text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}
