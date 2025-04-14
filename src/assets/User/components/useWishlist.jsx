import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { WishlistContext } from "./wishlistprovider";

export default function useWishlist() {
  const id = localStorage.getItem("loginfo");
  const { wishlist, setWishlist } = useContext(WishlistContext);

  if (!wishlist || !setWishlist) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  const isProductWishlisted = (productId) => 
    wishlist.some((item) => item.id === productId);

  const toggleWishlist = async (product) => {
    if (!id) {
      toast.error("You must be logged in to use the wishlist!");
      return;
    }

    try {
      // Get current wishlist from server
      const { data } = await axios.get(
        `https://json-server-cn80.onrender.com/users/${id}`
      );
      
      // Create new array to avoid mutation
      const currentWishlist = data.wishlist ? [...data.wishlist] : [];
      
      // Check if product exists (more reliable than checking local state)
      const productExists = currentWishlist.some(item => item.id === product.id);
      
      let updatedWishlist;
      if (productExists) {
        updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
        toast.info("Removed from Wishlist");
      } else {
        // Create new array with the product added
        updatedWishlist = [...currentWishlist, product];
        toast.success("Added to Wishlist!");
      }

      // Update server
      await axios.patch(
        `https://json-server-cn80.onrender.com/users/${id}`,
        { wishlist: updatedWishlist }
      );

      // Update local state
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist.");
    }
  };

  return { 
    wishlist, 
    toggleWishlist, 
    isProductWishlisted 
  };
}