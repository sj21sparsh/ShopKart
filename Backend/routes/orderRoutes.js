const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/orderController");

router.post("/placeOrder", placeOrder);
router.get("/getOrders", getOrders);

module.exports = router;
