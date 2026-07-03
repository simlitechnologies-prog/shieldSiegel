import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--color-slate)]">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-navy)] text-[var(--color-gold)]">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-[var(--color-navy)]">{value}</p>
      {trend && (
        <p className={cn("mt-1 flex items-center gap-1 text-xs font-medium", trend.positive ? "text-emerald-600" : "text-red-500")}>
          {trend.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {trend.value}
        </p>
      )}
    </Card>
  );
}
