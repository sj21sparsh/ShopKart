import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="min-w-[50%] md:min-w-[25%] lg:min-w-[15%] items-stretch">
            <div className="bg-white shadow rounded-md flex flex-col h-full">
                <NavLink
                    to={`/product/${product._id || product.itemId}`}
                    className="flex flex-col flex-grow"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-55 object-cover rounded"
                    />
                    <h4 className="text-lg mt-2 p-2 font-semibold">
                        {product.name}
                    </h4>
                    <p className="text-xs px-2 text-gray-500">
                        Color : {product.color}
                    </p>
                    <p className="text-blue-700 px-2 font-bold text-xl my-2">
                        ₹{product.price}
                    </p>
                    <div className="mt-auto px-2 mb-2">
                        <button className="w-full text-white cursor-pointer bg-blue-500 hover:bg-blue-600 p-1 rounded mt-2">
                            View Product
                        </button>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default ProductCard;
