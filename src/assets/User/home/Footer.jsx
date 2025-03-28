import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import ScrollWrapper from "../animations/ScrollWrapper";

const Footer = () => {
  return (
     <ScrollWrapper>
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-4">
      <div className=" text-black text-center">
      <p className="text-lg md:text-xl font-bold justify-center items-center">VOGUE VAULT</p>
        <p className="text-sm text-gray-600 mt-6">Get newsletter updates for upcoming products and best discounts.</p>
        <div className="flex flex-col md:flex-row justify-center items-center mt-2 space-y-2 md:space-y-0 md:space-x-2 mb-6">
          <input type="email" placeholder="Your Email" className="px-4 py-2 rounded-md text-black w-full md:w-auto" />
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg animate-glow hover:bg-blue-700 transition-colors duration-300">Submit</button>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              We are a leading e-commerce platform offering the best products at
              affordable prices. Our mission is to provide a seamless shopping
              experience for our customers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm text-gray-600">
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/all" className="hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="hover:text-gray-900">
                  Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/payment" className="hover:text-gray-900">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm text-gray-600">
              <li className="mb-2">Email: VogueVault@gmail.com</li>
              <li className="mb-2">Phone: +91 91234 56780</li>
              <li className="mb-2">Address: sm street, calicut, india</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
       
      </div>
    </footer>
    </ScrollWrapper>
  );
};

export default Footer;