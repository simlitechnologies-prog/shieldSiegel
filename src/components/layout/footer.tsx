import Link from "next/link";
import { Scale, Link2, AtSign, Users, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS, settings, siteConfig } from "@/constants/site";
import { Newsletter } from "@/components/sections/newsletter";

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy-deep)] text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Newsletter />

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-[var(--color-gold)]" aria-hidden />
              <span className="font-display text-lg font-bold text-white">
                {siteConfig.shortName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Erstklassige Rechtsberatung auf der Grundlage von Integrität,
              Präzision und über 25 Jahren erfolgreicher Mandantenvertretung.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={settings.socials.linkedin}
                aria-label="LinkedIn"
                className="hover:text-[var(--color-gold)]"
              >
                <Link2 className="h-5 w-5" />
              </a>
              <a
                href={settings.socials.twitter}
                aria-label="X"
                className="hover:text-[var(--color-gold)]"
              >
                <AtSign className="h-5 w-5" />
              </a>
              <a
                href={settings.socials.facebook}
                aria-label="Facebook"
                className="hover:text-[var(--color-gold)]"
              >
                <Users className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Rechtliches
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[var(--color-gold)]"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--color-gold)]">
                  Allgemeine Geschäftsbedingungen
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[var(--color-gold)]"
                >
                  Karriere
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="hover:text-[var(--color-gold)]"
                >
                  Beratungstermin vereinbaren
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
            vorbehalten.
          </p>
          <p>
            Mit Präzision entwickelt – für Mandanten mit höchsten Ansprüchen.
          </p>
        </div>
      </div>
    </footer>
  );
}
