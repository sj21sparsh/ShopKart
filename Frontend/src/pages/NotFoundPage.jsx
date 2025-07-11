import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="h-screen flex justify-center items-start pt-[50%] lg:pt-[12.5%] bg-gray-100 text-center px-4">
            <div className="w-full max-w-md">
                <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <NavLink
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Go to Homepage
                </NavLink>
            </div>
        </div>
    );
};

export default NotFoundPage;
