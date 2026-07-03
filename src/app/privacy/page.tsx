import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Shield&Siegel Law Firm's privacy policy outlining how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Legal"
          title="Privacy Policy"
          description="Last updated: June 1, 2026"
        />
        <section className="bg-white py-16 lg:py-24">
          <div className="prose prose-neutral mx-auto max-w-3xl px-6 leading-relaxed text-[var(--color-slate)] lg:px-8">
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you fill out a contact form, request a consultation, or apply for
              a position, including your name, email address, phone number, and
              details of your inquiry.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to respond to inquiries,
              schedule consultations, process applications, and improve our
              services. We do not sell your personal information to third
              parties.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              3. Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards designed to protect the confidentiality and integrity
              of information you provide to us.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies to enhance user experience and analyze
              site traffic. You may disable cookies through your browser
              settings.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              5. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information by contacting us using the details on our
              Contact page.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Continued use
              of our website after changes constitutes acceptance of the revised
              policy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
