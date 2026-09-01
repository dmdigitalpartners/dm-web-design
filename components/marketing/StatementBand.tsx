import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { BookCta } from "./BookCta";
import { home } from "@/lib/data/home";

/**
 * A full-bleed band containing one sentence, and now one button.
 *
 * Its job in the page is rhythmic: it sits between the visual proof and the
 * scannable service index, and resets the reader's attention with a change of
 * ground colour, a change of measure, and the only centred composition on the
 * page.
 *
 * It shipped with no call to action, on the theory that the restraint was the
 * point. Blind testing disagreed: this is the most convinced any tester reported
 * being on the whole page, and there was nothing to click. One button does not
 * undo the restraint.
 */
export function StatementBand() {
  return (
    <Section tone="well" width="full" pad="expansive" bordered>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-balance text-center font-heading text-display">
            {home.statement.text}
          </p>
          <div className="mt-10 flex justify-center">
            <BookCta location="statement-band" label={home.statement.cta} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
