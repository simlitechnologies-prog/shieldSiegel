import { Scale } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-[var(--color-navy)]">
      <Scale className="h-8 w-8 animate-pulse text-[var(--color-gold)]" />
      <p className="text-sm text-[var(--color-slate)]">Loading...</p>
    </div>
  );
}
