import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api.js";
import { addToCart } from "../services/cart.js";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  RefreshCcwDot,
  Settings,
  Heart,
  ShoppingCart,
  Star,
  ShieldCheck,
  BadgeCheck,
  Wrench,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await API.get("/wishlist");
        setWishlistItems(response.data);
      } catch (err) {
        if (err.response?.status === 401) return;
        console.log(err);
      }
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (!product) return;
    const fetchSimilar = async () => {
      try {
        const res = await API.get(
          `/products/subCategory?category=${product.category}&subCategory=${product.subCategory}`
        );
        setSimilarProducts(
          res.data.filter((p) => p._id !== product._id).slice(0, 8)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchSimilar();
  }, [product]);

  const prevImage = () => {
    if (!product.images?.length) return;
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    if (!product.images?.length) return;
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (!product) return <p>Loading...</p>;

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await API.delete(`/wishlist/remove/${product._id}`);
        setWishlistItems((prev) =>
          prev.filter((item) => item._id !== product._id)
        );
      } else {
        await API.post(`/wishlist/add/${product._id}`);
        setWishlistItems((prev) => [...prev, product]);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.info("Please login first to use wishlist");
        return;
      }
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F1] px-5 md:px-10 lg:px-10 py-22 lg:py-24">
      <Navbar compact />

      <div className="max-w-7xl mx-auto py-10">
        <Breadcrumb
          items={[
            ...(product.category
              ? [
                  {
                    label: product.category,
                    link: `/products?category=${product.category}`,
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-15 gap-15">
          {/* Left - Images */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm">
              <img
                src={
                  product.images?.length
                    ? product.images[currentImage]
                    : product.image
                }
                alt={product.name}
                className="w-full h-100 md:h-125 object-cover"
              />

              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImage === index
                        ? "border-[#345246]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Category Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={`/products?category=${product.category}`}
                className="text-xs font-medium bg-[#345246]/10 text-[#345246] px-3 py-1 rounded-full hover:bg-[#345246]/20 transition"
              >
                {product.category}
              </Link>
              <Link
                to={`/products?category=${product.category}`}
                className="text-xs font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300 transition"
              >
                {product.subCategory}
              </Link>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1f312a] leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-md text-sm">
                <Star size={14} fill="currentColor" />
                <span className="font-medium">{product.ratings}</span>
              </div>
              <span className="text-gray-500 text-sm">
                ({product.numOfReviews} Reviews)
              </span>
            </div>

            {/* Monthly Rent */}
            <div className="mt-2">
              <span className="text-4xl md:text-5xl font-bold text-[#1f312a]">
                ₹{product.pricePerMonth}
              </span>
              <span className="text-lg text-gray-500 ml-1">/month</span>
            </div>

            {/* Price Comparison */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">M.R.P:</span>
              <span className="line-through text-gray-400">₹{product.price}</span>
              <span className="text-green-700 font-medium">
                {Math.round(
                  ((product.price - product.pricePerMonth) / product.price) * 100
                )}
                % off
              </span>
            </div>

            {/* Security Deposit */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Security Deposit</span>
                <span className="font-semibold text-[#1f312a]">
                  ₹{product.securityDeposit}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Refundable Deposit</p>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              {Number(product.stock) > 0 ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={18} className="text-green-600" />
                    <span className="font-medium text-green-700">In Stock</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Only {product.stock} Left
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Rental Benefits */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Truck size={16} className="text-[#345246]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wrench size={16} className="text-[#345246]" />
                <span>Maintenance Included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCcwDot size={16} className="text-[#345246]" />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Product added to cart!");
                }}
                className="flex-1 bg-[#345246] hover:bg-[#2b4238] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart size={20} />
                Add To Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`px-5 border-2 rounded-2xl transition flex items-center justify-center ${
                  isWishlisted
                    ? "border-red-400 text-red-500"
                    : "border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-400"
                }`}
              >
                <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Product Highlights */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mt-2">
              <h3 className="font-semibold text-[#1f312a] mb-3">
                Product Highlights
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {[
                  "Premium Quality",
                  "Free Installation",
                  "Maintenance Included",
                  "Damage Protection",
                ].map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck size={16} className="text-[#345246] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="rounded-3xl bg-white p-6 md:p-8 mt-10 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1f312a]">
            About This Product
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description ||
              "No description available for this product."}
          </p>
        </div>

        {/* Specifications Section */}
        <div className="rounded-2xl bg-white p-5 mt-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1f312a] mb-4">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {[
              { label: "Category", value: product.category },
              { label: "Sub Category", value: product.subCategory },
              { label: "City", value: product.city },
              { label: "Stock", value: `${product.stock} units` },
              { label: "Material", value: product.material || "—" },
              { label: "Color", value: product.color || "—" },
              { label: "Dimensions", value: product.dimensions || "—" },
              { label: "Brand", value: product.brand || "—" },
              { label: "Weight", value: product.weight || "—" },
              { label: "Security Deposit", value: `₹${product.securityDeposit}` },
              { label: "Monthly Rent", value: `₹${product.pricePerMonth}` },
              { label: "Rating", value: `${product.ratings} / 5` },
            ].map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between py-1.5 text-sm border-b border-gray-50 last:border-0"
              >
                <span className="text-gray-400">{spec.label}</span>
                <span className="font-medium text-[#1f312a]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#1f312a] mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  subCategory={product.subCategory}
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
