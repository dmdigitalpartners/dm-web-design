import Image from "next/image";
import { founders } from "@/lib/data/team";
import { about } from "@/lib/data/about";
import { cardSurface } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * The two founders, with their portraits at a size worth having.
 *
 * They were previously rendered 128–160px wide from 900×1200 sources — cropped
 * to postage stamps on a page whose job is to make two people trustworthy. Now
 * the portrait leads the card and the text sits beneath it.
 */
export function Founders() {
  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {founders.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.08} className="h-full">
            <div className={cn(cardSurface, "flex h-full flex-col overflow-hidden")}>
              <Image
                src={f.portrait}
                alt={`${f.name}, ${f.role}`}
                width={900}
                height={1200}
                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1200px) calc(50vw - 3rem), 540px"
                className="aspect-3/4 w-full object-cover object-top"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-bold">{f.name}</h3>
                <p className="mt-1 text-sm font-medium text-gold">{f.role}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {f.titles}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {f.bio}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/*
        Why two founders is a real structural advantage over a larger agency —
        design and engineering in one room, no handoff, no account manager —
        and it was not stated anywhere on the site.
      */}
      <Reveal delay={0.16}>
        <p className="mt-8 border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground">
          {about.whyTwo}
        </p>
      </Reveal>
    </>
  );
}
