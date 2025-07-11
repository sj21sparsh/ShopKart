import React, { useEffect, useState } from "react";
import Orders from "../components/Orders";
import { useLocation, useNavigate } from "react-router-dom";

const OrdersPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(true);

    const state = location.state;
    const order = state?.order;

    useEffect(() => {
        if (!state?.justOrdered || !state?.order) {
            navigate("/profile", { replace: true });
        }
    }, [state, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!order) return null;

    return (
        <div className="p-4">
            {showSuccess && (
                <div className="bg-green-100 text-center text-green-800 p-4 rounded mb-4">
                    Your order was placed successfully!
                </div>
            )}
            <Orders orders={[order]} />
        </div>
    );
};

export default OrdersPage;
