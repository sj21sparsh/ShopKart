import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, removeItem } from "../features/cart/cartThunk";
import { RiDeleteBinLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const CartItems = ({ editable = true, setIsCartOpen = () => {} }) => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const onQuantityChange = (product, action) => {
        const newQuantity =
            action === "increase" ? product.quantity + 1 : product.quantity - 1;

        if (newQuantity < 1) return;

        dispatch(
            updateItem({
                data: {
                    productId:
                        typeof product.productId === "object"
                            ? product.productId._id
                            : product.productId,
                    size: product.size,
                    quantity: newQuantity,
                },
            })
        );
    };

    const onDelete = (product) => {
        dispatch(
            removeItem({
                data: {
                    productId:
                        typeof product.productId === "object"
                            ? product.productId._id
                            : product.productId,
                    size: product.size,
                },
            })
        );
    };

    return (
        <div>
            {items.map((product, index) => {
                const id =
                    typeof product.productId === "object"
                        ? product.productId._id
                        : product.productId;

                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex items-start justify-between md:py-4">
                            <div className="flex">
                                <NavLink
                                    to={`/product/${id}?size=${product.size}`}
                                    onClick={() => setIsCartOpen(false)}
                                    className="flex"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-auto object-cover mr-4 rounded items-center"
                                    />
                                    <div>
                                        <h3>{product.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            Size: {product.size} | Color:{" "}
                                            {product.color}
                                        </p>
                                    </div>
                                </NavLink>

                                {editable && (
                                    <div className="hidden md:flex flex-col justify-center ml-8 mt-2">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    onQuantityChange(
                                                        product,
                                                        "decrease"
                                                    )
                                                }
                                                className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">
                                                {product.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    onQuantityChange(
                                                        product,
                                                        "increase"
                                                    )
                                                }
                                                className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mx-4 text-right">
                                <p className="text-blue-700 font-semibold">
                                    ₹{product.price * product.quantity}
                                </p>
                                {editable && (
                                    <button onClick={() => onDelete(product)}>
                                        <RiDeleteBinLine className="h-6 w-6 mt-8 text-red-800 cursor-pointer" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {editable && (
                            <div className="flex flex-col justify-center mb-5 mx-auto md:hidden">
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            onQuantityChange(
                                                product,
                                                "decrease"
                                            )
                                        }
                                        className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">
                                        {product.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            onQuantityChange(
                                                product,
                                                "increase"
                                            )
                                        }
                                        className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CartItems;
