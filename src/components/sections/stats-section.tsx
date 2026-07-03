"use client";

import * as React from "react";
import { motion, useInView, animate } from "framer-motion";
import { stats } from "@/data/stats";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-[var(--color-navy)] py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-bold text-[var(--color-gold)] sm:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-white/60 sm:text-sm">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
