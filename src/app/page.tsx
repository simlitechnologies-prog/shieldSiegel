import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { PracticeAreasSection } from "@/components/sections/practice-areas-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { AttorneyShowcase } from "@/components/sections/attorney-showcase";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { LatestArticles } from "@/components/sections/latest-articles";
import { CTASection } from "@/components/sections/cta-section";
import { ContactTeaser } from "@/components/sections/contact-teaser";

export const metadata: Metadata = {
  title: "Elite Legal Counsel You Can Trust",
  description:
    "JusticeHub Law Firm delivers premier legal representation across corporate, family, criminal, and civil law. Schedule your consultation today.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <AboutPreview />
        <PracticeAreasSection />
        <WhyChooseUs />
        <AttorneyShowcase />
        <StatsSection />
        <TestimonialsSection />
        <LatestArticles />
        <CTASection />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
