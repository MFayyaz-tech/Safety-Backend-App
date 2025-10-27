const asyncHandler = require("express-async-handler");
const sendResponse = require("../../utils/sendResponse");
const responseStatusCodes = require("../../utils/responseStatusCode");
const botServices = require("./botService");

const botController = {
  callPrompt: asyncHandler(async (req, res) => {
    const response = await botServices.callPrompt(
      req.body.prompt,
      req.body.prevousMessages
    );
    sendResponse(
      res,
      responseStatusCodes.OK,
      true,
      response,
      null,
      "Prompt processed successfully"
    );
  }),
};

module.exports = botController;
