"use client";

import * as React from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { SectionTitle } from "@/components/sections/section-title";

export function TestimonialsSection() {
  const [index, setIndex] = React.useState(0);
  const visible = testimonials.slice(0, 9);

  function next() {
    setIndex((i) => (i + 1) % visible.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + visible.length) % visible.length);
  }

  const t = visible[index];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionTitle eyebrow="Client Voices" title="What our clients say" />
        <div className="relative mt-14 rounded-2xl bg-[var(--color-ivory)] p-10 text-center">
          <Quote className="mx-auto h-8 w-8 text-[var(--color-gold)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-navy)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                ))}
              </div>
              <p className="mt-4 font-display font-semibold text-[var(--color-navy)]">
                {t.clientName}
              </p>
              <p className="text-xs text-[var(--color-slate)]">{t.clientRole}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-[var(--color-gold)] hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-[var(--color-gold)] hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
