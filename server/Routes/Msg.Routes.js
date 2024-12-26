const express = require("express");
const MsgRoutes = express.Router();

const { addMsg, getMsg } = require("../Controller/MessageController");

MsgRoutes.post("/api/addMsg", addMsg);
MsgRoutes.get("/api/getMsg/:chatId", getMsg);

module.exports = MsgRoutes;
