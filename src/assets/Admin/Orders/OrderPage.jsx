import React, { useState } from "react";
import { useOrders } from "./UseOrders";
import { Navbar } from "../Home/Sidebar";
import Sidebar from "../Home/Sidebar";

const OrdersPage = () => {
  const { orders, sortedOrders, favouriteOrders } = useOrders();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-6 space-y-6">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Sorted Orders by Category</h2>
            {Object.keys(sortedOrders).map((category) => {
              const uniqueItems = new Map();
              sortedOrders[category].forEach((item) => {
                if (!uniqueItems.has(item.id)) {
                  uniqueItems.set(item.id, item);
                }
              });
              return (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold">{category.toUpperCase()}</h3>
                  <div className="border p-4 rounded bg-white">
                    {[...uniqueItems.values()].map((item) => (
                      <div key={item.id} className="flex justify-between py-2 border-b">
                        <span>
                          <img src={`/public/${item.image}`} alt={item.name} className="w-10 h-10 object-cover" />
                        </span>
                        <span>{item.name}</span>
                        <span className="text-gray-500">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <h2 className="text-xl font-bold mt-6 mb-4">Favourite Orders</h2>
            <div className="border p-4 rounded bg-white">
              {favouriteOrders.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <span>
                    <img src={`/${item.image}`} alt={item.name} className="w-10 h-10 object-cover" />
                  </span>
                  <span>
                    {item.name} ({item.count} orders)
                  </span>
                  <span className="text-gray-500">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
