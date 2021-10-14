const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        });
        console.log(`🔌 Connected to the MongoDB host : ${conn.connection.host}`);
    } catch (err) {
        console.error("Oops.. can not connect to MongoDB :", err);
        process.exit(1);
    }
}

module.exports = connectDB;
