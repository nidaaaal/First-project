import React, { useEffect, useState } from "react";
import { useOrders } from "../Orders/UseOrders";
import Sidebar, { Navbar } from "../Home/Sidebar";
import axios from "axios";

const SalesDetails = () => {
  const [salesData, setSalesData] = useState([]);
  const { orders } = useOrders();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [sortBy, setSortBy] = useState("totalSales");

  useEffect(() => {
    const calculateSales = async () => {
      const salesMap = new Map();
      let totalSalesSum = 0;
      let totalEarningsSum = 0;

      const response = await axios.get("http://localhost:5000/products");
      const productsStock = response.data;

      orders.forEach((order) => {
        order.items.forEach((item) => {
          if (!salesMap.has(item.id)) {
            const productStock = productsStock.find((p) => p.id === item.id)?.stock || 0;

            salesMap.set(item.id, {
              id: item.id,
              name: item.name,
              totalSales: 0,
              totalEarnings: 0,
              stockStatus: productStock > 0 ? "In Stock" : "Out of Stock",
              stock: productStock,
            });
          }
          const product = salesMap.get(item.id);
          product.totalSales += item.quantity;
          product.totalEarnings += item.price * item.quantity;

          totalSalesSum += item.quantity;
          totalEarningsSum += item.price * item.quantity;
        });
      });

      setSalesData(Array.from(salesMap.values()));
      setTotalSales(totalSalesSum);
      setTotalEarnings(totalEarningsSum);
    };

    calculateSales();
  }, [orders]);

  const sortedSalesData = [...salesData].sort((a, b) => {
    if (sortBy === "totalSales") {
      return b.totalSales - a.totalSales;
    } else if (sortBy === "totalEarnings") {
      return b.totalEarnings - a.totalEarnings;
    }
    return 0;
  });

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-6 space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Sales Details</h2>

            <div className="mb-4">
              <label className="text-gray-600 font-semibold mr-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className=" p-.5 rounded-md"
              >
                <option value="totalSales">Total Sales</option>
                <option value="totalEarnings">Total Earnings</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border">Product ID</th>
                    <th className="py-2 px-4 border">Product Name</th>
                    <th className="py-2 px-4 border">Total Sales</th>
                    <th className="py-2 px-4 border">Total Earnings</th>
                    <th className="py-2 px-4 border">Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSalesData.map((product) => (
                    <tr key={product.id} className="border">
                      <td className="py-2 px-4 border">{product.id}</td>
                      <td className="py-2 px-4 border">{product.name}</td>
                      <td className="py-2 px-4 border">{product.totalSales}</td>
                      <td className="py-2 px-4 border">₹{product.totalEarnings}</td>
                      <td
                        className={`py-2 px-4 border font-semibold ${
                          product.stockStatus === "In Stock" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stockStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <p className="text-lg font-semibold">Total Sales: {totalSales}</p>
            <p className="text-lg font-semibold">Total Earnings: ₹{totalEarnings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetails;
