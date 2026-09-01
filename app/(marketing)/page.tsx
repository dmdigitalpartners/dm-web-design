import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { HeroShowcase } from "@/components/marketing/HeroShowcase";
import { ProofBand } from "@/components/marketing/ProofBand";
import { StatementBand } from "@/components/marketing/StatementBand";
import { ProcessCompare } from "@/components/marketing/ProcessCompare";
import { Founders } from "@/components/marketing/Founders";
import { BookCta } from "@/components/marketing/BookCta";
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

      {/*
        1. Hero. Runs on the wide measure while every other section keeps the
        house max-w-6xl, so the page opens wider than it continues.
      */}
      <Section width="wide" className="pt-14 md:pt-20">
        {/*
          The headline spans the full measure rather than sitting in a column.
          At display scale a 545px column broke it into four ragged lines, which
          wastes the scale; across the full width it sets in two and reads as the
          typographic moment the tier exists for.
        */}
        <Eyebrow>{home.hero.eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-5xl text-display text-balance">
          {home.hero.headline}
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              {home.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <BookCta location="hero" attract />
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
              >
                {home.hero.secondaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Без аванс · Без ангажимент · Отговор до 1 работен ден
            </p>
          </div>
          <HeroShowcase />
        </div>
      </Section>

      {/* 2. Proof band: the three real clients, stated as checkable facts */}
      <Section bordered pad="compact">
        <ProofBand />
      </Section>

      {/*
        The trust-reasons grid that used to sit here is gone. All four of its
        cards were said elsewhere on this same page: the free demo by the
        statement band, „3× повече покупки, 15+ нови клиенти“ by figures we no
        longer headline, the one-working-day reply by the hero microcopy, and
        transparency by the last row of the comparison below.
      */}

      {/* 3. Differentiator + interactive comparison */}
      <Section bordered>
        <Reveal>
          <SectionHeading
            eyebrow={home.differentiator.eyebrow}
            title={home.differentiator.title}
            lead={home.differentiator.body[0]}
            size="lg"
          />
        </Reveal>
        <ProcessCompare />
        <div className="mt-8">
          <Link
            href="/process"
            className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
          >
            {home.differentiator.linkLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* 5. Featured work */}
      <Section bordered>
        <SectionHeading
          eyebrow={home.featuredWork.eyebrow}
          title={home.featuredWork.title}
          lead={home.featuredWork.lead}
          size="lg"
        />
        {/*
          One dominant project, two beside it. Equal thirds weighted all three
          the same and rendered the studio's only real proof at thumbnail size.
        */}
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <CaseStudyCard study={caseStudies[0]} featured />
          </Reveal>
          <div className="grid content-start gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {caseStudies.slice(1).map((study, i) => (
              <Reveal key={study.slug} delay={0.08 + i * 0.08} className="h-full">
                <CaseStudyCard study={study} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
          >
            Вижте всички проекти
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* 5b. The promise, said once, at scale */}
      <StatementBand />

      {/* 6. Services overview */}
      <Section bordered>
        <SectionHeading
          eyebrow={home.servicesOverview.eyebrow}
          title={home.servicesOverview.title}
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <li
              key={service.id}
              className="group bg-background p-6 transition-colors hover:bg-secondary"
            >
              <service.icon className="size-6 text-gold" aria-hidden />
              <h3 className="mt-4 font-heading font-bold transition-colors group-hover:text-gold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
          >
            Всички услуги в детайл
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* 7. Pricing teaser (no prices, value framing) */}
      <Section bordered>
        <SectionHeading
          eyebrow={home.pricingTeaser.eyebrow}
          title={home.pricingTeaser.title}
          lead={home.pricingTeaser.lead}
          size="lg"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={
                pkg.recommended
                  ? "relative rounded-xl border-2 border-gold bg-card p-6 text-card-foreground"
                  : "rounded-xl border border-graphite bg-card p-6 text-card-foreground"
              }
            >
              {/*
                bg-primary, not bg-gold: --gold is the text/border token and
                deepens to #80622f on light, so carbon text on it fails AA.
                --primary stays raw #b8935a in both modes, which is what the
                globals.css note reserves for fills carrying carbon text.
              */}
              {pkg.recommended ? (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Препоръчван
                </span>
              ) : null}
              <h3 className="font-heading text-lg font-bold">{pkg.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.positioning}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {pkg.audience}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
          >
            {home.pricingTeaser.linkLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* 8. Founders */}
      <Section bordered>
        <SectionHeading
          eyebrow="Екип"
          title={home.aboutStrip.title}
          lead={home.aboutStrip.body}
          size="lg"
        />
        <Founders />
        <div className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
          >
            {home.aboutStrip.linkLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* 9. Final CTA */}
      <CTASection
        title={home.finalCta.title}
        body={home.finalCta.body}
        cta={home.finalCta.cta}
        note={home.finalCta.note}
        location="home-final"
        steps
        stepsLabel={home.finalCta.stepsLabel}
      />
    </>
  );
}
