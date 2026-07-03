import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/sections/section-title";
import { Button } from "@/components/ui/button";

const points = [
  "Über 25 Jahre kombinierte Erfahrung im Gerichtssaal und in der Unternehmensberatung",
  "Tier-1 Chambers-anerkannte Anwälte in mehreren Rechtsgebieten",
  "Transparente Gebührenstrukturen und kontinuierliche Kommunikation",
  "Nachweislich über 2.400 erfolgreich abgeschlossene Fälle",
];

export function AboutPreview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/about-image.jpg"
            alt="Hauptsitz der Kanzlei Shield&Siegel"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionTitle
            eyebrow="Über Shield&Siegel"
            title="Ein Vermächtnis aus Integrität und Ergebnissen"
            align="left"
            description="Seit 1998 steht Shield&Siegel für präzise juristische Strategie kombiniert mit echter Mandantenbetreuung. Unsere Anwälte bringen jahrzehntelange Erfahrung in allen wichtigen Rechtsgebieten mit, doch was uns besonders macht, ist unsere Weigerung, einen Fall als Routine zu behandeln."
            className="mx-0 text-left"
          />

          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-[var(--color-slate)]"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                {p}
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" size="lg" className="mt-8">
            <Link href="/about">Mehr über unsere Kanzlei</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
