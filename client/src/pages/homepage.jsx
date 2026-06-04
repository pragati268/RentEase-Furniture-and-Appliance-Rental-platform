import React from "react";
import { useState, useEffect } from "react";
import API from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import About from "../components/About.jsx";
import CategoriesSection from "../components/CategoriesSection.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

const Homepage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {

    const getFeaturedProducts = async () => {

      try {

        let url = "/products/featured";

        const response = await API.get(url);

        setFeaturedProducts(response.data);

      } catch (error) {
        console.log(error);
      }

    };

    getFeaturedProducts();

  }, [activeCategory]);


  return (
    <div className="min-h-screen bg-[#3B5D4F]">
      <Navbar />

      <main className="pt-20 md:pt-24">
        <HeroSection />

        <CategoriesSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          featuredProducts={featuredProducts}
        />
      </main>
    </div>
  );
};

export default Homepage;
