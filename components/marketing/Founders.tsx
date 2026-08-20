import Image from "next/image";
import { founders } from "@/lib/data/team";
import { Reveal } from "./Reveal";

/**
 * Founder cards with real portraits and differentiated roles. Used on the home
 * page (compact) and the About page.
 */
export function Founders() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {founders.map((f, i) => (
        <Reveal key={f.name} delay={i * 0.08}>
          <div className="flex h-full gap-5 rounded-xl border border-graphite bg-card p-6 text-card-foreground">
            <Image
              src={f.portrait}
              alt={`${f.name}, ${f.role}`}
              width={900}
              height={1200}
              sizes="(max-width: 640px) 8rem, 10rem"
              className="h-40 w-32 shrink-0 rounded-xl object-cover object-top sm:h-48 sm:w-40"
            />
            <div className="min-w-0">
              <h3 className="font-heading text-lg font-bold">{f.name}</h3>
              <p className="mt-1 text-sm font-medium text-gold">{f.role}</p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {f.titles}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.bio}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
