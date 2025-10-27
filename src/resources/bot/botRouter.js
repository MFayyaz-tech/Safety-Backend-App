const express = require("express");
const botController = require("./botController");
const botRouter = express.Router();
botRouter.route("/").post(botController.callPrompt);
module.exports = botRouter;
