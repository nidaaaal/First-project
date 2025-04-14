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
        const res = await axios.get(`https://json-server-izra.onrender.com/${id}`);
        setWishlist(res.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
    fetchWishlist();
  }, [id]);

  // ✅ Function to toggle wishlist item (Add/Remove)
  const toggleWishlist = async (product) => {
    if (!id) {
      toast.error("You must be logged in to use the wishlist!");
      return;
    }

    try {
      const res = await axios.get(`https://json-server-izra.onrender.com/${id}`);
      let updatedWishlist = res.data.wishlist || [];

      // ✅ Check if the product is already in wishlist
      const exists = updatedWishlist.some((item) => item.id === product.id);
      if (exists) {
        updatedWishlist = updatedWishlist.filter((item) => item.id !== product.id);
        toast.info("Removed from Wishlist");
      } else {
        updatedWishlist.push(product);
        toast.success("Added to Wishlist!");
      }

      // ✅ Update wishlist in database
      await axios.patch(`https://json-server-izra.onrender.com/${id}`, { wishlist: updatedWishlist });

      // ✅ Update state
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist.");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
