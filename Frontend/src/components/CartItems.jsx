import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, removeItem } from "../features/cart/cartThunk";
import { RiDeleteBinLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

const CartItems = ({ editable = true, setIsCartOpen = () => {} }) => {
    const dispatch = useDispatch();
    const { items, error } = useSelector((state) => state.cart);

    const [btnLoading, setBtnLoading] = useState({
        action: null,
        productId: null,
        size: null,
    });

    const isLoading = (productId, size, action) =>
        btnLoading.productId === productId &&
        btnLoading.action === action &&
        btnLoading.size === size;

    const onQuantityChange = async (product, action) => {
        const productId =
            typeof product.productId === "object"
                ? product.productId._id
                : product.productId;

        const newQuantity =
            action === "increase" ? product.quantity + 1 : product.quantity - 1;

        if (newQuantity < 1) return;

        try {
            setBtnLoading({ productId, action, size: product.size });
            await dispatch(
                updateItem({
                    data: {
                        productId,
                        size: product.size,
                        quantity: newQuantity,
                    },
                })
            ).unwrap();
        } catch (err) {
            toast.error(err);
        } finally {
            setBtnLoading({ action: null, productId: null, size: null });
        }
    };

    const onDelete = async (product) => {
        const productId =
            typeof product.productId === "object"
                ? product.productId._id
                : product.productId;

        try {
            setBtnLoading({ productId, action: "remove", size: product.size });
            await dispatch(
                removeItem({
                    data: {
                        productId,
                        size: product.size,
                    },
                })
            ).unwrap();
        } catch (err) {
            toast.error(err);
        } finally {
            setBtnLoading({ action: null, productId: null, size: null });
        }
    };

    if (error) {
        return <ErrorMessage message={error} />;
    }

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
                                                disabled={isLoading(
                                                    id,
                                                    product.size,
                                                    "decrease"
                                                )}
                                                className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                            >
                                                {isLoading(
                                                    id,
                                                    product.size,
                                                    "decrease"
                                                ) ? (
                                                    <Loader
                                                        size="20"
                                                        className="text-blue-500"
                                                    />
                                                ) : (
                                                    "-"
                                                )}
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
                                                disabled={isLoading(
                                                    id,
                                                    product.size,
                                                    "increase"
                                                )}
                                                className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                            >
                                                {isLoading(
                                                    id,
                                                    product.size,
                                                    "increase"
                                                ) ? (
                                                    <Loader
                                                        size="20"
                                                        className="text-blue-500"
                                                    />
                                                ) : (
                                                    "+"
                                                )}
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
                                    <button
                                        onClick={() => onDelete(product)}
                                        disabled={isLoading(
                                            id,
                                            product.size,
                                            "remove"
                                        )}
                                    >
                                        {isLoading(
                                            id,
                                            product.size,
                                            "remove"
                                        ) ? (
                                            <Loader
                                                size="20"
                                                className="h-6 w-6 mt-8 text-red-500"
                                            />
                                        ) : (
                                            <RiDeleteBinLine className="h-6 w-6 mt-8 text-red-800 cursor-pointer" />
                                        )}
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
                                        disabled={isLoading(
                                            id,
                                            product.size,
                                            "decrease"
                                        )}
                                        className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                    >
                                        {isLoading(
                                            id,
                                            product.size,
                                            "decrease"
                                        ) ? (
                                            <Loader
                                                size="20"
                                                className="text-blue-500"
                                            />
                                        ) : (
                                            "-"
                                        )}
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
                                        disabled={isLoading(
                                            id,
                                            product.size,
                                            "increase"
                                        )}
                                        className="border border-gray-200 rounded px-2 text-xl font-medium cursor-pointer"
                                    >
                                        {isLoading(
                                            id,
                                            product.size,
                                            "increase"
                                        ) ? (
                                            <Loader
                                                size="20"
                                                className="text-blue-500"
                                            />
                                        ) : (
                                            "+"
                                        )}
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
