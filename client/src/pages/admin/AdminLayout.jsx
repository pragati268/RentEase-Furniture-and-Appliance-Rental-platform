import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Package, CalendarCheck, Users, LogOut, User } from "lucide-react";
import API from "../../services/api.js";
import { toast } from "react-toastify";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/bookings", icon: CalendarCheck, label: "Bookings" },
  { to: "/admin/users", icon: Users, label: "Users" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setAdminName(res.data.fullname))
      .catch(() => {
        toast.error("Please login as admin");
        navigate("/login");
      });
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F1]">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#345246] text-white h-14 flex items-center px-4 shadow-md">
        <button onClick={() => setDrawerOpen(true)} className="p-2 -ml-2 hover:bg-[#2a4238] rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-base tracking-tight">RentEase Admin</h1>
        <div className="p-2 -mr-2 hover:bg-[#2a4238] rounded-lg">
          <User className="w-6 h-6" />
        </div>
      </nav>

      {drawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setDrawerOpen(false)} />
      )}

      <div className={`fixed top-0 left-0 h-full w-72 bg-[#345246] text-white z-50 transform transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-[#45685A]">
          <h2 className="text-lg font-bold">RentEase</h2>
          <button onClick={() => setDrawerOpen(false)} className="p-1 hover:bg-[#2a4238] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-[#45685A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#45685A] rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium truncate">{adminName || "Admin"}</p>
              <p className="text-xs text-gray-300">admin@rentease.com</p>
            </div>
          </div>
        </div>

        <nav className="py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#2a4238] text-white border-r-3 border-[#eec50e]"
                    : "text-gray-300 hover:bg-[#2a4238] hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#45685A]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#2a4238] hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      <main className="pt-14 p-4 pb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
