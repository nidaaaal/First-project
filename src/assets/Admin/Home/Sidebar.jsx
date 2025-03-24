import React from 'react'

export default function Sidebar() {
  return (
    <div>
       <aside className="w-64 bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600">eccomi</h1>
        <nav className="mt-6">
          {['Dashboard', 'Products', 'Category', 'Orders', 'Customers', 'Coupons', 'Settings'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
              <Circle className="w-4 h-4" />
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  )
}
