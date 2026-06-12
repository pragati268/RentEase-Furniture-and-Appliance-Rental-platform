import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Star, Truck, RefreshCcwDot, Wrench } from "lucide-react";
import API from "../services/api.js";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login successful!");

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      console.log(formData);
      const response = await API.post("/auth/register", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      toast.success("Registration successful! Please login.");

      setIsRegister(false);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F1] flex">
      {/* Left - Branding Section */}
      <div className="hidden lg:flex flex-col w-[45%] bg-[#345246] py-8 px-10 relative overflow-hidden">
        {/* Logo */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">RentEase</h1>
        </div>

        {/* Hero Image */}
        <div className="relative z-10 flex-1 flex items-center justify-center mt-5 mb-3">
          <div className="relative w-full max-w-lg">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlfGVufDB8fDB8fHww"
              alt="Modern living room"
              className="w-full h-85 rounded-3xl shadow-2xl object-cover object-center relative z-10"
            />
          </div>
        </div>

        {/* Heading + Text */}
        <div className="relative z-10 mt-auto ">
          <h2 className="text-4xl font-bold text-white leading-tighter">
            Rent smarter,
            <br />
            Live better.
          </h2>
          <p className="text-gray-300 mt-3 text-sm leading-relaxed max-w-md">
            Furniture and appliances delivered to your doorstep without the
            burden of ownership.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="relative z-10 mt-6 flex gap-6">
          {[
            { icon: Truck, label: "Free Delivery" },
            { icon: RefreshCcwDot, label: "Easy Returns" },
            { icon: Wrench, label: "Maintenance Included" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-gray-300 text-xs"
            >
              <item.icon className="w-3.5 h-3.5 text-[#F0F2F1]" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative z-10 mt-6 pb-2">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm italic">
            &ldquo;RentEase helped me furnish my apartment within two days. The
            process was smooth and affordable.&rdquo;
          </p>
          <p className="text-gray-500 text-xs mt-1">&mdash; Customer Review</p>
        </div>
      </div>

      {/* Right - Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-8">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f312a]">
            {isRegister ? "Create Account" : "Welcome Back"}{" "}
            <span className="inline-block">{isRegister ? "" : "👋"}</span>
          </h1>
          <p className="text-gray-500 mt-2 mb-6">
            {isRegister
              ? "Sign up to start renting."
              : "Login to continue your rental journey."}
          </p>

          {/* Name (register only) */}
          {isRegister && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#345246] focus:border-transparent transition"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#345246] focus:border-transparent transition"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#345246] focus:border-transparent transition pr-11"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password (register only) */}
          {isRegister && (
            <div className="mb-2 mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#345246] focus:border-transparent transition pr-11"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={isRegister ? handleRegister : handleLogin}
            className="w-full py-3.5 rounded-xl bg-[#345246] text-white font-semibold text-base hover:bg-[#2a4238] transition-colors active:scale-[0.98] mt-4"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>

          {/* Toggle Mode */}
          <p className="text-center text-sm text-gray-500 mt-3">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-[#345246] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {isRegister ? "Login" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
