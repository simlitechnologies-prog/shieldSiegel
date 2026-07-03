import type { Attorney } from "@/types";

export const attorneys: Attorney[] = [
  {
    id: "att-01",
    slug: "katharina-schneider",
    name: "Dr. Katharina Schneider",
    position: "Gründungspartnerin & Managing Partnerin",
    photoUrl: "/images/Katharina.jpg",
    shortBio:
      "Expertin für Gesellschaftsrecht mit über 28 Jahren Erfahrung in internationalen Mandaten.",
    bio: "Dr. Katharina Schneider gründete 1998 die Kanzlei Shield & Siegel Rechtsanwälte in Frankfurt am Main. Sie berät nationale und internationale Mandanten bei komplexen M&A-Transaktionen, Unternehmensumstrukturierungen und Corporate Governance Fragestellungen und gilt als eine der führenden Wirtschaftsanwältinnen ihrer Generation.",
    experienceYears: 28,
    education: [
      "Dr. jur., Ludwig-Maximilians-Universität München",
      "Zweites Juristisches Staatsexamen (Bayern)",
    ],
    practiceAreas: ["corporate-law", "civil-litigation"],
    social: {
      linkedin: "#",
      email: "schneider@shieldsiegel.de",
    },
    featured: true,
  },
  {
    id: "att-02",
    slug: "kristian-hoffmann",
    name: "Kristian Hoffmann",
    position: "Senior Partner, Strafrecht",
    photoUrl: "/images/Hoffmann.jpg",
    shortBio:
      "Ehemaliger Staatsanwalt mit Schwerpunkt auf Wirtschaftsstrafrecht und Strafverteidigung.",
    bio: "Kristian Hoffmann war über zehn Jahre als Staatsanwalt tätig, bevor er in die Strafverteidigung wechselte. Seine Erfahrung im Ermittlungsverfahren ermöglicht eine strategische und präzise Verteidigung in komplexen Strafverfahren.",
    experienceYears: 20,
    education: [
      "Zweites Juristisches Staatsexamen, Universität Heidelberg",
      "LL.M. Strafrecht, Universität zu Köln",
    ],
    practiceAreas: ["criminal-defense"],
    social: {
      linkedin: "#",
      email: "hoffmann@shieldsiegel.de",
    },
    featured: true,
  },
  {
    id: "att-03",
    slug: "anna-weber",
    name: "Anna Weber",
    position: "Partnerin, Familienrecht",
    photoUrl: "/images/anaa.jpg",
    shortBio:
      "Spezialistin für Scheidungs-, Sorgerechts- und Vermögensauseinandersetzungen.",
    bio: "Anna Weber berät Mandanten im gesamten Bereich des Familienrechts. Ihr Fokus liegt auf komplexen Vermögensauseinandersetzungen sowie einvernehmlichen und streitigen Scheidungsverfahren.",
    experienceYears: 16,
    education: [
      "Zweites Juristisches Staatsexamen, Humboldt-Universität zu Berlin",
      "LL.M. Familienrecht, Universität Münster",
    ],
    practiceAreas: ["family-law"],
    social: {
      linkedin: "#",
    },
    featured: true,
  },
  {
    id: "att-04",
    slug: "lukas-meyer",
    name: "Lukas Meyer",
    position: "Partner, Migrationsrecht",
    photoUrl: "/images/Meyer.jpg",
    shortBio:
      "Spezialist für Aufenthaltsrecht, EU-Freizügigkeit und Staatsangehörigkeitsrecht.",
    bio: "Lukas Meyer berät Privatpersonen und Unternehmen in allen Fragen des deutschen Aufenthalts- und Migrationsrechts, einschließlich Blue Card, Arbeitserlaubnissen und Einbürgerungsverfahren.",
    experienceYears: 13,
    education: [
      "Zweites Juristisches Staatsexamen, Goethe-Universität Frankfurt am Main",
      "LL.M. Europarecht, Universität Freiburg",
    ],
    practiceAreas: ["immigration-law"],
    social: {
      linkedin: "#",
    },
  },
  {
    id: "att-05",
    slug: "sabine-richter",
    name: "Sabine Richter",
    position: "Partnerin, Steuerrecht",
    photoUrl: "/images/sabrina.jpg",
    shortBio:
      "Expertin für Steuerstreitigkeiten, Unternehmensbesteuerung und Steuerplanung.",
    bio: "Sabine Richter berät Unternehmen und vermögende Privatpersonen in allen Fragen des deutschen Steuerrechts, einschließlich Betriebsprüfungen, Steuerstreitigkeiten und internationaler Steuerstrukturierung.",
    experienceYears: 18,
    education: [
      "Zweites Juristisches Staatsexamen, Universität Bonn",
      "LL.M. Steuerrecht, Universität Münster",
    ],
    practiceAreas: ["tax-law"],
    social: {
      linkedin: "#",
    },
  },
  {
    id: "att-06",
    slug: "felix-neumann",
    name: "Felix Neumann",
    position: "Senior Associate, Immobilienrecht",
    photoUrl: "/images/neuman.jpg",
    shortBio:
      "Berät zu Immobilienakquisitionen, Projektentwicklung und gewerblichen Mietverträgen.",
    bio: "Felix Neumann begleitet nationale und internationale Mandanten bei Immobilientransaktionen, Finanzierungen sowie Entwicklungsprojekten im gewerblichen und privaten Immobilienbereich.",
    experienceYears: 10,
    education: [
      "Zweites Juristisches Staatsexamen, Universität Hamburg",
      "LL.M. Immobilienrecht, Universität Regensburg",
    ],
    practiceAreas: ["property-law"],
    social: {
      linkedin: "#",
    },
  },
  {
    id: "att-07",
    slug: "laura-fischer",
    name: "Laura Fischer",
    position: "Senior Associate, Arbeitsrecht",
    photoUrl: "/images/laura.jpg",
    shortBio:
      "Berät Arbeitgeber und Arbeitnehmer in allen Fragen des Arbeitsrechts.",
    bio: "Laura Fischer unterstützt Unternehmen bei arbeitsrechtlicher Compliance, Restrukturierungen und Kündigungsschutzverfahren sowie Arbeitnehmer in arbeitsrechtlichen Streitigkeiten.",
    experienceYears: 9,
    education: [
      "Zweites Juristisches Staatsexamen, Universität Tübingen",
      "LL.M. Arbeitsrecht, Universität zu Köln",
    ],
    practiceAreas: ["employment-law"],
    social: {
      linkedin: "#",
    },
  },
  {
    id: "att-08",
    slug: "michael-becker",
    name: "Michael Becker",
    position: "Partner, Personenschadensrecht",
    photoUrl: "/images/Becker.jpg",
    shortBio:
      "Vertretung von Mandanten in Verkehrsunfällen, Haftungs- und Schadensersatzfällen.",
    bio: "Michael Becker vertritt Mandanten in komplexen Schadensersatz- und Personenschadensfällen und erzielt regelmäßig erfolgreiche außergerichtliche und gerichtliche Ergebnisse.",
    experienceYears: 22,
    education: [
      "Zweites Juristisches Staatsexamen, Universität Würzburg",
      "Fachanwalt für Verkehrsrecht",
    ],
    practiceAreas: ["personal-injury"],
    social: {
      linkedin: "#",
    },
  },
  {
    id: "att-09",
    slug: "nina-krause",
    name: "Nina Krause",
    position: "Associate, Gewerblicher Rechtsschutz",
    photoUrl: "/images/Krause.jpg",
    shortBio:
      "Schützt Marken, Patente und Innovationen für Technologieunternehmen.",
    bio: "Nina Krause berät Start-ups und Technologieunternehmen im Marken-, Patent- und Urheberrecht sowie bei Lizenzverträgen und IP-Streitigkeiten.",
    experienceYears: 7,
    education: [
      "Zweites Juristisches Staatsexamen, Technische Universität München",
      "LL.M. Gewerblicher Rechtsschutz, Universität Düsseldorf",
    ],
    practiceAreas: ["intellectual-property"],
    social: {
      linkedin: "#",
    },
  },
  {
    id: "att-10",
    slug: "jonas-wagner",
    name: "Jonas Wagner",
    position: "Associate, Zivilrecht",
    photoUrl: "/images/wagner.jpg",
    shortBio:
      "Spezialisiert auf Vertragsstreitigkeiten und wirtschaftsrechtliche Konflikte.",
    bio: "Jonas Wagner vertritt Mandanten in zivilrechtlichen Streitigkeiten, insbesondere bei Vertrags-, Gesellschafter- und Forderungsstreitigkeiten vor deutschen Gerichten.",
    experienceYears: 6,
    education: [
      "Zweites Juristisches Staatsexamen, Universität Leipzig",
      "LL.M. Wirtschaftsrecht, Universität Mannheim",
    ],
    practiceAreas: ["civil-litigation"],
    social: {
      linkedin: "#",
    },
  },
];

export function getAttorneyBySlug(slug: string) {
  return attorneys.find((a) => a.slug === slug);
}
