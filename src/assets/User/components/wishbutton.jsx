import { FaHeart } from "react-icons/fa";
import useWishlist from "./useWishlist";
export default function WishlistButton({ product }) {
  const { toggleWishlist, isProductWishlisted } = useWishlist();
  const isWishlisted = isProductWishlisted(product.id);

  return (
    <button
      onClick={() => toggleWishlist(product)}
      className="absolute top-2 right-2 p-2 rounded-full"
    >
      <FaHeart className={`text-2xl ${isWishlisted ? "text-red-500" : "text-gray-400"}`} />
    </button>
  );
}
