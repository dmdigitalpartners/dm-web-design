import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { ServiceVisual } from "@/components/marketing/ServiceVisual";
import { CTASection } from "@/components/marketing/CTASection";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Услуги, дизайн, разработка, поддръжка, SEO, реклама",
  description:
    "Уеб дизайн и разработка в Пловдив: сайтове по мярка, поддръжка според реалната нужда, локална SEO оптимизация и реклама след старта.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Услуги"
          title="Не продаваме шаблони. Решаваме бизнес проблеми."
          lead="Всяка от услугите ни съществува с една цел: сайтът ви да носи измерими резултати. Ето какво включва всяка, на разбираем език."
        />
      </Section>

      {services.map((service, i) => (
        <Section
          key={service.id}
          id={service.id}
          bordered
          className={i % 2 === 1 ? "bg-secondary" : undefined}
        >
          <Reveal>
            {/*
              Zigzag: the visual alternates sides row to row, so five services
              do not read as five identical rows. It occupies the column that
              previously held a 24px icon and nothing else.
            */}
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                <ServiceVisual id={service.id} />
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : undefined}>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 text-gold">
                    <service.icon className="size-5" aria-hidden />
                  </span>
                  <p className="text-sm font-medium uppercase tracking-eyebrow text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </p>
                </div>

                <h2 className="mt-5 font-heading text-title font-bold">
                  {service.title}
                </h2>
                <p className="mt-3 text-lg font-medium">{service.short}</p>
                <p className="mt-4 text-muted-foreground">
                  {service.description}
                </p>
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
        body="Точно това изясняваме в опознавателния разговор, безплатно, без ангажимент и без технически жаргон."
        cta="Запазете безплатен разговор"
      />
    </>
  );
}
