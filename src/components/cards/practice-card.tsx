import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PracticeArea } from "@/types";
import { getIcon } from "@/lib/icon-map";
import { Card } from "@/components/ui/card";

export function PracticeCard({ area }: { area: PracticeArea }) {
  const Icon = getIcon(area.icon);

  return (
    <Card className="group flex h-full flex-col p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-navy)] text-[var(--color-gold)] transition-colors group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)]">
        <Icon className="h-6 w-6" aria-hidden />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-navy)]">
        {area.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-slate)]">
        {area.shortDescription}
      </p>

      <Link
        href={`/practice-areas/${area.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-gold)] hover:underline"
      >
        Mehr erfahren <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
