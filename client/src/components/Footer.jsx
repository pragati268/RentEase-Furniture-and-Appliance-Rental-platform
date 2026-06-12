import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Furniture Rentals", to: "/products?category=Furniture" },
    { label: "Appliance Rentals", to: "/products?category=Appliance" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Cart", to: "/cart" },
  ];

  const categories = [
    { label: "Sofas", to: "/products/subCategory?category=Furniture&subCategory=Sofas" },
    { label: "Beds", to: "/products/subCategory?category=Furniture&subCategory=Beds" },
    { label: "Wardrobes", to: "/products/subCategory?category=Furniture&subCategory=Wardrobes" },
    { label: "Study Tables", to: "/products/subCategory?category=Furniture&subCategory=Study Tables" },
    { label: "Refrigerators", to: "/products/subCategory?category=Appliance&subCategory=Refrigerators" },
    { label: "Washing Machines", to: "/products/subCategory?category=Appliance&subCategory=Washing Machines" },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaFacebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-[#1F312A] text-white px-5 md:px-10 lg:px-20 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">RentEase</h2>
            <p className="text-gray-300 mt-3 text-sm leading-relaxed">
              Furniture and appliance rentals made simple, affordable, and hassle-free.
            </p>
            <p className="text-gray-400 mt-3 text-xs leading-relaxed">
              Helping you create comfortable living spaces without the burden of ownership.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-8">
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-4">Popular Categories</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    to={cat.to}
                    className="text-gray-300 text-sm hover:text-white transition-colors duration-300"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-gray-300 text-sm">
                <Mail size={16} className="text-gray-400 shrink-0" />
                support@rentease.com
              </li>
              <li className="flex items-center gap-2.5 text-gray-300 text-sm">
                <Phone size={16} className="text-gray-400 shrink-0" />
                +91 XXXXX XXXXX
              </li>
              <li className="flex items-center gap-2.5 text-gray-300 text-sm">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="mt-12">
          <h3 className="font-semibold text-sm tracking-widest uppercase mb-4">Follow Us</h3>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="bg-[#345246] p-2.5 rounded-full text-white hover:bg-white hover:text-[#1F312A] transition-all duration-300 hover:scale-110"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mt-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <p className="text-gray-400 text-sm">&copy; 2026 RentEase. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
