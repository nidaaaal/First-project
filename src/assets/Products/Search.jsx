import { useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
    <input value={search} onChange={(e)=>setSearch(e.target.value) } className="border-1 p-2 rounded-b-sm text-sm w-full z-10"/>
    <ul className="absolute top-full left-0 w-50 bg-white border rounded-md shadow-lg max-h-48 overflow-auto">
    {search.length > 0 && (filteredProduct.map((item)=>(
    <li key={item.id} className="p-2 hover:bg-gray-100" onClick={()=>navigator(`/${item.category}/${item.id}`)}>{item.name}</li>
      )))}
      </ul>
    </div>
  )
}
