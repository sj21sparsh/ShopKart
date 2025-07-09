import React from "react";
import { NavLink } from "react-router-dom";

const OrderItems = ({ items = [] }) => {
    return (
        <div>
            {items.map((product, index) => {
                const id =
                    typeof product.productId === "object"
                        ? product.productId._id
                        : product.productId;

                return (
                    <div key={index} className="flex flex-col py-4">
                        <div className="flex items-start justify-between">
                            <div className="flex">
                                <NavLink
                                    to={`/product/${id}?size=${product.size}`}
                                    className="flex"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-auto object-cover mr-4 rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            {product.name}
                                        </h3>
                                        <p className="text-md text-gray-700">
                                            Size : {product.size} | Color :{" "}
                                            {product.color}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            Quantity: {product.quantity}
                                        </p>
                                    </div>
                                </NavLink>
                            </div>

                            <div className="text-right">
                                <p className="text-blue-700 font-semibold">
                                    ₹{product.price * product.quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderItems;
