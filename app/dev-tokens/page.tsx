import { Button } from "@/components/ui/button";

// Temporary token-verification page — removed before deploy.
const swatches = [
  ["bg-carbon", "Carbon #0B0B0C"],
  ["bg-bone", "Bone #F7F5F1"],
  ["bg-gold", "Gold (mode-aware)"],
  ["bg-gold-raw", "Gold raw #B8935A"],
  ["bg-sage", "Sage (mode-aware)"],
  ["bg-graphite", "Graphite"],
  ["bg-warm-gray", "Warm Gray"],
] as const;

export default function DevTokensPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <section>
        <p className="text-sm uppercase tracking-widest text-gold">
          Проверка на дизайн системата
        </p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          Уеб, който продава — заглавие
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed">
          Основен текст на кирилица: Изработваме сайтове, които водят реални
          клиенти за малкия и средния бизнес в Пловдив.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Вторичен текст — подписи, метаданни, обяснения.
        </p>
        <p className="mt-2 text-4xl font-bold text-sage">3× повече покупки</p>
      </section>

      <section className="flex flex-wrap gap-4">
        <Button size="lg">Запазете безплатен разговор</Button>
        <Button variant="outline" size="lg">
          Вижте нашата работа
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-px border border-graphite bg-graphite sm:grid-cols-4">
        {swatches.map(([cls, label]) => (
          <div key={cls} className="bg-background p-4">
            <div className={`h-16 w-full border border-graphite ${cls}`} />
            <p className="mt-2 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="border border-graphite p-8">
        <h2 className="text-2xl font-bold">Карта с рамка (брутализъм)</h2>
        <p className="mt-2 text-muted-foreground">
          Остри ъгли, структурна линия, без орнаменти.
        </p>
      </section>
    </main>
  );
}
