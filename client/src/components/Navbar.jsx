import React from "react";
import { Heart, Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({ compact = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#345246]/90 backdrop-blur-md text-white">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-20 py-4">
        <h1 className="text-2xl md:text-3xl font-semibold">RentEase</h1>

        {/* Search */}
        <div className="hidden md:flex items-center border rounded-2xl px-4 py-2 w-[45%] lg:w-[55%]">
          <input
            type="text"
            placeholder="Search furniture, appliances to rent..."
            className="outline-none w-full px-3 py-2 bg-transparent text-sm lg:text-md"
          />

          <Search className="text-gray-300 mr-2" />
        </div>

        {/* Main Desktop Links */}
        {!compact && (
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="#home"
              className="text-gray-200 hover:text-white transition-colors duration-300"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-gray-200 hover:text-white transition-colors duration-300"
            >
              About
            </a>
          </div>
        )}

        {/* Category rental page links */}
        {compact && (
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/"
              className="text-gray-200 hover:text-white transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-200 hover:text-white transition-colors duration-300"
            >
              About Us
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 lg:gap-4 bg-[#3B5D4F] px-4 lg:px-5 py-3 lg:mr-3 rounded-full hover:bg-[#2b4238]/80 transition-colors duration-300">
            <Link to="/login">Login/Signup</Link>

            <ExternalLink size={18} />
          </div>

          <button className="hidden md:flex p-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <Link to="/wishlist">
              <Heart />
            </Link>
          </button>

          <button className="hidden md:flex p-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <Link to="/cart">
              <ShoppingCart />
            </Link>
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-70 bg-[#345246] z-50 shadow-2xl
        transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col items-start gap-8 px-8 mt-10 text-lg">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-200 hover:text-white transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-200 hover:text-white transition-colors duration-300"
          >
            About
          </Link>

          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-200 hover:text-white transition-colors duration-300"
          >
            Login / Signup
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            Cart
          </Link>

          {/* footer */}
          <div className="absolute bottom-5 left-8 text-gray-400 text-sm">
            &copy; 2026 RentEase. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
