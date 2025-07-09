import React from "react";
import { NavLink } from "react-router-dom";
import menCategoryImage from "../assets/menCategoryImage.jpg";
import womenCategoryImage from "../assets/womenCategoryImage.jpg";
import kidsCategoryImage from "../assets/kidsCategoryImage.jpg";

const categories = [
    { name: "MEN", image: menCategoryImage },
    { name: "WOMEN", image: womenCategoryImage },
    { name: "KIDS", image: kidsCategoryImage },
];

const Category = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">
                Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map(({ name, image }) => (
                    <NavLink
                        to={`/shop?category=${name.toLowerCase()}`}
                        key={name}
                        className="relative rounded-lg overflow-hidden group h-50 lg:h-64 shadow"
                    >
                        <img
                            src={image}
                            alt={name}
                            className="object-cover group-hover:shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 flex items-center justify-center">
                            <h3 className="text-white text-xl font-semibold">
                                {name}
                            </h3>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Category;
