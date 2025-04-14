import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { WishlistContext } from "./wishlistprovider"; // ✅ Correct import

export default function useWishlist() {
  const id = localStorage.getItem("loginfo");
  const { wishlist, setWishlist } = useContext(WishlistContext);

  if (!wishlist || !setWishlist) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  const isProductWishlisted = (productId) => wishlist.some((item) => item.id === productId);

  const toggleWishlist = async (product) => {
    if (!id) {
      toast.error("You must be logged in to use the wishlist!");
      return;
    }

    try {
      const res = await axios.get(`https://json-server-cn80.onrender.com/users/${id}`);
      let updatedWishlist = res.data.wishlist ? [...res.data.wishlist] : []; 
      if (isProductWishlisted(product.id)) {
        updatedWishlist = updatedWishlist.filter((item) => item.id !== product.id);
        toast.info("Removed from Wishlist");
      } else {
        updatedWishlist.push(product);
        toast.success("Added to Wishlist!");
      }

      await axios.patch(`https://json-server-cn80.onrender.com/users${id}`, { wishlist: updatedWishlist });

      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist.");
    }
  };

  return { wishlist, toggleWishlist, isProductWishlisted };
}
