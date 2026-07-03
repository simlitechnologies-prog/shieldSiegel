import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { BlogExplorer } from "./blog-explorer";

export const metadata: Metadata = {
  title: "Legal Insights & Articles",
  description:
    "Read the latest legal insights, case studies, and regulatory updates from the attorneys at Shield&Siegel Law Firm.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Insights"
          title="Legal news & perspectives"
          description="Practical guidance from our attorneys on the issues that matter to you."
        />
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlogExplorer />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
