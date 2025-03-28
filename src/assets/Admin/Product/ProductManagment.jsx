import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { Navbar } from "../Home/Sidebar";
import Sidebar from "../Home/Sidebar";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSaveProduct = async (product) => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/products/${editingProduct.id}`, product);
        setProducts(products.map((p) => (p.id === editingProduct.id ? product : p)));
        setEditingProduct(null);
      } else {
        const res = await axios.post("http://localhost:5000/products", product);
        setProducts([...products, res.data]);
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const toggleProductStatus = async (id, newStatus) => {
    await axios.patch(`http://localhost:5000/products/${id}`, { status: newStatus });
    setProducts(products.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
  };

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-6 space-y-6">
          <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">🛒 Product Management</h2>
            <ProductForm onSave={handleSaveProduct} />
            <ProductTable products={products} onEdit={setEditingProduct} onToggleStatus={toggleProductStatus} />
          </div>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-600 mb-4">✏ Edit Product</h3>
            <ProductForm onSave={handleSaveProduct} editingProduct={editingProduct} />
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => setEditingProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
