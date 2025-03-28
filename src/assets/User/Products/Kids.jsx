import React, { Fragment } from 'react'
import { useProducts } from '../components/UseProduct'
import ProductCard from '../Cart/ProductCard';
import NavBar from '../components/NavBar';

export default function Kids() {
    const{product}=useProducts()
    const category=product.filter((x)=>{
        return  x.category==="kids";
      })
  return (
    <div>
      <div className="container mt-30 text-center">
  <h1 className="text-[40px] font-serif my-[20px]">Adorable Kids' Collection</h1>
  <p className="text-[16px] text-lg max-w-2xl mx-auto mt-4">
    Dress your little ones in style with our playful and comfortable kids' collection. 
    Discover fun prints, soft fabrics, and trendy designs perfect for every occasion.
  </p>
</div>

    <div className=" bg-gray-100 ">
                  <NavBar/>
            <h1 className='text-center'>Kids' Fashion</h1>
            <div className="container mx-auto p-4 pt-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.map((item)=>(
        <ProductCard key={item.id} product={item}/>
      ))}
    </div>
    </div>
    </div>
    </div>
  )
}
