import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/marketing/Reveal";

export function CTASection({
  title,
  body,
  cta,
  note,
}: {
  title: string;
  body: string;
  cta: string;
  note?: string;
}) {
  return (
    <Section bordered>
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{body}</p>
          <Button
            render={<Link href="/book-a-call" />}
            nativeButton={false}
            size="lg"
            className="mt-8 h-12 px-8 text-base"
          >
            {cta}
          </Button>
          {note ? (
            <p className="mt-3 text-sm text-muted-foreground">{note}</p>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
