import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--color-slate)]">
      <Link href="/" aria-label="Home" className="hover:text-[var(--color-gold)]">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--color-gold)]">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-[var(--color-navy)]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
