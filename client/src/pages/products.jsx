import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";
import Navbar from "../components/Navbar.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");

  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/products/subCategory?category=${category}`;

        if (activeFilter !== "All") {
          url += `&subCategory=${activeFilter}`;
        }

        const response = await API.get(url);

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [category, activeFilter]);
  const furnitureFilters = [
    "All",
    "Sofas",
    "Beds",
    "Mattresses",
    "Wardrobes",
    "Chairs",
    "Study Tables",
    "Dining Tables",
    "Coffee Tables",
    "TV Units",
    "Bookshelves",
    "Drawers",
    "Dressers",
    "Side Tables",
    "Recliners",
  ];

  const applianceFilters = [
    "All",
    "TVs",
    "Refrigerators",
    "Washing Machines",
    "Air Conditioners",
    "Microwaves",
    "Water Purifiers",
    "Air Purifiers",
  ];

  const filters =
    category === "Furniture" ? furnitureFilters : applianceFilters;

  return (
    <div className="min-h-screen bg-[#F0F2F1] px-5 md:px-10 lg:px-10 py-22 lg:py-24">
      <Navbar compact={true} />

      <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-[#345246] mb-3">
        {category ? `${category} Rentals` : "All Products"}
      </h1>
      <p className="text-gray-600 mb-7">
        {category
          ? `Explore our collection of ${category.toLowerCase()} available for rent.`
          : "Discover our wide range of furniture and appliances available for rent."}
      </p>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-3 rounded-full whitespace-nowrap border-none
           ${
             activeFilter === filter
               ? "bg-[#345246] text-white"
               : "bg-white border border-gray-200 text-gray-700 hover:border-[#345246]"
           }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block lg:w-85">
          <div className="bg-[#F8FAF9] rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1f312a]">Filters</h2>

            {/* Availability */}
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">Availability</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="accent-[#345246]" />
                  In Stock
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" className="accent-[#345246]" />
                  Out Of Stock
                </label>
              </div>
            </div>

            {/* Budget */}
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">Monthly Budget</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="budget" />
                  ₹0 - ₹500
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="budget" />
                  ₹501 - ₹1000
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="budget" />
                  ₹1001 - ₹5000
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="budget" />
                  ₹5000+
                </label>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              className="
                  mt-8
                  w-full
                  bg-[#345246]
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-[#2b4238]
                  transition
                "
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Products Section */}
        <div className="gap-2 lg:gap-6 flex flex-col w-full lg:w-[75%]">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-semibold text-gray-600">
              Showing {products.length} Products
            </h2>

            <select className="bg-[#F8FAF9] border border-gray-200 rounded-xl px-4 py-2 outline-none">
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div
              className="
      flex
      justify-center
      pt-12
      w-full
   
    
    
      
    "
            >
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm max-w-md">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No Products Found
                </h3>

                <p className="text-gray-500 mt-3">
                  We couldn't find any products in this category.
                </p>

                <button
                  onClick={() => setActiveFilter("All")}
                  className="
          mt-5
          px-6
          py-3
          bg-[#345246]
          text-white
          rounded-xl
        "
                >
                  View All Products
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
