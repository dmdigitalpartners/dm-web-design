"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
          scrolled ? "h-14" : "h-20"
        )}
      >
        <Link href="/" className="flex items-center gap-3" aria-label="D&M Web Design — начало">
          <Image
            src="/images/brand/logo-white-160.png"
            alt=""
            width={144}
            height={160}
            className={cn(
              "w-auto transition-all duration-300 dark:block hidden",
              scrolled ? "h-8" : "h-10"
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
              scrolled ? "h-8" : "h-10"
            )}
            priority
          />
          <span className="font-heading text-lg font-bold tracking-tight">
            D&M Web Design
          </span>
        </Link>

        <nav aria-label="Основна навигация" className="hidden items-center gap-8 md:flex">
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
          <Button
            render={<Link href={bookCta.href} />}
            nativeButton={false}
            size={scrolled ? "default" : "lg"}
          >
            {bookCta.label}
          </Button>
        </nav>

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
              <Button
                render={<Link href={bookCta.href} />}
                nativeButton={false}
                size="lg"
                className="mt-6"
              >
                {bookCta.label}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
