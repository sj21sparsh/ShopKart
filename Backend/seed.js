const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const products = require("./products");

dotenv.config();

console.log("Starting Product Seeding");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("MongoDB Connected");

        await Product.deleteMany();
        console.log("Existing products removed");

        await Product.insertMany(products);
        console.log("Products inserted successfully");

        process.exit();
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });
