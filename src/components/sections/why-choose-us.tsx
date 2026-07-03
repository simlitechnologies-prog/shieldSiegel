import { ShieldCheck, Clock3, Award, Users2 } from "lucide-react";
import { SectionTitle } from "@/components/sections/section-title";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Nachgewiesene Erfolgsbilanz",
    desc: "Mehr als 2.400 erfolgreich abgeschlossene Mandate über einen Zeitraum von über 25 Jahren.",
  },
  {
    icon: Clock3,
    title: "Schnelle und direkte Kommunikation",
    desc: "Direkter Zugang zu Ihrem Anwalt mit klarer und zeitnaher Beratung.",
  },
  {
    icon: Award,
    title: "Ausgezeichnete Kanzlei",
    desc: "Chambers Tier 1 Bewertung sowie zahlreiche branchenspezifische Auszeichnungen.",
  },
  {
    icon: Users2,
    title: "Mandantenorientierte Strategie",
    desc: "Jede Strategie wird individuell auf Ihre Ziele und Ihre persönliche Situation abgestimmt.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Warum Shield & Siegel"
          title="Rechtsberatung, auf die Sie sich verlassen können"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-[var(--color-gold)]">
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-navy)]">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
