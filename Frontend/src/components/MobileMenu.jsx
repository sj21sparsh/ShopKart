import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiX, HiPhone } from "react-icons/hi";
import NavLinks from "./NavLinks";

const MobileMenu = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    return (
        <div>
            {isOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black/20"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`fixed flex flex-col top-0 right-0 h-full w-2/3 md:w-[20rem] bg-white shadow-lg z-20 transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-4 p-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-600"
                    >
                        <HiX />
                    </button>
                </div>

                <NavLinks onClose={onClose} />

                <div className="flex flex-col mt-4 gap-2">
                    <NavLink
                        to="/contact"
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 text-lg font-medium mx-auto"
                    >
                        Contact Us
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 text-lg font-medium mx-auto"
                    >
                        About Us
                    </NavLink>
                    <div className="flex items-center mx-auto text-gray-600 hover:text-gray-800 text-lg font-medium">
                        <HiPhone />
                        <span className="mx-2">+91 6377653078</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
