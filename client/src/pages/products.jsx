import API from "../services/api.js";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        console.log("FULL RESPONSE:", response);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div key={p._id} className="shadow p-4 rounded">
          <img
            src={p.images?.[0]?.url}
            alt=""
            className="h-40 w-full object-cover"
          />
          <h2 className="text-lg font-semibold mt-2">{p.title}</h2>
          <p>₹{p.pricePerMonth}/month</p>

          <a href={`/product/${p._id}`} className="text-blue-500">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
};

export default Products;
