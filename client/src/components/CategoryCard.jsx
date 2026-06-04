import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({
  title,
  subtitle,
  image,
  bottomIcon,
  productNumber,
}) => {
  return (
    <Link to={`/products?category=${title}`}>
      <div
        className="relative overflow-hidden rounded-2xl
      min-h-80 md:min-h-105 lg:min-h-80
      group cursor-pointer"
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover
        group-hover:scale-105 transition-transform duration-700"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#1d342b]/90 via-[#1d342b]/50 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10 text-white">
          <div>
            <h3 className="text-3xl md:text-5xl font-semibold">{title}</h3>

            <p className="mt-5 max-w-xs text-sm md:text-lg text-gray-200 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 mt-25">
              <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center">
                {bottomIcon}
              </div>

            <p className="text-lg">{productNumber}+ Products</p>

              <FaArrowRight className="text-white" size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
