import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { HeroShowcase } from "@/components/marketing/HeroShowcase";
import { WhyCompare } from "@/components/marketing/WhyCompare";
import { Founders } from "@/components/marketing/Founders";
import { Testimonials } from "@/components/marketing/Testimonials";
import { BookCta } from "@/components/marketing/BookCta";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CTASection } from "@/components/marketing/CTASection";
import { LocalBusinessJsonLd } from "@/components/marketing/LocalBusinessJsonLd";
import { home } from "@/lib/data/home";
import { caseStudies } from "@/lib/data/case-studies";
import { services } from "@/lib/data/services";
import { packages } from "@/lib/data/packages";

const reasons = [
  {
    icon: Sparkles,
    title: "Безплатно демо, преди да платите",
    body: "Виждате реалния дизайн на вашата начална страница, без аванс и без ангажимент.",
  },
  {
    icon: TrendingUp,
    title: "Резултати, които се измерват",
    body: "3× повече покупки, 15+ нови клиенти месечно за реални бизнеси в Пловдив.",
  },
  {
    icon: Clock,
    title: "Отговор до един работен ден",
    body: "Пишете ни и се свързваме бързо. Без изчакване със седмици за отговор.",
  },
  {
    icon: ShieldCheck,
    title: "Прозрачност от начало до край",
    body: "Ясен обхват, честна цена и първи месец хостинг напълно безплатен.",
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />

      {/* 1. Hero */}
      <Section className="pt-14 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
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

      {/* 2. Trust reasons */}
      <Section bordered className="py-14 md:py-16">
        <h2 className="sr-only">Защо да изберете D&M</h2>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="bg-background p-6">
              <r.icon className="size-6 text-gold" aria-hidden />
              <h3 className="mt-4 font-heading font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Differentiator + interactive comparison */}
      <Section bordered>
        <Reveal>
          <SectionHeading
            eyebrow={home.differentiator.eyebrow}
            title={home.differentiator.title}
            lead={home.differentiator.body[0]}
          />
        </Reveal>
        <WhyCompare />
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

      {/* 5. Services overview */}
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

      {/* 6. Pricing teaser (no prices, value framing) */}
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
                  ? "relative rounded-2xl border-2 border-gold bg-card p-6"
                  : "rounded-2xl border border-graphite bg-card p-6"
              }
            >
              {pkg.recommended ? (
                <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-primary-foreground">
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

      {/* 7. Founders */}
      <Section bordered>
        <SectionHeading
          eyebrow="Екип"
          title={home.aboutStrip.title}
          lead={home.aboutStrip.body}
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

      {/* 8. Testimonials */}
      <Section bordered>
        <SectionHeading
          eyebrow="Отзиви"
          title="Какво казват клиентите"
          lead="Реални бизнеси от Пловдив, които днес разчитат на сайтовете си."
        />
        <Testimonials />
      </Section>

      {/* 9. Final CTA */}
      <CTASection
        title={home.finalCta.title}
        body={home.finalCta.body}
        cta={home.finalCta.cta}
        note={home.finalCta.note}
        location="home-final"
      />
    </>
  );
}
