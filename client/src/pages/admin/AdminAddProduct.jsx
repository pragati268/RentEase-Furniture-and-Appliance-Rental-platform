import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../../services/api.js";
import { toast } from "react-toastify";

const categories = ["Furniture", "Appliance"];

const subCategories = {
  Furniture: ["Sofa", "Chair", "Bed", "Wardrobe", "Study Table"],
  Appliance: ["TV", "Refrigerator", "Washing Machine", "Microwave", "AC"],
};

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    category: "Furniture",
    subCategory: "Sofa",
    description: "",
    pricePerMonth: "",
    securityDeposit: "",
    stock: "",
    city: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit) {
      API.get(`/admin/products/${id}`)
        .then((res) => {
          const p = res.data;
          setForm({
            name: p.name || "",
            category: p.category || "Furniture",
            subCategory: p.subCategory || "",
            description: p.description || "",
            pricePerMonth: p.pricePerMonth || "",
            securityDeposit: p.securityDeposit || "",
            stock: p.stock || "",
            city: p.city || "",
            image: p.images?.[0] || "",
          });
        })
        .catch(() => toast.error("Failed to load product"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      category: form.category,
      subCategory: form.subCategory,
      description: form.description,
      price: Number(form.pricePerMonth),
      pricePerDay: Math.round(Number(form.pricePerMonth) / 30),
      pricePerMonth: Number(form.pricePerMonth),
      securityDeposit: Number(form.securityDeposit),
      stock: Number(form.stock),
      city: form.city,
      images: form.image ? [form.image] : [],
      isAvailable: Number(form.stock) > 0,
    };

    try {
      if (isEdit) {
        await API.put(`/admin/products/${id}`, payload);
        toast.success("Product updated");
      } else {
        await API.post("/admin/products", payload);
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch {
      toast.error(isEdit ? "Failed to update product" : "Failed to create product");
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1f312a] mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <h1 className="text-xl font-bold text-[#1f312a] mb-5">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={(e) => {
              handleChange(e);
              setForm((prev) => ({ ...prev, subCategory: subCategories[e.target.value]?.[0] || "" }));
            }}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Sub Category</label>
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          >
            {(subCategories[form.category] || []).map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Rent (₹)</label>
          <input
            type="number"
            name="pricePerMonth"
            value={form.pricePerMonth}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Security Deposit (₹)</label>
          <input
            type="number"
            name="securityDeposit"
            value={form.securityDeposit}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#345246] text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#345246] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#2a4238] transition-colors"
        >
          {isEdit ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
