import Link from "next/link";
import { attorneys } from "@/data/attorneys";
import { SectionTitle } from "@/components/sections/section-title";
import { AttorneyCard } from "@/components/cards/attorney-card";
import { Button } from "@/components/ui/button";

export function AttorneyShowcase() {
  const featured = attorneys.filter((a) => a.featured);

  return (
    <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Unser Team"
          title="Unsere führenden Rechtsanwälte"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <AttorneyCard key={a.id} attorney={a} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/attorneys">Gesamtes Team anzeigen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
