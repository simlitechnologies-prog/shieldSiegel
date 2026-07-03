import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, BriefcaseBusiness, Link2, AtSign, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { attorneys, getAttorneyBySlug } from "@/data/attorneys";
import { getPracticeAreaBySlug } from "@/data/practice-areas";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const attorney = getAttorneyBySlug(slug);
  if (!attorney) return {};
  return {
    title: attorney.name,
    description: attorney.shortBio,
    alternates: { canonical: `/attorneys/${attorney.slug}` },
  };
}

export default async function AttorneyDetailPage({ params }: Props) {
  const { slug } = await params;
  const attorney = getAttorneyBySlug(slug);
  if (!attorney) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-3 lg:px-8">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-navy)]">
                <Image src={attorney.photoUrl} alt={attorney.name} fill sizes="320px" className="object-cover" />
              </div>
              <div className="mt-6 flex gap-4">
                {attorney.social.linkedin && (
                  <a href={attorney.social.linkedin} aria-label={`${attorney.name} on LinkedIn`} className="text-[var(--color-slate)] hover:text-[var(--color-gold)]">
                    <Link2 className="h-5 w-5" />
                  </a>
                )}
                {attorney.social.twitter && (
                  <a href={attorney.social.twitter} aria-label={`${attorney.name} on Twitter`} className="text-[var(--color-slate)] hover:text-[var(--color-gold)]">
                    <AtSign className="h-5 w-5" />
                  </a>
                )}
                {attorney.social.email && (
                  <a href={`mailto:${attorney.social.email}`} aria-label={`Email ${attorney.name}`} className="text-[var(--color-slate)] hover:text-[var(--color-gold)]">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h1 className="font-display text-3xl font-bold text-[var(--color-navy)] sm:text-4xl">
                {attorney.name}
              </h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-gold)]">
                {attorney.position}
              </p>
              <p className="mt-6 leading-relaxed text-[var(--color-slate)]">{attorney.bio}</p>

              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-[var(--color-navy)]">
                    <BriefcaseBusiness className="h-4 w-4 text-[var(--color-gold)]" /> Experience
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-slate)]">{attorney.experienceYears}+ years of practice</p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-[var(--color-navy)]">
                    <GraduationCap className="h-4 w-4 text-[var(--color-gold)]" /> Education
                  </h2>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--color-slate)]">
                    {attorney.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-display text-base font-semibold text-[var(--color-navy)]">Practice Areas</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {attorney.practiceAreas.map((slug) => {
                    const area = getPracticeAreaBySlug(slug);
                    if (!area) return null;
                    return (
                      <Link key={slug} href={`/practice-areas/${slug}`}>
                        <Badge>{area.title}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Button asChild variant="gold" size="lg" className="mt-10">
                <Link href="/consultation">
                  Book a Consultation with {attorney.name.split(" ")[0]} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
