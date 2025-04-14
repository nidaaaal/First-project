import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const id = localStorage.getItem("loginfo");
  const [wishlist, setWishlist] = useState([]);

  // ✅ Fetch wishlist on component mount or when user changes
  useEffect(() => {
    async function fetchWishlist() {
      if (!id) return;
      try {
        const res = await axios.get(`https://json-server-cn80.onrender.com/users/${id}`);
        setWishlist(res.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
    fetchWishlist();
  }, [id]);

  // ✅ Toggle wishlist (Add/Remove) - Improved duplicate prevention
  const toggleWishlist = async (product) => {
    if (!id) {
      toast.error("You must be logged in to use the wishlist!");
      return;
    }

    try {
      const res = await axios.get(`https://json-server-cn80.onrender.com/users/${id}`);
      let updatedWishlist = res.data.wishlist || [];

      // More robust duplicate check
      const productIndex = updatedWishlist.findIndex((item) => item.id === product.id);
      
      if (productIndex !== -1) {
        // Remove if exists
        updatedWishlist = updatedWishlist.filter((item) => item.id !== product.id);
        toast.info("Removed from Wishlist");
      } else {
        // Add if doesn't exist (with additional check just to be safe)
        if (!updatedWishlist.some(item => item.id === product.id)) {
          updatedWishlist = [...updatedWishlist, product];
          toast.success("Added to Wishlist!");
        }
      }

      await axios.patch(`https://json-server-cn80.onrender.com/users/${id}`, {
        wishlist: updatedWishlist,
      });

      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist.");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}