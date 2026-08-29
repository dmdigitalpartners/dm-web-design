import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { PackageChooser } from "@/components/marketing/PackageChooser";
import { CTASection } from "@/components/marketing/CTASection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { packages } from "@/lib/data/packages";
import { pricingPage } from "@/lib/data/pricing-page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Пакети за изработка на сайт",
  description:
    "Три пакета за изработка на сайт в Пловдив: Foundation, Growth и Authority. Ясен обхват и включени услуги, индивидуална оферта след безплатно демо, първи месец хостинг безплатен.",
};

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow={pricingPage.header.eyebrow}
          title={pricingPage.header.title}
          lead={pricingPage.header.lead}
        />
      </Section>

      {/* Decision aid, before the cards */}
      <Section bordered pad="compact">
        <PackageChooser />
      </Section>

      {/* Packages */}
      <Section bordered className="pt-12 md:pt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08} className="h-full">
              <article
                id={pkg.id}
                aria-label={`Пакет ${pkg.name}`}
                className={cn(
                  "relative flex h-full flex-col rounded-xl bg-card p-8 text-card-foreground",
                  pkg.recommended
                    ? "border-2 border-gold"
                    : "border border-graphite"
                )}
              >
                {pkg.recommended ? (
                  <p className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    {pricingPage.recommendedBadge}
                  </p>
                ) : null}
                <h2 className="font-heading text-2xl font-bold">{pkg.name}</h2>
                <p className="mt-2 text-muted-foreground">{pkg.positioning}</p>
                <p className="mt-6 border-l-2 border-gold pl-4 text-sm font-medium text-foreground">
                  {pricingPage.outcomes[pkg.id as keyof typeof pricingPage.outcomes]}
                </p>
                <p className="mt-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Идеален за
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{pkg.audience}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Какво включва
                </p>
                <ul className="mt-3 flex-1 space-y-3">
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
                  variant={pkg.recommended ? "cta" : "outline"}
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
          Всеки пакет може да се разшири или свие според нуждите ви. Индивидуална
          оферта получавате след безплатното демо, без ангажимент.
        </p>
      </Section>

      {/* Comparison */}
      <Section bordered>
        <SectionHeading title={pricingPage.comparison.title} />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-graphite text-left">
                <th className="py-3 pr-4 font-medium text-muted-foreground"></th>
                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className={cn(
                      "py-3 pr-4 font-heading text-base font-bold",
                      pkg.recommended && "text-gold"
                    )}
                  >
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingPage.comparison.rows.map((row) => (
                <tr key={row.label} className="border-b border-graphite/60">
                  <th
                    scope="row"
                    className="py-3 pr-4 text-left font-medium text-muted-foreground"
                  >
                    {row.label}
                  </th>
                  <td className="py-3 pr-4">{row.foundation}</td>
                  <td className="py-3 pr-4">{row.growth}</td>
                  <td className="py-3 pr-4">{row.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* FAQ */}
      <Section bordered>
        <SectionHeading
          eyebrow={pricingPage.faq.eyebrow}
          title={pricingPage.faq.title}
        />
        <div className="mt-8 max-w-3xl">
          <Accordion>
            {pricingPage.faq.items.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="py-4 text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <CTASection
        title={pricingPage.faqCta.title}
        body={pricingPage.faqCta.body}
        cta={pricingPage.faqCta.cta}
        location="pricing-final"
      />
    </>
  );
}
