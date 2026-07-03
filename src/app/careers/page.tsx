import type { Metadata } from "next";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Wallet,
  CalendarClock,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { SectionTitle } from "@/components/sections/section-title";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationForm } from "@/components/forms/application-form";
import { careers } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities, internships, and benefits at Shield&Siegel Law Firm.",
  alternates: { canonical: "/careers" },
};

const benefits = [
  {
    icon: Wallet,
    title: "Competitive Compensation",
    desc: "Market-leading salaries with performance bonuses.",
  },
  {
    icon: HeartHandshake,
    title: "Health & Wellness",
    desc: "Comprehensive medical, dental, and mental health coverage.",
  },
  {
    icon: GraduationCap,
    title: "Continuing Education",
    desc: "Tuition support and bar exam prep reimbursement.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Schedule",
    desc: "Hybrid work options and generous PTO policy.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Careers"
          title="Build your career with us"
          description="Join a firm that invests in your growth as much as your clients' outcomes."
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle eyebrow="Open Roles" title="Current openings" />
            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {careers.map((c) => (
                <Card key={c.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[var(--color-navy)]">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-slate)]">
                        {c.department}
                      </p>
                    </div>
                    <Badge>{c.type}</Badge>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-xs text-[var(--color-slate)]">
                    <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)]" />{" "}
                    {c.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate)]">
                    {c.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-[var(--color-slate)]">
                    {c.requirements.slice(0, 3).map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Briefcase className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-gold)]" />{" "}
                        {r}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle eyebrow="Grow With Us" title="Benefits & perks" />
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white p-7 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-navy)] text-[var(--color-gold)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-[var(--color-navy)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-slate)]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Internships"
              title="Summer internship program"
            />
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-slate)]">
              Our 10-week summer program places law students directly into
              client-facing work across practice groups, paired with a dedicated
              mentor and a structured curriculum of skills workshops.
            </p>
          </div>
        </section>

        <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <SectionTitle eyebrow="Apply" title="Submit your application" />
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
              <ApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
