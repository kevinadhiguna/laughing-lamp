const express = require("express");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// parse requests of content-type : application/json
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Ssst.. do not spill the tea..." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server has been launched on port ${PORT}`);
});
