import Link from "next/link";
import { Scale } from "lucide-react";

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-navy)] px-6 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Scale className="h-7 w-7 text-[var(--color-gold)]" />
          <span className="font-display text-lg font-bold text-[var(--color-navy)]">JusticeHub</span>
        </Link>
        <h1 className="mt-8 text-center font-display text-2xl font-semibold text-[var(--color-navy)]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-center text-sm text-[var(--color-slate)]">{description}</p>
        )}
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-[var(--color-slate)]">{footer}</div>}
      </div>
    </div>
  );
}
