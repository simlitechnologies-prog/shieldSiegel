import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, HeartHandshake, Award, Quote } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { SectionTitle } from "@/components/sections/section-title";
import { TimelineSection } from "@/components/sections/timeline-section";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { AttorneyCard } from "@/components/cards/attorney-card";
import { attorneys } from "@/data/attorneys";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Erfahren Sie mehr über die Kanzlei Shield & Siegel Rechtsanwälte: Geschichte, Werte und die Anwälte hinter über 25 Jahren juristischer Beratung in Deutschland und Europa.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    title: "Mission",
    desc: "Exzellente rechtliche Beratung mit Integrität, Präzision und kompromisslosem Einsatz für die Interessen unserer Mandanten.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "Die vertrauenswürdigste Wirtschaftskanzlei für Unternehmen und Privatpersonen in Deutschland und der EU zu sein.",
  },
  {
    icon: HeartHandshake,
    title: "Werte",
    desc: "Integrität, Exzellenz, Mandantenfokus und Verantwortungsbewusstsein prägen jede unserer Entscheidungen.",
  },
];

const awards = [
  "JUVE Handbuch Wirtschaftskanzleien – Auszeichnung (2021–2025)",
  "Chambers Europe – Tier 1 Ranking (mehrere Praxisbereiche)",
  "The Legal 500 Deutschland – Empfohlene Kanzlei",
  "Best Lawyers® Germany – Auszeichnung führender Anwälte",
];

const partners = [
  "Deutscher Anwaltverein (DAV)",
  "Bundesrechtsanwaltskammer (BRAK)",
  "EU Law Firms Network",
  "Pro Bono Deutschland Initiative",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Über Shield & Siegel"
          title="Unsere Geschichte, Mission und Menschen"
          description="Über 25 Jahre anwaltliche Beratung für Mandanten in Deutschland und Europa."
        />

        {/* Firm History */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-image.jpg"
                alt="Historie der Kanzlei Shield & Siegel"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <SectionTitle
                eyebrow="Kanzleihistorie"
                title="Gegründet mit dem Anspruch: Recht muss zugänglich und exzellent sein"
                align="left"
                className="mx-0 text-left"
                description="Shield & Siegel wurde 1998 von Dr. Katharina Schneider gegründet. Ziel war es, eine moderne Wirtschaftskanzlei zu schaffen, die Mandanten unabhängig von der Größe ihres Falls mit höchster juristischer Präzision betreut. Heute zählt die Kanzlei zu den aufstrebenden mittelgroßen Wirtschaftskanzleien mit Standorten in Frankfurt, Berlin und München."
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Was uns antreibt"
              title="Mission, Vision & Werte"
            />
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white p-8 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-[var(--color-gold)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-navy)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Unsere Entwicklung"
              title="Meilensteine der Kanzlei"
            />
            <div className="mt-16">
              <TimelineSection />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Unser Team"
              title="Unsere Rechtsanwälte und Spezialisten"
            />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {attorneys.slice(0, 8).map((a) => (
                <AttorneyCard key={a.id} attorney={a} />
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Partners */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div>
                <SectionTitle
                  eyebrow="Auszeichnungen"
                  title="Anerkennung & Rankings"
                  align="left"
                  className="mx-0 text-left"
                />
                <ul className="mt-8 space-y-4">
                  {awards.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-3 text-sm text-[var(--color-slate)]"
                    >
                      <Award className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionTitle
                  eyebrow="Netzwerk"
                  title="Mitgliedschaften & Kooperationen"
                  align="left"
                  className="mx-0 text-left"
                />
                <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {partners.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 rounded-xl border border-black/5 bg-[var(--color-ivory)] p-4 text-sm font-medium text-[var(--color-navy)]"
                    >
                      <Quote className="h-4 w-4 text-[var(--color-gold)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <SectionTitle eyebrow="Fragen" title="Häufig gestellte Fragen" />
            <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
              <FAQAccordion items={faqs.slice(0, 8)} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
