const express = require("express");
const {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getLatestProducts,
    getRelatedProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/category/:category", getProductsByCategory);
router.get("/featured", getFeaturedProducts);
router.get("/latest", getLatestProducts);
router.get("/related/:id", getRelatedProducts);
router.get("/:id", getProductById);
router.get("/", getAllProducts);

module.exports = router;
