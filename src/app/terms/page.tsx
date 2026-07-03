import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions governing your use of the Shield&Siegel Law Firm website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Legal"
          title="Terms & Conditions"
          description="Last updated: June 1, 2026"
        />
        <section className="bg-white py-16 lg:py-24">
          <div className="prose prose-neutral mx-auto max-w-3xl px-6 leading-relaxed text-[var(--color-slate)] lg:px-8">
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              1. No Attorney-Client Relationship
            </h2>
            <p>
              Use of this website does not create an attorney-client
              relationship between you and Shield&Siegel Law Firm. An
              attorney-client relationship is only formed upon execution of a
              written engagement agreement.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              2. Not Legal Advice
            </h2>
            <p>
              Content on this website is provided for general informational
              purposes only and should not be construed as legal advice for any
              specific situation.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              3. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, and logos,
              is the property of Shield&Siegel Law Firm and may not be
              reproduced without permission.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              4. Limitation of Liability
            </h2>
            <p>
              Shield&Siegel Law Firm shall not be liable for any damages arising
              from your use of, or inability to use, this website.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the State of New York,
              without regard to its conflict of law principles.
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
              6. Contact
            </h2>
            <p>
              Questions about these Terms should be directed to us through our
              Contact page.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
