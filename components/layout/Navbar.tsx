"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCta } from "@/components/marketing/BookCta";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, bookCta } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-all",
        scrolled ? "border-graphite" : "border-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 transition-all duration-300",
          scrolled ? "h-16" : "h-24"
        )}
      >
        {/* Logo, left, the sole brand identifier (no wordmark) */}
        <Link
          href="/"
          className="justify-self-start"
          aria-label="D&M Web Design, начало"
        >
          <Image
            src="/images/brand/logo-white-160.png"
            alt=""
            width={144}
            height={160}
            className={cn(
              "w-auto transition-all duration-300 dark:block hidden",
              scrolled ? "h-10" : "h-14"
            )}
            priority
          />
          <Image
            src="/images/brand/logo-dark-160.png"
            alt=""
            width={144}
            height={160}
            className={cn(
              "w-auto transition-all duration-300 dark:hidden block",
              scrolled ? "h-10" : "h-14"
            )}
            priority
          />
        </Link>

        {/* Navigation, centered */}
        <nav
          aria-label="Основна навигация"
          className="hidden items-center gap-9 justify-self-center md:flex"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm transition-colors hover:text-gold",
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "text-gold"
                  : "text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right column: desktop CTA + mobile menu trigger */}
        <div className="justify-self-end">
          <div className="hidden md:block">
            <BookCta
              location="nav"
              label={bookCta.label}
              size={scrolled ? "default" : "lg"}
              attract
            />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button variant="outline" size="icon" aria-label="Отвори менюто" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-heading">Меню</SheetTitle>
            </SheetHeader>
            <nav aria-label="Мобилна навигация" className="flex flex-col gap-1 px-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "border-b border-graphite py-3 text-lg",
                    pathname === href ? "text-gold" : "text-foreground"
                  )}
                >
                  {label}
                </Link>
              ))}
              <BookCta
                location="mobile-nav"
                label={bookCta.labelLong}
                size="xl"
                className="mt-6"
              />
            </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
