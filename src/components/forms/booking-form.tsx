"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { practiceAreas } from "@/data/practice-areas";
import { PRICING } from "@/lib/firebase/booking";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  legalArea: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

const bookingSchema = z.object({
  fullName: z.string().min(2, "Bitte geben Sie Ihren vollständigen Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(7, "Bitte geben Sie eine gültige Telefonnummer ein"),
  practiceArea: z.string().min(1, "Bitte wählen Sie ein Rechtsgebiet aus"),
  preferredDate: z
    .string()
    .min(1, "Bitte wählen Sie ein Datum")
    .refine((d) => new Date(d) >= new Date(new Date().toDateString()), {
      message: "Das Datum muss heute oder in der Zukunft liegen",
    }),
  preferredTime: z.string().min(1, "Bitte wählen Sie eine Uhrzeit"),
  message: z.string().max(1000).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Sie müssen den AGB und Datenschutzbestimmungen zustimmen",
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  selectedTier: "basic" | "premium";
  isUrgent: boolean;
  totalPrice: number;
  onSubmit: (data: BookingFormData) => void;
  isSubmitting: boolean;
  submitStatus: {
    type: "success" | "error" | null;
    message: string;
  };
}

export function BookingForm({
  selectedTier,
  isUrgent,
  totalPrice,
  onSubmit: parentOnSubmit,
  isSubmitting: parentIsSubmitting,
  submitStatus,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isSubmitting: formIsSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  // Use either parent's submitting state or form's internal state
  const isSubmitting = parentIsSubmitting || formIsSubmitting;

  async function onSubmit(values: BookingFormValues) {
    // Pass the form data to the parent component
    const formData = {
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      legalArea: values.practiceArea,
      message: values.message || "",
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime,
    };

    parentOnSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Error Message from parent */}
      {submitStatus.type === "error" && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
          <p className="font-medium">❌ Fehler bei der Buchung</p>
          <p className="mt-1">{submitStatus.message}</p>
        </div>
      )}

      {/* Success Message from parent */}
      {submitStatus.type === "success" && (
        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200">
          <p className="font-medium">✓ Buchung erfolgreich</p>
          <p className="mt-1">{submitStatus.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Vollständiger Name *</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            error={!!errors.fullName}
            placeholder="Vollständiger Name"
            disabled={isSubmitting}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div>
          <Label htmlFor="email">E-Mail-Adresse *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            placeholder="name@beispiel.de"
            disabled={isSubmitting}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Telefonnummer *</Label>
          <Input
            id="phone"
            {...register("phone")}
            error={!!errors.phone}
            placeholder="+49 000 000000"
            disabled={isSubmitting}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div>
          <Label htmlFor="practiceArea">Rechtsgebiet *</Label>
          <Controller
            control={control}
            name="practiceArea"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger id="practiceArea" error={!!errors.practiceArea}>
                  <SelectValue placeholder="Rechtsgebiet auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {practiceAreas.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.practiceArea?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="preferredDate">Wunschtermin *</Label>
          <Input
            id="preferredDate"
            type="date"
            {...register("preferredDate")}
            error={!!errors.preferredDate}
            min={new Date().toISOString().split("T")[0]}
            disabled={isSubmitting}
          />
          <FieldError message={errors.preferredDate?.message} />
        </div>

        <div>
          <Label htmlFor="preferredTime">Uhrzeit *</Label>
          <Controller
            control={control}
            name="preferredTime"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  id="preferredTime"
                  error={!!errors.preferredTime}
                >
                  <SelectValue placeholder="Uhrzeit auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.preferredTime?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Zusätzliche Angaben (optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Beschreiben Sie kurz Ihr rechtliches Anliegen..."
          disabled={isSubmitting}
        />
      </div>

      {/* Booking Summary */}
      <div className="rounded-lg bg-[var(--color-ivory)] p-4 border border-black/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-slate)]">Gewähltes Paket:</span>
          <span className="font-semibold text-[var(--color-navy)]">
            {selectedTier === "basic" ? "Basis Beratung" : "Premium Beratung"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-slate)]">Preis:</span>
          <span className="font-semibold text-[var(--color-navy)]">
            {selectedTier === "basic"
              ? PRICING.basic.price
              : PRICING.premium.price}{" "}
            €
          </span>
        </div>
        {isUrgent && (
          <div className="flex items-center justify-between text-sm border-t border-black/5 pt-2 mt-2">
            <span className="text-[var(--color-slate)]">⚡ Eil-Aufschlag:</span>
            <span className="font-semibold text-orange-600">
              +{PRICING.urgentSurcharge.amount} €
            </span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-black/5 pt-2 mt-2">
          <span className="font-medium text-[var(--color-navy)]">
            Gesamtpreis:
          </span>
          <span className="text-xl font-bold text-[var(--color-navy)]">
            {totalPrice} €
          </span>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agreeToTerms"
          {...register("agreeToTerms")}
          className="mt-1 h-4 w-4 rounded border-black/10 text-[var(--color-navy)] focus:ring-[var(--color-navy)]"
          disabled={isSubmitting}
        />
        <Label
          htmlFor="agreeToTerms"
          className="text-sm text-[var(--color-slate)]"
        >
          Ich stimme den{" "}
          <a
            href="/agb"
            className="text-[var(--color-navy)] underline hover:no-underline"
          >
            Allgemeinen Geschäftsbedingungen
          </a>{" "}
          und der{" "}
          <a
            href="/datenschutz"
            className="text-[var(--color-navy)] underline hover:no-underline"
          >
            Datenschutzerklärung
          </a>{" "}
          zu. *
        </Label>
      </div>
      <FieldError message={errors.agreeToTerms?.message} />

      <Button
        type="submit"
        variant="gold"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Wird überprüft...
          </>
        ) : (
          <>
            Weiter zur Zahlung
            <CalendarCheck className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-[var(--color-slate)]">
        * Pflichtfelder. Mit der Buchung akzeptieren Sie unsere AGB und
        Datenschutzerklärung.
      </p>
    </form>
  );
}
