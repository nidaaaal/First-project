import { useContext, useEffect } from "react";
import { WishlistContext } from "./wishlistprovider";
import { CartContext, CartProvider } from "../components/CartProvider";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const id = localStorage.getItem("loginfo");
    const { cart, setCart } = useContext(CartContext);


  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Fetch wishlist from db.json
  useEffect(() => {
    async function fetchWishlist() {
      if (!id) return;
      try {
        const res = await axios.get(`https://json-server-cn80.onrender.com/users/${id}`);
        setWishlist(res.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      }
    }
    fetchWishlist();
  }, [id, setWishlist]);

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await axios.get(`https://json-server-cn80.onrender.com/users/${id}`);
      const updatedWishlist = (data.wishlist || []).filter((item) => item.id !== productId);

      // Update database
      await axios.patch(`https://json-server-cn80.onrender.com/users/${id}`, {
        wishlist: updatedWishlist,
      });

      // Update local state
      setWishlist(updatedWishlist);
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item");
    }
  };

  // Add to cart & remove from wishlist
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      await removeFromWishlist(product.id);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
          <Link
            to="/all"
            className="bg-blue-600 text-white px-6 py-2 rounded-md inline-block hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold line-clamp-1">{item.name}</h3>
                <p className="text-gray-600 font-medium mt-1">₹{item.price.toLocaleString()}</p>
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between gap-2">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md flex items-center gap-2 flex-1 justify-center transition"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center gap-2 transition"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="mt-8 text-center">
          <Link
            to="/cart"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md inline-flex items-center gap-2 transition"
          >
            <FaShoppingCart />
            <span>View Cart ({totalItems} items)</span>
          </Link>
        </div>
      )}
    </div>
  );
}