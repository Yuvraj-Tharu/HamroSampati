const approve = require("../Models/userListingSchema");

const adminAprove = async (req, res) => {
  try {
    const listings = await approve.find({ isVerified: false });

    if (listings) {
      if (listings.length > 0) {
        return res.status(200).json({ message: "Success", listings });
      } else {
        return res
          .status(202)
          .json({ message: "No unverified listings found" });
      }
    } else {
      res.status(404).json({ message: "no data found" });
    }
  } catch (error) {
    console.error("Error while fetching unverified listings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const adminVerify = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemToVerify = await approve.findByIdAndUpdate(
      itemId,
      { isVerified: true, isCanceled: false },

      { new: true }
    );

    if (!itemToVerify) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(itemToVerify);
  } catch (error) {
    console.error("Error while verifying item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminCancel = async (req, res) => {
  try {
    const cancelRequest = await approve.findByIdAndUpdate(
      req.params.id,

      { ...req.body, isCanceled: true },
      { new: true }
    );

    if (!cancelRequest) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(cancelRequest);
  } catch (error) {
    console.error("Error while verifying item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { adminAprove, adminVerify, adminCancel };
