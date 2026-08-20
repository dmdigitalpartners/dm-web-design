import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { CTASection } from "@/components/marketing/CTASection";
import { processSteps } from "@/lib/data/process-steps";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Как работим, демо преди договор",
  description:
    "Процесът на D&M Web Design: безплатен разговор, безплатно демо на началната ви страница, и чак тогава оферта. Виждате стойността, преди да платите.",
};

export default function ProcessPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Процес"
          title="Виждате резултата, преди да платите"
          lead="Повечето агенции искат договор, преди да видите каквото и да е. Ние обърнахме реда: първите три стъпки са изцяло безплатни и без ангажимент."
        />
      </Section>

      <Section bordered className="pt-12 md:pt-16">
        <ol className="relative max-w-3xl">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 pb-12 last:pb-0 md:gap-8">
              {/* timeline rail: gold through the free steps, graphite after */}
              {i < processSteps.length - 1 ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-5 top-12 h-full w-px md:left-6",
                    step.free && processSteps[i + 1].free ? "bg-gold/50" : "bg-graphite"
                  )}
                />
              ) : null}
              <span
                aria-hidden
                className={cn(
                  "z-10 flex size-10 shrink-0 items-center justify-center rounded-full border font-heading text-sm font-bold md:size-12",
                  step.free
                    ? "border-gold bg-gold text-primary-foreground shadow-gold"
                    : "border-graphite bg-card text-foreground"
                )}
              >
                {i + 1}
              </span>
              <Reveal className="flex-1 pt-1">
                <h2 className="font-heading text-xl font-bold md:text-2xl">
                  {step.title}
                </h2>
                <p
                  className={cn(
                    "mt-1 text-sm font-medium uppercase tracking-[0.15em]",
                    step.free ? "text-gold" : "text-muted-foreground"
                  )}
                >
                  {step.commitment}
                </p>
                <p className="mt-3 max-w-xl text-muted-foreground">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl border-l-2 border-gold pl-4">
          Стъпки 1–3 са безплатни и без ангажимент. Плащате едва когато сте
          видели демото и сте избрали пакет.
        </p>
      </Section>

      <CTASection
        title="Започнете с безплатния разговор"
        body="15–30 минути за вашия бизнес и целите ви. Ако не сме правилният партньор, ще ви го кажем честно."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
