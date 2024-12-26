const express = require("express");
const {
  updateProfile,
  deleteUser,
} = require("../Controller/Update.Profile.Controller");

const UserProfileUpdateRouter = express.Router();

UserProfileUpdateRouter.post("/api/userProfileUpdate/:id", updateProfile);
UserProfileUpdateRouter.delete("/api/userProfileDelete/:id", deleteUser);

module.exports = UserProfileUpdateRouter;
