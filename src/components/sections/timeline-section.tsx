"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

export function TimelineSection() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-px bg-black/10 sm:left-1/2" />
      <ul className="space-y-10">
        {timeline.map((t, i) => (
          <motion.li
            key={t.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col gap-2 pl-12 sm:w-1/2 sm:pl-0 ${
              i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
            }`}
          >
            <span className="absolute left-2.5 top-1 h-3 w-3 rounded-full bg-[var(--color-gold)] sm:left-1/2 sm:-translate-x-1/2" />
            <span className="font-display text-xl font-bold text-[var(--color-gold)]">{t.year}</span>
            <h3 className="font-display text-lg font-semibold text-[var(--color-navy)]">{t.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--color-slate)]">{t.description}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
