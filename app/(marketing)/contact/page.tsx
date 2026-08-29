import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { ContactForm } from "@/components/marketing/ContactForm";
import { LocalBusinessJsonLd } from "@/components/marketing/LocalBusinessJsonLd";
import { cardSurface } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { contactPage } from "@/lib/data/contact";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Свържете се с D&M Web Design, уеб студио в Пловдив. Контактна форма, имейл или директна резервация на безплатен опознавателен разговор.",
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow={contactPage.header.eyebrow}
          title={contactPage.header.title}
          lead={contactPage.header.lead}
        />
      </Section>
      <Section bordered className="pt-12 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold">{contactPage.form.title}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="space-y-8 lg:pl-8">
            <div className="rounded-xl border border-gold bg-card p-8 text-card-foreground">
              <h2 className="font-heading text-xl font-bold">
                {contactPage.booking.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{contactPage.booking.lead}</p>
              <Link
                href="/book-a-call"
                className="mt-5 inline-flex items-center gap-1.5 font-medium text-gold transition-colors hover:text-gold-bright"
              >
                Изберете свободен час
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className={cn(cardSurface, "p-8")}>
              <h2 className="font-heading text-lg font-bold">
                {contactPage.emailFallback}
              </h2>
              <a
                className="mt-2 block break-all text-gold transition-colors hover:text-gold-bright"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
