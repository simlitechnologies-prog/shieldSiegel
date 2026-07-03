import type { Settings } from "@/types";

export const siteConfig = {
  name: "Shield & Siegel Rechtsanwälte",
  shortName: "Shield & Siegel",
  tagline: "Recht. Vertrauen. Kompetenz. – Seit 1998",
  description:
    "Shield & Siegel Rechtsanwälte ist eine führende Wirtschaftskanzlei in Deutschland. Wir bieten erstklassige Rechtsberatung in den Bereichen Wirtschaftsrecht, Arbeitsrecht, Familienrecht, Strafrecht und Immobilienrecht. Seit über 25 Jahren vertrauen Mandanten auf unsere Kompetenz.",
  url: "https://www.shield-siegel.de",
  ogImage: "/images/og-cover.jpg",
  keywords: [
    "Rechtsanwalt",
    "Rechtsanwälte",
    "Kanzlei",
    "Wirtschaftsrecht",
    "Arbeitsrecht",
    "Familienrecht",
    "Strafrecht",
    "Immobilienrecht",
    "Vertragsrecht",
    "Deutschland",
    "Berlin",
    "Shield & Siegel",
  ],
};

export const settings: Settings = {
  firmName: "Shield & Siegel Rechtsanwälte",
  tagline: "Recht. Vertrauen. Kompetenz.",
  email: "kontakt@shield-siegel.de",
  phone: "+49 30 1234 5678",
  address: "Friedrichstraße 120, 10117 Berlin, Deutschland",
  officeHours: "Montag – Freitag: 08:30 – 18:00 Uhr",
  socials: {
    linkedin: "https://linkedin.com/company/shield-siegel",
    twitter: "https://x.com/shield_siegel",
    facebook: "https://facebook.com/shieldsiegel",
    email: "kontakt@shield-siegel.de",
  },
};

export const NAV_LINKS = [
  { label: "Startseite", href: "/" },
  { label: "Über uns", href: "/about" },
  { label: "Rechtsgebiete", href: "/practice-areas" },
  { label: "Anwälte", href: "/attorneys" },
  { label: "Blog", href: "/blog" },
  { label: "Karriere", href: "/careers" },
  { label: "Kontakt", href: "/contact" },
];
