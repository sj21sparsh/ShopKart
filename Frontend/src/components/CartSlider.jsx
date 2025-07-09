import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiX } from "react-icons/hi";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

const CartSlider = ({ isCartOpen, setIsCartOpen }) => {
    const { items, totalPrice } = useSelector((state) => state.cart);

    useEffect(() => {
        if (isCartOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isCartOpen]);

    return (
        <div>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-10"
                    onClick={() => setIsCartOpen(false)}
                ></div>
            )}

            <div
                className={`fixed flex flex-col top-0 right-0 h-full w-2/3 md:w-[25rem] bg-white shadow-lg z-20 transform transition-transform duration-300 ${
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-4 p-4 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-2xl text-gray-600 cursor-pointer"
                    >
                        <HiX />
                    </button>
                </div>

                <div className="flex-grow pl-4 overflow-y-auto">
                    {items.length > 0 ? (
                        <CartItems
                            editable={true}
                            setIsCartOpen={setIsCartOpen}
                        />
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            <p>Your cart is Empty. Go Shopping</p>
                        </div>
                    )}
                </div>
                {items.length > 0 && (
                    <div className="p-4 pt-1 border-t-1 border-gray-400 rounded-t-lg sticky bottom-0">
                        <div className="mb-4 flex justify-between text-lg font-semibold">
                            <span>Total :</span>
                            <span className="text-blue-800">₹{totalPrice}</span>
                        </div>
                        <NavLink
                            to="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="block cursor-pointer text-center text-white py-3 text-lg rounded-md font-bold bg-blue-600 hover:bg-blue-700"
                        >
                            Checkout
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSlider;
