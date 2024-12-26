const express = require("express");
const ResetPasswordRouter = express.Router();
const {
  ForgotPassword,
  resetPassword,
} = require("../Controller/ResetPassword.Controller");

ResetPasswordRouter.post("/api/forgot-password", ForgotPassword);
ResetPasswordRouter.post("/api/reset-password", resetPassword);
module.exports = ResetPasswordRouter;
