"use client";

import { useState, useEffect } from "react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
  BookingData,
} from "@/lib/firebase/admin-booking";
import { useAuth } from "../../../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  Trash2,
  Check,
  X,
  FileText,
} from "lucide-react";

export default function AdminAppointmentsPage() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBookings();
      setBookings(data);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: BookingData["status"],
  ) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      await fetchBookings();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Delete booking
  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await deleteBooking(bookingId);
      await fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  // View booking details
  const handleViewDetails = (booking: BookingData) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  // Format price - amount is already in euros
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: BookingData["status"] }) => {
    const config = {
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-3 w-3" />,
      },
      confirmed: {
        label: "Confirmed",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <CheckCircle className="h-3 w-3" />,
      },
      completed: {
        label: "Completed",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: <Check className="h-3 w-3" />,
      },
      cancelled: {
        label: "Cancelled",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: <X className="h-3 w-3" />,
      },
    };

    const configItem = config[status];
    return (
      <Badge
        className={`flex items-center gap-1 px-2 py-1 ${configItem.className}`}
      >
        {configItem.icon}
        {configItem.label}
      </Badge>
    );
  };

  // Payment status badge
  const PaymentStatusBadge = ({
    status,
  }: {
    status: BookingData["paymentStatus"];
  }) => {
    const config = {
      pending: {
        label: "Pending",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
      },
      paid: {
        label: "Paid",
        className: "bg-green-50 text-green-700 border-green-200",
      },
      failed: {
        label: "Failed",
        className: "bg-red-50 text-red-700 border-red-200",
      },
      refunded: {
        label: "Refunded",
        className: "bg-gray-50 text-gray-700 border-gray-200",
      },
    };

    const configItem = config[status];
    return (
      <Badge variant="outline" className={configItem.className}>
        {configItem.label}
      </Badge>
    );
  };

  // Loading state
  if (loading) {
    return (
      <>
        <AdminTopbar title="Appointments" />
        <div className="flex items-center justify-center min-h-[60vh] p-6">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[var(--color-gold)] mx-auto" />
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <AdminTopbar title="Appointments" />
        <div className="p-6">
          <div className="rounded-lg bg-red-50 p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchBookings}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminTopbar title="Appointments" />
      <div className="space-y-6 p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-2xl font-bold text-[var(--color-navy)]">
              {bookings.length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          keyField={(a) => a.id}
          data={bookings}
          columns={[
            {
              header: "Client",
              accessor: (a) => (
                <div>
                  <p className="font-medium text-gray-900">{a.name}</p>
                  {a.isUrgent && (
                    <span className="inline-flex items-center text-xs text-orange-600">
                      <AlertCircle className="h-3 w-3 mr-0.5" />
                      Urgent
                    </span>
                  )}
                </div>
              ),
            },
            {
              header: "Email",
              accessor: (a) => (
                <a
                  href={`mailto:${a.email}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {a.email}
                </a>
              ),
            },
            {
              header: "Practice Area",
              accessor: (a) => <span className="text-sm">{a.legalArea}</span>,
            },
            {
              header: "Date & Time",
              accessor: (a) => (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {formatDate(a.preferredDate)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {a.preferredTime}
                  </span>
                </div>
              ),
            },
            {
              header: "Tier",
              accessor: (a) => (
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    a.selectedTier === "premium"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {a.selectedTier}
                </span>
              ),
            },
            {
              header: "Amount",
              accessor: (a) => (
                <span className="font-medium text-gray-900">
                  {formatPrice(a.totalPrice)}
                </span>
              ),
            },
            {
              header: "Payment",
              accessor: (a) => <PaymentStatusBadge status={a.paymentStatus} />,
            },
            {
              header: "Status",
              accessor: (a) => <StatusBadge status={a.status} />,
            },
            {
              header: "Actions",
              accessor: (a) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(a)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {a.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(a.id, "confirmed")}
                        className="rounded p-1 text-green-400 hover:bg-green-50 hover:text-green-600"
                        title="Confirm"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(a.id, "cancelled")}
                        className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600"
                        title="Cancel"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {a.status === "confirmed" && (
                    <button
                      onClick={() => handleStatusUpdate(a.id, "completed")}
                      className="rounded p-1 text-blue-400 hover:bg-blue-50 hover:text-blue-600"
                      title="Mark Complete"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />

        {/* Booking Details Modal */}
        {showDetails && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--color-navy)]">
                  Booking Details
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Booking Reference */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-500">Booking Reference</p>
                  <p className="font-mono font-medium">
                    {selectedBooking.bookingReference}
                  </p>
                </div>

                {/* Client Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">
                      {selectedBooking.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Legal Area</p>
                    <p className="font-medium">{selectedBooking.legalArea}</p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="rounded-lg border border-gray-200 p-3">
                  <h3 className="mb-2 text-sm font-semibold">
                    Appointment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm">
                        {formatDate(selectedBooking.preferredDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm">{selectedBooking.preferredTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tier</p>
                      <p className="text-sm capitalize">
                        {selectedBooking.selectedTier}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Urgent</p>
                      <p className="text-sm">
                        {selectedBooking.isUrgent ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Info - Fixed amount display */}
                <div className="rounded-lg border border-gray-200 p-3">
                  <h3 className="mb-2 text-sm font-semibold">
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-bold">
                        {formatPrice(selectedBooking.totalPrice)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <PaymentStatusBadge
                        status={selectedBooking.paymentStatus}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                {selectedBooking.message && (
                  <div className="rounded-lg border border-gray-200 p-3">
                    <p className="text-sm text-gray-500">Message</p>
                    <p className="mt-1 text-sm">{selectedBooking.message}</p>
                  </div>
                )}

                {/* Status Update */}
                <div className="border-t pt-4">
                  <p className="mb-2 text-sm font-semibold">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {["pending", "confirmed", "completed", "cancelled"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => {
                            handleStatusUpdate(
                              selectedBooking.id,
                              status as BookingData["status"],
                            );
                            setShowDetails(false);
                          }}
                          className={`rounded px-3 py-1 text-sm capitalize transition-colors ${
                            selectedBooking.status === status
                              ? "bg-[var(--color-navy)] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {status}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
