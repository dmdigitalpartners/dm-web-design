import Image from "next/image";
import { cn } from "@/lib/utils";

/** Minimal browser-chrome frame — flat, single-weight, no skeuomorphism. */
export function DeviceFrame({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden border border-graphite bg-card", className)}>
      <div
        aria-hidden
        className="flex items-center gap-1.5 border-b border-graphite px-4 py-2.5"
      >
        <span className="size-2 rounded-full bg-graphite" />
        <span className="size-2 rounded-full bg-graphite" />
        <span className="size-2 rounded-full bg-graphite" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        priority={priority}
        className="w-full"
        sizes="(max-width: 768px) 100vw, 640px"
      />
    </figure>
  );
}
