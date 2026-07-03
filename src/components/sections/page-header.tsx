interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.15),_transparent_55%)]"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
        {eyebrow && (
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold text-balance sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 text-white/70">{description}</p>}
      </div>
    </section>
  );
}
