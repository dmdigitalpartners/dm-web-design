import Link from "next/link";
import Image from "next/image";
import { footerColumns, bookCta } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-graphite">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/brand/logo-white-160.png"
                alt=""
                width={144}
                height={160}
                className="hidden h-9 w-auto dark:block"
              />
              <Image
                src="/images/brand/logo-dark-160.png"
                alt=""
                width={144}
                height={160}
                className="block h-9 w-auto dark:hidden"
              />
              <span className="font-heading font-bold">D&M Web Design</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Сайтове, които водят клиенти — стратегия, дизайн и доказани
              резултати за бизнеси в Пловдив и цяла България.
            </p>
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
          <p>© 2026 D&M Web Design · {siteConfig.city}, {siteConfig.country}</p>
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
