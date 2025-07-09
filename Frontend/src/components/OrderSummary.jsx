import React from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const OrderSummary = () => {
    const { totalPrice } = useSelector((state) => state.cart);

    return (
        <div className="bg-white shadow-md rounded-md px-6 mb-4 pb-2">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Order Summary
            </h3>
            <div className="space-y-4">
                <CartItems />
            </div>
            <div className="border-t pt-4 m-4 flex justify-between text-lg font-semibold">
                <span>Total :</span>
                <span className="text-blue-800">₹{totalPrice}</span>
            </div>
            <div className="m-4 flex justify-between text-lg font-semibold">
                <span>Shipping :</span>
                <span>FREE</span>
            </div>
            <div className="m-4 flex justify-between text-lg font-semibold">
                <span>Payment Mode :</span>
                <span>COD</span>
            </div>
        </div>
    );
};

export default OrderSummary;
