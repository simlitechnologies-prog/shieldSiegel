"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white/5 p-8 sm:flex-row">
      <div>
        <h3 className="font-display text-xl font-semibold text-white">
          Bleiben Sie über rechtliche Entwicklungen informiert
        </h3>

        <p className="mt-1 text-sm text-white/60">
          Monatliche Einblicke zu wichtigen rechtlichen und regulatorischen
          Änderungen.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm gap-3 sm:w-auto"
      >
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ihre E-Mail-Adresse"
            className="border-white/15 bg-white/10 pl-9 text-white placeholder:text-white/40"
            aria-label="E-Mail-Adresse"
          />
        </div>

        <Button type="submit" variant="gold">
          Abonnieren
        </Button>
      </form>

      {submitted && (
        <p role="status" className="text-xs text-[var(--color-gold)]">
          Erfolgreich abonniert. Vielen Dank.
        </p>
      )}
    </div>
  );
}
