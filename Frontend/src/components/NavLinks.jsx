import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavLinks = ({ onClose }) => {
    const location = useLocation();

    const navLinks = [
        { name: "HOME", path: "/" },
        { name: "SHOP", path: "/shop" },
        { name: "MEN", path: "/shop?category=men" },
        { name: "WOMEN", path: "/shop?category=women" },
        { name: "KIDS", path: "/shop?category=kids" },
    ];

    const isActiveLink = (path) => {
        const currentPath = location.pathname + location.search;
        return currentPath === path;
    };

    return (
        <div className="flex flex-col mt-4 gap-2 lg:flex-row lg:mt-0 lg:gap-6">
            {navLinks.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={`px-1 text-gray-600 hover:text-gray-800 text-xl font-medium mx-auto ${
                        link.name != "HOME" && isActiveLink(link.path)
                            ? "lg:border-b-2 rounded-md border-blue-600"
                            : ""
                    }`}
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    );
};

export default NavLinks;
