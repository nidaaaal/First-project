import React, { useState } from "react";
import ScrollWrapper from "../animations/ScrollWrapper";
import axios from "axios";

const Subscribers = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/subscribers", { email });
      if (response.status === 201) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to subscribe. Please try again.");
      console.error("Error saving email:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };


  return (
    <ScrollWrapper>
      <footer className="bg-white text-black py-8">
        <div className="container mx-auto px-4">
          <div className="text-black text-center">
            <p className="text-lg md:text-xl font-bold justify-center items-center">
              VOGUE VAULT
            </p>
            <p className="text-sm text-gray-600 mt-6">
              Get newsletter updates for upcoming products and best discounts.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row justify-center items-center mt-2 space-y-2 md:space-y-0 md:space-x-2 mb-6"
            >
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-md text-black w-full md:w-auto border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-2 md:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
            {message && (
              <p className={`text-sm ${message.includes("Thank") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </div>
          
          {/* Rest of your footer content remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us, Quick Links, Contact Us, Follow Us sections */}
          </div>
        </div>
      </footer>
    </ScrollWrapper>
  );
};

export default Subscribers;