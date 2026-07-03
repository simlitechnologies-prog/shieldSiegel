"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren vollständigen Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Bitte geben Sie einen Betreff ein"),
  message: z
    .string()
    .min(10, "Die Nachricht muss mindestens 10 Zeichen enthalten"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Kontaktformular gesendet", values);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-black/5 bg-[var(--color-ivory)] p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-[var(--color-gold)]" />

        <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-navy)]">
          Nachricht gesendet
        </h3>

        <p className="mt-2 text-sm text-[var(--color-slate)]">
          Vielen Dank für Ihre Nachricht. Unser Team wird sich innerhalb eines
          Werktages bei Ihnen melden.
        </p>

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Weitere Nachricht senden
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={compact ? "space-y-4" : "space-y-5"}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Vollständiger Name</Label>
          <Input
            id="name"
            {...register("name")}
            error={!!errors.name}
            placeholder="Vollständiger Name"
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="email">E-Mail-Adresse</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            placeholder="name@beispiel.de"
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Telefon (optional)</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+49 000 000000"
          />
        </div>

        <div>
          <Label htmlFor="subject">Betreff</Label>
          <Input
            id="subject"
            {...register("subject")}
            error={!!errors.subject}
            placeholder="Wie können wir Ihnen helfen?"
          />
          <FieldError message={errors.subject?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Nachricht</Label>
        <Textarea
          id="message"
          {...register("message")}
          error={!!errors.message}
          placeholder="Beschreiben Sie Ihr Anliegen..."
        />
        <FieldError message={errors.message?.message} />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
