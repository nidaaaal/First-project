import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import debounce from "lodash.debounce";

export default function Search() {
  const navigator = useNavigate();
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) =>
      setProduct(res.data)
    );
  }, []);

  const handleSearch = useCallback(
    debounce((text) => {
      setSearch(text);
      if (text.trim() === "") {
        setFilteredProduct([]);
      } else {
        const filtered = product.filter((pr) =>
          pr.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProduct(filtered);
      }
    }, 300),
    [product]
  );

  const onChange = (e) => {
    const text = e.target.value;
    handleSearch(text);
  };

  return (
    <div className="relative w-50">
      <input
        ref={inputRef}
        onChange={onChange}
        className="p-2 pl-8 rounded-b-sm text-sm w-full z-10 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 "
        placeholder="Search product"
      />
      <BiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      <ul className="absolute top-full left-0 w-50 max-h-48 overflow-auto bg-white border border-gray-200 rounded-md shadow-md scrollbar-hide z-50">
        {search.length > 0 &&
          filteredProduct.map((item) => (
            <li
              key={item.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigator(`/${item.category}/${item.id}`)}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
