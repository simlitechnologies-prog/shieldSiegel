import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(212,175,55,0.15),_transparent_60%)]"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Möchten Sie Ihr rechtliches Anliegen besprechen?
        </h2>

        <p className="mt-4 text-white/70">
          Vereinbaren Sie noch heute eine vertrauliche Beratung mit einem
          unserer Rechtsanwälte.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="gold" size="lg">
            <Link href="/consultation">Beratung vereinbaren</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white hover:text-[var(--color-navy)]"
          >
            <Link href="/contact">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
