import { useContext, useEffect } from "react";
import { WishlistContext } from "./wishlistprovider";
import { CartContext } from "../components/CartProvider";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function WishlistPage() {
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const id = localStorage.getItem("loginfo");

  // Fetch wishlist from db.json
  useEffect(() => {
    async function fetchWishlist() {
      if (!id) return;
      try {
        const res = await axios.get(`https://json-server-cn80.onrender.com/${id}`);
        setWishlist(res.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
    fetchWishlist();
  }, [id, setWishlist]);

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);

      // Update database
      await axios.patch(`https://json-server-cn80.onrender.com/${id}`, {
        wishlist: updatedWishlist,
      });

      // Update local state
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Add to cart & remove from wishlist
  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Add to cart
    removeFromWishlist(product.id); // ✅ Remove from wishlist
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                  onClick={() => handleAddToCart(item)}
                >
                  <FaShoppingCart /> <span>Add to Cart</span>
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FaTrash /> <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/cart"
          className="bg-gray-700 text-white px-6 py-3 rounded-md flex items-center justify-center"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
}
