import { cn } from "@/lib/utils";

/**
 * Shared surface primitive. Consolidates the repeated
 * `border border-graphite bg-card` card styling into one place so the
 * radius/surface language stays consistent across the site.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border border-graphite bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Card };
