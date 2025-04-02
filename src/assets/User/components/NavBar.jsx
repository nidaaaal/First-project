import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Products/Search';
import { toast } from 'react-toastify';
import Deals from './Deals';
import { CartContext } from './CartProvider';
import useWishlist from './useWishlist';

export default function NavBar() {
    const navigator = useNavigate();
    const { wishlist } = useWishlist();
    const [login, setlogin] = useState(null);
    const { cart, setCart } = useContext(CartContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const logout = () => {
        localStorage.removeItem("loginfo");
        setlogin(null);
        navigator("/login");
    };

    useEffect(() => {
        const log = localStorage.getItem('loginfo');
        setlogin(log);
    }, []);

    const handleCartClick = () => {
        const log = localStorage.getItem('loginfo');
        if (!log) {
            toast.error("Please login!");
        } else {
            navigator('/cart');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div>
            <Deals />
            <div className="fixed top-9 left-0 w-full bg-[#f1f0ee] shadow-sm z-40">
                <div className="container mx-auto px-4">
                    {/* Mobile Header */}
                    <div className="flex justify-between items-center py-3 md:hidden">
                        <button onClick={toggleMobileMenu} className="text-black">
                            <FontAwesomeIcon icon={faBars} size="xl" />
                        </button>
                        
                        <img src="/VogueVault.png" className="w-[70px]" alt="Logo" />
                        
                        <div className="flex items-center space-x-3">
                            <button onClick={toggleSearch} className="text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="relative" onClick={handleCartClick}>
                                <FontAwesomeIcon icon={faCartShopping} size="xl" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex justify-center items-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search (only visible when toggled) */}
                    {isSearchVisible && (
                        <div className="md:hidden px-4 py-2">
                            <Search />
                        </div>
                    )}

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-white py-4 px-4 shadow-md">
                            <div className="flex flex-col space-y-4">
                                <Link to="/" className="text-black py-2" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                                <Link to="/men" className="text-black py-2" onClick={() => setIsMobileMenuOpen(false)}>MEN</Link>
                                <Link to="/women" className="text-black py-2" onClick={() => setIsMobileMenuOpen(false)}>WOMEN</Link>
                                <Link to="/kids" className="text-black py-2" onClick={() => setIsMobileMenuOpen(false)}>KIDS</Link>
                                
                                <Link to="/wishlist" className="relative py-2 flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Heart className="text-black text-xl mr-2" />
                                    Wishlist
                                    {wishlist.length > 0 && (
                                        <span className="ml-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </Link>
                                
                                {login === null ? (
                                    <Link to="/login" className="py-2 flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                        Login
                                    </Link>
                                ) : (
                                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="py-2 text-left">
                                        LOGOUT
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex justify-between items-center py-3">
                        <div className="flex space-x-6 lg:space-x-12">
                            <Link to="/" className="text-black hover:text-gray-600">HOME</Link>
                            <Link to="/men" className="text-black hover:text-gray-600">MEN</Link>
                            <Link to="/women" className="text-black hover:text-gray-600">WOMEN</Link>
                            <Link to="/kids" className="text-black hover:text-gray-600">KIDS</Link>
                        </div>

                        <div className="flex justify-center items-center">
                            <img src="/VogueVault.png" className="w-[90px]" alt="Logo" />
                        </div>

                        <div className="flex items-center space-x-4 lg:space-x-6">
                            <div className="hidden md:block">
                                <Search />
                            </div>

                            <Link to="/wishlist" className="relative p-2">
                                <Heart className="text-black text-xl cursor-pointer" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex justify-center items-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            <button className="relative p-2" onClick={handleCartClick}>
                                <FontAwesomeIcon icon={faCartShopping} size="xl" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex justify-center items-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {login === null ? (
                                <Link to="/login" className="p-2">
                                    <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#000000" }} />
                                </Link>
                            ) : (
                                <button onClick={logout} className="p-2 hover:text-gray-600">LOGOUT</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}