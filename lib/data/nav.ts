export const navLinks = [
  { href: "/work", label: "Проекти" },
  { href: "/services", label: "Услуги" },
  { href: "/pricing", label: "Цени" },
  { href: "/process", label: "Процес" },
  { href: "/about", label: "За нас" },
] as const;

export const bookCta = { href: "/book-a-call", label: "Запази разговор" } as const;

export const footerColumns = [
  {
    title: "Проекти",
    links: [
      { href: "/work/maxterm", label: "Maxterm" },
      { href: "/work/skat-print", label: "Skat Print" },
      { href: "/work/tavernaki", label: "Tavernaki" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { href: "/services#design", label: "Уеб дизайн" },
      { href: "/services#development", label: "Разработка" },
      { href: "/services#maintenance", label: "Поддръжка" },
      { href: "/services#seo", label: "SEO" },
      { href: "/services#advertising", label: "Реклама" },
    ],
  },
  {
    title: "Студио",
    links: [
      { href: "/about", label: "За нас" },
      { href: "/process", label: "Как работим" },
      { href: "/pricing", label: "Цени" },
    ],
  },
] as const;
