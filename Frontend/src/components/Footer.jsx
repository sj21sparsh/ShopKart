import React from "react";
import { HiPhone } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 p-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4 text-center">
                <div className="border-b border-gray-300 md:border-none">
                    <h3 className="text-blue-800 text-2xl font-bold mt-2 md:m-0">
                        ShopKart
                    </h3>
                    <p className="my-4">
                        Try the new styles and shop the latest collection at
                        exciting deals!!! Our mission is simple — help you look
                        good and feel great.
                    </p>
                </div>
                <div className="flex flex-col border-b border-gray-300 md:border-none pb-4 md:p-0 gap-4">
                    <h3 className="text-gray-800 text-2xl font-bold">
                        Outfits
                    </h3>
                    <NavLink
                        to="/shop"
                        className="text-gray-600 hover:text-gray-800 text-l font-medium"
                    >
                        SHOP
                    </NavLink>
                    <NavLink
                        to="/shop?category=men"
                        className="text-gray-600 hover:text-gray-800 text-l font-medium"
                    >
                        MEN
                    </NavLink>
                    <NavLink
                        to="/shop?category=women"
                        className="text-gray-600 hover:text-gray-800 text-l font-medium"
                    >
                        WOMEN
                    </NavLink>
                    <NavLink
                        to="/shop?category=kids"
                        className="text-gray-600 hover:text-gray-800 text-l font-medium"
                    >
                        KIDS
                    </NavLink>
                </div>
                <div className="flex flex-col border-b border-gray-300 md:border-none pb-4 md:p-0 gap-4">
                    <h3 className="text-gray-800 text-2xl font-bold">
                        Contact
                    </h3>
                    <NavLink
                        to="/contact"
                        className="text-gray-600 hover:text-gray-800 text-l font-medium"
                    >
                        Contact Us
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-gray-600 hover:text-gray-800 text-l font-medium"
                    >
                        About Us
                    </NavLink>
                    <div className="flex items-center mx-auto text-gray-600 hover:text-gray-800 text-l font-medium">
                        <HiPhone />
                        <span className="mx-2">+91 6377653078</span>
                    </div>
                </div>
            </div>
            <div className="text-md text-gray-600 text-center mt-4">
                <p>© 2025 ShopKart. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
