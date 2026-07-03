"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.18),_transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-white"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            25+ Jahre vertrauensvolle Beratung
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.1] text-balance sm:text-5xl lg:text-6xl"
          >
            Gerechtigkeit, Beratung,
            <br />
            und Vertrauen.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-base leading-relaxed text-white/70"
          >
            Shield&Siegel bietet erstklassige Rechtsvertretung in den Bereichen
            Unternehmens-, Familien- und Strafrecht – und verbindet dabei
            präzise Strategie mit engagierter Vertretung für jeden Mandanten,
            den wir betreuen.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/consultation">
                Beratungstermin buchen <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-[var(--color-navy)]"
            >
              <Link href="/practice-areas">Tätigkeitsbereiche entdecken</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            <div>
              <p className="font-display text-2xl font-bold text-[var(--color-gold)]">
                2.4K+
              </p>
              <p className="mt-1 text-xs text-white/60">Gewonnene Fälle</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-[var(--color-gold)]">
                98%
              </p>
              <p className="mt-1 text-xs text-white/60">Kundenzufriedenheit</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-[var(--color-gold)]">
                25+
              </p>
              <p className="mt-1 text-xs text-white/60">Jahre Erfahrung</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--color-gold)]/30 p-2">
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="/images/hero-pic.jpg"
                alt="Leitender Anwalt der Kanzlei Shield&Siegel"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/70 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-[var(--color-gold)]/30 bg-white p-4 shadow-xl sm:block">
            <p className="font-display text-sm font-semibold text-[var(--color-navy)]">
              Chambers-Ranking
            </p>
            <p className="text-xs text-[var(--color-slate)]">
              Tier-1-Kanzlei, 2025
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
