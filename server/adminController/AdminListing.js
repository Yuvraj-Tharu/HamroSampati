const Listing = require("../Models/adminLIstingSchema");
// const Listing = require("../Models/userListingSchema");

const createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    let result = await listing.save();
    if (result) {
      return res.status(200).json({ result: result });
    } else {
      return res.status(404).json({ message: "result could not be created" });
    }
  } catch (error) {
    console.log("Internal error: " + error);
    res.status(500).json({ error: "Internal server  error" });
  }
};

const showSingleListing = async (req, res) => {
  try {
    let data = await Listing.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }

    return res
      .status(200)
      .json({ message: "Show listing data sucessfully", data });
  } catch (error) {
    return res
      .status(405)
      .json({ message: "some thing went wrong with the server", error });
  }
};

const showAdminListing = async (req, res) => {
  if (req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });

      return res.status(200).json(listings);
    } catch (error) {
      res.status(404).json({ message: "something went wrong" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const deleteAdminListing = async (req, res) => {
  try {
    const data = await Listing.deleteOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({ message: "data is not found" });
    }
    return res
      .status(200)
      .json({ message: "data is successfully deleted" + data });
  } catch (error) {
    return res.status(402).json({ message: "Error deleting", error });
  }
};

const updateAdminListing = async (req, res) => {
  try {
    const check = await Listing.findOne({ _id: req.params.id });
    if (!check) {
      return res.status(402).json({ message: "user not found" });
    }
    const api = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(api);
  } catch (error) {
    return res.status(405).json({ message: "sth wrong", error });
  }
};

const getAdminListing = async (req, res) => {
  try {
    let data = await Listing.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }

    return res
      .status(200)
      .json({ message: "Show listing data sucessfully", data });
  } catch (error) {
    return res
      .status(405)
      .json({ message: "some thing went wrong with the server", error });
  }
};
module.exports = {
  createListing,
  showSingleListing,
  showAdminListing,
  deleteAdminListing,
  updateAdminListing,
  getAdminListing,
};
