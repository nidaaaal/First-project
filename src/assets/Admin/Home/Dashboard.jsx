import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Progress } from "../../User/components/MultiComponents"
import { FaUser, FaChartLine, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Navbar } from "./Sidebar";
import { useOrders } from "../Orders/UseOrders";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { favouriteOrders, orders } = useOrders();
  const [userCount, setUserCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  
  const totalSales = orders.reduce((acc, order) => acc + order.items.reduce((sum, item) => sum + item.quantity, 0), 0);
  const totalSalesAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0); 

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("https://json-server-izra.onrender.com/users"); 
        setUserCount(response.data.length); 
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchOutOfStockCount = async () => {
      try {
        const response = await axios.get("https://json-server-izra.onrender.com/products");
        const productsStock = response.data;
        const outOfStock = productsStock.filter(product => product.stock === 0).length;
        setOutOfStockCount(outOfStock);
      } catch (error) {
        console.error("Error fetching product stock:", error);
      }
    };

    fetchUserCount();
    fetchOutOfStockCount();
  }, []);

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FaUser, title: "Registered Users", value: userCount, percent: "19.2%", color: "text-green-500" },
              { icon: FaShoppingCart, title: "Total Sales (Products Sold)", value: totalSales, percent: "7.9%", color: "text-green-500" },
              { icon: FaChartLine, title: "Total Sales Amount", value: `₹${totalSalesAmount}`, percent: "7.9%", color: "text-green-500" },
              { icon: FaBoxOpen, title: "Out of Stock Products", value: outOfStockCount, percent: "-0.3%", color: "text-red-500" },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-white rounded shadow flex items-center space-x-4">
                <item.icon className="text-3xl text-blue-500" />
                <div>
                  <h2 className="text-lg font-bold">{item.value}</h2>
                  <p className="text-gray-500">{item.title}</p>
                  <span className={item.color}>{item.percent}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favouriteOrders.slice(0, 4).map((item, index) => (
              <Card key={index} className="p-4">
                <CardContent>
                  <img src={`/${item.image}`} alt={item.name} className="w-full h-32 object-cover rounded" />
                  <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                  <p className="text-green-500 font-bold">₹{item.price}.00</p>
                  <p className="text-sm text-gray-500">Orders {item.count}</p>
                  <p className="text-sm text-red-500">Income ₹{item.price * item.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-xl font-bold">Monthly Revenue</h2>
          <div className="space-y-4">
            {[25, 50, 75, 40].map((value, index) => (
              <div key={index}>
                <p>Week {index + 1}</p>
                <Progress value={value} className="h-3 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;