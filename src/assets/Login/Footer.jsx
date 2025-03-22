import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              We are a leading e-commerce platform offering the best products at
              affordable prices. Our mission is to provide a seamless shopping
              experience for our customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm text-gray-600">
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="hover:text-gray-900">
                  Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/orders" className="hover:text-gray-900">
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

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Vogue Vault. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;