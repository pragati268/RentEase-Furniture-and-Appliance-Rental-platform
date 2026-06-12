import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import API from "../../services/api.js";
import { toast } from "react-toastify";

const AdminProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/admin/products/${id}`);
      setProduct(res.data);
    } catch {
      toast.error("Failed to load product");
      navigate("/admin/products");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    try {
      await API.delete(`/admin/products/${id}`);
      toast.success("Product deleted");
      navigate("/admin/products");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#345246]"></div>
      </div>
    );
  }

  const images = product.images?.filter(Boolean) || [];

  return (
    <div>
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1f312a] mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {images.length > 0 && (
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {images.map((img, i) => (
                <div key={i} className="snap-center shrink-0 w-full">
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      document.querySelector(".snap-x")?.scrollTo({
                        left: i * document.querySelector(".snap-x")?.clientWidth,
                        behavior: "smooth",
                      });
                      setImageIndex(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === imageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-5 space-y-4">
          <h1 className="text-xl font-bold text-[#1f312a]">{product.name}</h1>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm font-medium text-[#1f312a]">{product.category}{product.subCategory ? ` - ${product.subCategory}` : ""}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Monthly Rent</span>
              <span className="text-sm font-semibold text-[#345246]">₹{product.pricePerMonth?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Security Deposit</span>
              <span className="text-sm font-medium text-[#1f312a]">₹{product.securityDeposit?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Stock</span>
              <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-700" : "text-red-700"}`}>
                {product.stock} {product.stock > 0 ? "available" : "out of stock"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">City</span>
              <span className="text-sm font-medium text-[#1f312a]">{product.city || "N/A"}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-sm text-[#1f312a] leading-relaxed">{product.description || "No description"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <button
          onClick={() => navigate(`/admin/products/edit/${id}`)}
          className="w-full bg-[#345246] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#2a4238] transition-colors flex items-center justify-center gap-2"
        >
          <Edit2 className="w-4 h-4" /> Edit Product
        </button>
        <button
          onClick={handleDelete}
          className="w-full bg-white text-red-600 py-3 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors border border-red-200 flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Delete Product
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetail;
