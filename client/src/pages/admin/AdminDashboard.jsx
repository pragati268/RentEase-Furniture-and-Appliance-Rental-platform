import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Users, CalendarCheck, IndianRupee, Eye } from "lucide-react";
import API from "../../services/api.js";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#345246]"></div>
      </div>
    );
  }

  const { stats, recentBookings } = data;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    active: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statCards = [
    { label: "Products", value: stats.totalProducts, icon: Package, color: "bg-blue-500" },
    { label: "Users", value: stats.totalUsers, icon: Users, color: "bg-green-500" },
    { label: "Active Rentals", value: stats.activeRentals, icon: CalendarCheck, color: "bg-purple-500" },
    { label: "Revenue", value: `₹${(stats.monthlyRevenue || 0).toLocaleString()}`, icon: IndianRupee, color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-[#1f312a] mb-5">Dashboard</h1>

      <div className="space-y-3 mb-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-bold text-[#1f312a]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-[#1f312a] mb-4">Recent Bookings</h2>
      <div className="space-y-3">
        {recentBookings?.map((booking) => (
          <div key={booking._id} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-medium text-[#1f312a]">Customer: {booking.user?.fullname || "N/A"}</p>
            <p className="text-sm text-gray-500 mt-1">Product: {booking.product?.name || "N/A"}</p>
            <p className="text-sm text-gray-500">Start: {new Date(booking.startDate).toLocaleDateString()}</p>
            <div className="flex items-center justify-between mt-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}>
                {booking.status}
              </span>
              <button
                onClick={() => navigate("/admin/bookings")}
                className="text-sm text-[#345246] font-medium flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> View
              </button>
            </div>
          </div>
        ))}
        {(!recentBookings || recentBookings.length === 0) && (
          <p className="text-center text-gray-400 py-8">No bookings yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
