import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { placeOrder } from "../features/order/orderThunk";
import { clearCart } from "../features/cart/cartThunk";
import { clearOrderStatus } from "../features/order/orderSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, loading: cartLoading } = useSelector((state) => state.cart);
    const {
        loading: orderLoading,
        error: orderError,
        success,
        order,
    } = useSelector((state) => state.order);

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
        return () => {
            dispatch(clearOrderStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        if (orderError) {
            toast.error(orderError);
        }
    }, [orderError]);

    useEffect(() => {
        if (!cartLoading && items.length === 0) {
            navigate("/shop");
        }
    }, [items, cartLoading, navigate]);

    useEffect(() => {
        if (success && order) {
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

            navigate("/orders", { state: { justOrdered: true, order } });

            dispatch(clearOrderStatus());
        }
    }, [success, order, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderLoading) return;
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
            toast.error("Please fill all the fields.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pinRegex = /^\d{6}$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email.");
            return false;
        }
        if (!pinRegex.test(pinCode)) {
            toast.error("Pin code should be 6 digits.");
            return false;
        }
        if (!phoneRegex.test(phone)) {
            toast.error("Phone number should be 10 digits.");
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
