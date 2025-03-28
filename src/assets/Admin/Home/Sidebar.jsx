import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaChartLine, FaFileAlt, FaCog,FaBars } from "react-icons/fa";
export default function Sidebar() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const log = localStorage.getItem("admininfo");
    
    if (log) {
      setAdmin(JSON.parse(log));
    }
  }, []);
  

  const logout = () => {
    localStorage.removeItem("admininfo");
    setAdmin(null);
    navigate("/adminlogin");
  };


  return (
    <div className="h-screen w-64 bg-white shadow-lg p-10 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-center text-red-500 mb-5">Admin Panel</h1>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
            <FaTachometerAlt />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
            <FaBox />
            <Link to="/admin/products">Products</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
            <FaShoppingCart />
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
            <FaUsers />
            <Link to="/admin/customers">Customers</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-500">
            <FaChartLine />
            <Link to="/admin/sales">Sales</Link>
          </li>   
        </ul>
      </div>
      <button
        onClick={logout}
        className="block px-4 py-2 rounded-lg bg-red-500 text-white text-center hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export const Navbar = ({ toggleSidebar }) => (
  <div className="bg-blue-600 p-4 justify-between text-white w-screen ">
    <button onClick={toggleSidebar} className="text-xl">
      <FaBars />
    </button>
    <span>Admin</span>
  </div>
);