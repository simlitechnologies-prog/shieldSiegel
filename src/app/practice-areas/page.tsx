import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { PracticeCard } from "@/components/cards/practice-card";
import { practiceAreas } from "@/data/practice-areas";

export const metadata: Metadata = {
  title: "Rechtsgebiete",
  description:
    "Entdecken Sie das umfassende Leistungsspektrum von Shield & Siegel – von Wirtschaftsrecht über Arbeitsrecht bis hin zum Schutz geistigen Eigentums.",
  alternates: { canonical: "/practice-areas" },
};

export default function PracticeAreasPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Rechtsgebiete"
          title="Umfassende juristische Dienstleistungen"
          description="Zehn spezialisierte Rechtsgebiete – ein einheitlicher Anspruch an höchste Qualität."
        />
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {practiceAreas.map((area) => (
                <PracticeCard key={area.id} area={area} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
