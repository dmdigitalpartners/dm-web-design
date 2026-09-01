import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cardSurface } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types/case-study";

/**
 * A project card. `featured` renders the same content at roughly twice the
 * width, with the screenshot given real size and the result set at heading
 * scale — three equal thumbnails said all three projects were equally
 * interesting, and 384px is too small for a screenshot to work as proof.
 */
export function CaseStudyCard({
  study,
  priority = false,
  featured = false,
  className,
}: {
  study: CaseStudy;
  priority?: boolean;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        cardSurface,
        "group flex flex-col overflow-hidden transition-colors hover:border-gold",
        className,
      )}
    >
      <div className="overflow-hidden border-b border-graphite">
        <Image
          src={study.images.desktop}
          alt={`Началната страница на сайта на ${study.client}`}
          width={1440}
          height={900}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={cn(
            "w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            featured ? "aspect-16/10" : "aspect-8/5",
          )}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 720px"
              : "(max-width: 768px) 100vw, 384px"
          }
        />
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-8" : "p-6")}>
        <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
          {study.industry}
        </p>
        <h3
          className={cn(
            "mt-2 font-heading font-bold",
            featured ? "text-title" : "text-xl",
          )}
        >
          {study.client}
        </h3>
        <p
          className={cn(
            "mt-1 font-medium text-sage",
            featured && "text-lg",
          )}
        >
          {study.resultHeadline}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-gold transition-colors group-hover:text-gold-bright">
          Вижте проекта
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </div>
    </Link>
  );
}
