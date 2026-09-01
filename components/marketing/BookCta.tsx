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
      className={cn(
        /*
          The button base sets `whitespace-nowrap`, and „Запазете безплатен
          разговор" at px-8 has a ~302px hard minimum — wider than the 272px
          available inside a 320px viewport (≈400% zoom). That blew the CTA grid
          past the viewport and forced sideways scrolling, failing WCAG 1.4.10
          reflow. Below sm the label may wrap and the padding tightens; from sm
          up nothing changes.
        */
        "h-auto max-w-full whitespace-normal px-5 py-3 text-center sm:h-12 sm:whitespace-nowrap sm:px-8 sm:py-0",
        attract && "cta-attract",
        className,
      )}
      onClick={() => trackEvent("book_cta_click", { location })}
    >
      {label}
    </Button>
  );
}
