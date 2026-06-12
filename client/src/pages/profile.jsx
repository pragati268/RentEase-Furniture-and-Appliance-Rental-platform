import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Edit3,
  Plus,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import API from "../services/api";

const SECTIONS = {
  ACCOUNT: "account",
  BOOKINGS: "bookings",
  ADDRESSES: "addresses",
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(SECTIONS.ACCOUNT);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await API.get("/wishlist");
      setWishlistItems(response.data);
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        console.log(res.data);
        setUser(res.data);
        setFormData({
          fullname: res.data.fullname || "",
          email: res.data.email || "",
          phone: "",
          city: "",
        });
      } catch {
        toast.info("Please login to view your profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (
      activeSection === SECTIONS.BOOKINGS ||
      activeSection === SECTIONS.ACCOUNT
    ) {
      const fetchBookings = async () => {
        setBookingsLoading(true);
        try {
          const res = await API.get("/bookings/my");
          setBookings(res.data.bookings || []);
        } catch {
          toast.error("Failed to load bookings");
        } finally {
          setBookingsLoading(false);
        }
      };
      fetchBookings();
    }
  }, [activeSection, bookings.length]);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const activeBookings = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending",
  );
  const completedBookings = bookings.filter((b) => b.status === "cancelled");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F1] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const sidebarItems = [
    { id: SECTIONS.ACCOUNT, label: "Account Details", icon: User },
    { id: SECTIONS.BOOKINGS, label: "My Bookings", icon: Package },
    { id: SECTIONS.ADDRESSES, label: "Saved Addresses", icon: MapPin },
  ];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F2F1]">
      <Navbar compact />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24 lg:py-28">
        <Breadcrumb items={[{ label: "My Profile" }]} />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28 flex flex-col gap-2 bg-white rounded-2xl shadow-sm p-3">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                      activeSection === item.id
                        ? "bg-[#345246] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Profile Header - shown in all sections */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#345246] flex items-center justify-center shrink-0">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {user.fullname?.charAt(0).toUpperCase() || (
                        <User size={28} />
                      )}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                      {user.fullname}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      Member since{" "}
                      {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toast.info("Edit update coming soon!");
                    setEditing(!editing);
                  }}
                  className="hidden md:flex items-center gap-2 text-sm text-[#345246] hover:text-[#2b4238] font-medium transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <Package size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activeBookings.length}
                    </p>
                    <p className="text-xs text-gray-500">Active Rentals</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Heart size={20} className="text-blue-600" />
                  </div>
                  <Link to="/wishlist">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {wishlistItems.length}
                      </p>
                      <p className="text-xs text-gray-500">Wishlist Items</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Star size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {completedBookings.length}
                    </p>
                    <p className="text-xs text-gray-500">Completed Rentals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            {activeSection === SECTIONS.ACCOUNT && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Full Name
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.fullname}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Phone Number
                    </p>
                    <p className="text-sm font-medium text-gray-500">—</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      City
                    </p>
                    <p className="text-sm font-medium text-gray-500">—</p>
                  </div>
                </div>
              </div>
            )}

            {/* My Bookings */}
            {activeSection === SECTIONS.BOOKINGS && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  My Rentals
                </h2>
                {bookingsLoading ? (
                  <p className="text-gray-500 text-sm">Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      No Rentals Yet
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
                      Start exploring our furniture and appliance collection.
                    </p>
                    <Link
                      to="/products"
                      className="inline-block mt-5 bg-[#345246] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#2b4238] transition-colors"
                    >
                      Browse Rentals
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border border-gray-100 rounded-xl p-4 md:p-5 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={
                                booking.product?.images?.[0] ||
                                booking.product?.image ||
                                "https://via.placeholder.com/150"
                              }
                              alt={booking.product?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {booking.product?.name || "Product"}
                                </h3>
                                <p className="text-lg font-bold text-[#345246] mt-1">
                                  ₹{booking.totalPrice}
                                </p>
                              </div>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm">
                              <p className="text-gray-500">
                                Duration:{" "}
                                <span className="text-gray-700 font-medium">
                                  {Math.ceil(
                                    (new Date(booking.endDate) -
                                      new Date(booking.startDate)) /
                                      (1000 * 60 * 60 * 24),
                                  )}{" "}
                                  days
                                </span>
                              </p>
                              <p className="text-gray-500">
                                Start:{" "}
                                <span className="text-gray-700">
                                  {formatDate(booking.startDate)}
                                </span>
                              </p>
                              <p className="text-gray-500">
                                End:{" "}
                                <span className="text-gray-700">
                                  {formatDate(booking.endDate)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Addresses */}
            {activeSection === SECTIONS.ADDRESSES && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={() =>
                      toast.info("Address management coming soon!")
                    }
                    className="flex items-center gap-2 text-sm text-[#345246] hover:text-[#2b4238] font-medium transition-colors"
                  >
                    <Plus size={16} />
                    Add New Address
                  </button>
                </div>
                {user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((addr, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-100 rounded-xl p-5"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <MapPin
                              size={18}
                              className="text-gray-400 mt-0.5 shrink-0"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {addr.fullName}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {addr.street}, {addr.city}
                                {addr.state ? `, ${addr.state}` : ""} -{" "}
                                {addr.pincode}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">
                                Phone: {addr.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                              Edit
                            </button>
                            <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">
                      No saved addresses yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
