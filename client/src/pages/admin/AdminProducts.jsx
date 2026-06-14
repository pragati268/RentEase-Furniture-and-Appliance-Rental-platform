import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import API from "../../services/api.js";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await API.delete(`/admin/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-[#1f312a] mb-5">Products</h1>

      <button
        onClick={() => navigate("/admin/products/add")}
        className="w-full bg-[#345246] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#2a4238] transition-colors mb-5 flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Product
      </button>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div
              onClick={() => navigate(`/admin/products/view/${product._id}`)}
              className="flex gap-4 p-4 cursor-pointer"
            >
              <img
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#1f312a] truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                <p className="text-sm font-semibold text-[#345246] mt-1">₹{product.pricePerMonth?.toLocaleString()}/month</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100"
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(product._id, product.name)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center text-gray-400 py-12">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
