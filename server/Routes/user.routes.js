// routes/userRoutes.js
const express = require("express");
const { sendOTP, signupUser, google } = require("../Controller/UserSignup");

const userRouter = express.Router();

userRouter.post("/api/signup-user", signupUser);
userRouter.post("/api/activate-User", sendOTP);
userRouter.post("/api/google", google);

module.exports = userRouter;
