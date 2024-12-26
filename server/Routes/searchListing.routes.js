const express = require("express");

const searchRoutes = express.Router();
const { searchListing } = require("../Controller/SeacrchListing.Controller");

searchRoutes.get("/api/searchListing", searchListing);

module.exports = searchRoutes;
