import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductForm = ({ onSave, editingProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    colour: "",
    category: "men", 
    image: "",
    description: "",
    status: "Active",
    stock: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct({
        name: "",
        price: "",
        colour: "",
        category: "men",
        image: "",
        description: "",
        status: "Active",
        stock: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    setProduct({
      name: "",
      price: "",
      colour: "",
      category: "men",
      image: "",
      description: "",
      status: "Active",
      stock: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-600">
        {editingProduct ? "Update Product" : "Add a New Product"}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="colour"
          placeholder="Colour"
          value={product.colour}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={editingProduct ? faEdit : faPlus} />
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
