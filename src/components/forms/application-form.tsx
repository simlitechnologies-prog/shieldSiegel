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

const applicationSchema = z.object({
  fullName: z.string().min(2, "Bitte geben Sie Ihren vollständigen Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  position: z
    .string()
    .min(2, "Bitte geben Sie die Stelle an, auf die Sie sich bewerben"),
  coverNote: z
    .string()
    .min(
      20,
      "Bitte schreiben Sie mindestens einen kurzen Text (mind. 20 Zeichen)",
    ),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export function ApplicationForm({
  defaultPosition = "",
}: {
  defaultPosition?: string;
}) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { position: defaultPosition },
  });

  async function onSubmit(values: ApplicationValues) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Bewerbung eingereicht", values);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--color-ivory)] p-8 text-center">
        <CheckCircle2 className="h-9 w-9 text-[var(--color-gold)]" />

        <h3 className="mt-3 font-display text-base font-semibold text-[var(--color-navy)]">
          Bewerbung eingegangen
        </h3>

        <p className="mt-2 text-sm text-[var(--color-slate)]">
          Unser Recruiting-Team prüft Ihre Bewerbung und meldet sich bei Ihnen,
          sofern Ihr Profil passt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Vollständiger Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            error={!!errors.fullName}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="email">E-Mail-Adresse</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={!!errors.email}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          {...register("position")}
          error={!!errors.position}
        />
        <FieldError message={errors.position?.message} />
      </div>

      <div>
        <Label htmlFor="coverNote">Warum sind Sie geeignet?</Label>
        <Textarea
          id="coverNote"
          {...register("coverNote")}
          error={!!errors.coverNote}
        />
        <FieldError message={errors.coverNote?.message} />
      </div>

      <Button
        type="submit"
        variant="gold"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Wird gesendet..." : "Bewerbung absenden"}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
