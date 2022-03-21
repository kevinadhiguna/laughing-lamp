const express = require("express");
const app = express();
require("dotenv").config();

// parse requests of content-type : application/json
app.use(express.json());
// parse x-www-urlencoded
app.use(express.urlencoded({ extended: false }));

// Use Helmet for security
const helmet = require("helmet");
app.use(helmet());

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

// Register routes
const { catchphrases, healthcheck } = require("./routes/index");
app.use("/catchphrases", catchphrases);
app.use("/healthcheck", healthcheck);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Port and Host/Hostname configuration
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// Start server
const server = app.listen(PORT, HOSTNAME, () => {
  console.log(
    `🚀 Server has been launched on ${HOSTNAME}:${PORT}, waiting for database connection..`
  );
});

// == Graceful shutdown (handling signals such as SIGINT and SIGTERM) using 'lil-http-terminator' package ==
// Reference : https://dev.to/koresar/lil-http-terminator-a-tiny-js-module-to-gracefully-shutdown-your-http-server-l0b

const httpTerminator = require("lil-http-terminator")({ server });
// The line above is equivalent to :
// const createHttpTerminator = require("lil-http-terminator");
// const httpTerminator = createHttpTerminator({ server });

const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}, shutting down..`);
  const { code, message, success, error } = await httpTerminator.terminate();
  console.log(
    `HTTP server closure result :
     Success : ${success}
     Code : ${code}
     Message : ${message}
     Error (if exists) : ${error || ""}`
  );
  process.exit(error ? 1 : 0);
  // process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// == Manually handle graceful suhtdown (such as when receiving SIGINT and SIGTERM) ==

// Handle interrupt signal (SIGINT)
// process.on("SIGINT", () => {
//   console.log("Received SIGINT, process interrupted...");
//   server.close((errSigint) => {
//     console.log("Closing HTTP server after receiving SIGINT..");
//     process.exit(errSigint ? 1 : 0);
//   });
// });

// Exit Node-express server based on https://stackoverflow.com/a/21739334
// process.on("SIGTERM", () => {
//   console.log("Received SIGTERM, process terminated...");
//   server.close((errSigterm) => {
//     console.log("Closing HTTP server after receiving SIGTERM..");
//     process.exit(errSigterm ? 1 : 0);
//   });
// });
