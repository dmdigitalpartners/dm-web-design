export type Testimonial = {
  quote: string;
  author: string;
  company: string;
  /** Marks sample copy so it is clearly labelled until real quotes arrive. */
  placeholder?: boolean;
};

// NOTE: placeholder copy. Swap `quote`/`author` for real client words and drop
// the `placeholder` flag, the UI hides the "sample" label automatically.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Видяхме дизайна на началната си страница още преди да платим. Това реши всичко. Днес сайтът носи осезаемо повече покупки.",
    author: "Собственик",
    company: "Maxterm",
    placeholder: true,
  },
  {
    quote:
      "Работеха бързо и ясно. Новият сайт най-накрая обяснява какво правим, а запитванията се увеличиха.",
    author: "Управител",
    company: "Skat Print",
    placeholder: true,
  },
  {
    quote:
      "Нямахме никакво онлайн присъствие. Сега нови клиенти ни намират всяка седмица и резервират маса директно от сайта.",
    author: "Собственик",
    company: "Tavernaki",
    placeholder: true,
  },
];
