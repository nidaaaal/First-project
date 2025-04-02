import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import ScrollWrapper from "../animations/ScrollWrapper";
import Subscribers from "./Subscribers";

const Footer = () => {
  return (
    <ScrollWrapper>
      <footer className="bg-white text-black py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-3 w-full max-w-md mx-auto">
              <Subscribers/>
            </div>
          </div>

          {/* Grid Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* About Us */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">About Us</h3>
              <p className="text-sm md:text-base text-gray-600">
                We are a leading e-commerce platform offering the best products at
                affordable prices. Our mission is to provide a seamless shopping
                experience for our customers.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Quick Links</h3>
              <ul className="text-sm md:text-base text-gray-600 space-y-2 md:space-y-3">
                <li>
                  <Link to="/" className="hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/all" className="hover:text-gray-900 transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-gray-900 transition-colors">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/payment" className="hover:text-gray-900 transition-colors">
                    Orders
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Contact Us</h3>
              <ul className="text-sm md:text-base text-gray-600 space-y-2 md:space-y-3">
                <li>Email: VogueVault@gmail.com</li>
                <li>Phone: +91 91234 56780</li>
                <li>Address: sm street, calicut, india</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Follow Us</h3>
              <div className="flex justify-center sm:justify-start space-x-4 md:space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright/Legal can be added here if needed */}
        </div>
      </footer>
    </ScrollWrapper>
  );
};

export default Footer;