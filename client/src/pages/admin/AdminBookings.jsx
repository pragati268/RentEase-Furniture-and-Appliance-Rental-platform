import { useState, useEffect } from "react";
import API from "../../services/api.js";
import { toast } from "react-toastify";

const statuses = ["pending", "confirmed", "active", "completed", "cancelled"];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");
      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await API.patch(`/admin/bookings/${bookingId}`, { status: newStatus });
      setBookings((prev) => prev.map((b) => (b._id === bookingId ? res.data : b)));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-[#1f312a] mb-5">Bookings</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-semibold text-[#1f312a]">{booking.user?.fullname || "N/A"}</p>
            <p className="text-sm text-gray-600 mt-0.5">{booking.product?.name || "N/A"}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span>Start: {formatDate(booking.startDate)}</span>
              <span>End: {formatDate(booking.endDate)}</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <select
                value={booking.status}
                onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <p className="text-center text-gray-400 py-12">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
