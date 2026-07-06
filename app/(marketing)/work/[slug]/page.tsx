import { notFound } from "next/navigation";

const slugs = ["maxterm", "skat-print", "tavernaki"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-bold">{slug}</h1>
    </section>
  );
}
