const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log(`🔌 Connected to the MongoDB host : ${conn.connection.host}`);
  } catch (err) {
    console.error("Oops.. can not connect to MongoDB :", err);
    process.exit(1);
  }
};

module.exports = connectDB;
