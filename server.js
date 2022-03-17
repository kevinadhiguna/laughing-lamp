const express = require("express");
const app = express();
require("dotenv").config();

// parse requests of content-type : application/json
app.use(express.json());
// x-www-urlencoded
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const connectDb = require("./config/db");
connectDb();

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register route
const { catchphrases, healthcheck } = require("./routes/index");
app.use("/catchphrases", catchphrases);
app.use("/healthcheck", healthcheck);

// Port and Host/Hostname configuration
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// Start server
const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`🚀 Server has been launched on port ${PORT}`);
});

// Handle interrupt signal (SIGINT)
process.on("SIGINT", () => {
  console.log("Received SIGINT, process interrupted...");
  server.close((errSigint) => {
    console.log("Closing HTTP server after receiving SIGINT..");
    process.exit(errSigint ? 1 : 0);
  });
});

// Exit Node-express server based on https://stackoverflow.com/a/21739334
process.on("SIGTERM", () => {
  console.log("Received SIGTERM, process terminated...");
  server.close((errSigterm) => {
    console.log("Closing HTTP server after receiving SIGTERM..");
    process.exit(errSigterm ? 1 : 0);
  });
});
