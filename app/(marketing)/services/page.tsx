import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { CTASection } from "@/components/marketing/CTASection";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Услуги — дизайн, разработка, поддръжка, SEO, реклама",
  description:
    "Уеб дизайн и разработка в Пловдив: сайтове по мярка, поддръжка според реалната нужда, локална SEO оптимизация и реклама след старта.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          eyebrow="Услуги"
          title="Не продаваме шаблони. Решаваме бизнес проблеми."
          lead="Всяка от услугите ни съществува с една цел: сайтът ви да носи измерими резултати. Ето какво включва всяка — на разбираем език."
        />
      </Section>

      {services.map((service, i) => (
        <Section key={service.id} id={service.id} bordered>
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
              <div>
                <service.icon className="size-8 text-gold" aria-hidden />
                <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium">{service.short}</p>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  {service.description.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <p className="mt-6 border-l-2 border-gold pl-4 text-sm text-muted-foreground">
                  {service.forWho}
                </p>
                <Link
                  href="/pricing"
                  className="mt-6 inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
                >
                  Вижте в кой пакет влиза
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>
      ))}

      <CTASection
        title="Не сте сигурни какво точно ви трябва?"
        body="Точно това изясняваме в опознавателния разговор — безплатно, без ангажимент и без технически жаргон."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
