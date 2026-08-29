import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { DeviceFrame } from "@/components/marketing/DeviceFrame";
import { ResultStatBlock } from "@/components/marketing/ResultStatBlock";
import { Testimonial } from "@/components/marketing/Testimonial";
import { CaseStudyJsonLd } from "@/components/marketing/CaseStudyJsonLd";
import { CTASection } from "@/components/marketing/CTASection";
import { cardSurface } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    // seo.title already carries the brand suffix; use absolute to avoid the
    // "%s | D&M Web Design" template appending it a second time.
    title: { absolute: study.seo.title },
    description: study.seo.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const projectTypeLabel =
    study.projectType === "redesign" ? "Редизайн" : "Нов сайт";

  return (
    <>
      <CaseStudyJsonLd study={study} />

      {/* Header */}
      <Section className="pt-16 md:pt-20">
        <nav aria-label="Трасе" className="text-sm text-muted-foreground">
          <Link href="/work" className="transition-colors hover:text-gold">
            Проекти
          </Link>
          <span className="px-2" aria-hidden>
            /
          </span>
          <span className="text-foreground">{study.client}</span>
        </nav>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {study.industry} · {projectTypeLabel}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          {study.client}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.06] px-4 py-1.5 font-heading text-lg font-bold text-sage">
            {study.result.value ? (
              <>
                {study.result.value}
                <span className="text-sm font-normal text-muted-foreground">
                  {study.result.label}
                </span>
              </>
            ) : (
              /* Qualitative result: the words are the pill, no empty numeral. */
              <span className="text-base">{study.result.label}</span>
            )}
          </span>
        </div>
        <a
          href={study.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
        >
          Разгледайте живия сайт
          <ExternalLink className="size-4" />
        </a>
      </Section>

      {/* Visual */}
      <Section bordered className="pt-12 md:pt-16">
        {/* No Reveal: the desktop capture is this page's LCP element. */}
        <div className="grid items-start gap-6 md:grid-cols-[2fr_1fr]">
          <DeviceFrame
            src={study.images.desktop}
            alt={`Началната страница на ${study.client} на настолен екран`}
            priority
          />
          <figure className={cn(cardSurface, "mx-auto w-full max-w-60 overflow-hidden")}>
            <Image
              src={study.images.mobile}
              alt={`Сайтът на ${study.client} на мобилен екран`}
              width={390}
              height={844}
              className="w-full"
              sizes="240px"
            />
          </figure>
        </div>
      </Section>

      {/* Challenge */}
      <Section bordered>
        <SectionHeading eyebrow="Предизвикателството" title="Откъде тръгнахме" />
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {study.challenge}
        </p>
      </Section>

      {/* Approach */}
      <Section bordered>
        <SectionHeading eyebrow="Какво направихме" title="Решенията, и защо" />
        <ol className="mt-10 max-w-2xl space-y-0">
          {study.approach.map((step, i) => (
            <li
              key={step.slice(0, 24)}
              className="flex items-start gap-5 border-b border-graphite py-6 first:border-t"
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/[0.06] font-heading text-sm font-bold text-gold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Result */}
      <Section bordered>
        <SectionHeading eyebrow="Резултатът" title="Числото, което има значение" />
        <div className="mt-10 max-w-xl">
          <ResultStatBlock result={study.result} />
        </div>
        {study.testimonial ? (
          <div className="mt-10 max-w-xl">
            <Testimonial testimonial={study.testimonial} />
          </div>
        ) : null}
      </Section>

      {/* Other work */}
      <Section bordered className="py-12 md:py-14">
        <nav aria-label="Други проекти" className="flex flex-wrap gap-6">
          {caseStudies
            .filter((cs) => cs.slug !== study.slug)
            .map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="text-gold transition-colors hover:text-gold-bright"
              >
                {cs.client} →
              </Link>
            ))}
        </nav>
      </Section>

      <CTASection
        title="Искате такъв резултат за вашия бизнес?"
        body="Разкажете ни за него в безплатен опознавателен разговор, ще ви покажем демо, преди да сте платили каквото и да е."
        cta="Запазете безплатен разговор"
        location="case-study-final"
      />
    </>
  );
}
