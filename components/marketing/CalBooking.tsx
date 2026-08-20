"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Cal.com embedded booking calendar, themed to the brand. Falls back to a
 * plain contact prompt until NEXT_PUBLIC_CAL_LINK is configured.
 */
export function CalBooking({ packageId }: { packageId?: string }) {
  useEffect(() => {
    if (!siteConfig.calLink) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#b8935a" },
          light: { "cal-brand": "#80622f" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  if (!siteConfig.calLink) {
    return (
      <div className="rounded-xl border border-graphite bg-card p-8 text-center text-card-foreground">
        <p className="text-muted-foreground">
          Календарът за резервации се активира съвсем скоро. Междувременно ни
          пишете на{" "}
          <a className="text-gold" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>{" "}
        , отговаряме до един работен ден.
        </p>
      </div>
    );
  }

  return (
    <Cal
      calLink={siteConfig.calLink}
      config={{
        theme: "dark", ...(packageId ? { notes: `Интерес към пакет: ${packageId}` } : {}),
      }}
      style={{ width: "100%", minHeight: "640px" }}
    />
  );
}
