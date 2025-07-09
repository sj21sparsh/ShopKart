import React from "react";
import { FaShippingFast, FaMoneyBillWave } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi2";

const features = [
    {
        title: "Free Shipping",
        description: "On all Orders",
        icon: <FaShippingFast className="text-3xl text-blue-600" />,
    },
    {
        title: "Cash on Delivery",
        description: "Make Payment upon Delivery",
        icon: <FaMoneyBillWave className="text-3xl text-blue-600" />,
    },
    {
        title: "24/7 Customer Support",
        description: "We're here to help you anytime you need.",
        icon: <HiOutlinePhone className="text-3xl text-blue-600" />,
    },
];

const Features = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {features.map(({ title, description, icon }) => (
                    <div
                        key={title}
                        className="p-6 lg:py-15 bg-blue-50 rounded-lg shadow-md"
                    >
                        <div className="mb-4 flex justify-center">{icon}</div>
                        <h4 className="text-xl font-semibold mb-2">{title}</h4>
                        <p className="text-gray-600 text-sm">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
