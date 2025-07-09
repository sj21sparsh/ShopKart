import React from "react";
import { NavLink } from "react-router-dom";
import bannerImage from "../assets/bannerImage.jpg";

const Banner = () => {
    return (
        <div
            className="relative bg-cover bg-center h-[50vh] lg:h-[65vh] w-full"
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="absolute bg-black/35 inset-0 flex flex-col justify-center items-center text-center">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">
                    Discover Your Style
                </h1>
                <p className="text-white md:text-lg m-4">
                    Latest trends in fashion at exciting prices
                </p>
                <NavLink
                    to="/shop"
                    className="bg-blue-600 text-white cursor-pointer font-semibold py-2 px-6 rounded-md mt-10"
                >
                    Shop Now
                </NavLink>
            </div>
        </div>
    );
};

export default Banner;
