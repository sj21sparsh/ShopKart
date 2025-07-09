import React, { useState, useEffect } from "react";
import Orders from "../components/Orders";

const OrdersPage = () => {
    const [showSuccess, setShowSuccess] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSuccess(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4">
            {showSuccess && (
                <div className="bg-green-100 text-center text-green-800 p-4 rounded mb-4 ">
                    Your order was placed successfully!
                </div>
            )}
            <Orders />
        </div>
    );
};

export default OrdersPage;
