const express = require("express");
const EmailController = require("../controllers/email.controller");

const EmailRouter = express.Router();

EmailRouter.post("/", EmailController.enviarCorreo);

module.exports = EmailRouter;
