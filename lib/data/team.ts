export type Founder = {
  name: string;
  role: string;
  titles: string;
  bio: string;
  portrait: string;
};

export const founders: Founder[] = [
  {
    name: "Даниел Янчев",
    role: "Съосновател · Lead Developer",
    titles: "Технически архитект · UI инженер",
    bio: "Отговаря за разработката и техническото изпълнение на всеки проект, от архитектурата до последния детайл. Води технологичните решения и работи директно с клиентите по стратегията.",
    portrait: "/images/team/daniel-portrait.webp",
  },
  {
    name: "Мартин Станкин",
    role: "Съосновател · Lead Designer",
    titles: "Визуален и бранд дизайнер",
    bio: "Отговаря за визуалната посока, брандинга и излъчването на всеки проект. Превръща целите на бизнеса в дизайн, който продава, и работи директно с клиентите по стратегията.",
    portrait: "/images/team/martin-portrait.webp",
  },
];
