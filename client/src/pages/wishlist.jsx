import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await API.get("/wishlist");

        setWishlistItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F1] px-5 md:px-10 lg:px-16 py-24">

      <h1 className="text-4xl font-bold text-[#345246] mb-8">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {wishlistItems.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            wishlistItems={wishlistItems}
          />
        ))}

      </div>

    </div>
  );
};

export default Wishlist;