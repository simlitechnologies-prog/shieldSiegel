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
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: any;
  updatedAt: any;
  bookingReference?: string;
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

// Create a new booking
export async function createBooking(
  bookingData: Omit<
    BookingData,
    "createdAt" | "updatedAt" | "bookingReference"
  >,
) {
  try {
    // Generate a unique booking reference
    const reference = `BK-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const bookingDoc = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      bookingReference: reference,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Update the document with its own ID as reference
    await updateDoc(doc(db, "bookings", bookingDoc.id), {
      id: bookingDoc.id,
    });

    return {
      success: true,
      bookingId: bookingDoc.id,
      bookingReference: reference,
      data: bookingData,
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

// Get a single booking by ID
export async function getBooking(bookingId: string) {
  try {
    const bookingDoc = await getDoc(doc(db, "bookings", bookingId));
    if (bookingDoc.exists()) {
      return {
        success: true,
        data: { id: bookingDoc.id, ...bookingDoc.data() },
      };
    } else {
      return {
        success: false,
        error: "Booking not found",
      };
    }
  } catch (error) {
    console.error("Error fetching booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch booking",
    };
  }
}

// Get bookings by email
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

// Update booking status
export async function updateBookingStatus(
  bookingId: string,
  status: BookingData["status"],
) {
  try {
    await updateDoc(doc(db, "bookings", bookingId), {
      status,
      updatedAt: serverTimestamp(),
    });
    return {
      success: true,
      data: { id: bookingId, status },
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

// Update payment status
export async function updatePaymentStatus(
  bookingId: string,
  paymentStatus: BookingData["paymentStatus"],
) {
  try {
    await updateDoc(doc(db, "bookings", bookingId), {
      paymentStatus,
      updatedAt: serverTimestamp(),
    });
    return {
      success: true,
      data: { id: bookingId, paymentStatus },
    };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update payment status",
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
