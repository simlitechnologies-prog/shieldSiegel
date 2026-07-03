import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { AttorneyCard } from "@/components/cards/attorney-card";
import { practiceAreas, getPracticeAreaBySlug } from "@/data/practice-areas";
import { attorneys } from "@/data/attorneys";
import { getIcon } from "@/lib/icon-map";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return practiceAreas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);
  if (!area) return {};

  return {
    title: area.title,
    description: area.shortDescription,
    alternates: { canonical: `/practice-areas/${area.slug}` },
    openGraph: {
      title: area.title,
      description: area.shortDescription,
    },
  };
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) notFound();

  const Icon = getIcon(area.icon);
  const related = attorneys
    .filter((a) => a.practiceAreas.includes(area.slug))
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden bg-[var(--color-navy)] py-20 lg:py-28">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.15),_transparent_55%)]"
          />

          <div className="relative mx-auto max-w-4xl px-6 text-center text-white">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-gold)]">
              <Icon className="h-8 w-8" />
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold sm:text-5xl">
              {area.title}
            </h1>

            <p className="mt-5 text-white/70">{area.shortDescription}</p>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-3 lg:px-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-semibold text-[var(--color-navy)]">
                Überblick
              </h2>

              <p className="mt-4 leading-relaxed text-[var(--color-slate)]">
                {area.description}
              </p>

              <h3 className="mt-10 font-display text-xl font-semibold text-[var(--color-navy)]">
                So unterstützen wir Sie
              </h3>

              <ul className="mt-4 space-y-3">
                {[
                  "Erstberatung und Entwicklung einer individuellen Strategie",
                  "Erstellung und Verhandlung rechtlicher Dokumente",
                  "Vertretung bei Anhörungen und vor Gericht",
                  "Kontinuierliche Kommunikation während des gesamten Verfahrens",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-[var(--color-slate)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={area.image ?? "/images/practice-placeholder.svg"}
                  alt={area.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="rounded-2xl bg-[var(--color-ivory)] p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--color-navy)]">
                  Benötigen Sie Unterstützung im Bereich{" "}
                  {area.title.toLowerCase()}?
                </h3>

                <p className="mt-2 text-sm text-[var(--color-slate)]">
                  Vereinbaren Sie ein vertrauliches Beratungsgespräch mit einem
                  unserer Spezialisten.
                </p>

                <Button asChild variant="gold" className="mt-5 w-full">
                  <Link href="/consultation">
                    Beratung vereinbaren <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="font-display text-2xl font-semibold text-[var(--color-navy)]">
                Anwälte für {area.title}
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <AttorneyCard key={a.id} attorney={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
