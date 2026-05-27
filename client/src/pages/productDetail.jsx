import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleBooking = async () => {
    try {

      if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
      }

      await API.post("/bookings/create", {
        productId: id,
        startDate,
        endDate,
      });

      alert("Booking successful!");
    } catch (err) {
      alert(err.response?.data || "Booking failed");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img src={product.images?.[0]?.url} className="h-64" />

      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p>₹{product.pricePerMonth}/month</p>

      {/* Date Inputs */}
      <div className="mt-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2"
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-black text-white px-4 py-2 mt-4"
        disabled={!startDate || !endDate}
      >
        Book Now
      </button>
    </div>
  );
};

export default ProductDetail;

