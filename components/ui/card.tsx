import { cn } from "@/lib/utils";

/**
 * The site's card surface, as one string.
 *
 * This used to exist only as the `Card` component below — which nothing
 * imported, because half the call sites need a <figure>, an <article> or a
 * <Link> rather than a <div>, and a div-only component cannot absorb those.
 * So the class string stayed hand-written in nine files instead.
 *
 * Exporting the string fixes that without inventing polymorphism: use
 * `cardSurface` on whatever element the markup actually needs, and `Card`
 * when a plain div is what you want.
 */
export const cardSurface =
  "rounded-xl border border-graphite bg-card text-card-foreground";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card" className={cn(cardSurface, className)} {...props} />;
}

export { Card };
