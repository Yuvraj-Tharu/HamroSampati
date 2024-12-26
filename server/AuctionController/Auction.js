const Auction = require("../Models/AuctionListingSchema");
// const { findById } = require("../Models/AuctionParticipateSchema");
const createAuction = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      imageUrl,
      userRef,
      MinimumPrice,
      endTime,
    } = req.body;

    if (new Date(endTime) <= new Date()) {
      return res
        .status(400)
        .json({ message: "End time must be in the future" });
    }

    let auction = new Auction({
      title,
      description,
      address,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      imageUrl,
      userRef,
      MinimumPrice,
      endTime,
    });

    await auction.save();

    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const displayAuctionList = async (req, res) => {
  try {
    const result = await Auction.find();
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(203).json({ message: "result not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const displaySingleAuctionList = async (req, res) => {
  try {
    const result = await Auction.findOne({ _id: req.params.id });
    if (result) {
      return res.status(200).json({ message: "result found", result });
    } else {
      return res.status(203).json({ message: "result not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "sth went wrong", error });
  }
};

//auction listed by the admin
const displayUniqueSingleList = async (req, res) => {
  try {
    let data = await Auction.find({ userRef: req.params.id });

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(403).json({ message: "result not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "sth went wrong", error });
  }
};

const deleteAuctionListing = async (req, res) => {
  try {
    const data = await Auction.deleteOne({ _id: req.params.id });
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

const updateAuctionListing = async (req, res) => {
  try {
    const check = await Auction.findOne({ _id: req.params.id });
    // console.log(check);
    if (!check) {
      return res.status(402).json({ message: "Listing not found" });
    }
    const api = await Auction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(api);
  } catch (error) {
    return res.status(405).json({ message: "sth wrong", error });
  }
};

module.exports = {
  createAuction,
  displayAuctionList,
  displaySingleAuctionList,
  displayUniqueSingleList,
  deleteAuctionListing,
  updateAuctionListing,
};
