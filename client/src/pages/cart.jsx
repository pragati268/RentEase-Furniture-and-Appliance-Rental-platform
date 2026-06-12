import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Truck, Wrench, RefreshCcwDot, ShieldCheck, Minus, Plus } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { getCart, removeFromCart, clearCart } from "../services/cart.js";
import API from "../services/api.js";
import { toast } from "react-toastify";

const TENURES = [3, 6, 12];

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [tenures, setTenures] = useState({});
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
  };

  const handleRemove = (id) => {
    updateCart(removeFromCart(id));
    setTenures((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const setTenure = (id, months) => {
    setTenures((prev) => ({ ...prev, [id]: months }));
  };

  const calcItemRent = (item) => {
    const months = tenures[item._id] || 6;
    return months * Number(item.pricePerMonth);
  };

  const totalRent = cartItems.reduce((sum, item) => sum + calcItemRent(item), 0);
  const totalDeposit = cartItems.reduce((sum, item) => sum + Number(item.securityDeposit || 0), 0);
  const grandTotal = totalRent + totalDeposit;

  const handlePlaceBooking = async () => {
    if (!address.fullName || !address.phone || !address.address || !address.city || !address.pincode) {
      toast.error("Please fill in all delivery address fields.");
      return;
    }
    setPlacing(true);
    try {
      for (const item of cartItems) {
        const months = tenures[item._id] || 6;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);

        await API.post("/bookings/create", {
          productId: item._id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          deliveryAddress: address,
        });
      }
      clearCart();
      setCartItems([]);
      setTenures({});
      toast.success("Booking placed successfully!");
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        toast.info("Please login first to place a booking");
        return;
      }
      toast.error(err.response?.data || "Failed to place booking.");
    }
    setPlacing(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0F2F1] px-5 md:px-10 lg:px-10 py-22 lg:py-24">
        <Navbar compact />
        <div className="max-w-7xl mx-auto py-10 flex flex-col items-center justify-center text-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-[#1f312a]">Your Cart Is Empty</h2>
          <p className="text-gray-500 mt-2 mb-6">Looks like you haven&apos;t added any rentals yet.</p>
          <Link
            to="/"
            className="bg-[#345246] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#2b4238] transition"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F1] px-5 md:px-10 lg:px-10 py-22 lg:py-22">
      <Navbar compact />

      <div className="max-w-7xl mx-auto py-10">
        <Breadcrumb items={[{ label: "Cart" }]} />
        <h1 className="text-3xl font-bold text-[#1f312a] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Cart Items (70%) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cartItems.map((item) => {
              const selectedTenure = tenures[item._id] || 6;
              return (
                <div key={item._id} className="bg-white rounded-3xl p-5 shadow-sm">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={item.images?.[0] || item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1f312a] text-lg truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.category} &bull; {item.subCategory}
                      </p>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-bold text-[#1f312a]">₹{item.pricePerMonth}</span>
                        <span className="text-sm text-gray-500">/month</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Refundable Deposit: ₹{item.securityDeposit}
                      </p>
                    </div>
                  </div>

                  {/* Tenure Selection */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-600 mb-2">Select Rental Tenure</p>
                    <div className="flex gap-2">
                      {TENURES.map((m) => (
                        <button
                          key={m}
                          onClick={() => setTenure(item._id, m)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                            selectedTenure === m
                              ? "bg-[#345246] text-white border-[#345246]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#345246]"
                          }`}
                        >
                          {selectedTenure === m && "✓ "}
                          {m} Months
                        </button>
                      ))}
                    </div>

                    {/* Rental Cost Preview */}
                    <div className="mt-4 bg-[#F8FAF9] rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Rental Cost Preview</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Monthly Rent</span>
                        <span>₹{item.pricePerMonth}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-500">Duration</span>
                        <span>{selectedTenure} Months</span>
                      </div>
                      <div className="flex justify-between font-semibold text-[#1f312a] mt-2 pt-2 border-t border-gray-200">
                        <span>Estimated Rent</span>
                        <span>₹{calcItemRent(item)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Remove & Benefits */}
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={16} />
                      Remove Item
                    </button>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Truck size={14} /> Free Delivery</span>
                      <span className="flex items-center gap-1"><Wrench size={14} /> Maintenance</span>
                      <span className="flex items-center gap-1"><RefreshCcwDot size={14} /> Returns</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Order Summary (30%) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#1f312a] mb-5">Rental Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Products Rent</span>
                    <span className="font-medium">₹{totalRent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Refundable Deposit</span>
                    <span className="font-medium">₹{totalDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-[#1f312a]">Total Amount</span>
                    <span className="text-xl font-bold text-[#1f312a]">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="font-semibold text-[#1f312a] mb-4">Delivery Address</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#345246] text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#345246] text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#345246] text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#345246] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#345246] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Includes */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="font-semibold text-[#1f312a] mb-3">Booking Includes</h3>
                <div className="space-y-2">
                  {[
                    "Free Delivery",
                    "Free Installation",
                    "Maintenance Support",
                    "Damage Protection",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck size={16} className="text-[#345246] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Place Booking Button */}
              <button
                onClick={handlePlaceBooking}
                disabled={placing}
                className="w-full bg-[#345246] hover:bg-[#2b4238] disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold text-lg transition"
              >
                {placing ? "Placing..." : "Place Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
