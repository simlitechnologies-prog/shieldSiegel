import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  Timestamp,
  serverTimestamp,
  setDoc,
  runTransaction,
} from "firebase/firestore";

export interface BookingData {
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  legalArea: string;
  message?: string;
  selectedTier: "basic" | "premium";
  isUrgent: boolean;
  totalPrice: number;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: any;
  updatedAt: any;
  bookingReference?: string;
  paymentIntentId?: string;
  stripeCustomerId?: string;
  paymentAmount?: number;
  paymentCurrency?: string;

  metadata?: Record<string, any>;
}

export interface ConsultationPricing {
  basic: { price: number; currency: string };
  premium: { price: number; currency: string };
  urgentSurcharge: { amount: number; currency: string };
}

export const PRICING: ConsultationPricing = {
  basic: { price: 150, currency: "EUR" },
  premium: { price: 350, currency: "EUR" },
  urgentSurcharge: { amount: 50, currency: "EUR" },
};

// Create a new booking with transaction support
export async function createBooking(
  bookingData: Omit<
    BookingData,
    "createdAt" | "updatedAt" | "bookingReference" | "paymentIntentId"
  >,
) {
  try {
    // Generate a unique booking reference
    const reference = `BK-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Use a transaction to ensure atomicity
    const bookingRef = await runTransaction(db, async (transaction) => {
      const docRef = doc(collection(db, "bookings"));

      transaction.set(docRef, {
        ...bookingData,
        bookingReference: reference,
        paymentIntentId: null,
        stripeCustomerId: null,
        paymentAmount: bookingData.totalPrice,
        paymentCurrency: "EUR",
        metadata: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef;
    });

    // Get the created document
    const docSnapshot = await getDoc(bookingRef);
    const data = docSnapshot.data();

    return {
      success: true,
      bookingId: bookingRef.id,
      bookingReference: reference,
      data: { id: bookingRef.id, ...data },
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create booking",
    };
  }
}

// Update booking with payment information
export async function updateBookingWithPayment(
  bookingReference: string,
  paymentData: {
    paymentIntentId: string;
    paymentStatus: BookingData["paymentStatus"];
    stripeCustomerId?: string;
    metadata?: Record<string, any>;
  },
) {
  try {
    // Find booking by reference
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("bookingReference", "==", bookingReference),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    const bookingDoc = querySnapshot.docs[0];
    const bookingId = bookingDoc.id;

    // Update the booking with payment information
    await updateDoc(doc(db, "bookings", bookingId), {
      paymentIntentId: paymentData.paymentIntentId,
      paymentStatus: paymentData.paymentStatus,
      stripeCustomerId: paymentData.stripeCustomerId || null,
      metadata: {
        ...(bookingDoc.data().metadata || {}),
        ...paymentData.metadata,
      },
      updatedAt: serverTimestamp(),
    });

    // If payment is successful, update booking status to confirmed
    if (paymentData.paymentStatus === "paid") {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "confirmed",
        updatedAt: serverTimestamp(),
      });
    }

    return {
      success: true,
      data: {
        id: bookingId,
        bookingReference,
        paymentStatus: paymentData.paymentStatus,
      },
    };
  } catch (error) {
    console.error("Error updating booking with payment:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update booking",
    };
  }
}

// Update booking payment status
export async function updateBookingPaymentStatus(
  bookingReference: string,
  paymentStatus: BookingData["paymentStatus"],
  paymentIntentId?: string,
) {
  try {
    // Find booking by reference
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("bookingReference", "==", bookingReference),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    const bookingDoc = querySnapshot.docs[0];
    const bookingId = bookingDoc.id;

    // Update payment status
    await updateDoc(doc(db, "bookings", bookingId), {
      paymentStatus,
      paymentIntentId: paymentIntentId || null,
      updatedAt: serverTimestamp(),
    });

    // If payment is successful, update booking status to confirmed
    if (paymentStatus === "paid") {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "confirmed",
        updatedAt: serverTimestamp(),
      });
    }

    // If payment failed, update booking status to pending (keep it for retry)
    if (paymentStatus === "failed") {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "pending",
        updatedAt: serverTimestamp(),
      });
    }

    return {
      success: true,
      data: {
        id: bookingId,
        bookingReference,
        paymentStatus,
      },
    };
  } catch (error) {
    console.error("Error updating booking payment status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update payment status",
    };
  }
}

// Update booking status with optional payment status
export async function updateBookingStatus(
  bookingId: string,
  status: BookingData["status"],
  paymentStatus?: BookingData["paymentStatus"],
) {
  try {
    const updateData: any = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    await updateDoc(doc(db, "bookings", bookingId), updateData);
    return {
      success: true,
      data: { id: bookingId, status, paymentStatus },
    };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update booking status",
    };
  }
}

// Get booking by reference
export async function getBookingByReference(bookingReference: string) {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("bookingReference", "==", bookingReference),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    const bookingDoc = querySnapshot.docs[0];
    return {
      success: true,
      data: { id: bookingDoc.id, ...bookingDoc.data() },
    };
  } catch (error) {
    console.error("Error fetching booking by reference:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch booking",
    };
  }
}

// Get bookings with payment status filter
export async function getBookingsByPaymentStatus(
  paymentStatus: BookingData["paymentStatus"],
) {
  try {
    const q = query(
      collection(db, "bookings"),
      where("paymentStatus", "==", paymentStatus),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      success: true,
      data: bookings,
    };
  } catch (error) {
    console.error("Error fetching bookings by payment status:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch bookings",
    };
  }
}

// Get bookings by email with payment status
export async function getBookingsByEmail(email: string) {
  try {
    const q = query(
      collection(db, "bookings"),
      where("email", "==", email),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      success: true,
      data: bookings,
    };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch bookings",
    };
  }
}

// Check availability for a specific date and time
export async function checkAvailability(date: string, time: string) {
  try {
    const q = query(
      collection(db, "bookings"),
      where("preferredDate", "==", date),
      where("preferredTime", "==", time),
      where("status", "in", ["pending", "confirmed"]),
    );
    const querySnapshot = await getDocs(q);
    return {
      success: true,
      available: querySnapshot.empty,
      bookedCount: querySnapshot.size,
    };
  } catch (error) {
    console.error("Error checking availability:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to check availability",
    };
  }
}

// Cancel booking and handle payment refund if needed
export async function cancelBooking(
  bookingId: string,
  refundPayment: boolean = false,
) {
  try {
    const bookingDoc = await getDoc(doc(db, "bookings", bookingId));

    if (!bookingDoc.exists()) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    const bookingData = bookingDoc.data();

    // If refund is requested and payment was made
    if (
      refundPayment &&
      bookingData.paymentStatus === "paid" &&
      bookingData.paymentIntentId
    ) {
      // This should trigger a Stripe refund
      // You would call your backend API to handle the refund
      const refundResponse = await fetch("/api/refund-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: bookingData.paymentIntentId,
          bookingReference: bookingData.bookingReference,
        }),
      });

      if (!refundResponse.ok) {
        throw new Error("Failed to process refund");
      }

      await updateDoc(doc(db, "bookings", bookingId), {
        status: "cancelled",
        paymentStatus: "refunded",
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "cancelled",
        updatedAt: serverTimestamp(),
      });
    }

    return {
      success: true,
      data: { id: bookingId, status: "cancelled" },
    };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to cancel booking",
    };
  }
}

// Get booking statistics
export async function getBookingStats() {
  try {
    const bookingsRef = collection(db, "bookings");
    const querySnapshot = await getDocs(bookingsRef);

    const stats = {
      total: querySnapshot.size,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      paid: 0,
      failed: 0,
      totalRevenue: 0,
    };

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Count by status
      if (data.status === "pending") stats.pending++;
      if (data.status === "confirmed") stats.confirmed++;
      if (data.status === "completed") stats.completed++;
      if (data.status === "cancelled") stats.cancelled++;

      // Count by payment status
      if (data.paymentStatus === "paid") {
        stats.paid++;
        stats.totalRevenue += data.totalPrice || 0;
      }
      if (data.paymentStatus === "failed") stats.failed++;
    });

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch booking stats",
    };
  }
}
