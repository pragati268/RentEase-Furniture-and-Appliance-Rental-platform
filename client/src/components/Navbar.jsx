import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Search, ExternalLink, Menu, X, Home, Info, User, Sofa, Tv, LogOut, ChevronDown, Package } from "lucide-react";
import { toast } from "react-toastify";
import API from "../services/api";

const Navbar = ({ compact = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      setIsMenuOpen(false);
      setProfileOpen(false);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.info("Please login first to logout");
        return;
      }
      toast.error("Logout failed");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#345246]/90 backdrop-blur-md text-white">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-15 py-4 md:gap-3 lg:gap-4">
        <Link to="/" className="text-2xl md:text-3xl font-semibold">RentEase</Link>

        {/* Search */}
        <div className="hidden md:flex md:px-1 md:py-1 md:w-[40%] items-center border rounded-2xl px-4 py-2 w-[45%] text-white lg:w-[55%]">
          <input
            type="text"
            placeholder="Search furniture, appliances to rent..."
            className="outline-none w-full px-3 py-2 bg-transparent text-sm lg:text-md lg:text-md lg:px-5 lg:py-3"
          />
          <Search className="text-gray-300 mr-2" />
        </div>

        {/* Main Desktop Links */}
        {!compact && (
          <div className="hidden lg:flex items-center gap-5">
            <a href="#home" className="text-gray-200 hover:text-white transition-colors duration-300">Home</a>
            <a href="#about" className="text-gray-200 hover:text-white transition-colors duration-300">About</a>
          </div>
        )}

        {/* Category rental page links */}
        {compact && (
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/" className="text-gray-200 hover:text-white transition-colors duration-300">Home</Link>
            <Link to="/about" className="text-gray-200 hover:text-white transition-colors duration-300">About</Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          {!authLoading && !user && (
            <div className="hidden md:flex md:px-3 md:py-2 items-center gap-2 lg:gap-4 bg-[#3B5D4F] px-4 lg:px-5 py-3 lg:mr-3 rounded-xl hover:bg-[#2b4238]/80 transition-colors duration-300">
              <Link to="/login">Login/Signup</Link>
              <ExternalLink size={18} />
            </div>
          )}
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-white/10 transition-all duration-300" title="Wishlist">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="p-2 rounded-full hover:bg-white/10 transition-all duration-300" title="Cart">
              <ShoppingCart size={20} />
            </Link>
          </div>

          {!authLoading && user && (
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-[#3B5D4F] hover:bg-[#2b4238] px-3 py-2 rounded-xl transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#45685A] flex items-center justify-center text-sm font-semibold">
                  {user.fullname?.charAt(0).toUpperCase() || <User size={16} />}
                </div>
                <span className="text-sm font-medium">{user.fullname?.split(" ")[0] || "Account"}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-4 bg-gray-50">
                    <p className="font-semibold text-gray-900">{user.fullname}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User size={16} className="text-gray-400" /> My Profile
                    </Link>
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Package size={16} className="text-gray-400" /> My Bookings
                    </Link>
                  </div>
                  <div className="border-t border-gray-100">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300 overflow-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-[#345246] z-50 shadow-2xl
        flex flex-col
        transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Top Bar: Logo + Close */}
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-xl font-semibold">RentEase</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Section */}
        {user && (
          <>
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="w-12 h-12 rounded-full bg-[#45685A] flex items-center justify-center shrink-0">
                <User size={22} className="text-white/80" />
              </div>
              <div>
                <p className="font-semibold text-base">{user.fullname}</p>
                <p className="text-sm text-white/60">Welcome back!</p>
              </div>
            </div>
            <div className="mx-6 border-t border-white/10" />
          </>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {/* Navigation Links */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
            <Home size={20} /> Home
          </Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
            <Info size={20} /> About
          </Link>
          {user && (
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
              <Heart size={20} /> Wishlist
            </Link>
          )}
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
            <ShoppingCart size={20} /> Cart
          </Link>
          {user && (
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
              <User size={20} /> My Profile
            </Link>
          )}
          {user && (
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
              <Package size={20} /> My Bookings
            </Link>
          )}

          {/* Explore Rentals Section */}
          <div className="pt-5 pb-1">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 mb-2">Explore Rentals</p>
            <Link to="/products?category=Furniture" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
              <Sofa size={20} /> Furniture Rentals
            </Link>
            <Link to="/products?category=Appliance" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
              <Tv size={20} /> Appliance Rentals
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-3" />

          {/* Auth Section */}
          {!authLoading && !user && (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all">
              <LogOut size={20} className="rotate-180" /> Login / Sign Up
            </Link>
          )}
          {user && (
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-[#45685A] transition-all w-full text-left">
              <LogOut size={20} /> Logout
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed">
            &copy; 2026 RentEase<br />
            Furniture &amp; Appliance Rentals
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
