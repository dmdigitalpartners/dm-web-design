import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  bordered = false,
  ...props
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
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-lg text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
