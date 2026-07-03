import type { PracticeArea } from "@/types";

export const practiceAreas: PracticeArea[] = [
  {
    id: "pa-01",
    slug: "gesellschaftsrecht",
    title: "Gesellschaftsrecht",
    icon: "Building2",
    shortDescription:
      "Strategische Beratung zu Unternehmensgründung, M&A und Corporate Governance.",
    description:
      "Unser Team für Gesellschaftsrecht berät Unternehmen jeder Größe bei Gründung, Umstrukturierung, Compliance, Mergers & Acquisitions sowie komplexen Handels- und Unternehmensverträgen. Wir verbinden tiefes regulatorisches Wissen mit wirtschaftlichem Verständnis, um Ihre unternehmerischen Entscheidungen rechtssicher und effizient zu gestalten.",
    image: "/images/pic5.jpg",
  },
  {
    id: "pa-02",
    slug: "familienrecht",
    title: "Familienrecht",
    icon: "Users",
    shortDescription:
      "Diskrete und einfühlsame Vertretung bei Scheidung, Sorgerecht und Unterhalt.",
    description:
      "Wir begleiten Mandanten bei Scheidung, Sorgerecht, Unterhaltsfragen und Eheverträgen. Dabei verbinden wir juristische Präzision mit einem sensiblen Umgang, da familienrechtliche Angelegenheiten häufig emotional stark belastend sind.",
    image: "/images/pic7.jpg",
  },
  {
    id: "pa-03",
    slug: "strafrecht",
    title: "Strafrecht",
    icon: "Gavel",
    shortDescription:
      "Konsequente Verteidigung in Ermittlungs- und Strafverfahren.",
    description:
      "Unsere Strafverteidiger vertreten Mandanten in allen Phasen des Strafverfahrens – von der polizeilichen Vernehmung bis zur Hauptverhandlung und Revision. Wir prüfen Beweismittel sorgfältig und entwickeln individuelle Verteidigungsstrategien nach der Strafprozessordnung (StPO).",
    image: "/images/pra1.jpg",
  },
  {
    id: "pa-04",
    slug: "immobilienrecht",
    title: "Immobilienrecht",
    icon: "Home",
    shortDescription:
      "Rechtssichere Begleitung bei Immobiliengeschäften und Streitigkeiten.",
    description:
      "Wir beraten bei Immobilienkäufen, gewerblichen Mietverträgen, Bauprojekten, Grundbuchfragen sowie Nachbarschafts- und Eigentumsstreitigkeiten. Unsere Kanzlei unterstützt Sie bei der rechtssicheren Gestaltung und Prüfung sämtlicher Immobilienverträge.",
    image: "/images/pic8.jpg",
  },
  {
    id: "pa-05",
    slug: "arbeitsrecht",
    title: "Arbeitsrecht",
    icon: "Briefcase",
    shortDescription:
      "Beratung für Arbeitgeber und Arbeitnehmer zu Arbeitsverhältnissen und Kündigungen.",
    description:
      "Wir vertreten Arbeitgeber und Arbeitnehmer in allen Fragen des individuellen und kollektiven Arbeitsrechts, einschließlich Kündigungsschutz, Arbeitsverträgen, Betriebsvereinbarungen und Diskriminierungsfällen vor den Arbeitsgerichten.",
    image: "/images/pra2.jpg",
  },
  {
    id: "pa-06",
    slug: "migrationsrecht",
    title: "Migrationsrecht",
    icon: "Plane",
    shortDescription:
      "Unterstützung bei Visa, Aufenthaltstiteln und Einbürgerung.",
    description:
      "Unsere Kanzlei begleitet Privatpersonen und Unternehmen bei Aufenthalts- und Arbeitserlaubnissen, Blue-Card-Verfahren, Familiennachzug sowie Einbürgerungsverfahren nach deutschem Aufenthaltsgesetz (AufenthG).",
    image: "/images/pra3.jpg",
  },
  {
    id: "pa-07",
    slug: "steuerrecht",
    title: "Steuerrecht",
    icon: "Calculator",
    shortDescription:
      "Gestaltung und Verteidigung in steuerlichen Angelegenheiten.",
    description:
      "Wir beraten bei Betriebsprüfungen, Steuerstreitigkeiten, Unternehmensbesteuerung und Nachfolgeplanung. Ziel ist die rechtssichere Optimierung steuerlicher Strukturen im Rahmen der deutschen Abgabenordnung (AO).",
    image: "/images/pra5.jpg",
  },
  {
    id: "pa-08",
    slug: "zivilrecht",
    title: "Zivilrecht & Prozessführung",
    icon: "Scale",
    shortDescription: "Vertretung in Vertrags- und Wirtschaftsstreitigkeiten.",
    description:
      "Unsere Prozessanwälte vertreten Mandanten in Vertragsstreitigkeiten, Schadensersatzforderungen, Gesellschaftskonflikten und sonstigen zivilrechtlichen Auseinandersetzungen vor deutschen Gerichten.",
    image: "/images/pra4.jpg",
  },
  {
    id: "pa-09",
    slug: "personenschadenrecht",
    title: "Personenschadenrecht",
    icon: "HeartPulse",
    shortDescription:
      "Durchsetzung von Schadensersatz nach Unfällen und Verletzungen.",
    description:
      "Wir vertreten Unfallopfer bei Verkehrs-, Arbeits- und Behandlungsfehlern und setzen Ansprüche auf Schmerzensgeld, Verdienstausfall und Schadensersatz konsequent durch.",
    image: "/images/pra2.jpg",
  },
  {
    id: "pa-10",
    slug: "gewerblicher-rechtsschutz",
    title: "Gewerblicher Rechtsschutz (IP-Recht)",
    icon: "Lightbulb",
    shortDescription: "Schutz von Marken, Patenten und geistigem Eigentum.",
    description:
      "Wir beraten Unternehmen beim Schutz von Marken, Patenten und Urheberrechten, unterstützen bei Anmeldungen beim DPMA/EUIPO und vertreten Mandanten in Verletzungs- und Abwehrverfahren.",
    image: "/images/pra1.jpg",
  },
];

export function getPracticeAreaBySlug(slug: string) {
  return practiceAreas.find((p) => p.slug === slug);
}
