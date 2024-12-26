const Listing = require("../Models/userListingSchema");
const Listing1 = require("../Models/adminLIstingSchema");

const deleteListing = async (req, res) => {
  try {
    const data = await Listing.deleteOne({ _id: req.params.id });
    if (!data) {
      res.status(400).json({ message: "data is not found" });
    }
    res.status(200).json({ message: "data is successfully deleted" + data });
  } catch (error) {
    res.status(402).json({ message: "Error deleting", error });
  }
};
//Display the single UserListing Data
const getListing = async (req, res) => {
  try {
    let data = await Listing.findOne({ _id: req.params.id });
    let data1 = await Listing1.findOne({ _id: req.params.id });

    // if (!data && !data1) {
    //   return res.status(400).json({ message: "data not found" });
    // }

    return res.status(200).json({ data, data1 });
  } catch (error) {
    return res
      .status(405)
      .json({ message: "some thing went wrong with the server", error });
  }
};

const updateListing = async (req, res) => {
  try {
    const check = await Listing.findOne({ _id: req.params.id });
    if (!check) {
      return res.status(402).json({ message: "user not found" });
    }
    const api = await Listing.findByIdAndUpdate(
      req.params.id,
      { ...req.body, isVerified: false },
      {
        new: true,
      }
    );

    return res.status(200).json(api);
  } catch (error) {
    return res.status(405).json({ message: "sth wrong", error });
  }
};

module.exports = { deleteListing, getListing, updateListing };
