import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { AttorneyCard } from "@/components/cards/attorney-card";
import { attorneys } from "@/data/attorneys";

export const metadata: Metadata = {
  title: "Our Attorneys",
  description:
    "Meet the experienced attorneys at Shield&Siegel Law Firm, spanning corporate, family, criminal, and civil law.",
  alternates: { canonical: "/attorneys" },
};

export default function AttorneysPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Our Team"
          title="Meet our attorneys"
          description="Decades of combined experience, united by one standard of advocacy."
        />
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {attorneys.map((a) => (
                <AttorneyCard key={a.id} attorney={a} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
