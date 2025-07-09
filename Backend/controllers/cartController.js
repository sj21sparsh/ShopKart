const Cart = require("../models/Cart");
const Product = require("../models/Product");

const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const validateUserOrGuest = (userId, guestId, res) => {
    if (!userId && !guestId) {
        res.status(400).json({ message: "UserId or GuestId is required" });
        return false;
    }
    return true;
};

exports.getCart = async (req, res) => {
    const { userId, guestId } = req.query;
    try {
        if (!validateUserOrGuest(userId, guestId, res)) return;

        const cart = await Cart.findOne(
            userId ? { userId } : { guestId }
        ).populate("items.productId");

        if (!cart) {
            return res.status(200).json({ cart: { items: [], totalPrice: 0 } });
        }

        const totalPrice = calculateTotalPrice(cart.items);
        res.status(200).json({ cart: { items: cart.items, totalPrice } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity, size } = req.body;
    const { userId, guestId } = req.query;

    try {
        if (!validateUserOrGuest(userId, guestId, res)) return;

        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne(userId ? { userId } : { guestId });
        if (!cart) cart = new Cart(userId ? { userId } : { guestId });

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.equals(productId) && item.size === size
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name: product.name,
                price: product.price,
                image: product.image,
                color: product.color,
                size,
                quantity,
            });
        }

        await cart.save();
        res.status(200).json({
            message: "Item added",
            cart: { items: cart.items, totalPrice: cart.totalPrice },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateItem = async (req, res) => {
    const { productId, quantity, size } = req.body;
    const { userId, guestId } = req.query;

    try {
        if (!validateUserOrGuest(userId, guestId, res)) return;

        const cart = await Cart.findOne(userId ? { userId } : { guestId });
        if (!cart)
            return res.status(200).json({ cart: { items: [], totalPrice: 0 } });

        const index = cart.items.findIndex(
            (item) => item.productId.equals(productId) && item.size === size
        );

        if (index === -1)
            return res.status(404).json({ message: "Item not found" });

        if (quantity === 0) cart.items.splice(index, 1);
        else cart.items[index].quantity = quantity;

        await cart.save();
        res.status(200).json({
            message: "Item updated",
            cart: { items: cart.items, totalPrice: cart.totalPrice },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeItem = async (req, res) => {
    const { productId, size } = req.body;
    const { userId, guestId } = req.query;

    try {
        if (!validateUserOrGuest(userId, guestId, res)) return;

        const cart = await Cart.findOne(userId ? { userId } : { guestId });
        if (!cart)
            return res.status(200).json({ cart: { items: [], totalPrice: 0 } });

        const index = cart.items.findIndex(
            (item) => item.productId.equals(productId) && item.size === size
        );

        if (index === -1) {
            return res.status(404).json({ message: "Item not found" });
        }

        cart.items.splice(index, 1);

        await cart.save();
        res.status(200).json({
            message: "Item removed",
            cart: { items: cart.items, totalPrice: cart.totalPrice },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.clearCart = async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        if (!validateUserOrGuest(userId, guestId, res)) return;

        const cart = await Cart.findOne(userId ? { userId } : { guestId });
        if (!cart)
            return res.status(200).json({ cart: { items: [], totalPrice: 0 } });

        cart.items = [];
        await cart.save();
        res.status(200).json({
            message: "Cart cleared",
            cart: { items: [], totalPrice: cart.totalPrice },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
