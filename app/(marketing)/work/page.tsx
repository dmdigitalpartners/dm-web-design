import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CTASection } from "@/components/marketing/CTASection";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Проекти — реални резултати за реални бизнеси",
  description:
    "Портфолио на D&M Web Design: Maxterm (3× повече покупки), Skat Print (повече запитвания), Tavernaki (15+ нови клиенти месечно). Уеб дизайн Пловдив.",
};

export default function WorkPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          eyebrow="Проекти"
          title="Работа, която се измерва в резултати"
          lead="Нямаме нужда да ви убеждаваме с прилагателни. Ето три реални бизнеса, три реални проекта и три измерими резултата."
        />
      </Section>
      <Section bordered className="pt-12 md:pt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection
        title="Искате резултати като тези?"
        body="Започваме с безплатен разговор и демо на вашата начална страница — виждате посоката, преди да решите."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
