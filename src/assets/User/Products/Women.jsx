import { useProducts } from '../components/UseProduct';
import ProductCard from '../Cart/ProductCard';
import NavBar from '../components/NavBar';

export default function Women() {
  const{product}=useProducts()
   const category=product.filter((x)=>{
      return  x.category==="women";
    })
  return (<div>
    <div className="container mt-30 text-center">
  <h1 className="text-[40px] font-serif my-[20px]">Elegant Women's Collection</h1>
  <p className="text-[16px] text-lg max-w-2xl mx-auto mt-4">
    Explore our sophisticated women's fashion range, featuring timeless styles and modern trends. 
    From chic dresses to everyday essentials, find the perfect outfit that complements your elegance.
  </p>
</div>

<div className="min-h-screen bg-gray-100">
            <NavBar/>
            <div className="container mx-auto p-4 pt-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">      {category.map((item)=>(
        <ProductCard key={item.id} product={item}/>
      ))}
    </div>
    </div>
    </div>
    </div>
  )
}
