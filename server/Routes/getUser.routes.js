const express = require("express");
const getUserRouter = express.Router();
const { getUser } = require("../Controller/GetUser.Controller");

getUserRouter.get("/api/getUser/:id", getUser);

module.exports = getUserRouter;
