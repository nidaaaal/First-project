import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";

const ProductTable = ({ products, onEdit, onToggleStatus }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");


  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="men">men</option>
          <option value="women">women</option>
          <option value="kids">kids</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 text-green-600">Active Products</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Stock</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              .filter((p) => p.status === "Active")
              .map((product, index) => (
                <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-50">
                  <td className="border p-3">{product.id}</td>
                  <td className="border p-3 font-semibold">{product.name}</td>
                  <td className="border p-3 font-semibold">{product.category}</td>
                  <td className="border p-3 font-semibold">₹{product.price}</td>
                  <td className="border p-3 font-semibold">{product.stock}</td>
                  <td className="border p-3 flex justify-center space-x-3">
                    <button onClick={() => onEdit(product)} className="text-blue-500 hover:text-blue-700">
                      <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onToggleStatus(product.id, "Inactive")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Inactive Products</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Stock</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              .filter((p) => p.status === "Inactive")
              .map((product, index) => (
                <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-50">
                  <td className="border p-3">{product.id}</td>
                  <td className="border p-3">{product.name}</td>
                  <td className="border p-3 font-semibold">{product.category}</td>
                  <td className="border p-3">₹{product.price}</td>
                  <td className="border p-3 font-semibold">{product.stock}</td>
                  <td className="border p-3">
                    <button onClick={() => onToggleStatus(product.id, "Active")} className="text-green-500 hover:text-green-700">
                      <FontAwesomeIcon icon={faUndo} className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
