import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { home } from "@/lib/data/home";

/**
 * A full-bleed band containing one sentence and nothing else.
 *
 * Its job in the page is rhythmic: it sits between the visual proof and the
 * scannable service index, and resets the reader's attention with a change of
 * ground colour, a change of measure, and the only centred composition on the
 * page. No eyebrow, no lead, no cards, no button — the section is the sentence.
 */
export function StatementBand() {
  return (
    <Section tone="well" width="full" pad="expansive" bordered>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-balance text-center font-heading text-display">
            {home.statement.text}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
