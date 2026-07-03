import Link from "next/link";
import Image from "next/image";
import { Link2, AtSign, Mail } from "lucide-react";
import type { Attorney } from "@/types";
import { Card } from "@/components/ui/card";

export function AttorneyCard({ attorney }: { attorney: Attorney }) {
  return (
    <Card className="group overflow-hidden p-0">
      <Link href={`/attorneys/${attorney.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-navy)]">
          <Image
            src={attorney.photoUrl}
            alt={attorney.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="font-display text-base font-semibold text-[var(--color-navy)]">
          <Link href={`/attorneys/${attorney.slug}`}>{attorney.name}</Link>
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--color-gold)]">
          {attorney.position}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate)]">
          {attorney.shortBio}
        </p>
        <div className="mt-4 flex gap-3 border-t border-black/5 pt-4">
          {attorney.social.linkedin && (
            <a href={attorney.social.linkedin} aria-label={`${attorney.name} on LinkedIn`} className="text-[var(--color-slate)] hover:text-[var(--color-gold)]">
              <Link2 className="h-4 w-4" />
            </a>
          )}
          {attorney.social.twitter && (
            <a href={attorney.social.twitter} aria-label={`${attorney.name} on Twitter`} className="text-[var(--color-slate)] hover:text-[var(--color-gold)]">
              <AtSign className="h-4 w-4" />
            </a>
          )}
          {attorney.social.email && (
            <a href={`mailto:${attorney.social.email}`} aria-label={`Email ${attorney.name}`} className="text-[var(--color-slate)] hover:text-[var(--color-gold)]">
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
