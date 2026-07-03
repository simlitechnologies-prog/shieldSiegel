import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ChartPlaceholder({ title }: { title: string }) {
  return (
    <Card className="p-6">
      <h3 className="font-display text-base font-semibold text-[var(--color-navy)]">{title}</h3>
      <div className="mt-4 flex h-56 items-center justify-center rounded-lg bg-[var(--color-ivory)]">
        <div className="flex items-end gap-2">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="w-6 rounded-t-md bg-[var(--color-gold)]/60"
            />
          ))}
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-slate)]">
        <BarChart3 className="h-3.5 w-3.5" /> Mock data — connect to Firestore for live analytics
      </p>
    </Card>
  );
}
