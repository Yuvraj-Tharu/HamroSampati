const express = require("express");
const {
  UserListing,
  getUserListing,
} = require("../Controller/CreateListing.Controller");
const createListingRouter = express.Router();

createListingRouter.post("/api/usersListing", UserListing);
createListingRouter.get("/api/listing/:id", getUserListing);

module.exports = createListingRouter;
