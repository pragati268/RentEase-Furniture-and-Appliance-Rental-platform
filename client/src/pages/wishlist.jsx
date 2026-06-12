import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await API.get("/wishlist");

        setWishlistItems(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.info("Please login first to view wishlist");
          return;
        }
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F1] px-5 md:px-10 lg:px-16 py-24">
      <Navbar compact={true} />

      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="text-4xl font-bold text-[#345246] mb-8">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              subCategory={product.subCategory}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Wishlist;