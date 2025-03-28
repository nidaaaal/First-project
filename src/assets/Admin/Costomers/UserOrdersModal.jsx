import React from "react";

const UserOrdersModal = ({ selectedUser, modalOpen, closeModal }) => {
  if (!modalOpen || !selectedUser) return null;

  const totalAmount = selectedUser.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl">

        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-700">🧾 Order Invoice</h2>
          <p className="text-gray-500 text-sm">Invoice for recent purchases</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-700"><strong>Customer:</strong> {selectedUser.username}</p>
          <p className="text-gray-700"><strong>Email:</strong> {selectedUser.email}</p>
          <p className="text-gray-700"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-2">Item</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedUser.cart.length > 0 ? (
              selectedUser.cart.map((item, index) => (
                <tr key={index} className="odd:bg-gray-100 even:bg-gray-50">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-center">{item.quantity}</td>
                  <td className="border p-2 text-center">₹{item.price.toFixed(2)}</td>
                  <td className="border p-2 text-center font-semibold">₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-3 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-right mb-4">
          <p className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => window.print()}
          >
            🖨 Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersModal;
