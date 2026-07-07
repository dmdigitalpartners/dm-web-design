import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { CTASection } from "@/components/marketing/CTASection";
import { packages } from "@/lib/data/packages";
import { pricingPage } from "@/lib/data/pricing-page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Цени — прозрачни пакети за уеб сайт",
  description:
    "Изработка на сайт в Пловдив: Foundation, Growth и Authority — прозрачни ценови диапазони €500–1500+, ясен обхват, първи месец хостинг безплатен.",
};

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          eyebrow={pricingPage.header.eyebrow}
          title={pricingPage.header.title}
          lead={pricingPage.header.lead}
        />
      </Section>

      {/* Packages */}
      <Section bordered className="pt-12 md:pt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08} className="h-full">
              <article
                aria-label={`Пакет ${pkg.name}`}
                className={cn(
                  "relative flex h-full flex-col bg-card p-8",
                  pkg.recommended
                    ? "border-2 border-gold"
                    : "border border-graphite"
                )}
              >
                {pkg.recommended ? (
                  <p className="absolute -top-3 left-8 bg-gold px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    {pricingPage.recommendedBadge}
                  </p>
                ) : null}
                <h2 className="font-heading text-2xl font-bold">{pkg.name}</h2>
                <p className="mt-2 text-muted-foreground">{pkg.positioning}</p>
                <p className="mt-6 font-heading text-xl font-bold text-gold">
                  {pkg.priceRange}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{pkg.audience}</p>
                <ul className="mt-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  render={<Link href={`/book-a-call?package=${pkg.id}`} />}
                  nativeButton={false}
                  variant={pkg.recommended ? "default" : "outline"}
                  size="lg"
                  className="mt-8 h-11"
                >
                  {pkg.cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Всеки пакет може да се разшири или свие според нуждите ви — точната
          оферта получавате след безплатното демо, без ангажимент.
        </p>
      </Section>

      {/* Why not Wix */}
      <Section bordered>
        <Reveal>
          <SectionHeading
            eyebrow={pricingPage.wixObjection.eyebrow}
            title={pricingPage.wixObjection.title}
          />
          <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
            {pricingPage.wixObjection.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Maintenance */}
      <Section bordered>
        <SectionHeading
          eyebrow={pricingPage.maintenance.eyebrow}
          title={pricingPage.maintenance.title}
        />
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
          {pricingPage.maintenance.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="mt-8 grid max-w-3xl gap-px border border-graphite bg-graphite sm:grid-cols-2">
          {pricingPage.maintenance.tiers.map((tier) => (
            <div key={tier.name} className="bg-background p-6">
              <h3 className="font-heading font-bold">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl border-l-2 border-gold pl-4 text-foreground">
          {pricingPage.maintenance.note}
        </p>
      </Section>

      <CTASection
        title={pricingPage.faqCta.title}
        body={pricingPage.faqCta.body}
        cta={pricingPage.faqCta.cta}
      />
    </>
  );
}
