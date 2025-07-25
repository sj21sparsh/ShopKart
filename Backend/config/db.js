const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (e) {
        console.error("Error connecting to DB", e.message);
        process.exit(1);
    }
};

module.exports = connectDB;
