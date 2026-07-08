import { track } from "@vercel/analytics";

/**
 * Thin wrapper over Vercel Analytics custom events so conversion tracking is
 * centralized and typed. Fire these on the site's key funnel actions.
 */
export type AnalyticsEvent =
  | "book_cta_click"
  | "book_page_view"
  | "contact_submit"
  | "package_select"
  | "work_view";

export function trackEvent(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean | null>
) {
  track(event, props);
}
