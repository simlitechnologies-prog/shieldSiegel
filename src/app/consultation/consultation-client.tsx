"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { BookingForm } from "@/components/forms/booking-form";
import { StripePayment } from "@/components/payment/stripe-payment";
import {
  Star,
  Zap,
  Clock,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  createBooking,
  checkAvailability,
  PRICING,
} from "@/lib/firebase/booking";
import type { BookingData } from "@/lib/firebase/booking";

type PricingTier = "basic" | "premium";

export default function ConsultationClient() {
  const [selectedTier, setSelectedTier] = useState<PricingTier>("basic");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pricingOptions = {
    basic: {
      name: "Basis Beratung",
      price: PRICING.basic.price,
      icon: <MessageSquare className="h-6 w-6 text-[var(--color-navy)]" />,
      features: [
        "Erstberatung in Ihrem Rechtsgebiet",
        "60 Minuten Beratungszeit",
        "Schriftliche Zusammenfassung",
      ],
      badge: "Standard",
      availability: "Verfügbar in 2-3 Werktagen",
    },
    premium: {
      name: "Premium Beratung",
      price: PRICING.premium.price,
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      features: [
        "Umfassende Rechtsanalyse",
        "90 Minuten Beratungszeit",
        "Detaillierte schriftliche Ausarbeitung",
        "Priorisierte Terminvergabe",
      ],
      badge: "Empfohlen",
      availability: "Inklusive Nachfrage-Kontakt",
    },
  };

  const getTotalPrice = () => {
    const basePrice = pricingOptions[selectedTier].price;
    return isUrgent ? basePrice + PRICING.urgentSurcharge.amount : basePrice;
  };

  const getSelectedTierName = () => {
    return pricingOptions[selectedTier].name;
  };

  // Handle booking form submission - now just validates and shows payment
  const handleBookingSubmit = async (formDataFromForm: any) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // First, check availability
      const availabilityCheck = await checkAvailability(
        formDataFromForm.preferredDate,
        formDataFromForm.preferredTime,
      );

      if (!availabilityCheck.success) {
        setSubmitStatus({
          type: "error",
          message:
            "Fehler bei der Verfügbarkeitsprüfung. Bitte versuchen Sie es später erneut.",
        });
        setIsSubmitting(false);
        return;
      }

      if (!availabilityCheck.available) {
        setSubmitStatus({
          type: "error",
          message:
            "Dieser Termin ist leider bereits vergeben. Bitte wählen Sie einen anderen Termin.",
        });
        setIsSubmitting(false);
        return;
      }

      // Store form data for later use
      setFormData(formDataFromForm);

      // Prepare data for payment
      const paymentData = {
        name: formDataFromForm.name,
        email: formDataFromForm.email,
        amount: getTotalPrice(),
        selectedTier: selectedTier,
        isUrgent: isUrgent,
        preferredDate: formDataFromForm.preferredDate,
        preferredTime: formDataFromForm.preferredTime,
        phone: formDataFromForm.phone || "",
        legalArea: formDataFromForm.legalArea,
        message: formDataFromForm.message || "",
      };

      setBookingData(paymentData);
      setShowPayment(true);
      setSubmitStatus({ type: null, message: "" });
    } catch (error) {
      console.error("Booking validation error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle successful payment - now creates the booking
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Prepare booking data
      const bookingDataToSave: Omit<
        BookingData,
        "createdAt" | "updatedAt" | "bookingReference"
      > = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone || "",
        legalArea: bookingData.legalArea,
        message: bookingData.message || "",
        selectedTier: selectedTier,
        isUrgent: isUrgent,
        totalPrice: getTotalPrice(),
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        status: "confirmed", // Immediately confirmed since payment succeeded
        paymentStatus: "paid",
        paymentIntentId: paymentIntentId,
      };

      // Create booking in Firebase
      const result = await createBooking(bookingDataToSave);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: `✓ Buchung und Zahlung erfolgreich! Ihre Buchungsreferenz: ${result.bookingReference}`,
        });
        setShowPayment(false);

        // Reset form data
        setFormData(null);
        setBookingData(null);
      } else {
        // If booking creation fails, we need to handle it
        setSubmitStatus({
          type: "error",
          message: `Die Zahlung war erfolgreich, aber die Buchung konnte nicht gespeichert werden. Bitte kontaktieren Sie den Support. Referenz: ${paymentIntentId}`,
        });
        setShowPayment(false);
      }
    } catch (error) {
      console.error("Error saving booking after payment:", error);
      setSubmitStatus({
        type: "error",
        message: `Die Zahlung war erfolgreich, aber es gab ein Problem beim Speichern der Buchung. Bitte kontaktieren Sie den Support.`,
      });
      setShowPayment(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setSubmitStatus({
      type: "error",
      message: `Zahlung fehlgeschlagen: ${error}. Bitte versuchen Sie es erneut.`,
    });
    setShowPayment(false);
  };

  // Don't render interactive content until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <>
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow="Beratung"
            title="Buchen Sie Ihren Beratungstermin"
            description="Wählen Sie das passende Beratungspaket für Ihr Anliegen – von der Erstberatung bis zur Premium-Lösung mit sofortiger Verfügbarkeit."
          />
          <section className="bg-white pb-8 pt-4">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 bg-white p-6"
                  >
                    <div className="h-48 animate-pulse rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          eyebrow="Beratung"
          title="Buchen Sie Ihren Beratungstermin"
          description="Wählen Sie das passende Beratungspaket für Ihr Anliegen – von der Erstberatung bis zur Premium-Lösung mit sofortiger Verfügbarkeit."
        />

        {/* Pricing Cards Section */}
        <section className="bg-white pb-8 pt-4">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Basic Consultation Card */}
              <button
                onClick={() => setSelectedTier("basic")}
                className={`group relative rounded-2xl border p-6 text-left transition-all hover:shadow-lg hover:scale-[1.02] ${
                  selectedTier === "basic"
                    ? "border-[var(--color-navy)] bg-[var(--color-ivory)] shadow-md"
                    : "border-black/10 bg-white hover:border-[var(--color-navy)]/30"
                }`}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`rounded-xl p-3 shadow-sm ${
                      selectedTier === "basic"
                        ? "bg-[var(--color-navy)]/10"
                        : "bg-white"
                    }`}
                  >
                    {pricingOptions.basic.icon}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      selectedTier === "basic"
                        ? "bg-[var(--color-navy)] text-white"
                        : "bg-gray-100 text-[var(--color-slate)]"
                    }`}
                  >
                    {pricingOptions.basic.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-navy)]">
                  {pricingOptions.basic.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[var(--color-navy)]">
                    {pricingOptions.basic.price} €
                  </span>
                  <span className="text-sm text-[var(--color-slate)]">
                    / Sitzung
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
                  {pricingOptions.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-1 text-xs text-[var(--color-slate)]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{pricingOptions.basic.availability}</span>
                </div>
                {selectedTier === "basic" && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-[var(--color-navy)] p-1">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>

              {/* Premium Consultation Card */}
              <button
                onClick={() => setSelectedTier("premium")}
                className={`group relative rounded-2xl border-2 p-6 text-left transition-all hover:shadow-xl hover:scale-[1.02] ${
                  selectedTier === "premium"
                    ? "border-[var(--color-navy)] bg-[var(--color-ivory)] shadow-md"
                    : "border-[var(--color-navy)]/30 bg-white hover:border-[var(--color-navy)]"
                }`}
                type="button"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-navy)] px-4 py-1 text-xs font-semibold text-white">
                  Beliebt
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className={`rounded-xl p-3 shadow-sm ${
                      selectedTier === "premium" ? "bg-yellow-50" : "bg-white"
                    }`}
                  >
                    {pricingOptions.premium.icon}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      selectedTier === "premium"
                        ? "bg-[var(--color-navy)] text-white"
                        : "bg-gray-100 text-[var(--color-slate)]"
                    }`}
                  >
                    {pricingOptions.premium.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-navy)]">
                  {pricingOptions.premium.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[var(--color-navy)]">
                    {pricingOptions.premium.price} €
                  </span>
                  <span className="text-sm text-[var(--color-slate)]">
                    / Sitzung
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
                  {pricingOptions.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-1 text-xs text-[var(--color-slate)]">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                  <span>{pricingOptions.premium.availability}</span>
                </div>
                {selectedTier === "premium" && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-[var(--color-navy)] p-1">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>

              {/* Urgent Toggle Card */}
              <div
                className={`relative rounded-2xl border p-6 transition-all ${
                  isUrgent
                    ? "border-orange-500 bg-orange-50/70 shadow-md"
                    : "border-orange-200 bg-orange-50/30 hover:border-orange-300"
                }`}
              >
                <button
                  onClick={() => setIsUrgent(!isUrgent)}
                  className="absolute inset-0 w-full rounded-2xl"
                  aria-label="Toggle urgent consultation"
                  type="button"
                />
                <div className="relative pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div
                      className={`rounded-xl p-3 shadow-sm ${
                        isUrgent ? "bg-orange-200" : "bg-white"
                      }`}
                    >
                      <Zap
                        className={`h-6 w-6 ${isUrgent ? "text-orange-700" : "text-orange-500"}`}
                      />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isUrgent
                          ? "bg-orange-500 text-white"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {isUrgent ? "Aktiviert" : "Express"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--color-navy)]">
                    Eil-Beratung
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-3xl font-bold ${isUrgent ? "text-orange-600" : "text-[var(--color-navy)]"}`}
                      >
                        +{PRICING.urgentSurcharge.amount} €
                      </span>
                      <span className="text-sm text-[var(--color-slate)]">
                        Aufschlag
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-sm ${isUrgent ? "text-orange-700 font-medium" : "text-orange-600"}`}
                    >
                      {isUrgent
                        ? "✓ Termin noch heute möglich"
                        : "Auf jeden Tarif buchbar"}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${isUrgent ? "text-orange-600" : "text-orange-400"}`}
                      />
                      <span>Termin noch heute möglich</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${isUrgent ? "text-orange-600" : "text-orange-400"}`}
                      />
                      <span>Priorisierte Bearbeitung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${isUrgent ? "text-orange-600" : "text-orange-400"}`}
                      />
                      <span>Flexible Terminoptionen</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-xs text-orange-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>
                      {isUrgent
                        ? "✓ Eil-Option aktiv"
                        : "Bei dringenden Anliegen"}
                    </span>
                  </div>
                </div>
                {isUrgent && (
                  <div className="relative mt-4 pointer-events-none">
                    <div className="rounded-lg bg-orange-500/10 p-3 text-center text-sm font-medium text-orange-700">
                      ⚡ Express-Service aktiviert
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="bg-white pb-20 lg:pb-28">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <div className="rounded-2xl border border-black/5 bg-[var(--color-ivory)] p-8 sm:p-10">
              {/* Selected Package Summary */}
              <div className="mb-6 rounded-xl bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--color-slate)]">
                      Ausgewähltes Paket
                    </p>
                    <p className="font-semibold text-[var(--color-navy)]">
                      {getSelectedTierName()}
                      {isUrgent && " ⚡ Eil-Service"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--color-slate)]">
                      Gesamtpreis
                    </p>
                    <p className="text-2xl font-bold text-[var(--color-navy)]">
                      {getTotalPrice()} €
                    </p>
                    {isUrgent && (
                      <p className="text-xs text-orange-600">
                        inkl. Eil-Aufschlag
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Show booking form or payment interface */}
              {!showPayment ? (
                <>
                  <BookingForm
                    selectedTier={selectedTier}
                    isUrgent={isUrgent}
                    totalPrice={getTotalPrice()}
                    onSubmit={handleBookingSubmit}
                    isSubmitting={isSubmitting}
                    submitStatus={submitStatus}
                  />
                  {submitStatus.type && (
                    <div
                      className={`mt-6 rounded-lg p-4 ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">
                      <CheckCircle2 className="inline h-4 w-4 mr-1" />
                      Bitte schließen Sie die Zahlung ab, um Ihren Termin zu
                      bestätigen.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-blue-600">
                      <span>👤 {bookingData?.name}</span>
                      <span>📧 {bookingData?.email}</span>
                      <span>📅 {bookingData?.preferredDate}</span>
                      <span>⏰ {bookingData?.preferredTime}</span>
                    </div>
                  </div>

                  <StripePayment
                    bookingData={bookingData}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />

                  <button
                    onClick={() => {
                      setShowPayment(false);
                      setSubmitStatus({ type: null, message: "" });
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Zurück zur Buchung
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
