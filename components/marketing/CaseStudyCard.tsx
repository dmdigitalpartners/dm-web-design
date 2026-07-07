import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/types/case-study";

export function CaseStudyCard({
  study,
  priority = false,
}: {
  study: CaseStudy;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex flex-col border border-graphite bg-card transition-colors hover:border-gold"
    >
      <div className="overflow-hidden border-b border-graphite">
        <Image
          src={study.images.desktop}
          alt={`Началната страница на сайта на ${study.client}`}
          width={1440}
          height={900}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className="aspect-[8/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 384px"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {study.industry}
        </p>
        <h3 className="mt-2 font-heading text-xl font-bold">{study.client}</h3>
        <p className="mt-1 text-sage font-medium">{study.resultHeadline}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-gold transition-colors group-hover:text-gold-bright">
          Вижте проекта
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
