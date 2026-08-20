import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { footerColumns, bookCta } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site-config";

// Brand marks as inline SVG (lucide dropped brand icons). Rendered only when a
// real profile URL exists in siteConfig.social.
function IgIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}
function InIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.5h3v12h-3v-12zm5 0h2.9v1.6h.04c.4-.75 1.4-1.6 2.96-1.6 3.16 0 3.6 2 3.6 4.7v7.3h-3v-6.5c0-1.55-.03-3.5-2.1-3.5-2.1 0-2.4 1.65-2.4 3.4v6.6h-3v-12z" />
    </svg>
  );
}

const socialLinks = [
  { key: "instagram", href: siteConfig.social.instagram, label: "Instagram", Icon: IgIcon },
  { key: "facebook", href: siteConfig.social.facebook, label: "Facebook", Icon: FbIcon },
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn", Icon: InIcon },
].filter((s) => s.href);

export function Footer() {
  // `as const` narrows these to the empty-string literal; widen to string so the
  // "render when present" conditionals type-check once real values are set.
  const phone = siteConfig.phone as string;
  return (
    <footer className="border-t border-graphite">
      {/* Subtle closing CTA */}
      <div className="border-b border-graphite">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-lg font-bold sm:text-xl">
            Готови да видите демо на вашия сайт?
          </p>
          <Link
            href={bookCta.href}
            className="inline-flex items-center gap-1.5 font-medium text-gold transition-colors hover:text-gold-bright"
          >
            {bookCta.labelLong}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/brand/logo-white-160.png"
                alt=""
                width={144}
                height={160}
                className="hidden h-10 w-auto dark:block"
              />
              <Image
                src="/images/brand/logo-dark-160.png"
                alt=""
                width={144}
                height={160}
                className="block h-10 w-auto dark:hidden"
              />
              <span className="font-heading font-bold">D&M Web Design</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Сайтове, които водят клиенти. Стратегия, дизайн и доказани
              резултати за бизнеси в Пловдив и цяла България.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Безплатно демо · Първи месец хостинг безплатен
            </p>
            {socialLinks.length > 0 ? (
              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-lg border border-graphite text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Контакт">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
              Контакт
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
              {phone ? (
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
              <li className="text-sm text-muted-foreground">
                {siteConfig.city}, {siteConfig.country}
              </li>
              <li>
                <Link
                  href={bookCta.href}
                  className="text-sm text-gold transition-colors hover:text-gold-bright"
                >
                  {bookCta.label} →
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-graphite pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} D&M Web Design · {siteConfig.city}, {siteConfig.country}
          </p>
          <p className="flex gap-4">
            <Link href="/legal/privacy" className="transition-colors hover:text-gold">
              Поверителност
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-gold">
              Условия
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
