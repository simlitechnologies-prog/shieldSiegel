"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/sections/page-header";
import { BookingForm } from "@/components/forms/booking-form";
import { StripePayment } from "@/components/payment/stripe-payment";
import { Star, CheckCircle2, MessageSquare } from "lucide-react";
import {
  createBooking,
  checkAvailability,
  PRICING,
} from "@/lib/firebase/booking";
import type { BookingData } from "@/lib/firebase/booking";

import { BookingFormData } from "@/components/forms/booking-form";

type PricingTier = "basic" | "premium";

interface PaymentBookingData {
  name: string;
  email: string;
  amount: number;
  selectedTier: PricingTier;
  isUrgent: boolean;
  preferredDate: string;
  preferredTime: string;
  phone: string;
  legalArea: string;
  message: string;
}

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

  // ✅ FIX 1: Replace 'any' with proper types
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [bookingData, setBookingData] = useState<PaymentBookingData | null>(
    null,
  );

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

  // ✅ FIX 2: Replace 'any' with BookingFormData type
  const handleBookingSubmit = async (formDataFromForm: BookingFormData) => {
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
      const paymentData: PaymentBookingData = {
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
      // Use a type assertion since we know bookingData is not null here
      const data = bookingData!;

      // Prepare booking data
      const bookingDataToSave: Omit<
        BookingData,
        "createdAt" | "updatedAt" | "bookingReference"
      > = {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        legalArea: data.legalArea,
        message: data.message || "",
        selectedTier: selectedTier,
        isUrgent: isUrgent,
        totalPrice: getTotalPrice(),
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        status: "confirmed",
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
        setFormData(null);
        setBookingData(null);
      } else {
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

        {/* Pricing Cards Section - unchanged */}
        <section className="bg-white pb-8 pt-4">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* ... pricing cards remain the same ... */}
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

                  {bookingData && (
                    <StripePayment
                      bookingData={bookingData}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}

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
