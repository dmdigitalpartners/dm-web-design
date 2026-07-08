import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  bordered = false, ...props
}: React.ComponentProps<"section"> & { bordered?: boolean }) {
  return (
    <section
      className={cn("py-20 md:py-28", bordered && "border-t border-graphite", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  as = "h2",
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  /** Heading level. Sub-pages should pass "h1" so each page has a real title. */
  as?: "h1" | "h2";
  center?: boolean;
}) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </Heading>
      {lead ? <p className="mt-4 text-lg text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
