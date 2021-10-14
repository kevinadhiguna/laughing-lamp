const express = require("express");
const connectDb = require("./config/db");

const app = express();

// Connect to MongoDB
connectDb();

// parse requests of content-type : application/json
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Ssst.. do not spill the tea..." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server has been launched on port ${PORT}`);
});
