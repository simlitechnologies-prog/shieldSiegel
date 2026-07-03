"use client";

import { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2, CreditCard, Shield, Lock, AlertCircle } from "lucide-react";

// Initialize Stripe with your public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface StripePaymentProps {
  bookingData: {
    name: string;
    email: string;
    amount: number;
    bookingReference?: string;
    selectedTier: string;
    isUrgent: boolean;
    preferredDate: string;
    preferredTime: string;
  };
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

// Checkout Form Component
function CheckoutForm({
  onSuccess,
  onError,
  clientSecret,
}: {
  onSuccess: (id: string) => void;
  onError: (error: string) => void;
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      setIsReady(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setPaymentError("Stripe ist noch nicht bereit");
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(
          submitError.message || "Fehler beim Überprüfen der Zahlungsdaten",
        );
        onError(
          submitError.message || "Fehler beim Überprüfen der Zahlungsdaten",
        );
        setIsLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking/confirmation`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment confirmation error:", error);
        setPaymentError(error.message || "Ein Fehler ist aufgetreten");
        onError(error.message || "Ein Fehler ist aufgetreten");
      } else if (paymentIntent) {
        console.log("Payment intent status:", paymentIntent.status);
        if (paymentIntent.status === "succeeded") {
          onSuccess(paymentIntent.id);
        } else if (paymentIntent.status === "requires_action") {
          // Handle 3D Secure
          const { error: confirmError, paymentIntent: confirmedIntent } =
            await stripe.confirmPayment({
              elements,
              confirmParams: {
                return_url: `${window.location.origin}/booking/confirmation`,
              },
              redirect: "if_required",
            });

          if (confirmError) {
            setPaymentError(confirmError.message || "3D Secure Fehler");
            onError(confirmError.message || "3D Secure Fehler");
          } else if (
            confirmedIntent &&
            confirmedIntent.status === "succeeded"
          ) {
            onSuccess(confirmedIntent.id);
          }
        } else {
          setPaymentError(
            `Unbekannter Zahlungsstatus: ${paymentIntent.status}`,
          );
          onError(`Unbekannter Zahlungsstatus: ${paymentIntent.status}`);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ein unerwarteter Fehler ist aufgetreten";
      setPaymentError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!stripe || !elements || !isReady) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-navy)]" />
        <span className="ml-2 text-[var(--color-slate)]">
          Lade Zahlungsoberfläche...
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          <span>Sichere Zahlung mit Stripe</span>
        </div>
        <PaymentElement
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: "",
                email: "",
              },
            },
          }}
        />
      </div>

      {paymentError && (
        <div className="rounded-lg bg-red-50 p-4 flex items-start gap-2 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>{paymentError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading || !isReady}
        className="w-full rounded-xl bg-[var(--color-navy)] px-6 py-4 text-white transition-all hover:bg-[var(--color-navy)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Zahlung wird verarbeitet...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <CreditCard className="h-5 w-5" />
            Jetzt bezahlen
          </span>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <Shield className="h-3 w-3" />
        <span>
          Zahlung wird durch Stripe verarbeitet. Ihre Daten sind sicher.
        </span>
      </div>
    </form>
  );
}

// Main Payment Component
export function StripePayment({
  bookingData,
  onSuccess,
  onError,
}: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("Creating payment intent with data:", bookingData);

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: bookingData.amount,
            currency: "eur",
            metadata: {
              bookingReference: bookingData.bookingReference || "",
              selectedTier: bookingData.selectedTier,
              isUrgent: String(bookingData.isUrgent),
              preferredDate: bookingData.preferredDate,
              preferredTime: bookingData.preferredTime,
              customerName: bookingData.name,
              customerEmail: bookingData.email,
            },
          }),
        });

        const responseData = await response.json();
        console.log("Payment intent response:", responseData);

        if (!response.ok) {
          throw new Error(
            responseData.error || "Failed to create payment intent",
          );
        }

        if (!responseData.clientSecret) {
          throw new Error("No client secret received");
        }

        setClientSecret(responseData.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Fehler beim Initialisieren der Zahlung";
        setError(errorMessage);
        onError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [bookingData, onError]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-navy)]" />
        <p className="mt-4 text-[var(--color-slate)]">
          Zahlung wird vorbereitet...
        </p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
        <p className="mt-2 text-red-700">
          {error || "Ein Fehler ist aufgetreten"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#1a2a3a",
              colorBackground: "#ffffff",
              colorText: "#1a2a3a",
              fontFamily: "system-ui, -apple-system, sans-serif",
            },
            rules: {
              ".Input": {
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
              },
              ".Input:focus": {
                borderColor: "#1a2a3a",
                boxShadow: "0 0 0 2px rgba(26, 42, 58, 0.1)",
              },
            },
          },
        }}
      >
        <CheckoutForm
          onSuccess={onSuccess}
          onError={onError}
          clientSecret={clientSecret}
        />
      </Elements>
    </div>
  );
}
