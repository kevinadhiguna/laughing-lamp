const express = require("express");

// For MongoDB (database) configuration
const connectDb = require("./config/db");

// Import routes
const { catchphrases } = require("./routes/index");

const app = express();

// Connect to MongoDB
connectDb();

// parse requests of content-type : application/json
app.use(express.json());

app.use('/catchphrases', catchphrases);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server has been launched on port ${PORT}`);
});
