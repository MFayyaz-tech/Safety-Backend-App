const sendResponse = require("../utils/sendResponse");
const responseStatusCodes = require("../utils/responseStatusCode");

async function errorHandler(err, req, res, next) {
  console.error("🚨 Error caught in middleware:", err);

  // Handle MongoDB Duplicate Key Error
  if (err && err.code === 11000) {
    let errorKey = Object.keys(err.keyPattern || {}).toString();
    errorKey = upperCaseFirst(errorKey);
    return sendResponse(
      res,
      responseStatusCodes.BAD,
      `${errorKey} already exists`,
      false,
      null,
      null
    );
  }

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError" && err.errors) {
    const firstErrorKey = Object.keys(err.errors)[0];
    const message = err.errors[firstErrorKey]?.message || "Validation error";
    return sendResponse(
      res,
      responseStatusCodes.BAD,
      message,
      false,
      null,
      null
    );
  }

  // Catch-All for Other Errors
  return sendResponse(
    res,
    responseStatusCodes.BAD,
    err.message || "An unknown error occurred",
    false,
    null,
    null
  );
}

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = errorHandler;
