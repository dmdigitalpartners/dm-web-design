export const home = {
  hero: {
    eyebrow: "Уеб студио · Пловдив",
    // Outcome-focused per PAGE_SPECIFICATIONS: clients, not "modern websites"
    headline: "Сайтове, които ви носят клиенти.",
    subheadline:
      "Стратегия + дизайн + доказателство: изграждаме безплатно демо на вашата начална страница, преди да сте платили каквото и да е.",
    primaryCta: "Запазете безплатен разговор",
    secondaryCta: "Вижте нашата работа",
  },
  /*
    Replaces the old proofStrip, which animated „3×“ and „15+“ beside a stat that
    had no number at all (value: null, suffix: "↑") — a stat row with a missing
    stat. Those figures are unfalsifiable and were restated four times across the
    site; they now live only on the case-study pages that can substantiate them.

    What sits here instead is what a visitor can actually go and check: how long
    each business has traded, who it represents, how many public reviews it has.
    Every fact below is already stated in lib/data/case-studies.ts.
  */
  proofBand: {
    label: "Реални бизнеси от Пловдив",
    clients: [
      {
        slug: "maxterm",
        client: "Maxterm",
        industry: "Бои и строителни материали",
        credential:
          "Официално представителство на Benjamin Moore и над 20 водещи марки, два обекта в Пловдив.",
        outcome: "От шаблон без структура към ясен път до покупка.",
      },
      {
        slug: "skat-print",
        client: "Skat Print",
        industry: "Опаковки и печат",
        credential:
          "Производител на опаковки от 1995 г. 30+ години на пазара, 100+ активни клиенти.",
        outcome: "От една страница към структуриран сайт с ясно запитване.",
      },
      {
        slug: "tavernaki",
        client: "Tavernaki",
        industry: "Ресторант, гръцка кухня",
        credential: "637+ отзива в Google Maps.",
        outcome: "От никакво онлайн присъствие към дигитално меню и резервации.",
      },
    ],
    linkLabel: "Вижте проекта",
  },
  differentiator: {
    eyebrow: "Защо демо преди договор",
    title: "Повечето агенции обещават. Ние първо показваме.",
    body: [
      "Познавате историята: агенция обещава „модерен сайт с невероятни резултати“, взима аванс и чак тогава разбирате какво всъщност получавате. Или обратното, толкова ниска цена, че после плащате двойно за поправки.",
      "Затова обърнахме процеса. Първо разговаряме за вашия бизнес. После изграждаме реален дизайн на вашата начална страница, безплатно. Ако видите стойност, продължаваме. Ако не, не сте загубили нищо.",
    ],
    linkLabel: "Вижте как работим",
  },
  /*
    Replaces whyCompare, which stated a *sequence* as two lists of claims and
    left the visitor to reconstruct the timeline themselves.

    Both tracks carry the same two markers — the point you pay, and the point
    you first see real work — and the markers swap order between them. That
    inversion is the entire pitch, and as a diagram it reads in one look.
  */
  processCompare: {
    usual: {
      label: "Обичайният процес",
      steps: [
        { label: "Оферта и договор" },
        { label: "Плащате аванс", mark: "payment" },
        { label: "Чакате" },
        { label: "Виждате сайта за пръв път", mark: "reveal" },
        { label: "Поправки и допълнителни такси" },
      ],
    },
    dm: {
      label: "Процесът на D&M",
      steps: [
        { label: "Разговор за бизнеса", free: true },
        { label: "Изграждаме безплатно демо", free: true },
        { label: "Виждате реалния дизайн", mark: "reveal", free: true },
        { label: "Плащате", mark: "payment" },
        { label: "Изграждане и старт" },
      ],
    },
    markLabels: {
      payment: "Плащане",
      reveal: "Виждате",
    },
    freeLabel: "Безплатно, без ангажимент",
  },
  featuredWork: {
    eyebrow: "Проекти",
    title: "Работа, която се измерва в резултати",
    lead: "Три реални бизнеса от Пловдив, три измерими резултата.",
  },
  servicesOverview: {
    eyebrow: "Услуги",
    title: "Всичко, което сайтът ви изисква, на едно място",
  },
  pricingTeaser: {
    eyebrow: "Цени",
    title: "Прозрачни пакети, без скрити такси",
    lead: "Три нива според целите ви, всяко с ясен обхват и честна цена.",
    linkLabel: "Вижте пълните цени",
  },
  aboutStrip: {
    title: "Двама основатели от Пловдив, които мислят като вашия бизнес",
    body: "Даниел Янчев и Мартин Станкин основаха D&M с просто убеждение: качественият уеб дизайн не трябва да струва колкото малък автомобил, а сайтът е инструмент за резултати, не украшение.",
    linkLabel: "Запознайте се с нас",
  },
  /*
    The promise, made once. „Безплатно демо, преди да платите“ was previously
    stated eleven times on this one page — navbar, hero, a trust card, this
    section's old title and body, three comparison rows, and twice in the footer.
    Saying a thing eleven times is what you do when you are not sure it lands.
    It is said here, at display scale, and nowhere else on the page.
  */
  statement: {
    text: "Вижте дизайна на вашия сайт, преди да платите каквото и да е.",
  },

  finalCta: {
    title: "Да започнем с разговор.",
    body: "Разказвате ни за бизнеса си, ние изграждаме демо. Решавате, след като го видите.",
    cta: "Запазете безплатен разговор",
    note: "15–30 минути · онлайн или на място в Пловдив",
    stepsLabel: "Какво следва",
  },
} as const;
