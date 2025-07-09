const express = require("express");
const router = express.Router();
const {
    getCart,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
} = require("../controllers/cartController");

router.get("/", getCart);
router.post("/item", addToCart);
router.put("/item", updateItem);
router.delete("/item", removeItem);
router.delete("/", clearCart);

module.exports = router;
