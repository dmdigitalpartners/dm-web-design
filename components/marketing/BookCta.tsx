"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { bookCta } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

/**
 * Primary conversion button. Renders the premium `cta` variant, fires a
 * `book_cta_click` analytics event with its placement, and optionally carries
 * the gentle attract glow. Safe to use inside server components.
 */
export function BookCta({
  location,
  label = bookCta.labelLong,
  size = "xl",
  attract = false,
  className,
  href = bookCta.href,
}: {
  location: string;
  label?: string;
  size?: "lg" | "xl" | "default";
  attract?: boolean;
  className?: string;
  href?: string;
}) {
  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      variant="cta"
      size={size}
      className={cn(attract && "cta-attract", className)}
      onClick={() => trackEvent("book_cta_click", { location })}
    >
      {label}
    </Button>
  );
}
