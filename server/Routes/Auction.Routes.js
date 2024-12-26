const express = require("express");

const auctionRoutes = express.Router();
const {
  createAuction,
  displayAuctionList,
  displaySingleAuctionList,
  displayUniqueSingleList,
  deleteAuctionListing,
  updateAuctionListing,
} = require("../AuctionController/Auction");

const {
  participate,
  getHighestBidder,
  bidderUsers,
} = require("../AuctionController/ParticipateInAuction");

auctionRoutes.post("/api/createAuction", createAuction);
auctionRoutes.get("/api/showAuction", displayAuctionList);
auctionRoutes.get("/api/showSingleAuction/:id", displaySingleAuctionList);
auctionRoutes.get("/api/showuniqueAuction/:id", displayUniqueSingleList);
auctionRoutes.delete("/api/deleteAuctionListing/:id", deleteAuctionListing);
auctionRoutes.put("/api/updateAuctionListing/:id", updateAuctionListing);

auctionRoutes.post("/api/participate/:id", participate);
auctionRoutes.get("/api/getwinner/:auctionId", getHighestBidder);

auctionRoutes.get("/api/getallUserParticipate/:auctionId", bidderUsers);

module.exports = auctionRoutes;
