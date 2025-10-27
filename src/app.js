const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler.middleware");
const fileUpload = require("express-fileupload");

// Load environment variables
dotenv.config();
require("./db/db");

// Utility imports
const sendResponse = require("./utils/sendResponse");
const responseStatusCodes = require("./utils/responseStatusCode");

// API Routers

const app = express();

// CORS
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.use(express.static("public"));

// ─── Body Parsers for Other Routes ─────────────────────────────────────────────
// JSON parser for non-/webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") return next();
  express.json({ limit: "16mb" })(req, res, next);
});

// File uploads and request logging
app.use(morgan("dev"));
app.use(fileUpload());

// ─── Default & Logging Middleware ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome To Safety App Server" });
});

app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/bot", require("./resources/bot/botRouter"));

// ─── Error Handling & 404 ─────────────────────────────────────────────────────
app.use(errorHandler);

app.use(async (req, res) => {
  await sendResponse(
    res,
    responseStatusCodes.NOTFOUND,
    "Not Found",
    false,
    null,
    null
  );
});

module.exports = app;
