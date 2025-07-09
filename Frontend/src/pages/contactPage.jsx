import React from "react";

const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
                Contact Us
            </h1>

            <p className="text-lg text-gray-700 mb-6 text-center">
                We'd love to hear from you! Whether you have a question,
                feedback, or just want to say hi — reach out and we'll respond
                as soon as we can.
            </p>

            <div className="grid gap-6 text-gray-800">
                <div>
                    <strong>Email :</strong> support@shopkart.com
                </div>
                <div>
                    <strong>Phone :</strong> +91-6377653078
                </div>
                <div>
                    <strong> Address :</strong>
                    <br />
                    ShopKart Office,
                    <br />
                    Campus Hub, Mumbai, Maharashtra-400083, India
                </div>
                <div>
                    <strong>Support Hours :</strong>
                    <br />
                    24/7 CustomerSupport
                </div>
            </div>
        </div>
    );
};

export default Contact;
