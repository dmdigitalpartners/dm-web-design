import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { CTASection } from "@/components/marketing/CTASection";
import { about } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "За нас — Даниел Янчев и Мартин Станкин",
  description:
    "D&M Web Design е уеб студио от Пловдив, основано от Даниел Янчев и Мартин Станкин. Стратегия преди дизайн, доказателство преди обещания.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
          {about.story.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Founders */}
      <Section bordered>
        <SectionHeading eyebrow="Екип" title="Основателите" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {about.founders.map((founder) => (
            <Reveal key={founder.name}>
              <article className="h-full border border-graphite bg-card p-8">
                <h3 className="font-heading text-xl font-bold">{founder.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.15em] text-gold">
                  {founder.role}
                </p>
                <p className="mt-4 text-muted-foreground">{founder.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section bordered>
        <SectionHeading eyebrow={about.values.eyebrow} title={about.values.title} />
        <div className="mt-10 grid gap-px border border-graphite bg-graphite sm:grid-cols-2">
          {about.values.items.map((value) => (
            <div key={value.title} className="bg-background p-8">
              <h3 className="font-heading text-lg font-bold">{value.title}</h3>
              <p className="mt-2 text-muted-foreground">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Local */}
      <Section bordered>
        <Reveal>
          <SectionHeading eyebrow={about.local.eyebrow} title={about.local.title} />
          <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
            {about.local.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Преценете ни по работата, не по думите"
        body="Разгледайте проектите ни — или направо запазете разговор и вижте безплатно демо за вашия бранд."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
