import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CTASection } from "@/components/marketing/CTASection";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Проекти, реални резултати за реални бизнеси",
  description:
    "Портфолио на D&M Web Design: Maxterm (3× повече покупки), Skat Print (повече запитвания), Tavernaki (15+ нови клиенти месечно). Уеб дизайн Пловдив.",
};

export default function WorkPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Проекти"
          title="Работа, която се измерва в резултати"
          lead="Нямаме нужда да ви убеждаваме с прилагателни. Ето три реални бизнеса, три реални проекта и три измерими резултата."
        />
      </Section>
      <Section bordered className="pt-12 md:pt-16">
        {/* No Reveal here: the grid is above the fold and its first image is
            the page's LCP, JS-gated fades delay the recorded paint. */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <CaseStudyCard study={caseStudies[0]} priority featured />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {caseStudies.slice(1).map((study) => (
              <CaseStudyCard key={study.slug} study={study} priority />
            ))}
          </div>
        </div>
      </Section>
      <CTASection
        title="Искате резултати като тези?"
        body="Започваме с безплатен разговор и демо на вашата начална страница, виждате посоката, преди да решите."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
