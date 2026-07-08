import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { Founders } from "@/components/marketing/Founders";
import { CTASection } from "@/components/marketing/CTASection";
import { about } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "За нас, Даниел Янчев и Мартин Станкин",
  description:
    "D&M Web Design е уеб студио от Пловдив, основано от Даниел Янчев и Мартин Станкин. Стратегия преди дизайн, доказателство преди обещания.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow={about.story.eyebrow}
          title={about.story.title}
        />
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
          {about.story.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Founders */}
      <Section bordered>
        <SectionHeading
          eyebrow="Екип"
          title="Двама основатели, две ясни роли"
          lead="Всеки проект минава през двама ни. Даниел води техническото изпълнение, Мартин, визуалната посока, а стратегията правим заедно, с вас."
        />
        <Founders />
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
        body="Разгледайте проектите ни, или направо запазете разговор и вижте безплатно демо за вашия бранд."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
