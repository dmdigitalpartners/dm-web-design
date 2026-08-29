import { cardSurface } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * One purpose-built visual per service.
 *
 * The services page previously gave each service a full one-third-width column
 * containing a 24px icon, and carried every idea in two dense paragraphs — no
 * images anywhere on the page. These fill that column with something that
 * actually explains the service.
 *
 * They are composed from the design system itself: brand tokens, hairlines and
 * type, no raster assets. That keeps them inside `img-src 'self'`, adds no
 * dependency, and makes the page look like the thing it is selling.
 *
 * Deliberately carrying no numbers. A load-time chart or an uptime graph would
 * mean inventing figures about a real business, which AGENTS.md forbids — so
 * each visual shows a *structure* rather than a claimed measurement.
 */

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        cardSurface,
        "flex aspect-4/3 w-full flex-col overflow-hidden p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A stand-in for a line of body copy. */
function Bar({ w, className }: { w: string; className?: string }) {
  return (
    <span
      className={cn("block h-1.5 rounded-full bg-warm-gray/25", className)}
      style={{ width: w }}
    />
  );
}

function TypeSpecimen() {
  return (
    <Frame className="justify-center">
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-6xl font-bold leading-none">Аа</span>
        <span className="text-xs uppercase tracking-eyebrow text-gold">
          Inter Tight
        </span>
      </div>
      <div className="mt-6 space-y-3 border-t border-graphite pt-5">
        <p className="font-heading text-xl font-bold leading-none">Заглавие</p>
        <p className="font-heading text-base font-bold leading-none text-muted-foreground">
          Подзаглавие
        </p>
        <Bar w="100%" />
        <Bar w="72%" />
      </div>
    </Frame>
  );
}

function ResponsiveFrames() {
  const chrome = (
    <span className="flex gap-1 border-b border-graphite px-2 py-1.5">
      <span className="size-1 rounded-full bg-graphite" />
      <span className="size-1 rounded-full bg-graphite" />
    </span>
  );

  return (
    <Frame className="justify-center">
      <div className="flex items-end justify-center gap-3">
        {/* desktop */}
        <div className="flex-1 overflow-hidden rounded-md border border-gold/40">
          {chrome}
          <div className="space-y-1.5 p-2">
            <Bar w="80%" className="bg-gold/50" />
            <Bar w="100%" />
            <Bar w="60%" />
          </div>
        </div>
        {/* tablet */}
        <div className="w-1/4 overflow-hidden rounded-md border border-graphite">
          {chrome}
          <div className="space-y-1.5 p-2">
            <Bar w="90%" className="bg-gold/50" />
            <Bar w="70%" />
          </div>
        </div>
        {/* phone */}
        <div className="w-[15%] overflow-hidden rounded-md border border-graphite">
          {chrome}
          <div className="space-y-1.5 p-1.5">
            <Bar w="100%" className="bg-gold/50" />
            <Bar w="80%" />
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-eyebrow text-muted-foreground">
        Един сайт · всеки екран
      </p>
    </Frame>
  );
}

function ScopeDial() {
  const tiers = ["Лека", "Средна", "Активна"];
  return (
    <Frame className="justify-center">
      <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
        Обхват
      </p>
      <div className="mt-5 flex gap-1.5">
        {tiers.map((t, i) => (
          <span
            key={t}
            className={cn(
              "h-2 flex-1 rounded-full",
              i === 0 ? "bg-gold" : "bg-graphite",
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {tiers.map((t, i) => (
          <span
            key={t}
            className={cn(
              "text-xs",
              i === 0 ? "font-medium text-gold" : "text-muted-foreground",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-8 border-t border-graphite pt-5 text-xs leading-relaxed text-muted-foreground">
        Цената следва обхвата, не обратното.
      </p>
    </Frame>
  );
}

function SerpMock() {
  return (
    <Frame>
      {/* Search field */}
      <div className="flex items-center gap-2 rounded-full border border-graphite px-3 py-2">
        <span className="size-3 shrink-0 rounded-full border-2 border-muted-foreground" />
        <span className="truncate text-xs text-muted-foreground">
          гръцки ресторант Пловдив
        </span>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-lg border border-gold/40 bg-gold/[0.04] p-3">
        <p className="text-sm font-medium text-gold">Tavernaki · Пловдив</p>
        <p className="mt-1 text-[10px] text-sage">tavernaki.bg</p>
        <div className="mt-2 space-y-1.5">
          <Bar w="100%" />
          <Bar w="65%" />
        </div>
      </div>

      {/* Also-rans */}
      <div className="mt-3 space-y-3 opacity-40">
        <div className="space-y-1.5">
          <Bar w="45%" className="bg-warm-gray/40" />
          <Bar w="85%" />
        </div>
        <div className="space-y-1.5">
          <Bar w="38%" className="bg-warm-gray/40" />
          <Bar w="75%" />
        </div>
      </div>
    </Frame>
  );
}

function TrafficChannels() {
  const channels = ["Търсене", "Социални", "Локално"];
  return (
    <Frame className="justify-center">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-col gap-2">
          {channels.map((c) => (
            <span
              key={c}
              className="rounded-full border border-graphite px-3 py-1.5 text-center text-xs text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Converging rules */}
        <svg
          viewBox="0 0 40 80"
          className="h-20 w-10 shrink-0 text-gold/50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M0 12 C 24 12, 20 40, 40 40" />
          <path d="M0 40 H 40" />
          <path d="M0 68 C 24 68, 20 40, 40 40" />
        </svg>

        <div className="flex-1 overflow-hidden rounded-md border border-gold/40">
          <span className="flex gap-1 border-b border-graphite px-2 py-1.5">
            <span className="size-1 rounded-full bg-graphite" />
            <span className="size-1 rounded-full bg-graphite" />
          </span>
          <div className="space-y-1.5 p-2">
            <Bar w="70%" className="bg-gold/50" />
            <Bar w="100%" />
            <Bar w="55%" />
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-eyebrow text-muted-foreground">
        Трафик · към сайта
      </p>
    </Frame>
  );
}

const visuals: Record<string, () => React.ReactElement> = {
  design: TypeSpecimen,
  development: ResponsiveFrames,
  maintenance: ScopeDial,
  seo: SerpMock,
  advertising: TrafficChannels,
};

export function ServiceVisual({ id }: { id: string }) {
  const Visual = visuals[id];
  return Visual ? <Visual /> : null;
}
