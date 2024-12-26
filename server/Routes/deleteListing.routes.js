const express = require("express");
const {
  deleteListing,
  getListing,
  updateListing,
} = require("../Controller/DeleteListing.Controller");
const deleteRouter = express.Router();
// const getRouter = express.Router();

deleteRouter.delete("/api/deleteListing/:id", deleteListing);
deleteRouter.get("/api/getListing/:id", getListing);
deleteRouter.put("/api/updateListing/:id", updateListing);

module.exports = deleteRouter;
