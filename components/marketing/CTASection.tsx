import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";
import { BookCta } from "@/components/marketing/BookCta";

export function CTASection({
  title,
  body,
  cta,
  note,
  location = "cta-section",
}: {
  title: string;
  body: string;
  cta: string;
  note?: string;
  location?: string;
}) {
  return (
    <Section bordered>
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{body}</p>
          <div className="mt-8 flex justify-center">
            <BookCta location={location} label={cta} attract />
          </div>
          {note ? (
            <p className="mt-3 text-sm text-muted-foreground">{note}</p>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
