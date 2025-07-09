import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { placeOrder } from "../features/order/orderThunk";
import { clearCart } from "../features/cart/cartThunk";
import { clearOrderStatus } from "../features/order/orderSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, loading: cartLoading } = useSelector((state) => state.cart);
    const { loading: orderLoading, success } = useSelector(
        (state) => state.order
    );

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        phone: "",
    });

    useEffect(() => {
        if (!cartLoading && items.length === 0) {
            navigate("/shop");
        }
    }, [items, cartLoading, navigate]);

    useEffect(() => {
        if (success) {
            setFormData({
                fullName: "",
                email: "",
                address: "",
                city: "",
                state: "",
                pinCode: "",
                phone: "",
            });

            dispatch(clearCart());

            navigate("/orders");

            dispatch(clearOrderStatus());
        }
    }, [success, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkFormValidations()) return;

        const orderData = {
            shippingInfo: formData,
            paymentMethod: "COD",
        };

        dispatch(placeOrder(orderData));
    };

    const checkFormValidations = () => {
        const { fullName, email, address, city, state, pinCode, phone } =
            formData;

        if (
            !fullName ||
            !email ||
            !address ||
            !city ||
            !state ||
            !pinCode ||
            !phone
        ) {
            alert("Please fill all the fields.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pinRegex = /^\d{6}$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email.");
            return false;
        }
        if (!pinRegex.test(pinCode)) {
            alert("Pin code should be 6 digits.");
            return false;
        }
        if (!phoneRegex.test(phone)) {
            alert("Phone number should be 10 digits.");
            return false;
        }

        return true;
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
                Checkout
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-start gap-4 lg:gap-20 lg:max-w-6xl mx-auto">
                <div className="w-full">
                    <AddressForm
                        formData={formData}
                        handleChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <OrderSummary />

                    <button
                        onClick={handleSubmit}
                        disabled={orderLoading}
                        className={`w-full font-semibold bg-blue-600 text-white py-3 rounded mt-4 cursor-pointer ${
                            orderLoading ? "opacity-50" : "hover:bg-blue-700"
                        }`}
                    >
                        {orderLoading ? "Placing Order..." : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
