const express = require("express");

// For MongoDB (database) configuration
const connectDb = require("./config/db");

// Import routes
const { catchphrases } = require("./routes/index");

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Connect to MongoDB
connectDb();

// parse requests of content-type : application/json
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Catchphrases REST API",
            description:
                "A REST API powered by ExpressJS and MongoDB. This API provides movie catchphrases and the context of the catchprase in the movie.",
        },
    },
    apis: ["./routes/catchphrases.js"],
};

// routes
app.use("/catchphrases", catchphrases);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server has been launched on port ${PORT}`);
});
