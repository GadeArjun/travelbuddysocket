const express = require("express");
const { getMessages } = require("../controllers/messages");

const messagesRouter = express.Router();

exports.messagesRouter = messagesRouter.get("/messages", getMessages);
