import React from "react";
import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard.jsx";
import ProductCard from "./ProductCard.jsx";

import { RiSofaLine } from "react-icons/ri";
import { PiOven } from "react-icons/pi";

const CategoriesSection = ({ activeCategory, setActiveCategory, featuredProducts}) => {
  const categories = ["All", "Furniture", "Appliance"];
  const [wishlistItems, setWishlistItems] = useState([]);

  return (
    <section
      id="categories"
      className="bg-[#F0F2F1] min-h-[72vh] px-5 md:px-10 lg:px-15 py-18 lg:py-20"
    >
      <div className="text-center flex">
        <h1 className="text-[#1f312a] mb-8 font-semibold tracking-tighter leading-tight text-2xl md:text-3xl lg:text-3.5xl">
          Browse Our Top Categories
        </h1>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryCard
          title="Furniture"
          subtitle="Stylish, comfortable, and made for every corner of your home."
          image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          bottomIcon={<RiSofaLine size={24} />}
          productNumber="120"
        />

        <CategoryCard
          title="Appliance"
          subtitle="Smart, efficient, and reliable appliances for everyday ease."
          image="https://images.unsplash.com/photo-1586208958839-06c17cacdf08"
          bottomIcon={<PiOven size={24} />}
          productNumber="80"
        />
      </div>

      <div className="mt-12">
        <p className="text-[#1f312a] font-semibold tracking-tighter leading-tight text-2xl md:text-3xl lg:text-3.5xl">
          Featured Rentals
        </p>
        <p className="text-gray-600 mt-2">
          Most loved furniture and appliances.
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} wishlistItems={wishlistItems} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
