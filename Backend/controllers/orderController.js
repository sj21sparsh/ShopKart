const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
    const { shippingInfo, paymentMethod } = req.body;
    const { userId, guestId } = req.query;

    if (!userId && !guestId) {
        return res
            .status(400)
            .json({ message: "Missing userId or guestId for placing order" });
    }

    try {
        const cart = await Cart.findOne(
            userId ? { userId } : { guestId }
        ).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res
                .status(404)
                .json({ message: "Cart is empty or not found" });
        }

        const orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
            price: item.productId.price,
            image: item.productId.image,
            color: item.productId.color,
            size: item.size,
        }));

        const order = new Order({
            userId: userId || null,
            guestId: guestId || null,
            items: orderItems,
            totalPrice: cart.totalPrice,
            shippingInfo,
            paymentMethod,
        });

        await order.save();
        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({
            message: "Failed to place order",
            error: err.message,
        });
    }
};

exports.getOrders = async (req, res) => {
    const { userId, guestId } = req.query;

    if (!userId && !guestId) {
        return res.status(400).json({ message: "Missing userId or guestId" });
    }

    try {
        const orders = await Order.find(userId ? { userId } : { guestId }).sort(
            { createdAt: -1 }
        );
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
