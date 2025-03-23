import { useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";


export default function Search() {
    const navigator=useNavigate();
    const [search, setSearch] = useState("");

    const [product,setProduct]=useState([]);
    useEffect(()=>{
      axios.get('http://localhost:5000/products').then((res)=> setProduct(res.data))
    },[])
    
    const filteredProduct= product.filter((pr)=>{
      return pr.name.toLowerCase().includes(search.toLowerCase())
    })

  return (
    <div className="relative w-50">
    <input value={search} onChange={(e)=>setSearch(e.target.value) } className="p-2 pl-8 rounded-b-sm text-sm w-full z-10 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 " 
    placeholder="Search product"
  />
    <BiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
    <ul className="absolute top-full left-0 w-50  max-h-48 overflow-auto scrollbar-hide">  
    {search.length > 0 && (filteredProduct.map((item)=>(
    <li key={item.id} className="p-2 hover:bg-gray-100" onClick={()=>navigator(`/${item.category}/${item.id}`)}>{item.name}</li>
      )))}
      </ul>
    </div>
  )
}
