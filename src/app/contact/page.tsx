import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { settings } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with JusticeHub Law Firm. Visit our office, call, email, or send us a message online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader eyebrow="Contact" title="We're here to help" description="Reach out and a member of our team will respond within one business day." />
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-5 lg:px-8">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-black/5">
                <div role="img" aria-label="Map showing JusticeHub office location" className="flex aspect-[4/3] w-full items-center justify-center bg-[var(--color-ivory)]">
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
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
