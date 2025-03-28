import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Navbar } from "../Home/Sidebar";
import Sidebar from "../Home/Sidebar";
import UserOrdersModal from "./UserOrdersModal"; // Import the modal component

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const toggleBlockUser = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, blocked: !user.blocked } : user
      )
    );

    axios.patch(`http://localhost:5000/users/${userId}`, {
      blocked: !users.find(user => user.id === userId).blocked,
    }).catch((err) => console.error("Error updating user:", err));
  };

  const getTotalPurchased = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">👤 User List</h2>

          <div className="mb-4 flex items-center bg-white p-3 rounded-md shadow">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search by username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border p-3">User ID</th>
                  <th className="border p-3">Username</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Purchased Price</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="text-center odd:bg-gray-100 even:bg-gray-50">
                    <td className="border p-3">{user.id}</td>
                    <td 
                      className="border p-3 font-semibold text-blue-600 cursor-pointer hover:underline" 
                      onClick={() => openModal(user)}
                    >
                      {user.username}
                    </td>
                    <td className="border p-3">{user.email}</td>
                    <td className="border p-3 font-semibold">₹{getTotalPurchased(user.cart)}</td>
                    <td className={`border p-3 font-semibold ${user.blocked ? "text-red-500" : "text-green-500"}`}>
                      {user.blocked ? "Blocked" : "Active"}
                    </td>
                    <td className="border p-3">
                      <button
                        onClick={() => toggleBlockUser(user.id)}
                        className={`px-4 py-2 text-white rounded-md ${
                          user.blocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserOrdersModal 
        selectedUser={selectedUser} 
        modalOpen={modalOpen} 
        closeModal={closeModal} 
      />
    </div>
  );
};

export default UsersList;
