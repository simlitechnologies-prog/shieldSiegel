import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export interface BookingData {
  id: string;
  name: string;
  email: string;
  phone: string;
  legalArea: string;
  message: string;
  selectedTier: "basic" | "premium";
  isUrgent: boolean;
  totalPrice: number;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentIntentId?: string;
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  attended?: boolean;
  feedback?: string;
  rating?: number;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  revenue: number;
  urgent: number;
  paid: number;
}

const COLLECTION = "bookings";

// Get all bookings
export async function getBookings(): Promise<BookingData[]> {
  try {
    const bookingsRef = collection(db, COLLECTION);
    const q = query(bookingsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const bookings: BookingData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        legalArea: data.legalArea || "",
        message: data.message || "",
        selectedTier: data.selectedTier || "basic",
        isUrgent: data.isUrgent || false,
        totalPrice: data.totalPrice || 0,
        preferredDate: data.preferredDate || "",
        preferredTime: data.preferredTime || "",
        status: data.status || "pending",
        paymentStatus: data.paymentStatus || "pending",
        paymentIntentId: data.paymentIntentId || "",
        bookingReference: data.bookingReference || "",
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        notes: data.notes || "",
        attended: data.attended || false,
        feedback: data.feedback || "",
        rating: data.rating || 0,
      });
    });

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

// Get bookings with filters
export async function getBookingsByStatus(
  status: BookingData["status"],
): Promise<BookingData[]> {
  try {
    const bookingsRef = collection(db, COLLECTION);
    const q = query(
      bookingsRef,
      where("status", "==", status),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    const bookings: BookingData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        legalArea: data.legalArea || "",
        message: data.message || "",
        selectedTier: data.selectedTier || "basic",
        isUrgent: data.isUrgent || false,
        totalPrice: data.totalPrice || 0,
        preferredDate: data.preferredDate || "",
        preferredTime: data.preferredTime || "",
        status: data.status || "pending",
        paymentStatus: data.paymentStatus || "pending",
        paymentIntentId: data.paymentIntentId || "",
        bookingReference: data.bookingReference || "",
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        notes: data.notes || "",
        attended: data.attended || false,
        feedback: data.feedback || "",
        rating: data.rating || 0,
      });
    });

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings by status:", error);
    throw error;
  }
}

// Update booking status
export async function updateBookingStatus(
  bookingId: string,
  status: BookingData["status"],
): Promise<void> {
  try {
    const bookingRef = doc(db, COLLECTION, bookingId);
    await updateDoc(bookingRef, {
      status: status,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
}

// Update booking with additional data
export async function updateBooking(
  bookingId: string,
  data: Partial<BookingData>,
): Promise<void> {
  try {
    const bookingRef = doc(db, COLLECTION, bookingId);
    await updateDoc(bookingRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

// Delete booking
export async function deleteBooking(bookingId: string): Promise<void> {
  try {
    const bookingRef = doc(db, COLLECTION, bookingId);
    await deleteDoc(bookingRef);
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

// Get booking statistics
export async function getBookingStats(): Promise<BookingStats> {
  try {
    const bookings = await getBookings();

    const stats: BookingStats = {
      total: bookings.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      revenue: 0,
      urgent: 0,
      paid: 0,
    };

    bookings.forEach((booking) => {
      // Count by status
      switch (booking.status) {
        case "pending":
          stats.pending++;
          break;
        case "confirmed":
          stats.confirmed++;
          break;
        case "completed":
          stats.completed++;
          break;
        case "cancelled":
          stats.cancelled++;
          break;
      }

      // Count urgent
      if (booking.isUrgent) {
        stats.urgent++;
      }

      // Calculate revenue (only for paid and not cancelled)
      if (booking.paymentStatus === "paid" && booking.status !== "cancelled") {
        stats.revenue += booking.totalPrice;
        stats.paid++;
      }
    });

    return stats;
  } catch (error) {
    console.error("Error getting booking stats:", error);
    throw error;
  }
}
