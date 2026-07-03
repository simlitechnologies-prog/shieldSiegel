import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-[var(--color-gold)]" : "text-[var(--color-gold)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl",
          light ? "text-white" : "text-[var(--color-navy)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-white/70" : "text-[var(--color-slate)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
