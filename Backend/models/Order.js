const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        guestId: { type: String },
        items: [orderItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        shippingInfo: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pinCode: { type: Number, required: true },
            phone: { type: Number, required: true },
        },
        paymentMethod: {
            type: String,
            default: "COD",
        },
        status: {
            type: String,
            default: "Processing",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
