const express = require("express");
const AdminRouter = express.Router();
const {
  adminAprove,
  adminVerify,
  adminCancel,
} = require("../adminController/admin.aprove");
const { showUser } = require("../adminController/showUserData");
const { CountListing } = require("../adminController/showCount");
const {
  createListing,
  showSingleListing,
  showAdminListing,
  deleteAdminListing,
  updateAdminListing,
  getAdminListing,
} = require("../adminController/AdminListing");
const { AdminSearchListing } = require("../adminController/AdminSearch");

AdminRouter.get("/api/admin-approve", adminAprove);
AdminRouter.put("/api/admin-verify/:id", adminVerify);
AdminRouter.put("/api/admin-cancel/:id", adminCancel);
AdminRouter.get("/api/allUsers", showUser);
AdminRouter.get("/api/CountListing", CountListing);
AdminRouter.post("/api/create/adminListing", createListing);
AdminRouter.get("/api/Showcreate/adminListing/:id", showSingleListing);
AdminRouter.get("/api/showAdminListing/:id", showAdminListing);
AdminRouter.delete("/api/deleteAdminListing/:id", deleteAdminListing);
AdminRouter.put("/api/updateAdminListing/:id", updateAdminListing);
AdminRouter.get("/api/getAdminListing/:id", getAdminListing);
AdminRouter.get("/api/adminSearchListing", AdminSearchListing);

//Create Listing

module.exports = AdminRouter;
