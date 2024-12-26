const User = require("../Models/UserSchema");

const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User successfully found", result });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { getUser };
