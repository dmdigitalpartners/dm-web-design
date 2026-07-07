import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { CalBooking } from "@/components/marketing/CalBooking";
import { contactPage } from "@/lib/data/contact";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Запазете безплатен разговор",
  description:
    "Резервирайте безплатен 15–30 минутен опознавателен разговор с D&M Web Design — без ангажимент, с безплатно демо на началната ви страница след него.",
};

export default async function BookACallPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: packageId } = await searchParams;

  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          eyebrow={contactPage.booking.eyebrow}
          title={contactPage.booking.title}
          lead={contactPage.booking.lead}
        />
        <p className="mt-4 max-w-2xl border-l-2 border-gold pl-4 text-sm text-muted-foreground">
          {contactPage.booking.note}
        </p>
      </Section>
      <Section bordered className="pt-10 md:pt-12">
        <CalBooking packageId={packageId} />
        <p className="mt-8 text-sm text-muted-foreground">
          {contactPage.emailFallback}{" "}
          <a className="text-gold" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </p>
      </Section>
    </>
  );
}
