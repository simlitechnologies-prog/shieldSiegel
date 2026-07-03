import { practiceAreas } from "@/data/practice-areas";
import { SectionTitle } from "@/components/sections/section-title";
import { PracticeCard } from "@/components/cards/practice-card";

export function PracticeAreasSection() {
  return (
    <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Unsere Leistungen"
          title="Umfassende Rechtsdienstleistungen"
          description="Von der Unternehmensberatung bis zur Prozessführung bringen unsere Anwälte spezialisierte Expertise in jedes Mandat ein."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.slice(0, 8).map((area) => (
            <PracticeCard key={area.id} area={area} />
          ))}
        </div>
      </div>
    </section>
  );
}
