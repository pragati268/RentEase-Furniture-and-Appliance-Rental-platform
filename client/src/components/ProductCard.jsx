import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { addToWishlist, removeFromWishlist } from "../services/api.js";

const ProductCard = ({ product, subCategory, wishlistItems = [] }) => {

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const handleWishlist = async (e) => {
    e.preventDefault(); // Prevent navigation to product detail page

    console.log("Clicked Product:", product._id);

    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
        console.log("Removed from wishlist");
      } else {
        await addToWishlist(product._id);
        console.log("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className={`group p-4 bg-white rounded-3xl overflow-hidden shadow-sm 
      hover:scale-105 hover:shadow-xl transition-all duration-300`}
    >
      {/* Product Image */}
      <div className=" relative overflow-hiddenbg-white border border-gray-200 rounded-lg">
        <img
          src={
            product.image
              ? product.image
              : "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.name}
          className="w-full h-74 rounded-lg object-cover object-center group"
        />

        {/* Wishlist Button */}
        <button
          className={`absolute top-4 right-4 bg-white/90 p-2 rounded-full 
            ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
          onClick={handleWishlist}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Product Details */}
      <div className="group flex rounded-b-3xl mt-4 items-start gap-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold tracking-tight leading-tight">
            {product.name}
          </h3>
          <p
            className={`${subCategory ? "hidden" : "block"} text-gray-500 mt-2`}
          >
            {product.category}
          </p>
        </div>
        <div className="ml-auto flex flex-col md:mt-0 items-center">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Monthly Rent</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-[#345246]">
              ₹{product.pricePerMonth}
            </span>

            <span className="text-gray-500 ml-1">/mo</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        className={`
        ${subCategory ? "flex" : "hidden"}
        mt-3
        flex-col
        sm:flex-row
        justify-center
        items-center
        gap-2
        sm:gap-3
        lg:gap-4
       `}
      >
        {/* Quick View Button */}
        <button
          className="
          w-full
          sm:w-auto

          text-sm
          md:text-md

          lg:px-4
          lg:text-md

          px-4
          py-2
          rounded-full
          border
        border-[#345246]
        text-[#345246]
        hover:bg-[#345246]
        hover:text-white
          transition-all
          duration-300
       "
        >
          Quick View
        </button>

        {/* Add to Cart Button */}
        <button
          className="
          w-full
          sm:w-auto

          text-sm
          md:text-md

          lg:px-4
          lg:text-md

          px-4
          py-2
          rounded-full
        bg-[#345246]
        text-white
          hover:scale-105
          transition-all
          duration-300
        "
        >
          Add to Cart
        </button>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
