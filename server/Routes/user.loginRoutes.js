const express = require("express");
const { userLogin } = require("../Controller/User.LoginController");

const loginRoutes = express.Router();

loginRoutes.post("/api/login-user", userLogin);

module.exports = loginRoutes;
