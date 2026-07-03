import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { settings } from "@/constants/site";
import { SectionTitle } from "@/components/sections/section-title";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactTeaser() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Kontakt aufnehmen"
          title="Lassen Sie uns über Ihren Fall sprechen"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-black/5">
              <div
                role="img"
                aria-label="Karte mit Standort des Büros von Shield&Siegel"
                className="flex aspect-[16/10] w-full items-center justify-center bg-[var(--color-ivory)]"
              >
                <MapPin className="h-10 w-10 text-[var(--color-gold)]" />
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-[var(--color-slate)]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                {settings.address}
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                {settings.phone}
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                {settings.email}
              </li>

              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                {settings.officeHours}
              </li>
            </ul>
          </div>

          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}
