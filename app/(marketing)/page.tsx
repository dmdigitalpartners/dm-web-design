import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { CountUp } from "@/components/marketing/CountUp";
import { DeviceFrame } from "@/components/marketing/DeviceFrame";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CTASection } from "@/components/marketing/CTASection";
import { LocalBusinessJsonLd } from "@/components/marketing/LocalBusinessJsonLd";
import { home } from "@/lib/data/home";
import { caseStudies } from "@/lib/data/case-studies";
import { services } from "@/lib/data/services";
import { packages } from "@/lib/data/packages";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      {/* 1. Hero */}
      <Section className="pt-16 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              {home.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {home.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {home.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button
                render={<Link href="/book-a-call" />}
                nativeButton={false}
                size="lg"
                className="h-12 px-8 text-base"
              >
                {home.hero.primaryCta}
              </Button>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
              >
                {home.hero.secondaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          {/* No entrance animation here: this is the LCP element and any
              fade delays the recorded paint by the animation's duration. */}
          <DeviceFrame
            src={caseStudies[0].images.desktop}
            alt={`Сайтът на ${caseStudies[0].client}, изработен от D&M Web Design`}
            priority
          />
        </div>
      </Section>

      {/* 2. Proof strip */}
      <Section bordered className="py-12 md:py-14">
        <h2 className="sr-only">{home.proofStrip.title}</h2>
        <dl className="grid gap-8 sm:grid-cols-3">
          {home.proofStrip.stats.map((stat) => (
            <div key={stat.client} className="border-l-2 border-gold pl-5">
              <dd className="font-heading text-4xl font-bold text-sage md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-1 text-muted-foreground">
                {stat.label}
                <span className="mt-0.5 block text-xs uppercase tracking-[0.15em]">
                  {stat.client}
                </span>
              </dt>
            </div>
          ))}
        </dl>
      </Section>

      {/* 3. Differentiator */}
      <Section bordered>
        <Reveal>
          <SectionHeading
            eyebrow={home.differentiator.eyebrow}
            title={home.differentiator.title}
          />
          <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
            {home.differentiator.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <Link
            href="/process"
            className="mt-6 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
          >
            {home.differentiator.linkLabel}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </Section>

      {/* 4. Featured work */}
      <Section bordered>
        <SectionHeading
          eyebrow={home.featuredWork.eyebrow}
          title={home.featuredWork.title}
          lead={home.featuredWork.lead}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Services overview */}
      <Section bordered>
        <SectionHeading
          eyebrow={home.servicesOverview.eyebrow}
          title={home.servicesOverview.title}
        />
        <ul className="mt-12 grid gap-px border border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <li key={service.id} className="bg-background p-6">
              <service.icon className="size-6 text-gold" aria-hidden />
              <h3 className="mt-4 font-heading font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
        >
          Всички услуги в детайл
          <ArrowRight className="size-4" />
        </Link>
      </Section>

      {/* 6. Pricing teaser */}
      <Section bordered>
        <SectionHeading
          eyebrow={home.pricingTeaser.eyebrow}
          title={home.pricingTeaser.title}
          lead={home.pricingTeaser.lead}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={
                pkg.recommended
                  ? "border-2 border-gold bg-card p-6"
                  : "border border-graphite bg-card p-6"
              }
            >
              <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.positioning}</p>
            </div>
          ))}
        </div>
        <Link
          href="/pricing"
          className="mt-8 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
        >
          {home.pricingTeaser.linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Section>

      {/* 7. About strip */}
      <Section bordered className="py-14 md:py-16">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold">{home.aboutStrip.title}</h2>
            <p className="mt-3 text-muted-foreground">{home.aboutStrip.body}</p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
            >
              {home.aboutStrip.linkLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* 8. Final CTA */}
      <CTASection
        title={home.finalCta.title}
        body={home.finalCta.body}
        cta={home.finalCta.cta}
        note={home.finalCta.note}
      />
    </>
  );
}
