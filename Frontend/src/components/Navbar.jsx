import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import CartSlider from "./CartSlider";
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiBars3BottomRight,
    HiMagnifyingGlass,
} from "react-icons/hi2";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { items } = useSelector((state) => state.cart);
    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();

        const query = searchTerm.trim();
        if (!query) return;

        navigate(`/shop?search=${encodeURIComponent(query)}`);

        setShowMobileSearch(false);
        setSearchTerm("");
    };

    return (
        <div className="sticky top-0 w-full z-50 bg-white border-b border-gray-200">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <div>
                    <NavLink
                        to="/"
                        className="text-blue-800 text-2xl font-bold"
                    >
                        ShopKart
                    </NavLink>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="hidden md:w-[25rem] md:flex lg:w-1/3"
                >
                    <input
                        type="text"
                        placeholder="Search Outfits"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-1.5 rounded-l-md bg-gray-100 text-black outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-gray-300 hover:bg-gray-400 cursor-pointer px-4 py-1.5 rounded-r-md"
                    >
                        <HiMagnifyingGlass />
                    </button>
                </form>

                <div className="hidden lg:flex">
                    <NavLinks />
                </div>

                <div className="flex items-center space-x-5">
                    <button
                        className="md:hidden h-6 w-6 text-gray-800 text-2xl"
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                    >
                        <HiMagnifyingGlass />
                    </button>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative cursor-pointer"
                    >
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    <NavLink to="/profile">
                        <HiOutlineUser className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    </NavLink>

                    <button>
                        <HiBars3BottomRight
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="lg:hidden h-6 w-6 text-gray-800"
                        />
                    </button>
                </div>
            </nav>

            <CartSlider isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {showMobileSearch && (
                <div className="md:hidden px-4 mb-2">
                    <form onSubmit={handleSearch} className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search Outfits"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-l-sm bg-gray-100 text-black outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-gray-300 px-4 py-2 rounded-r-sm"
                        >
                            <HiMagnifyingGlass />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Navbar;
